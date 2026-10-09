import './ImageHero.css';

// Full-width photo hero with a dark overlay and content anchored bottom-left.
export default function ImageHero({ image, imagePos = 'center', gradient = false, children }) {
  return (
    <section className="image-hero" style={{ backgroundImage: `url('${image}')`, backgroundPosition: imagePos }}>
      <div className={gradient ? 'image-hero__shade image-hero__shade--gradient' : 'image-hero__shade'} />
      <div className="container image-hero__content">{children}</div>
    </section>
  );
}
