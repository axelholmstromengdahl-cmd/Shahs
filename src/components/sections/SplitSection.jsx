import './SplitSection.css';

// Half image, half content. The image bleeds to the page edge and fills the full section height.
// tone: 'white' | 'red'. mediaLeft puts the image on the left; tall uses the taller page-section height.
export default function SplitSection({ image, imagePos = 'center', mediaLeft = false, tone = 'white', tall = false, id, children }) {
  const cls = ['split', mediaLeft ? 'split--media-left' : '', tone === 'red' ? 'split--red' : '', tall ? 'split--tall' : ''].join(' ');
  return (
    <section id={id} className={cls}>
      <div className="split__media" style={{ backgroundImage: `url('${image}')`, backgroundPosition: imagePos }} />
      <div className="split__body">
        <div className="split__content">{children}</div>
      </div>
    </section>
  );
}
