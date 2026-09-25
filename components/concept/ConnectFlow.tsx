'use client';
/**
 * How a firm connects a system, as one looping card: the lawyer types
 * "Connect <platform>", Delta answers with that platform's sign-in, the lawyer
 * signs in once on the platform's own page, and Delta checks it can actually
 * see the firm's cases before calling it connected. Each loop is a different
 * platform, because the point is that it works the same way for any of them.
 *
 * Everything is derived from one clock (t, in ms since the loop began), so a
 * frame is a pure function of time and the card never changes height.
 */
import { useEffect, useState } from 'react';
import s from './ConnectFlow.module.css';

const LOGO = (n: string) => `/concept/logos/${n}`;
export interface ConnectPlatform { name: string; logo?: string; host?: string; found: string }
const PLATFORMS: ConnectPlatform[] = [
  { name: 'Filevine', logo: 'filevine-mark.svg', host: 'app.filevine.com', found: '412 open cases found' },
  { name: 'Lead Docket', logo: 'leaddocket-mark.png', host: 'yourfirm.leaddocket.com', found: '38 open leads found' },
  { name: 'Litify', logo: 'litify-mark.png', host: 'login.salesforce.com', found: '286 open matters found' },
  { name: 'Outlook', logo: 'outlook.svg', host: 'login.microsoftonline.com', found: 'Client email found' },
];
const LOOP = 9600;
const T = { type: 150, send: 1350, reply: 1750, press: 2750, open: 3050, email: 3450, pass: 4300, signIn: 5000, close: 5300, check: 5600, done: 6700, fade: 9100 };
export const CONNECT_STEPS = ['Ask Delta to connect it', 'Sign in once, on its own page', 'Delta checks it can see your cases'];
export const stepAt = (t: number) => (t < T.reply ? 0 : t < T.check ? 1 : 2);

export function ConnectFlow({ still, running = true, onStep, platforms = PLATFORMS }: { still: boolean; running?: boolean; onStep?: (i: number) => void; platforms?: ConnectPlatform[] }) {
  const [clock, setClock] = useState(0);
  useEffect(() => {
    if (still || !running) return;
    const start = performance.now();
    const id = setInterval(() => setClock(performance.now() - start), 40);
    return () => clearInterval(id);
  }, [still, running]);
  const loop = Math.floor(clock / LOOP);
  const t = still ? T.done + 1000 : clock % LOOP;
  const p = platforms[loop % platforms.length];
  const step = stepAt(t);
  useEffect(() => { onStep?.(step); }, [step, onStep]);

  const ask = `Connect ${p.name}`;
  const typed = ask.slice(0, Math.max(0, Math.min(ask.length, Math.floor((t - T.type) / 65))));
  const email = 'you@yourfirm.com';
  const emailTyped = email.slice(0, Math.max(0, Math.min(email.length, Math.floor((t - T.email) / 40))));
  const dots = Math.max(0, Math.min(10, Math.floor((t - T.pass) / 45)));
  const on = (from: number, to = Infinity) => t >= from && t < to;

  return <div className={`${s.card} ${on(T.fade) ? s.fading : ''} ${on(T.open, T.close) ? s.modal : ''}`} aria-label={`Connecting ${p.name}: ask Delta, sign in once, Delta checks it can see your cases`} role="img">
    <div className={`${s.ask} ${on(T.send) ? s.sent : ''}`}>
      <span className={s.askText}>{on(T.send) ? ask : typed}{!on(T.send) && <i className={s.caret} />}</span>
      <span className={s.send}><svg viewBox="0 0 24 24"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" /></svg></span>
    </div>

    <div className={`${s.reply} ${on(T.reply) ? s.show : ''}`}>
      <span className={s.delta}><img src={LOGO('delta-mark-white.png')} alt="" /></span>
      <div>
        <p>Here is {p.name}&rsquo;s sign-in.</p>
        <span className={`${s.button} ${on(T.press, T.press + 220) ? s.pressed : ''}`}>{p.logo && <img src={LOGO(p.logo)} alt="" />}Sign in to {p.name}</span>
      </div>
    </div>

    <div className={`${s.result} ${on(T.check) ? s.show : ''}`}>
      <span className={`${s.status} ${on(T.done) ? s.ok : ''}`}>
        {on(T.done) ? <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg> : <i className={s.spin} />}
      </span>
      <div>
        <strong>{on(T.done) ? `Connected to ${p.name}` : `Checking ${p.name}`}</strong>
        <span>{on(T.done) ? p.found : 'Reading your cases'}</span>
      </div>
    </div>

    <div className={`${s.window} ${on(T.open, T.close) ? s.open : ''}`} aria-hidden>
      <div className={s.chrome}><i /><i /><i /><span className={s.url}><svg viewBox="0 0 24 24"><rect x="6" y="11" width="12" height="9" rx="2" /><path d="M9 11V8a3 3 0 0 1 6 0v3" /></svg>{p.host ?? `${p.name} sign-in`}</span></div>
      <div className={s.page}>
        {p.logo && <img src={LOGO(p.logo)} alt="" />}
        <b>Sign in to {p.name}</b>
        <span className={s.field}>{emailTyped || <em>Email</em>}</span>
        <span className={s.field}>{dots ? '•'.repeat(dots) : <em>Password</em>}</span>
        <span className={`${s.go} ${on(T.signIn, T.signIn + 220) ? s.pressed : ''}`}>Sign in</span>
      </div>
    </div>
  </div>;
}
