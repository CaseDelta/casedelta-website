# Slick Tricks Engineering Handoff: Self-Improving Trading Strategy System

**Document type:** Engineering implementation spec
**Date:** March 13, 2026
**Author:** Claw (AI strategic partner), synthesized from Karpathy AutoResearch analysis and Slick Tricks architecture review
**Audience:** Any engineer working on Slick Tricks — assumes no prior knowledge of the self-learning pattern

---

## Executive Summary

Slick Tricks currently runs algorithmic trading bots on Polymarket targeting end-of-game basketball arbitrage. The bots find mispriced positions in the final ~5 minutes of games, exploit ~2% average edge per trade, and maintain a 99.2% win rate. Capital deployed is scaling toward ~$25K with expansion planned to NBA, MLB, NHL, and tennis for year-round coverage.

This spec adds a **self-improving strategy optimization system** — a nightly background process that automatically backtests variations of trading strategies, measures performance, keeps winners, discards losers, and compounds learnings over time. The system runs while you sleep. You wake up to a log of experiments and (hopefully) better parameters.

The idea comes from a pattern called **iterative autonomous experimentation** — give an AI agent a goal, a metric, and the ability to change inputs, then let it run experiments in a loop. It's been demonstrated on ML model training (Karpathy's AutoResearch), cold email optimization, landing page CRO, and now we're applying it to quantitative trading.

---

## The Self-Learning Pattern (Plain English)

Here's the loop in simple terms:

1. **Start with a baseline strategy** — your current parameters (2% edge threshold, 5-minute window, etc.)
2. **The agent generates a hypothesis** — "What if we lower the edge threshold to 1.5% but only in the last 2 minutes when mispricings are larger?"
3. **Backtest the hypothesis** — run it against historical data (resolved markets, actual outcomes)
4. **Measure the result** — expected edge, win rate, Sharpe ratio, max drawdown
5. **Keep or discard** — if it beats the baseline, it becomes the new baseline. If not, log the result and try something else.
6. **Compound learnings** — every experiment's result gets added to a knowledge file. Future experiments read all previous learnings before generating new hypotheses.
7. **Repeat forever** — the agent runs 10-20 experiments per night, every night.

After a month, you have 300-600 experiments logged. The agent has explored parameter spaces you'd never test manually. The winning strategies compound.

**Critical safety rule:** The agent proposes. Humans approve before deploying to live capital. The backtest environment is sandboxed — no real money touches until you review and green-light.

---

## Current Slick Tricks Architecture

| Component | Current State |
|-----------|--------------|
| **Primary strategy** | End-of-game basketball arbitrage on Polymarket |
| **Edge** | ~2% average per trade |
| **Win rate** | 99.2% |
| **Capital** | Scaling to ~$25K deployed |
| **Infrastructure** | Docker bots on VPS (65.21.153.94) |
| **Markets** | Basketball (primary), NBA/MLB/NHL/tennis (planned expansion) |
| **Data** | Real-time market prices from Polymarket API |

### What the agent needs access to:
- Historical resolved market data (past game outcomes + price histories)
- Current strategy parameters (thresholds, timing windows, position sizes)
- Backtest execution environment (simulate trades against historical data)
- Results storage (log every experiment)

---

## Implementation: Strategy Optimization Lab

### Architecture Overview

```
VPS Cron (2 AM CT nightly) →
  strategy_lab.py →
    1. Load current baseline parameters
    2. Load strategy_learnings.md (accumulated knowledge)
    3. Generate 10-20 hypothesis variations
    4. For each: run backtest against last 30 days of resolved markets
    5. Score: expected_edge, win_rate, sharpe_ratio, max_drawdown
    6. If any beat baseline → flag for review, update strategy_learnings.md
    7. Log all results to experiments.tsv
    8. Post summary to Slack (#openclaw)
```

### 1. Historical Data Collection

Before the lab can run, we need historical data. Build a data collector that runs daily:

```python
# /root/slick-tricks/data/collect_historical.py

"""
Runs daily at midnight. Collects all resolved markets from the past 24 hours.
Stores: market_id, sport, event, start_time, end_time, outcome,
        price_history (time series of bid/ask at 1-minute intervals),
        final_price, resolution
"""

import json
import sqlite3
from datetime import datetime, timedelta

DB_PATH = '/root/slick-tricks/data/markets.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute('''
        CREATE TABLE IF NOT EXISTS resolved_markets (
            market_id TEXT PRIMARY KEY,
            sport TEXT,
            event_name TEXT,
            start_time TEXT,
            end_time TEXT,
            outcome TEXT,           -- 'yes' or 'no'
            price_history TEXT,     -- JSON: [{time, bid, ask}, ...]
            final_price REAL,
            resolution_time TEXT,
            collected_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS experiments (
            experiment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            run_date TEXT,
            hypothesis TEXT,
            parameters TEXT,        -- JSON of strategy params tested
            expected_edge REAL,
            win_rate REAL,
            sharpe_ratio REAL,
            max_drawdown REAL,
            total_trades INTEGER,
            status TEXT,            -- 'keep', 'discard', 'error'
            notes TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    return conn
```

