// Adapted from VengeanceUI's kinetic-text-loader registry component:
// https://github.com/Ashutoshx7/VengeanceUI
import "./kinetic-text-loader.css";

export default function KineticTextLoader() {
  return (
    <div className="portfolio-loader" role="status" aria-live="polite">
      <span className="sr-only">Loading Humais Ali's portfolio</span>
      <div className="portfolio-loader__content" aria-hidden="true">
        <span className="portfolio-loader__brand">Engineer.Humais<span>.</span></span>
        <div className="kinetic-loader">
          <span className="kinetic-loader__dot" />
          <p className="kinetic-loader__text">
            {"Loading".split("").map((letter, index) => (
              <span
                key={index}
                className={index === 0 ? "kinetic-loader__bounce" : index === 4 ? "kinetic-loader__stretch" : undefined}
              >
                {index === 4 ? "ı" : letter}
              </span>
            ))}
          </p>
        </div>
        <span className="portfolio-loader__caption">Building AI-powered web experiences</span>
      </div>
    </div>
  );
}
