import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  activePanelSelector,
  lastChoosenColorSelector,
} from "../../store/panels/selectors";
import getColorItemById from "../../config/colors/getColorItem";
import getPanelItemById from "../../config/panels/getPanelItem";
import { screensSelector } from "../../store/screens/selectors";
import { SunglassesPolarizedLensesModal } from "../Modals/SunglassesPolarizedLensesModal";
import { Button } from "antd";
import getScreenItemById from "../../config/screens/getScreenItem";
import { LensColorRange } from "./LensColorRange";
import { IconColor } from "../../share/icons/LensColor";
import { assetUrl } from "../../api/config";

export const LensColorFilter = () => {
  const { activeScreen } = useSelector(screensSelector);
  const foundScreen = getScreenItemById(activeScreen);
  const [
    isSunglassesPolarizedLensesModalOpen,
    setIsSunglassesPolarizedLensesModalOpen,
  ] = useState<boolean>(false);

  const [rangeValue, setRangeValue] = useState<number>(50);

  const lastColorId = useSelector(lastChoosenColorSelector);
  const activePanel = useSelector(activePanelSelector);
  let backgroundColor = "transparent";
  let colorNameTitle = "";
  const foundColor = getColorItemById(lastColorId);
  const foundActivePanel = getPanelItemById(activePanel);

  if (lastColorId && foundColor) {
    backgroundColor = foundColor?.value;
    colorNameTitle = foundColor.title;
  }

  const closeSunglassesPolarizedLensesModalModal: () => void = () => {
    setIsSunglassesPolarizedLensesModalOpen(false);
  };

  if (foundColor === undefined) {
    return <></>;
  }
  return (
    <div className="lensColorFilter">
      {foundActivePanel?.id === "polarized" && (
        <>
          {isSunglassesPolarizedLensesModalOpen && (
            <SunglassesPolarizedLensesModal
              closeModal={closeSunglassesPolarizedLensesModalModal}
            />
          )}
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              setIsSunglassesPolarizedLensesModalOpen(true);
            }}
          >
            Polarized Lens
            <img src={assetUrl("images/help.svg")} alt="Lens Filter" />
          </Button>
        </>
      )}

      <div className="lensColorFilter_image">
        <IconColor
          backgroundColor={backgroundColor || "transparent"}
          opacity={rangeValue / 100}
        />
        {foundActivePanel?.id === "mirrored" && (
          <div
            className="isMirrored"
            style={{
              backgroundImage: `url(${assetUrl("images/mirror-lens.svg")})`,
            }}
          ></div>
        )}
        <div
          className="mirroredMask"
          style={{
            background: backgroundColor || "transparent",
          }}
        ></div>
      </div>

      <div className="lensColorFilter_title">
        <p>{colorNameTitle}</p>
        {colorNameTitle && <span>{foundActivePanel?.title}</span>}
      </div>

      {foundScreen && foundScreen.lensColorRange ? (
        <LensColorRange
          max={100}
          min={1}
          railBg={backgroundColor}
          rangeValue={rangeValue}
          setRangeValue={setRangeValue}
        />
      ) : null}
    </div>
  );
};
