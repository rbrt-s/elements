import { defineCustomElements } from '@inovex/elements/dist/loader';  // must be replaced with '../loader' when copied
                                                                      // => is done in core/scripts/postbuild.sh
import { Components } from '@inovex/elements';
import { createReactComponent } from './createComponent';

defineCustomElements(window);

//
// Export all the elements we have. This is THE react wrapper.
//

export const InoButton = createReactComponent<Components.InoButtonAttributes, HTMLInoButtonElement>('ino-button');
export const InoCard = createReactComponent<Components.InoCardAttributes, HTMLInoCardElement>('ino-card');
export const InoCheckbox = createReactComponent<Components.InoCheckboxAttributes, HTMLInoCheckboxElement>('ino-checkbox');
export const InoChip = createReactComponent<Components.InoChipAttributes, HTMLInoChipElement>('ino-chip');
export const InoChipSet = createReactComponent<Components.InoChipSetAttributes, HTMLInoChipSetElement>('ino-chip-set');
export const InoDatepicker = createReactComponent<Components.InoDatepickerAttributes, HTMLInoDatepickerElement>('ino-datepicker');
export const InoFab = createReactComponent<Components.InoFabAttributes, HTMLInoFabElement>('ino-fab');
export const InoFabSet = createReactComponent<Components.InoFabSetAttributes, HTMLInoFabSetElement>('ino-fab-set');
export const InoFormRow = createReactComponent<Components.InoFormRowAttributes, HTMLInoFormRowElement>('ino-form-row');
export const InoIcon = createReactComponent<Components.InoIconAttributes, HTMLInoIconElement>('ino-icon');
export const InoIconButton = createReactComponent<Components.InoIconButtonAttributes, HTMLInoIconButtonElement>('ino-icon-button');
export const InoImg = createReactComponent<Components.InoImgAttributes, HTMLInoImgElement>('ino-img');
export const InoInput = createReactComponent<Components.InoInputAttributes, HTMLInoInputElement>('ino-input');
export const InoInputFile = createReactComponent<Components.InoInputFileAttributes, HTMLInoInputFileElement>('ino-input-file');
export const InoList = createReactComponent<Components.InoListAttributes, HTMLInoListElement>('ino-list');
export const InoListDivider = createReactComponent<Components.InoListDividerAttributes, HTMLInoListDividerElement>('ino-list-divider');
export const InoListItem = createReactComponent<Components.InoListItemAttributes, HTMLInoListItemElement>('ino-list-item');
export const InoMenu = createReactComponent<Components.InoMenuAttributes, HTMLInoMenuElement>('ino-menu');
export const InoPopover = createReactComponent<Components.InoPopoverAttributes, HTMLInoPopoverElement>('ino-popover');
export const InoRadio = createReactComponent<Components.InoRadioAttributes, HTMLInoRadioElement>('ino-radio');
export const InoRange = createReactComponent<Components.InoRangeAttributes, HTMLInoRangeElement>('ino-range');
export const InoSelect = createReactComponent<Components.InoSelectAttributes, HTMLInoSelectElement>('ino-select');
export const InoSnackbar = createReactComponent<Components.InoSnackbarAttributes, HTMLInoSnackbarElement>('ino-snackbar');
export const InoSpinner = createReactComponent<Components.InoSpinnerAttributes, HTMLInoSpinnerElement>('ino-spinner');
export const InoTab = createReactComponent<Components.InoTabAttributes, HTMLInoTabElement>('ino-tab');
export const InoTabBar = createReactComponent<Components.InoTabBarAttributes, HTMLInoTabBarElement>('ino-tab-bar');
export const InoTextarea = createReactComponent<Components.InoTextareaAttributes, HTMLInoTextareaElement>('ino-textarea');
export const InoTooltip = createReactComponent<Components.InoTooltipAttributes, HTMLInoTooltipElement>('ino-tooltip');
