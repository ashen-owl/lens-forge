import ReactCompareImage from "react-compare-image";
import { assetUrl } from "../../api/config";

export const ImageDiffSlider = () => {
  const beforeImage = assetUrl("images/without_filter.svg");
  const afterImage = assetUrl("images/with_filter.svg");

  return (
    <ReactCompareImage
      leftImage={beforeImage}
      rightImage={afterImage}
      sliderPositionPercentage={0.5}
    />
  );
};
