import axios from 'axios';
import { UPDATE_EXCHANGE_RATES } from './types';
import { apiUrl, appId } from '../constants/api'

const updateExchangeRates = () => {
  return (dispatch) => {
		axios.get(apiUrl + '?app_id=' + appId)
			.then((res) => {
				dispatch({ type: UPDATE_EXCHANGE_RATES, data: res.data });
			})
  }
};

export default updateExchangeRates;