### 2. Backtest Engine

The backtest simulates trades against historical data:

```python
# /root/slick-tricks/lab/backtest.py

"""
Given a set of strategy parameters and a date range of historical markets,
simulate all trades that would have been taken and return performance metrics.
"""

def backtest(params, markets, date_range):
    """
    params: {
        'edge_threshold': 0.02,      # minimum edge to enter (currently 2%)
        'time_window_minutes': 5,     # how close to game end (currently 5 min)
        'max_position_size': 500,     # max $ per position
        'min_liquidity': 1000,        # minimum market depth
        'sport_filter': ['basketball'],
        'score_diff_filter': None,    # e.g., only trade when score diff < 10
    }

    Returns: {
        'expected_edge': float,
        'win_rate': float,
        'sharpe_ratio': float,
        'max_drawdown': float,
        'total_trades': int,
        'total_pnl': float,
        'avg_hold_time_minutes': float,
    }
    """
    trades = []
    for market in markets:
        if not passes_filters(market, params):
            continue

        price_history = json.loads(market['price_history'])
        entry_signals = find_entry_signals(price_history, params)

        for signal in entry_signals:
            trade = simulate_trade(signal, market, params)
            trades.append(trade)

    return calculate_metrics(trades)
```

### 3. Strategy Lab (The Core Loop)

```python
# /root/slick-tricks/lab/strategy_lab.py

"""
Nightly strategy optimization lab.

Reads current baseline, generates hypothesis variations,
backtests each one, keeps winners, compounds learnings.
"""

import json
import os
import subprocess
from datetime import datetime, timedelta

LEARNINGS_PATH = '/root/slick-tricks/lab/strategy_learnings.md'
BASELINE_PATH = '/root/slick-tricks/lab/baseline.json'
EXPERIMENTS_LOG = '/root/slick-tricks/lab/experiments.tsv'

def run_lab():
    # 1. Load current state
    baseline = load_json(BASELINE_PATH)
    learnings = read_file(LEARNINGS_PATH)
    recent_experiments = get_recent_experiments(days=7)

    # 2. Get historical data for backtesting
    markets = get_resolved_markets(days=30)

    # 3. Ask Claude to generate hypotheses
    hypotheses = generate_hypotheses(
        baseline=baseline,
        learnings=learnings,
        recent_experiments=recent_experiments,
        num_hypotheses=15
    )

    # 4. Backtest each hypothesis
    results = []
    for hyp in hypotheses:
        try:
            metrics = backtest(hyp['params'], markets, date_range=30)
            results.append({
                'hypothesis': hyp['description'],
                'params': hyp['params'],
                'metrics': metrics,
                'status': 'keep' if beats_baseline(metrics, baseline) else 'discard'
            })
        except Exception as e:
            results.append({
                'hypothesis': hyp['description'],
                'status': 'error',
                'error': str(e)
            })

    # 5. Update baseline if any winners
    winners = [r for r in results if r['status'] == 'keep']
    if winners:
        best = max(winners, key=lambda r: score_strategy(r['metrics']))
        save_json(BASELINE_PATH, best['params'])

    # 6. Update learnings
    new_learnings = generate_learnings_update(results, learnings)
    write_file(LEARNINGS_PATH, new_learnings)

    # 7. Log all results
    log_experiments(results)

    # 8. Notify
    send_slack_summary(results, winners)


def generate_hypotheses(baseline, learnings, recent_experiments, num_hypotheses):
    """
    Ask Claude to generate strategy variations to test.

    The prompt includes:
    - Current baseline parameters and their performance
    - All accumulated learnings from previous experiments
    - Recent experiment results (to avoid re-testing failed ideas)
    """
    prompt = f"""You are a quantitative trading strategist optimizing an end-of-game
    sports arbitrage system on prediction markets (Polymarket).

    CURRENT BASELINE:
    {json.dumps(baseline, indent=2)}

    ACCUMULATED LEARNINGS FROM PREVIOUS EXPERIMENTS:
    {learnings}

    RECENT EXPERIMENTS (last 7 days):
    {format_recent(recent_experiments)}

    Generate {num_hypotheses} hypothesis variations to test. Each should modify 1-2
    parameters from the baseline. Include some conservative tweaks and some aggressive
    explorations. Avoid re-testing ideas that recently failed unless you have a new
    angle.

    For each hypothesis, provide:
    1. A short description of what you're testing and why
    2. The complete parameter set (all fields, not just changes)
    3. Your confidence level (low/medium/high)

    Think about:
    - Edge threshold variations (tighter for safer, looser for more volume)
    - Time window variations (earlier entry = more risk but more opportunity)
    - Position sizing rules (Kelly criterion, fixed, scaled by edge size)
    - Sport-specific parameters (basketball vs. others may need different thresholds)
    - Score differential filters (only trade close games? blowouts?)
    - Liquidity requirements (higher liquidity = better fills but fewer opportunities)
    - Day-of-week and time-of-day patterns
    - Multi-leg strategies (hedging across correlated markets)

    Return as JSON array."""

    return call_claude(prompt)  # Using claude -p on VPS
```

