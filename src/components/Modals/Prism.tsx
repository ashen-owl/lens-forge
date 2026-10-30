import { useState } from "react";
import { useScreen } from "../Screen/useScreen";
import { useScreenRedirect } from "../../helpers/useScreenRedirect";
import getFormItemById from "../../config/forms/getFormItem";
import { useBackendResponseAnalyzer } from "../../helpers/useBackendResponseAnalyzer";
import { useSelector } from "../../store";
import { productDataSelector } from "../../store/product/selectors";
import { formatPrice } from "../../helpers/formatPrice";
import { assetUrl } from "../../api/config";

interface ModalProps {
  closeModal: () => void;
}

export const Prism: React.FC<ModalProps> = ({ closeModal }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { updateHistory } = useScreen();
  const { screenRedirect } = useScreenRedirect();
  const { data, findPanelPriceFromData } = useBackendResponseAnalyzer();
  const product = useSelector(productDataSelector);
  const uploadPhotoForm = getFormItemById("uploadImageForm");
  const prismPrice = findPanelPriceFromData(data, "prism");
  const currency = product?.currency ?? "USD";

  function redirectToNextScreenByFormButton() {
    if (uploadPhotoForm) {
      updateHistory(uploadPhotoForm.id);
      uploadPhotoForm?.redirectTo && screenRedirect(uploadPhotoForm.redirectTo);
    }
  }

  return (
    <div className="lensforge-modal prism">
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

        {showUploadForm ? (
          <article className="lensforge-modal__article">
            <aside className="lensforge-modal__prism-form_aside">
              <h5>Upload your prescription.</h5>
              <p>Your order will be processed only after uploading.</p>
              <div className="lensforge-modal__prism-form_upload-wrap">
                <div className="prism-upload-placeholder">
                  <p>
                    Use the upload step in the main flow to attach a PDF or a
                    photo of your prescription.
                  </p>
                </div>
              </div>
            </aside>

            <section className="lensforge-modal__body">
              <header>
                <h5>Upload prescription</h5>
              </header>
              <main>
                <span>
                  Orders with prism require a copy of your prescription. You
                  can upload it now, or send it after completing your order.
                </span>
              </main>
              <footer>
                <div>
                  <div>
                    <button
                      className="button submit-button"
                      onClick={() => redirectToNextScreenByFormButton()}
                    >
                      Continue
                    </button>
                  </div>
                  <div>
                    <button
                      className="button button-sec send-later-button"
                      onClick={() => {
                        closeModal();
                        setShowUploadForm(false);
                        redirectToNextScreenByFormButton();
                      }}
                    >
                      Send Later
                    </button>
                  </div>
                </div>
              </footer>
            </section>
          </article>
        ) : (
          <article className="lensforge-modal__article">
            <aside>
              <img
                alt="A lens with prism correction"
                src={assetUrl("images/prism-illustration.svg")}
                className="prism-illustration"
              />
            </aside>
            <section className="lensforge-modal__body">
              <header>
                <h5>
                  Prism
                  {prismPrice !== null && (
                    <span>
                      &nbsp; ({formatPrice(prismPrice, currency)})
                    </span>
                  )}
                </h5>
              </header>
              <main>
                <span className="main">
                  Prism correction helps when a person sees double images or
                  experiences visual displacement.
                </span>
                <span>
                  &nbsp;Add prism only if it is written in your prescription.
                  If you add it, send us a copy of your prescription after
                  completing your order.
                </span>
              </main>
              <footer>
                <button
                  className="button lensforge__next"
                  onClick={() => {
                    setShowUploadForm(true);
                  }}
                >
                  Add Prism
                </button>
                <button className="lensforge__back" onClick={closeModal}>
                  Back
                </button>
              </footer>
            </section>
          </article>
        )}
      </div>
    </div>
  );
};
