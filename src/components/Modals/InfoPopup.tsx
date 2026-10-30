import getPanelItemById from "../../config/panels/getPanelItem";
import { assetUrl } from "../../api/config";

interface ModalProps {
 closeModal: () => void;
 id: string;
 updateChecker: (id: string, value: boolean) => void; // Передача функции обновления
}

export const InfoPopups: React.FC<ModalProps> = ({
 id,
 closeModal,
 updateChecker,
}) => {
 const panel = getPanelItemById(id);

 if (!panel) {
  return <></>;
 }

 const paragraphs = panel.infoPopupText
  ? panel.infoPopupText.split("<br>")
  : [];

 return (
  <div
   className="infoPopup"
   onClick={(e) => {
    e.stopPropagation();
   }}
  >
   <div className="infoPopup-wrapper">
    <button
     onClick={(e) => {
      e.stopPropagation();
      closeModal();
     }}
    >
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
      <path
       stroke="currentColor"
       stroke-linecap="round"
       stroke-linejoin="round"
       d="M1.5 14.5 8 8m6.5-6.5L8 8m6.5 6.5L8 8M1.5 1.5 8 8"
      ></path>
     </svg>
    </button>
    <div className="infoPopup__text">
     <h3>{panel.infoPopupTitle}</h3>
     {paragraphs.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
     ))}
     <button
      onClick={(e) => {
       e.stopPropagation();
       closeModal();
       updateChecker(panel.id, true);
      }}
     >
      {panel.infoPopupButton}
     </button>
    </div>
    <div
     className="infoPopup__media"
     style={{
      backgroundImage: panel?.id
       ? `url(${assetUrl(`images/${panel.id}.svg`)})`
       : "none",
     }}
    ></div>
   </div>
  </div>
 );
};
