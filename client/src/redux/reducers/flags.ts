import {
  ToggleCompareDialogOpenAction,
  TOGGLE_COMPARE_DIALOG_OPEN,
} from "../actions/types";

export const isCompareDialogOpen = (
  state = false,
  action: ToggleCompareDialogOpenAction
) => {
  switch (action.type) {
    case TOGGLE_COMPARE_DIALOG_OPEN:
      return !state;
    default:
      return state;
  }
};
