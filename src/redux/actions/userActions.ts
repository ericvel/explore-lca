import firebase from "firebase/app";
import {
  SET_CURRENT_USER,
  CurrentUserActionTypes,
} from "./types";

const setCurrentUser = (user: firebase.User | null): CurrentUserActionTypes => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

export default {
  setCurrentUser,
};
