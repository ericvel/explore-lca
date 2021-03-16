import { SET_EE_METRIC, EEMetricActionTypes } from "../actions/types";

const initialEEMetric: IEEMetric = {
  perSqM: false,
  perYear: false,
};

export const EEMetric = (
  state = initialEEMetric,
  action: EEMetricActionTypes
) => {
  switch (action.type) {
    case SET_EE_METRIC:
      return { ...state, [action.name]: action.checked };
    default:
      return state;
  }
};