### 4. The Learnings File (Compounding Knowledge)

`/root/slick-tricks/lab/strategy_learnings.md` — this is the equivalent of Karpathy's advancing git branch. It grows over time as the agent discovers what works and what doesn't.

Initial content:

```markdown
# Strategy Learnings
Last updated: 2026-03-13

## Confirmed Findings
- (none yet — will be populated by the strategy lab)

## Failed Hypotheses (Don't Re-test)
- (none yet)

## Open Questions
- Does edge threshold behave differently in basketball vs. other sports?
- Is there a time-of-day pattern in mispricing frequency?
- Does score differential affect the reliability of the edge?

## Parameter Sensitivity
- (will be populated as experiments reveal which params matter most)
```

After a week of runs, it might look like:

```markdown
# Strategy Learnings
Last updated: 2026-03-20

## Confirmed Findings
- Edge threshold of 1.8% outperforms 2.0% by ~$12/day with no measurable increase
  in loss rate (tested over 47 trades across 7 days)
- Time window of 7 minutes catches 22% more opportunities than 5 minutes with only
  0.1% decrease in win rate
- Position sizing scaled by edge size (edge * $10,000) outperforms fixed $500 by
  ~18% on risk-adjusted returns
- Score differential filter: games within 6 points have 3x more mispricing events
  than blowouts. Filtering to close games only improves Sharpe by 0.4

## Failed Hypotheses (Don't Re-test)
- Edge threshold below 1.5%: win rate drops below 97%, not worth the volume increase
- Entry more than 10 minutes before game end: mispricings haven't converged yet,
  edge is noise not signal
- Multi-leg hedging: spread costs eat the edge. Only viable if both sides are
  mispriced simultaneously (rare)

## Open Questions
- MLB data just started collecting — need 2 more weeks before backtests are meaningful
- Does day-of-week matter? Thursday/Friday games seem to have thinner markets
```

### 5. Cron Setup

```bash
# On VPS (65.21.153.94)

# Data collection — daily at midnight CT
cat > /etc/systemd/system/slick-data-collect.timer << EOF
[Unit]
Description=Slick Tricks Data Collection
[Timer]
OnCalendar=*-*-* 00:00:00 America/Chicago
Persistent=true
[Install]
WantedBy=timers.target
EOF

cat > /etc/systemd/system/slick-data-collect.service << EOF
[Unit]
Description=Slick Tricks Data Collection
[Service]
Type=oneshot
ExecStart=/usr/bin/python3 /root/slick-tricks/data/collect_historical.py
WorkingDirectory=/root/slick-tricks
EOF

# Strategy lab — nightly at 2 AM CT
cat > /etc/systemd/system/slick-strategy-lab.timer << EOF
[Unit]
Description=Slick Tricks Strategy Lab
[Timer]
OnCalendar=*-*-* 02:00:00 America/Chicago
Persistent=true
[Install]
WantedBy=timers.target
EOF

cat > /etc/systemd/system/slick-strategy-lab.service << EOF
[Unit]
Description=Slick Tricks Strategy Lab
[Service]
Type=oneshot
ExecStart=/usr/bin/python3 /root/slick-tricks/lab/strategy_lab.py
WorkingDirectory=/root/slick-tricks
Environment=ANTHROPIC_API_KEY_FILE=/root/.config/anthropic/api_key
EOF

systemctl daemon-reload
systemctl enable --now slick-data-collect.timer slick-strategy-lab.timer
```

### 6. Slack Notifications

After each lab run, post to `#openclaw`:

```
Strategy Lab — March 14, 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Experiments run: 15
Markets backtested: 142 (last 30 days)

Results:
  ✅ KEEP: Edge threshold 1.8% + 7min window → +$14.20/day vs baseline
  ✅ KEEP: Kelly-scaled position sizing → Sharpe +0.31
  ❌ DISCARD: Sub-1.5% edge → win rate dropped to 96.8%
  ❌ DISCARD: 10-min window → too much noise, edge not real
  ... (11 more discards)

New baseline updated:
  edge_threshold: 1.8% (was 2.0%)
  time_window: 7 min (was 5 min)
  position_sizing: kelly_scaled (was fixed_500)

⚠️ REVIEW REQUIRED: New baseline params saved but NOT deployed to live bots.
Run /root/slick-tricks/deploy_params.sh after review.
```

