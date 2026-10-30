import { Card, Space, Switch } from "antd";
import getPanelItemById from "../../config/panels/getPanelItem";
import { PanelItem } from "../../config/panels/panel";
import { LensPowerForm } from "../Forms/LensPowerForm";
import { useScreen } from "./useScreen";
import { Colors } from "../Colors/Colors";
import { BackButton } from "../Buttons/BackButton/BackButton";
import { ContinueButton } from "../Buttons/ContinueButton/ContinueButton";
import { useChecker } from "../../helpers/useChecker";
import { FinishScreen } from "../FinishScreen/FinishScreen";
import { panelsSelector } from "../../store/panels/selectors";
import { RxForm } from "../Forms/RxForm";
import { useSelector } from "../../store";
import { SunglassesPolarizedLensesModal } from "../Modals/SunglassesPolarizedLensesModal";
import { UploadPrescriptionPhotoScreen } from "./UploadPrescriptionPhotoScreen";
import { useBackendResponseAnalyzer } from "../../helpers/useBackendResponseAnalyzer";
import { PanelPopupHelper } from "../PanelPopupHelper/PanelPopupHelper";
import { LensesPopup } from "../LensesPopup/LensesPopup";
import { useState } from "react";
import { TooltipIcon } from "../../share/icons/TooltipIcon";
import { InfoPopups } from "../Modals/InfoPopup";
import { productDataSelector } from "../../store/product/selectors";
import { formatPrice } from "../../helpers/formatPrice";
import { assetUrl } from "../../api/config";

