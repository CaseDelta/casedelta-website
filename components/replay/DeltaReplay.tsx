'use client';
/**
 * A recorded Delta turn, replayed through the product's own chat components
 * (vendor/delta-ui, the same AssistantStream the app renders a live run with).
 * Nothing here is drawn for the website: the steps, the tool group and the
 * answer are the product's markup on the product's tokens.
 *
 * `phase` is owned by the page: 'request' shows nothing yet, 'working' plays
 * the recorded timeline, 'result' shows the finished turn. Reduced motion
 * never plays; it goes straight to the result.
 */
import { useEffect } from 'react';
import { AssistantStream } from 'delta-ui/components/AssistantStream';
import { useScenarioReplay } from 'delta-ui/scenario/useScenarioReplay';
import type { Scenario } from 'delta-ui/scenario/types';
import '../../vendor/delta-ui/fonts.css';
import './delta-ui.css';

export type ReplayPhase = 'request' | 'working' | 'result';

export function DeltaReplay({ scenario, phase, onFinished }: { scenario: Scenario; phase: ReplayPhase; onFinished?: () => void }) {
  const replay = useScenarioReplay(scenario);
  const { start, reset, status } = replay;

  useEffect(() => {
    if (phase === 'working') start();
    else reset();
  }, [phase, start, reset]);

  useEffect(() => {
    if (phase === 'working' && status === 'complete') onFinished?.();
  }, [phase, status, onFinished]);

  if (phase === 'request') return null;
  if (phase === 'result') {
    return <AssistantStream live={false} steps={replay.steps} startTime={null} finalAnswer={scenario.finalAnswer} />;
  }
  return (
    <AssistantStream
      live
      status={replay.status}
      steps={replay.steps}
      startTime={replay.startTime}
      partialAnswer={replay.partialAnswer}
    />
  );
}
