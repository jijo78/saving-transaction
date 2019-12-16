import moment from 'moment';
import axios from 'axios';
import { generateUUID } from '../src/selectors/generate-uuid';
const headers = {
  Accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJQUzI1NiJ9.eyJpc3MiOiJhcGktZGVtby5zdGFybGluZ2JhbmsuY29tIiwic3ViIjoiNGRiNzE1NmQtNjE4Yi00YThiLWIyODQtZTI0MGMzMzBiYzVlIiwiZXhwIjoxNTc2NTI5MjY2LCJpYXQiOjE1NzY0NDI4NjYsInNjb3BlIjoiYWNjb3VudC1ob2xkZXItbmFtZTpyZWFkIGFjY291bnQtaG9sZGVyLXR5cGU6cmVhZCBhY2NvdW50LWlkZW50aWZpZXI6cmVhZCBhY2NvdW50LWxpc3Q6cmVhZCBhY2NvdW50OnJlYWQgYWRkcmVzczplZGl0IGFkZHJlc3M6cmVhZCBhdHRhY2htZW50OnJlYWQgYXR0YWNobWVudDp3cml0ZSBhdXRob3Jpc2luZy1pbmRpdmlkdWFsOnJlYWQgYmFsYW5jZTpyZWFkIGNhcmQtY29udHJvbDplZGl0IGNhcmQ6cmVhZCBjb25maXJtYXRpb24tb2YtZnVuZHM6cmVhZCBjdXN0b21lcjpyZWFkIGVtYWlsOmVkaXQgbWFuZGF0ZTpkZWxldGUgbWFuZGF0ZTpyZWFkIG1hcmtldGluZy1wcmVmZXJlbmNlczpyZWFkIG1hcmtldGluZy1wcmVmZXJlbmNlczp3cml0ZSBtYXJrZXRwbGFjZS1pbnRlZ3JhdGlvbjpyZWFkIG1hcmtldHBsYWNlLWludGVncmF0aW9uOndyaXRlIG1lcmNoYW50OnJlYWQgbWV0YWRhdGE6Y3JlYXRlIG1ldGFkYXRhOmVkaXQgcGF5ZWU6Y3JlYXRlIHBheWVlOmRlbGV0ZSBwYXllZTplZGl0IHBheWVlLWltYWdlOnJlYWQgcGF5ZWU6cmVhZCBwYXktbG9jYWw6Y3JlYXRlIHBheS1sb2NhbC1vbmNlOmNyZWF0ZSBwYXktbG9jYWw6cmVhZCBwcm9maWxlLWltYWdlOmVkaXQgcHJvZmlsZS1pbWFnZTpyZWFkIHJlY2VpcHQ6cmVhZCByZWNlaXB0czpyZWFkIHJlY2VpcHQ6d3JpdGUgc2F2aW5ncy1nb2FsOmNyZWF0ZSBzYXZpbmdzLWdvYWw6ZGVsZXRlIHNhdmluZ3MtZ29hbDpyZWFkIHNhdmluZ3MtZ29hbC10cmFuc2ZlcjpjcmVhdGUgc2F2aW5ncy1nb2FsLXRyYW5zZmVyOmRlbGV0ZSBzYXZpbmdzLWdvYWwtdHJhbnNmZXI6cmVhZCBzdGFuZGluZy1vcmRlcjpjcmVhdGUgc3RhbmRpbmctb3JkZXI6ZGVsZXRlIHN0YW5kaW5nLW9yZGVyOnJlYWQgc3RhdGVtZW50LWNzdjpyZWFkIHN0YXRlbWVudC1wZGY6cmVhZCB0cmFuc2FjdGlvbjplZGl0IHRyYW5zYWN0aW9uOnJlYWQiLCJhY2NvdW50SG9sZGVyVWlkIjoiOTczNjQxOWYtNTgzNi00NjQ2LWE1NjUtZThlMmUzZGYzMWZmIiwidG9rZW5VaWQiOiJlOGZmOGM4My00MWU5LTQ0ZjMtYmU0ZS1hOWMwM2NmYzUyMTUiLCJhcGlBY2Nlc3NVaWQiOiI3YTUzMjgwMi0xZTJkLTQ1ZDgtYjU2NS01NDljMzBjN2M2YjEifQ.kPxhqMssBkWj6B0J9w2f4O2gM5oOf6A7-jc7BQ51uBBsHwlTlF3zB4ZyZCC3vU1XQdEH3tD44fFLBiL_CtuTyHpQW9CM7_NBRCnNWVv2JpvaclG6QGvMfUsRLhzcI_qf9PW6LQGyHnkF7lGqFlfUMS-XR-Dd3q-A1uhCaVdX67az4QU1mxuBzGwxYeaQlQYEczC8WfoomiMCa2_Ay73ekFChT4x1n3izmZ1hJQ7YOaSnKMeyVEnIlr1OD3vHrD5NON9o0h--bVx-f79nj0lom204RCau9In8_Mu8po05uwgvOra0Dfotc3cd4Z6T_BsFpRElyN1vynoJrFI5FRqfvswOO4ik9U6UzMQD8IBpIKdG7WFQl81w2N4sb2aX7OrBS0zmVje_wBpHM8DnYu8m_whj1wOZlh6hg-vpF3IDhHcw6Qzttjdd04eeeOyGuUV53Cf8jNlq9QLhMJTnghqp1wUA7Q47JkzlVzeETzIL_6N5Wgd68foKJT1RJ-xxDvuvbDwAUr2eCjD-FWDlb73aENMvYBSatky2RqRJZaru6RE8AeR0S-yb4iT4ByPqT9XVUVWt3QNnCqumwvGaECgrkybRsg4b44WcHlxWsCca_ve4s99Ao4KvHOs1YaCbXjpBgBHDk1un8skG3rYAFu4Im_1LwRpF8rxFMR79vC1vlF4',
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
