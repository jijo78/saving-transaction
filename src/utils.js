import moment from 'moment';
import axios from 'axios';
import { generateUUID } from '../src/selectors/generate-uuid';

const headers = {
  Accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJQUzI1NiJ9.eyJpc3MiOiJhcGktZGVtby5zdGFybGluZ2JhbmsuY29tIiwic3ViIjoiNGRiNzE1NmQtNjE4Yi00YThiLWIyODQtZTI0MGMzMzBiYzVlIiwiZXhwIjoxNTc2NzQ5NjQ2LCJpYXQiOjE1NzY2NjMyNDYsInNjb3BlIjoiYWNjb3VudC1ob2xkZXItbmFtZTpyZWFkIGFjY291bnQtaG9sZGVyLXR5cGU6cmVhZCBhY2NvdW50LWlkZW50aWZpZXI6cmVhZCBhY2NvdW50LWxpc3Q6cmVhZCBhY2NvdW50OnJlYWQgYWRkcmVzczplZGl0IGFkZHJlc3M6cmVhZCBhdHRhY2htZW50OnJlYWQgYXR0YWNobWVudDp3cml0ZSBhdXRob3Jpc2luZy1pbmRpdmlkdWFsOnJlYWQgYmFsYW5jZTpyZWFkIGNhcmQtY29udHJvbDplZGl0IGNhcmQ6cmVhZCBjb25maXJtYXRpb24tb2YtZnVuZHM6cmVhZCBjdXN0b21lcjpyZWFkIGVtYWlsOmVkaXQgbWFuZGF0ZTpkZWxldGUgbWFuZGF0ZTpyZWFkIG1hcmtldGluZy1wcmVmZXJlbmNlczpyZWFkIG1hcmtldGluZy1wcmVmZXJlbmNlczp3cml0ZSBtYXJrZXRwbGFjZS1pbnRlZ3JhdGlvbjpyZWFkIG1hcmtldHBsYWNlLWludGVncmF0aW9uOndyaXRlIG1lcmNoYW50OnJlYWQgbWV0YWRhdGE6Y3JlYXRlIG1ldGFkYXRhOmVkaXQgcGF5ZWU6Y3JlYXRlIHBheWVlOmRlbGV0ZSBwYXllZTplZGl0IHBheWVlLWltYWdlOnJlYWQgcGF5ZWU6cmVhZCBwYXktbG9jYWw6Y3JlYXRlIHBheS1sb2NhbC1vbmNlOmNyZWF0ZSBwYXktbG9jYWw6cmVhZCBwcm9maWxlLWltYWdlOmVkaXQgcHJvZmlsZS1pbWFnZTpyZWFkIHJlY2VpcHQ6cmVhZCByZWNlaXB0czpyZWFkIHJlY2VpcHQ6d3JpdGUgc2F2aW5ncy1nb2FsOmNyZWF0ZSBzYXZpbmdzLWdvYWw6ZGVsZXRlIHNhdmluZ3MtZ29hbDpyZWFkIHNhdmluZ3MtZ29hbC10cmFuc2ZlcjpjcmVhdGUgc2F2aW5ncy1nb2FsLXRyYW5zZmVyOmRlbGV0ZSBzYXZpbmdzLWdvYWwtdHJhbnNmZXI6cmVhZCBzdGFuZGluZy1vcmRlcjpjcmVhdGUgc3RhbmRpbmctb3JkZXI6ZGVsZXRlIHN0YW5kaW5nLW9yZGVyOnJlYWQgc3RhdGVtZW50LWNzdjpyZWFkIHN0YXRlbWVudC1wZGY6cmVhZCB0cmFuc2FjdGlvbjplZGl0IHRyYW5zYWN0aW9uOnJlYWQiLCJhY2NvdW50SG9sZGVyVWlkIjoiOTczNjQxOWYtNTgzNi00NjQ2LWE1NjUtZThlMmUzZGYzMWZmIiwidG9rZW5VaWQiOiJmNzU4YjVhOC03YzU4LTQ1MWMtOTE2ZC04YmY0OGU1ZTY0MzkiLCJhcGlBY2Nlc3NVaWQiOiI3YTUzMjgwMi0xZTJkLTQ1ZDgtYjU2NS01NDljMzBjN2M2YjEifQ.o1aW6K3Ia7a3OJHIuoUhJ-UtAJUkh6wtM0HrCl-wPezoNXjEbBMNy-h372UL5zWwHZQvmOHPOyv9DNyhFV3inhFK9dzmqRZHpN2QxuNkJG_wnDkV_HPN9QCUysBhVBjXFKzJjdXgTumDyC45yGN8-GLTBAhvNCS8oM7ma4JimtEZKGqm2jvtk2tYoufYCIFGdqZUzIhbFuiIp3Paihf2Vq4h5Wm_SXzWc9_U35gDnxqz8lIbw4lwoFn3Envia0qRMrXVQwAaFIvGgQ2Rwq0sh5fApm472P17LhbmPaBo-QRhnouOgQdZTu5XnMb19QhsYPz-ETyIl9XywQaSa6WeWWXm9ivHeWWoVuJy_duyKjjJH5DdHtgsuSPeEJznVhi5RLznajcZ8oCbW5n9Y-c2fhBjxQXijKliFBbnvKJekRwGJQaCVSmOp5apIUvrIjyT_pjHIPIwzJCmHpo-7j-q3858q-lbDSJGjVuvxu6Mnpd67NRx7IyGbPvcfC98QQWU7uThNQa2iVBRrnJCs0QaR-fltWQvxv-RKyMxlXecw7RSeTzwNa_b0-4_cUBGSlJU5DpN0f13weGVTT4VU7lV75c8NpdHuT64u1JAGUtMM5GNzpGcjvcptCICo6SujSxeH2kUXan-BNAIYD5tY_LSdxcyr8tRk8YB12ysaY7sWpc',
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
