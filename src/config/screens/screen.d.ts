export type ScreenItem = {
 type: string;
 id: string;
 title: string;
 description?: string;
 name?: string;
 links?: string | string[];
 forms?: string | string[];
 checkboxes?: string | string[];
 textareas?: string | string[];
 panels?: string[];
 continueButtonEnabled?: boolean;
 lensColorFilterIsEnabled?: boolean;
 isCheckboxesScreen?: boolean;
 finishScreen?: boolean;
 lensColorRange?: boolean;
};
