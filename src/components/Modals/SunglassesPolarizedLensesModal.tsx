import { ImageDiffSlider } from "../common/ImageDiffSlider";
import { assetUrl } from "../../api/config";

interface ModalProps {
  closeModal: () => void;
}
export const SunglassesPolarizedLensesModal: React.FC<ModalProps> = ({
  closeModal,
}) => {
  return (
    <div className="lensforge-modal polarized-lenses">
      <div className="lensforge-modal__wrapp">
        <button onClick={closeModal} className="lensforge-modal__close">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 16"
              className="lensforge-modal__close-icon"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1.5 14.5 8 8m6.5-6.5L8 8m6.5 6.5L8 8M1.5 1.5 8 8"
              ></path>
            </svg>
          </span>
        </button>
        <aside className="lensforge-modal__article">
          <div className="lensforge-modal__diff-slider">
            <ImageDiffSlider />
          </div>
          <section className="lensforge-modal__body">
            <h2>Polarized Sunglasses</h2>
            <p className="description_gabytA">
              Polarized sunglasses are made to block out and reduce glare
              reflecting off surfaces like water or glass. Glare distorts color
              and obstructs your vision. Polarized lenses enhance color
              definition and increase clarity outdoors.
            </p>
            <h4>Maximum clarity:</h4>
            <ul>
              <li className="lensforge-modal__li">
                <img
                  src={assetUrl("images/polarized-lenses-1.svg")}
                  alt="Maximize color definition"
                />
                <span>Maximize color definition</span>
              </li>
              <li className="lensforge-modal__li">
                <img
                  src={assetUrl("images/polarized-lenses-2.svg")}
                  alt="Eliminate glare reflections"
                />
                <span>Eliminate glare &amp; reflections</span>
              </li>
              <li className="lensforge-modal__li">
                <img
                  src={assetUrl("images/polarized-lenses-3.svg")}
                  alt="Enhance acuity"
                />
                <span>Enhance acuity &amp; clarity</span>
              </li>
              <li className="lensforge-modal__li">
                <img
                  src={assetUrl("images/polarized-lenses-4.svg")}
                  alt="Reduce eye strain"
                />
                <span>Reduce eye strain</span>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
};
