'use client';
/** The homepage's system map, cycling through its three rows on its own. */
import { useEffect, useState } from 'react';
import { SystemMap, MAP_STEPS } from '@/components/concept/SystemMap';
import { useCalm } from '@/components/concept/motion';

export function HubMap() {
  const still = useCalm();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setActive((i) => (i + 1) % MAP_STEPS.length), 5000);
    return () => clearInterval(id);
  }, [still]);
  return <div data-reveal="map"><SystemMap active={active} still={still}/></div>;
}
