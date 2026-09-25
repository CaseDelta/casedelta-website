'use client';
/**
 * The "works inside every system" picture: the firm's software as labelled
 * categories around Delta, each tile cycling through example products so a
 * lawyer who uses none of the logos still recognises the category. The active
 * showcase row lights the systems it touches; everything else dims.
 *
 * One SVG in a fixed 600x480 viewBox, so it scales as a single drawing and the
 * moving parts (wires, the travelling email) stay registered at every width.
 */
import { useEffect, useState } from 'react';
import s from './SystemMap.module.css';

const LOGO = (n: string) => `/concept/logos/${n}`;
type Key = 'case' | 'intake' | 'email' | 'docs' | 'sheets' | 'more';
const HUB = { x: 300, y: 196 };
const TILE = 76;
const NODES: { key: Key; label: string; x: number; y: number; logos: string[] }[] = [
  { key: 'case', label: 'Case management', x: 84, y: 64, logos: ['filevine-mark.svg', 'litify-mark.png', 'casepeer-mark.png', 'smartadvocate-mark.png', 'mycase-mark.png'] },
  { key: 'intake', label: 'Intake', x: 84, y: 196, logos: ['leaddocket-mark.png', 'salesforce.svg'] },
  { key: 'email', label: 'Email', x: 84, y: 328, logos: ['outlook.svg', 'gmail.svg'] },
  { key: 'docs', label: 'Documents', x: 516, y: 64, logos: ['gdrive.svg', 'word.svg'] },
  { key: 'sheets', label: 'Spreadsheets', x: 516, y: 196, logos: ['excel.svg'] },
  { key: 'more', label: 'Anything else', x: 516, y: 328, logos: [] },
];
const wire = (n: { x: number; y: number }) => {
  const x = n.x + (n.x < HUB.x ? TILE / 2 : -TILE / 2);
  const mx = (HUB.x + x) / 2;
  return `M${x} ${n.y} C ${mx} ${n.y}, ${mx} ${HUB.y}, ${HUB.x} ${HUB.y}`;
};
const node = (k: Key) => NODES.find((n) => n.key === k)!;

export const MAP_STEPS: { lit: Key[]; systems: string; result: { icons: string[]; text: string; sub?: string }; travel?: boolean; clock?: boolean }[] = [
  { lit: ['case', 'email'], systems: 'Case management and email, together',
    result: { icons: ['outlook.svg', 'filevine-mark.svg'], text: 'Two demands owed. One is due today.' } },
  { lit: ['email', 'case'], systems: 'From email into case management', travel: true,
    result: { icons: ['outlook.svg', 'filevine-mark.svg'], text: '98 emails filed to Garcia.' } },
  { lit: ['intake', 'case', 'email'], systems: 'Every morning, across all of them', clock: true,
    result: { icons: ['filevine-mark.svg', 'outlook.svg'], text: 'Call Garcia first. 3 demands due.', sub: 'Every morning at 7' } },
];

export function SystemMap({ active, still }: { active: number; still: boolean }) {
  const step = MAP_STEPS[active];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, [still]);
  // Email -> hub, then hub -> case management (the second wire reversed).
  const cm = node('case'), cmX = cm.x + TILE / 2, mx2 = (HUB.x + cmX) / 2;
  const route = `${wire(node('email'))} C ${mx2} ${HUB.y}, ${mx2} ${cm.y}, ${cmX} ${cm.y}`;

  return <div className={s.map}>
    <svg viewBox="0 0 600 420" className={s.svg} role="img" aria-label="Delta connected to case management, intake, email, documents, spreadsheets and any other system">
      {NODES.map((n) => {
        const on = step.lit.includes(n.key);
        return <path key={n.key} data-part="wire" d={wire(n)} className={`${s.wire} ${on ? s.wireOn : ''} ${on && !still ? s.flow : ''}`} />;
      })}
      {step.travel && !still && <g key={`travel-${active}`} className={s.envelope}>
        <rect x={-34} y={-22} width={68} height={44} rx={10} />
        <path d="M-22 -10 L0 5 L22 -10" />
        <animateMotion dur="2.4s" repeatCount="indefinite" path={route} keyPoints="0;1;1" keyTimes="0;.8;1" calcMode="linear" />
      </g>}
      <g className={s.hub} data-part="hub">
        <circle cx={HUB.x} cy={HUB.y} r={50} />
        {!still && <circle key={`ring-${active}`} cx={HUB.x} cy={HUB.y} r={50} className={s.ring} />}
        <image href={LOGO('delta-mark-white.png')} x={HUB.x - 28} y={HUB.y - 32} width={56} height={56} />
      </g>
      {step.clock && <g className={s.clock} key={`clock-${active}`}>
        <circle cx={HUB.x + 38} cy={HUB.y - 38} r={17} />
        <path d={`M${HUB.x + 38} ${HUB.y - 47} V${HUB.y - 38} L${HUB.x + 45} ${HUB.y - 34}`} />
      </g>}
      {NODES.map((n, i) => {
        const on = step.lit.includes(n.key);
        const shown = n.logos.length ? (still ? 0 : (tick + i) % n.logos.length) : -1;
        return <g key={n.key} data-part="tile" className={`${s.tile} ${on ? s.tileOn : ''}`}>
          <rect x={n.x - TILE / 2} y={n.y - TILE / 2} width={TILE} height={TILE} rx={20} className={n.key === 'more' ? s.more : undefined} />
          {n.key === 'more'
            ? <text x={n.x} y={n.y + 11} className={s.plus}>+</text>
            : n.logos.map((l, j) => <image key={l} href={LOGO(l)} x={n.x - 22} y={n.y - 22} width={44} height={44} className={s.logo} style={{ opacity: j === shown ? 1 : 0 }} />)}
          <text x={n.x} y={n.y + TILE / 2 + 22} className={s.label}>{n.label}</text>
        </g>;
      })}
    </svg>
    {/* All three results stay mounted in one grid cell and crossfade, so the
        stage never changes height and nothing snaps. */}
    <div className={s.results} data-part="result">
      {MAP_STEPS.map((st, i) => <div key={i} className={`${s.result} ${i === active ? s.resultOn : ''}`} aria-hidden={i !== active}>
        <span className={s.icons}>{st.result.icons.map((ic) => <img key={ic} src={LOGO(ic)} alt="" />)}</span>
        <span className={s.text}>{st.result.sub && <small>{st.result.sub}</small>}{st.result.text}</span>
      </div>)}
    </div>
  </div>;
}
