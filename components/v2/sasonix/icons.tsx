/**
 * Inlined icon geometry.
 *
 * From Phosphor Icons (https://phosphoricons.com), MIT licensed, `fill` weight,
 * copied verbatim from the source SVGs rather than redrawn. The 256x256 viewBox
 * and the path data are theirs; only the React wrapper is ours.
 *
 * WHY NOT lucide-react, WHICH IS ALREADY A DEPENDENCY. Lucide is a 24px
 * outline set with a uniform ~2px stroke. At the 20 to 28px these render at,
 * a thin outline goes spindly and generic, which is exactly how the first pass
 * at the trust badges looked. A filled 256-unit glyph holds its shape at any
 * size and reads as a mark rather than as a line drawing.
 *
 * Lucide stays for UI affordances, where an outline is correct: the nav
 * chevron, the hero's arrow. This file is for marks that have to carry weight.
 *
 * INLINED, NOT INSTALLED. Two glyphs do not justify a dependency, and inlining
 * means no runtime cost and no version to keep in step. Copy another one in the
 * same way when a third is needed, and keep the attribution above.
 */

type IconProps = { size?: number; className?: string; style?: React.CSSProperties };

function Glyph({ size = 24, className, style, d }: IconProps & { d: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={className}
      style={style}
    >
      <path d={d} />
    </svg>
  );
}

/**
 * A scalloped seal with a check in it. The seal is the shape a reader already
 * associates with "this was verified by somebody", which is what a compliance
 * claim is asking them to accept.
 */
export function SealCheck(props: IconProps) {
  return (
    <Glyph
      {...props}
      d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"
    />
  );
}

/**
 * A padlock with a keyhole. Chosen over a crossed-out eye for "never used to
 * train a model": a slashed glyph reads as an error state, and this band's whole
 * job is to reassure. A lock says the data stays shut without the negative.
 */
export function LockKey(props: IconProps) {
  return (
    <Glyph
      {...props}
      d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-72,78.63V184a8,8,0,0,1-16,0V158.63a24,24,0,1,1,16,0ZM160,80H96V56a32,32,0,0,1,64,0Z"
    />
  );
}
