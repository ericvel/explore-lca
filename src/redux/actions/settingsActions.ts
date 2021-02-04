import { SET_EE_METRIC, EEMetricActionTypes, } from './types';

const setEEMetric = (eeMetric: IEEMetricData): EEMetricActionTypes => {
    return {
        type: SET_EE_METRIC,
        name: eeMetric.name,
        checked: eeMetric.checked
    }
}

export default {
    setEEMetric,
}