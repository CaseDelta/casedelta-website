"use client";

import { Stage, useScene } from "@/components/video/Stage";
import {
  DreamScene,
  DREAM_DURATION_MS,
} from "@/components/video/scenes/DreamScene";
import {
  SolutionScene,
  SOLUTION_DURATION_MS,
} from "@/components/video/scenes/SolutionScene";
import {
  DemoScene,
  DEMO_DURATION_MS,
} from "@/components/video/scenes/DemoScene";
import {
  UseCasesScene,
  USECASES_DURATION_MS,
} from "@/components/video/scenes/UseCasesScene";
import {
  OutroScene,
  OUTRO_DURATION_MS,
} from "@/components/video/scenes/OutroScene";

/* Full-sequence playback. Refresh to replay, SPACE to restart.
 *
 * Each scene runs back-to-back, with a 0.4s crossfade at every boundary
 * so the background transition is smooth. As more scenes are built they
 * slot into the SCENES array in script order and the master clock grows
 * automatically.
 */

const FADE_S = 0.4;

type SceneEntry = {
  id: string;
  durationMs: number;
  render: (t: number) => React.ReactNode;
};

const SCENES: SceneEntry[] = [
  { id: "dream",    durationMs: DREAM_DURATION_MS,    render: (t) => <DreamScene t={t} /> },
  { id: "solution", durationMs: SOLUTION_DURATION_MS, render: (t) => <SolutionScene t={t} /> },
  { id: "demo",     durationMs: DEMO_DURATION_MS,     render: (t) => <DemoScene t={t} /> },
  { id: "usecases", durationMs: USECASES_DURATION_MS, render: (t) => <UseCasesScene t={t} /> },
  { id: "outro",    durationMs: OUTRO_DURATION_MS,    render: (t) => <OutroScene t={t} /> },
];

const SCENE_WINDOWS = SCENES.reduce<
  { id: string; start: number; end: number; render: (t: number) => React.ReactNode }[]
>((acc, scene) => {
  const start = acc.length === 0 ? 0 : acc[acc.length - 1].end;
  const end = start + scene.durationMs / 1000;
  return [...acc, { id: scene.id, start, end, render: scene.render }];
}, []);

const TOTAL_MS = SCENES.reduce((sum, s) => sum + s.durationMs, 0);

function computeOpacity(masterT: number, start: number, end: number): number {
  if (masterT < start - FADE_S) return 0;
  if (masterT < start) return (masterT - (start - FADE_S)) / FADE_S;
  if (masterT < end) return 1;
  if (masterT < end + FADE_S) return 1 - (masterT - end) / FADE_S;
  return 0;
}

export default function PlayPage() {
  /* Stage background is what bleeds through during the 0.4s crossfades between
   * scenes. Currently white to match the ATMOSPHERICS-OFF state of every scene
   * — flip to "#000" when the atmospheric landscapes are restored. */
  return (
    <Stage background="#FFFFFF" durationMs={TOTAL_MS}>
      <Sequence />
    </Stage>
  );
}

function Sequence() {
  const { elapsedMs } = useScene();
  const masterT = elapsedMs / 1000;

  return (
    <>
      {SCENE_WINDOWS.map((w) => {
        const opacity = computeOpacity(masterT, w.start, w.end);
        if (opacity <= 0) return null;
        const localT = masterT - w.start;
        return (
          <div
            key={w.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity,
            }}
          >
            {w.render(localT)}
          </div>
        );
      })}
    </>
  );
}
