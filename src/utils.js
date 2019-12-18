import moment from 'moment';
import axios from 'axios';
import { generateUUID } from '../src/selectors/generate-uuid';

const headers = {
  Accept: 'application/json',
  Authorization: 'Bearer YOUR NEW TOKEN HERE',
  type: 'application/json'
};

const today = moment().format();
const oneWeek = moment()
  .add(7, 'd')
  .format();

export const getAccounts = () =>
  axios.get('/api/v2/accounts', {
    headers
  });

export const getTransactionsForAccount = account =>
  axios({
    url: `/api/v2/feed/account/${account.accountUid}/category/${account.defaultCategory}/?minTransactionTimestamp=${today}&maxTransactionTimestamp=${oneWeek}`,
    method: 'GET',
    headers
  });

export const openNewAccount = accountId =>
  axios({
    url: `/api/v2/account/${accountId}/savings-goals`,
    method: 'PUT',
    headers,
    data: {
      name: 'Trip to Australia',
      currency: 'GBP',
      target: {
        currency: 'GBP',
        minorUnits: 11223344
      },
      base64EncodedPhoto: 'string'
    }
  }).then(res => res.data.savingsGoalUid);

export const saveToSavingGoal = async (accountId, amountSaved) => {
  const goalId = await openNewAccount(accountId);
  return axios({
    url: `/api/v2/account/${accountId}/savings-goals/${goalId}/add-money/${generateUUID()}`,
    method: 'PUT',
    headers,
    data: {
      amount: {
        currency: 'GBP',
        minorUnits: amountSaved * 100
      }
    }
  });
};
