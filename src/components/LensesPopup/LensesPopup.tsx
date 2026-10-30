import getPanelItemById from "../../config/panels/getPanelItem";
import { LensIconReflective } from "../../share/icons/LensIconReflective";
import { LensIconScratch } from "../../share/icons/LensIconScratch";
import { LensIconUV } from "../../share/icons/LensIconUV";

interface ModalProps {
 closeModal: () => void;
 id: string;
}

export const LensesPopup: React.FC<ModalProps> = ({ id, closeModal }) => {
 const panel = getPanelItemById(id);
 if (!panel) {
  return <></>;
 }

 const lensItems = [
  {
   media: <div>{panel.lensIndex}</div>,
   title: panel.popupTitle,
   description: panel.popupText,
  },
  {
   media: (
    <div>
     <LensIconScratch />
    </div>
   ),
   title: panel.scratchTitle,
   description: panel.scratchDesc,
  },
  {
   media: (
    <div>
     <LensIconUV />
    </div>
   ),
   title: panel.UVTitle,
   description: panel.UVDesc,
  },
  {
   media: (
    <div>
     <LensIconReflective />
    </div>
   ),
   title: panel.ReflectiveTitle,
   description: panel.ReflectiveDesc,
  },
 ];

 const itemsToRender = lensItems.slice(0, panel.popupType);

 return (
  <div
   className={`lensParams lensParams-${id}`}
   onClick={(e) => {
    e.stopPropagation();
   }}
  >
   <div className="lensParams-wrapper">
    <button onClick={closeModal}>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
      <path
       stroke="currentColor"
       stroke-linecap="round"
       stroke-linejoin="round"
       d="M1.5 14.5 8 8m6.5-6.5L8 8m6.5 6.5L8 8M1.5 1.5 8 8"
      ></path>
     </svg>
    </button>
    <div className="lensParams-inner">
     <div className="lensParams-header">
      <h1>{panel.popupTitleMain}</h1>
      <p className="lensParams-desc">{panel.popupDescription}</p>
     </div>
     <div
      className={`lensParams-items ${
       panel.iconsColorYellow ? "lensParams-items--yellow" : ""
      }`}
     >
      {itemsToRender.map((item, index) => (
       <div className="lensParams-item" key={index}>
        <div className="lensParams-item__media">{item.media}</div>
        <div className="lensParams-item__text">
         <h3>{item.title}</h3>
         <p>{item.description}</p>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
};
