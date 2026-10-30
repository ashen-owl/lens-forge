import { Slider } from "antd";
import { useDispatch } from "../../store";
import { setLastChoosenTintLevel } from "../../store/panels";

const marks: {
  [key in number]: string;
} = {
  30: "30%",
  50: "50%",
  80: "80%",
};

export const TintLevel = () => {
  const dispatch = useDispatch();

  const onChangeTintValue = (value: number) => {
    dispatch(setLastChoosenTintLevel(value));
  };

  return (
    <div className="tint-levels">
      <Slider
        marks={marks}
        step={null}
        defaultValue={80}
        reverse={true}
        min={30}
        max={80}
        onChange={(val) => {
          onChangeTintValue(val);
        }}
        tooltip={{ formatter: null }}
      />
    </div>
  );
};
