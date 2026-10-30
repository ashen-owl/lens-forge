export type DisabledItem = {
 fromID: string[];
};

export type RedirectToItem = {
 fromScreen: string[];
 toScreen: string;
};

export type PriceItem = { value: number; fromID?: string[] };

export type PanelItem = {
 type: string;
 id: string;
 iconAfter?: boolean;
 iconBefore?: boolean;
 iconTitle?: boolean;
 popupText?: string;
 popupType?: number;
 scratchTitle?: string;
 ReflectiveTitle?: string;
 UVTitle?: string;
 UVDesc?: string;
 scratchDesc?: string;
 ReflectiveDesc?: string;
 descHelpTitle?: string;
 iconsColorYellow?: boolean;
 popupTitleMain?: string;
 popupDescription?: string;
 popupTitle?: string;
 lensIndex?: string;
 InfoPopup?: boolean;
 infoPopupTitle?: string;
 tooltipPopup?: true;
 infoPopupText?: string;
 infoPopupButton?: string;
 descriptionHelp?: string;
 iconCoating?: true;
 title: string;
 description?: string;
 skipSteps?: string[];
 tint?: string[];
 tintLevel?: boolean;
 colors?: string[];
 redirectTo: string | RedirectToItem[];
 disabledFor?: DisabledItem[];
 switchElement?: boolean;
 checked?: boolean;
 disabled?: boolean;
 label?: string;
 hidden?: true;
 lensColorFilterIsEnabled?: boolean;
};
