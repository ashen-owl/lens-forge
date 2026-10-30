import React from "react";
import { Slider } from "antd";

interface LensColorRangeProps {
 max: number;
 min: number;
 rangeValue: number;
 railBg?: string;
 setRangeValue: (value: number) => void;
}

export const LensColorRange: React.FC<LensColorRangeProps> = (props) => {
 const { railBg, max, min, rangeValue, setRangeValue } = props;

 return (
  <div className="sliderRange-wrapper">
   <p>Indoor</p>
   <Slider
    max={max}
    min={min}
    className={"sliderRange"}
    style={{
     background: `linear-gradient(90deg, #d9d9d9 0%, ${
      railBg ? railBg : "#0f766e"
     } 100%)`,
     paddingBlock: 0,
    }}
    onChange={(value) => setRangeValue(value)}
    value={rangeValue}
    tooltip={{ open: false }}
   />
   <p>Outdoor</p>
  </div>
 );
};
