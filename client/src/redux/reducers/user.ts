import firebase from "firebase/app";
import { SET_CURRENT_USER, CurrentUserActionTypes } from "../actions/types";

export const currentUser = (
  state: firebase.User | null = null,
  action: CurrentUserActionTypes
) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};