export const Screen = () => {
 const {
  activeScreenInfo,
  isUpload,
  isLensPowerForms,
  isFillOnlinePrescriptionForm,
  activeStepValue,
  history,
  blueLightCoatingIncluded,
  switchElementsValues,
  handlePanelToggle,
  updateStateAndStoreForCoatings,
  handleClickToSwitchPanel,
 } = useScreen();
 const { disablePanelChecker } = useChecker();
 const { activePanel, lensUpgrades } = useSelector(panelsSelector);
 const { data, findPanelPriceFromData } = useBackendResponseAnalyzer();
 const product = useSelector(productDataSelector);
 const currency = product?.currency ?? "USD";
 const [activePopup, setActivePopup] = useState<string | null>(null);
 const [activeInfoPopup, setActiveInfoPopup] = useState<string | null>(null);
 const handlePanelClick = (panelId: string) => {
  setActivePopup(panelId);
 };
 const openInfoPopup = (panelId: string) => {
  setActiveInfoPopup(panelId);
 };

 const updateChecker = (id: string, value: boolean) => {
  switchElementsValues[id] = value;
  updateStateAndStoreForCoatings(id, value);
 };

 const [
  isSunglassesPolarizedLensesModalOpen,
  setIsSunglassesPolarizedLensesModalOpen,
 ] = useState<boolean>(false);

 const closeSunglassesPolarizedLensesModalModal: () => void = () => {
  setIsSunglassesPolarizedLensesModalOpen(false);
 };

 return data ? (
  <div className={`lensforge_screen screen-title__${activeScreenInfo?.id}`}>
   {activeStepValue > 0 && <BackButton />}

   <h2 className={`title`}>{activeScreenInfo?.title}</h2>

   {activeScreenInfo?.description && (
    <p className="screen_description">{activeScreenInfo?.description}</p>
   )}

   {activeScreenInfo?.panels && (
    <Space direction="vertical" size={16}>
     {activeScreenInfo?.panels.map((panelID, index) => {
      const panel = getPanelItemById(panelID) as PanelItem;

      if (disablePanelChecker(panel.disabledFor, history)) {
       return <></>;
      }

      if (panel.switchElement) {
       switchElementsValues[panel.id] = lensUpgrades.includes(panel.id)
        ? true
        : false;
      }

      const isActivePanel = activePanel === panel.id;

      return (
       <Card
        hoverable
        className={`panel ${isActivePanel ? "ant-card-active" : ""} ${
         panel.disabled ||
         (blueLightCoatingIncluded && panel.id === "blueLightBlockingLenses")
          ? "disabled"
          : ""
        }`}
        onClick={(e) => {
         handlePanelToggle(e, panel);
         panel.switchElement && handleClickToSwitchPanel(e, panel.id);
        }}
        key={`main-card-${panel.id}-${index}`}
       >
        <div className="panel-content">
         {panel.iconCoating && (
          <img
           src={assetUrl(`images/${panel.id}-icon.svg`)}
           alt={panel.title}
          />
         )}

         <div className="panel-title-clue">
          {panel.iconBefore && (
           <img
            src={assetUrl(`images/${panel.id}-icon.svg`)}
            alt={panel.title}
           />
          )}

          <div>
           <h5>{panel.title}</h5>
           {panel.descriptionHelp && (
            <span className="tooltip-helper">
             <PanelPopupHelper
              id={panel.id}
              descHelp={panel.descriptionHelp}
              title={panel.title}
              descHelpTitle={panel.descHelpTitle}
             />
            </span>
           )}

           {panel.tooltipPopup && (
            <>
             {isSunglassesPolarizedLensesModalOpen && (
              <SunglassesPolarizedLensesModal
               closeModal={closeSunglassesPolarizedLensesModalModal}
              />
             )}
             <button
              onClick={() => {
               setIsSunglassesPolarizedLensesModalOpen(true);
              }}
             >
              <TooltipIcon />
             </button>
            </>
           )}

           {panel.InfoPopup && (
            <div className="tooltip-helper">
             <button
              onClick={(e) => {
               e.stopPropagation();
               openInfoPopup(panel.id);
              }}
             >
              <TooltipIcon />
             </button>
            </div>
           )}
          </div>

          {panel.iconCoating && (
           <p className="panel-description">{panel.description}</p>
          )}
          {panel.iconBefore && (
           <div className="panel__color_price">
            {findPanelPriceFromData(data, panel.id) !== null && (
             <div className="panel_price">
              <span className="panel_price__item">
               +{formatPrice(findPanelPriceFromData(data, panel.id) ?? 0, currency)}
              </span>
             </div>
            )}

            {panel.colors && (
             <Colors
              key={`colors-${panel.id}-${index}`}
              colorList={panel.colors}
              isActivePanel={isActivePanel}
              panelID={panel.id}
             />
            )}

            {panel.switchElement && (
             <Switch
              checked={switchElementsValues[panel.id] || false}
              disabled={
               blueLightCoatingIncluded &&
               panel.id === "blueLightBlockingLenses"
                ? true
                : false
              }
              defaultChecked={
               lensUpgrades.includes(panel.id) ? true : undefined
              }
              onChange={(checked, event) => {
               event.stopPropagation();
               updateStateAndStoreForCoatings(panel.id, checked);
              }}
             />
            )}
           </div>
          )}

          {panel.lensIndex && (
           <div className="tooltip-helper">
            <button
             onClick={() => {
              handlePanelClick(panel.id);
             }}
            >
             <TooltipIcon />
            </button>
           </div>
          )}

          {activeInfoPopup === panel.id && (
           <InfoPopups
            updateChecker={updateChecker}
            id={panel.id}
            closeModal={() => {
             setActiveInfoPopup(null);
            }}
           />
          )}

          {activePopup === panel.id && (
           <LensesPopup
            id={panel.id}
            closeModal={() => {
             setActivePopup(null);
            }}
           />
          )}
         </div>

         {panel.iconBefore && <span className="panelDevider"></span>}

         {panel.iconCoating ? null : (
          <p className="panel-description">{panel.description}</p>
         )}

         {panel.label && <span className="panel_label">{panel.label}</span>}
        </div>

        {panel.iconBefore ? null : panel.iconAfter ? (
         <div>
          <img
           src={assetUrl(`images/${panel.id}-icon.svg`)}
           alt={panel.title}
          />
         </div>
        ) : (
         <div className="panel__color_price">
          {findPanelPriceFromData(data, panel.id) !== null && (
           <div className="panel_price">
            <span className="panel_price__item">
             +{formatPrice(findPanelPriceFromData(data, panel.id) ?? 0, currency)}
            </span>
           </div>
          )}

          {panel.colors && (
           <Colors
            key={`colors-${panel.id}-${index}`}
            colorList={panel.colors}
            isActivePanel={isActivePanel}
            panelID={panel.id}
           />
          )}

          {panel.switchElement && (
           <Switch
            checked={switchElementsValues[panel.id] || false}
            disabled={
             blueLightCoatingIncluded && panel.id === "blueLightBlockingLenses"
              ? true
              : false
            }
            defaultChecked={lensUpgrades.includes(panel.id) ? true : undefined}
            onChange={(checked, event) => {
             event.stopPropagation();
             updateStateAndStoreForCoatings(panel.id, checked);
            }}
           />
          )}
         </div>
        )}
       </Card>
      );
     })}
    </Space>
   )}

   {isFillOnlinePrescriptionForm && <RxForm />}

   {isLensPowerForms && <LensPowerForm />}

   {isUpload && <UploadPrescriptionPhotoScreen />}

   {activeScreenInfo?.id === "finish" && <FinishScreen />}

   {activeScreenInfo?.continueButtonEnabled && <ContinueButton />}
  </div>
 ) : null;
}