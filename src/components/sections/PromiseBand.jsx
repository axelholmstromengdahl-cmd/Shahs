import './PromiseBand.css';

export default function PromiseBand() {
  return (
    <section className="promise">
      <span className="eyebrow" data-reveal="0">Löftet</span>
      <div className="promise__lines" data-reveal="1">
        <span>Gjort snabbt.</span><span>Gjort rent.</span><span>Gjort rätt.</span>
      </div>
      <span className="promise__badge" data-reveal="2">100 procent halal. Alltid.</span>
    </section>
  );
}