---

## Expansion: Multi-Sport Strategy Discovery

As you expand to NBA, MLB, NHL, and tennis, each sport gets its own:

1. **Data collector** — sport-specific API endpoints and resolution rules
2. **Backtest parameters** — different sports have different mispricing patterns
3. **Strategy learnings file** — `strategy_learnings_mlb.md`, etc.
4. **Baseline parameters** — `baseline_mlb.json`, etc.

The strategy lab runs across all sports in a single nightly pass but generates sport-specific learnings.

### New Sport Onboarding Process

```
1. Add data collector for the sport's Polymarket/Kalshi markets
2. Collect 2-4 weeks of historical data (minimum viable backtest window)
3. Start with conservative baseline (higher edge threshold, shorter time window)
4. Let the strategy lab explore — it will find the sport-specific sweet spots
5. Review learnings weekly
6. Deploy to live bots only after 30+ days of stable backtest performance
```

---

## Expansion: Kalshi & Other Platforms

Same architecture, different API endpoints:

| Platform | Market Types | Data Source | Edge Opportunity |
|----------|-------------|------------|-----------------|
| **Polymarket** | Sports, events | Polymarket API | End-of-game mispricings |
| **Kalshi** | Weather, economic, political | Kalshi API | Event-driven mispricings near resolution |
| **Stock options** | Equity derivatives | Options data APIs | Volatility mispricings around earnings/events |

For each platform, the lab generates platform-specific hypotheses and maintains separate learnings files.

**Kalshi-specific opportunities the lab should explore:**
- Weather markets: temperature/precipitation bets near resolution dates
- Economic indicators: BLS report, Fed meeting outcomes in the hours before release
- Political events: election markets, congressional votes

**Stock options (experimental — higher risk):**
- The lab can backtest options strategies (covered calls, iron condors, event-driven puts)
- **Requires stricter human review** — options have unlimited downside risk in some strategies
- Start paper-trading only. Live deployment requires explicit approval per strategy.

---

## Safety & Risk Management

### Hard Rules (Non-Negotiable)

1. **The lab NEVER deploys to live trading automatically.** It proposes. You review. You deploy.
2. **Max drawdown kill switch:** If any backtest shows >15% drawdown on the test capital, flag it red and skip.
3. **Minimum trade count:** A strategy needs 50+ simulated trades to be statistically meaningful. Fewer = "insufficient data," not "winner."
4. **Out-of-sample testing:** The lab backtests on the last 30 days. Before deploying, manually verify on a held-out 7-day window the lab hasn't seen.
5. **Position size caps:** Never suggest position sizes > 5% of total capital per trade, regardless of edge.
6. **New sport/platform quarantine:** 30 days of backtest-only before any live capital.

### Monitoring

- Daily Slack summary of all experiments
- Weekly P&L reconciliation against live bot results
- Monthly review: is the lab actually improving real returns?

---

## File Structure

```
/root/slick-tricks/
├── data/
│   ├── collect_historical.py    # Daily data collection
│   ├── markets.db               # SQLite: resolved markets + experiments
│   └── README.md
├── lab/
│   ├── strategy_lab.py          # Nightly optimization loop
│   ├── backtest.py              # Backtesting engine
│   ├── baseline.json            # Current best parameters
│   ├── strategy_learnings.md    # Compounding knowledge file
│   ├── experiments.tsv          # Full experiment log
│   └── README.md
├── bots/
│   ├── (existing trading bot code)
│   └── deploy_params.sh         # Reads baseline.json → updates live bot config
└── README.md
```

---

## Estimated Effort

| Phase | Effort | What It Delivers |
|-------|--------|-----------------|
| Data collector | 1 day | Historical market data for backtesting |
| Backtest engine | 2 days | Simulate trades against historical data |
| Strategy lab | 2 days | Nightly autonomous experimentation loop |
| Learnings + logging | 0.5 day | Compounding knowledge + audit trail |
| Slack notifications | 0.5 day | Daily summaries for review |
| Cron setup | 0.5 day | Automated scheduling on VPS |
| **Total** | **~7 days** | Self-improving trading strategy system |

Multi-sport expansion: +2 days per sport (data collector + sport-specific parameters).
Kalshi expansion: +3 days (new API integration + platform-specific backtest rules).

---

*The strategy lab runs while you sleep. Each morning, you review what it found. Over time, the accumulated learnings file becomes the most valuable asset in the trading operation — a compounding record of what works, what doesn't, and why, built from hundreds of experiments no human would have time to run manually.*
