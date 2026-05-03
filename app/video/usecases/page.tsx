"use client";

import { Stage, useScene } from "@/components/video/Stage";
import {
  UseCasesScene,
  USECASES_BACKGROUND,
  USECASES_DURATION_MS,
} from "@/components/video/scenes/UseCasesScene";

export default function UseCasesPage() {
  return (
    <Stage background="#FFFFFF" durationMs={USECASES_DURATION_MS}>
      <UseCasesFromClock />
    </Stage>
  );
}

function UseCasesFromClock() {
  const { elapsedMs } = useScene();
  return <UseCasesScene t={elapsedMs / 1000} />;
}
