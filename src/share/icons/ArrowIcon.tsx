export interface ArrowIconProps {
  direction?: "left" | "right" | "bottom" | "top";
  color?: string;
  size?: number;
}

const transformCases = {
  left: {},
  top: { transform: "rotate(90deg)" },
  right: { transform: "rotate(180deg)" },
  bottom: { transform: "rotate(270deg)" },
};

export const ArrowIcon = (props: ArrowIconProps) => {
  const { direction, color, size } = props;
  const fill = color ? color : "#707070";
  const dir = direction ? direction : "left";
  const width = size ? 10 * size : 10;
  const height = size ? 8 * size : 8;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 8"
      fill="none"
      style={transformCases[dir]}
    >
      <path d="M4.20218 0.1875L0.37793 3.99925L4.20218 7.81106" stroke={fill} />
      <path d="M0.376953 4H10.0019" stroke={fill} />
    </svg>
  );
};
