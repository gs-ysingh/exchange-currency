import { EXCHANGE_CURRENCY } from '../actions/types';

const exchangeCurrency = (obj) => {
  return (dispatch) => {
    dispatch({ type: EXCHANGE_CURRENCY, data: obj });
  }
};

export default exchangeCurrency;