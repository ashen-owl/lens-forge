import { Tooltip } from "antd";
import { assetUrl } from "../../api/config";
type PanelPopupHelperType = {
 descHelp: string;
 id: string;
 title: string;
 descHelpTitle?: string;
};
export const PanelPopupHelper = ({
 descHelp,
 descHelpTitle,
 id,
 title,
}: PanelPopupHelperType) => {
 const text = descHelpTitle ? (
  <div>
   <h3>{descHelpTitle}</h3>
   <p>{descHelp}</p>
  </div>
 ) : (
  <div>
   <p>{descHelp}</p>
   <img src={assetUrl(`images/${id}.svg`)} alt={title} />
  </div>
 );

 const handleClick = (e: React.MouseEvent) => {
  e.stopPropagation();
 };

 return (
  <Tooltip
   overlayClassName="tooltipHelper"
   placement="bottom"
   title={text}
   trigger="click"
  >
   <svg
    onClick={handleClick}
    width="14"
    height="14"
    className="tooltipPrior"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
   >
    <rect x="0.5" y="0.5" width="13" height="13" rx="6.5" stroke="#7D7D7D" />
    <path
     d="M7.25206 2.86C7.9854 2.86 8.57206 3.058 9.01206 3.454C9.45206 3.85 9.67206 4.4 9.67206 5.104C9.67206 5.86667 9.43373 6.44233 8.95706 6.831C8.48773 7.21233 7.84606 7.41033 7.03206 7.425V8.635H5.84406V6.589H6.37206C7.01006 6.589 7.5124 6.48633 7.87906 6.281C8.24573 6.06833 8.42906 5.67967 8.42906 5.115C8.42906 4.73367 8.31906 4.43667 8.09906 4.224C7.87906 4.004 7.58206 3.894 7.20806 3.894C6.81206 3.894 6.49306 4.00767 6.25106 4.235C6.00906 4.46233 5.88806 4.75933 5.88806 5.126H4.68906C4.68173 4.686 4.78073 4.29733 4.98606 3.96C5.1914 3.61533 5.4884 3.34767 5.87706 3.157C6.26573 2.959 6.72406 2.86 7.25206 2.86ZM7.16406 9.614V11H5.73406V9.614H7.16406Z"
     fill="#7D7D7D"
    />
   </svg>
  </Tooltip>
 );
};
