import { W } from '@/components/concept/motion';
import h from '@/components/concept/ConceptHome.module.css';
import q from './Quote.module.css';

/**
 * A testimonial: a rounded photo card on a pale band, five stars, the quote in
 * large type and the person's name. Real customers only, their own words.
 */
export function Quote({ quote, name, photo }: { quote: string; name: string; photo: string }) {
  return <section className={q.band}>
    <div className={h.container}>
      <figure className={q.card} data-reveal="zoom">
        <img className={q.photo} src={photo} alt="" aria-hidden/>
        <div className={q.shade}/>
        <div className={q.inner}>
          <div className={q.stars} data-reveal="stagger" aria-label="Five stars">{[0, 1, 2, 3, 4].map((i) => <span key={i} aria-hidden>★</span>)}</div>
          <blockquote data-reveal="words" data-delay=".2"><W>{`“${quote}”`}</W></blockquote>
          <figcaption data-reveal="up" data-delay=".6">{name}</figcaption>
        </div>
      </figure>
    </div>
  </section>;
}
