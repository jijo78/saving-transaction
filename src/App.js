import React from 'react';

import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

import './App.css';

const App = () => {
  const [accountId, setAccountId] = useState(null);

  const [categoryId, setCategoryId] = useState(null);
  const [savingGoalId, setSavingGoalId] = useState(null);

  const [transactions, setTransactionsDetails] = useState([]);
  const [currency, setCurrency] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const source = axios.CancelToken.source();

  const [errorMessage, setErrorMessage] = useState('');

  const headers = {
    Accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJQUzI1NiJ9.eyJpc3MiOiJhcGktZGVtby5zdGFybGluZ2JhbmsuY29tIiwic3ViIjoiNGRiNzE1NmQtNjE4Yi00YThiLWIyODQtZTI0MGMzMzBiYzVlIiwiZXhwIjoxNTc2MDgwNTYyLCJpYXQiOjE1NzU5OTQxNjIsInNjb3BlIjoiYWNjb3VudC1ob2xkZXItbmFtZTpyZWFkIGFjY291bnQtaG9sZGVyLXR5cGU6cmVhZCBhY2NvdW50LWlkZW50aWZpZXI6cmVhZCBhY2NvdW50LWxpc3Q6cmVhZCBhY2NvdW50OnJlYWQgYWRkcmVzczplZGl0IGFkZHJlc3M6cmVhZCBhdHRhY2htZW50OnJlYWQgYXR0YWNobWVudDp3cml0ZSBhdXRob3Jpc2luZy1pbmRpdmlkdWFsOnJlYWQgYmFsYW5jZTpyZWFkIGNhcmQtY29udHJvbDplZGl0IGNhcmQ6cmVhZCBjb25maXJtYXRpb24tb2YtZnVuZHM6cmVhZCBjdXN0b21lcjpyZWFkIGVtYWlsOmVkaXQgbWFuZGF0ZTpkZWxldGUgbWFuZGF0ZTpyZWFkIG1hcmtldGluZy1wcmVmZXJlbmNlczpyZWFkIG1hcmtldGluZy1wcmVmZXJlbmNlczp3cml0ZSBtYXJrZXRwbGFjZS1pbnRlZ3JhdGlvbjpyZWFkIG1hcmtldHBsYWNlLWludGVncmF0aW9uOndyaXRlIG1lcmNoYW50OnJlYWQgbWV0YWRhdGE6Y3JlYXRlIG1ldGFkYXRhOmVkaXQgcGF5ZWU6Y3JlYXRlIHBheWVlOmRlbGV0ZSBwYXllZTplZGl0IHBheWVlLWltYWdlOnJlYWQgcGF5ZWU6cmVhZCBwYXktbG9jYWw6Y3JlYXRlIHBheS1sb2NhbC1vbmNlOmNyZWF0ZSBwYXktbG9jYWw6cmVhZCBwcm9maWxlLWltYWdlOmVkaXQgcHJvZmlsZS1pbWFnZTpyZWFkIHJlY2VpcHQ6cmVhZCByZWNlaXB0czpyZWFkIHJlY2VpcHQ6d3JpdGUgc2F2aW5ncy1nb2FsOmNyZWF0ZSBzYXZpbmdzLWdvYWw6ZGVsZXRlIHNhdmluZ3MtZ29hbDpyZWFkIHNhdmluZ3MtZ29hbC10cmFuc2ZlcjpjcmVhdGUgc2F2aW5ncy1nb2FsLXRyYW5zZmVyOmRlbGV0ZSBzYXZpbmdzLWdvYWwtdHJhbnNmZXI6cmVhZCBzdGFuZGluZy1vcmRlcjpjcmVhdGUgc3RhbmRpbmctb3JkZXI6ZGVsZXRlIHN0YW5kaW5nLW9yZGVyOnJlYWQgc3RhdGVtZW50LWNzdjpyZWFkIHN0YXRlbWVudC1wZGY6cmVhZCB0cmFuc2FjdGlvbjplZGl0IHRyYW5zYWN0aW9uOnJlYWQiLCJhY2NvdW50SG9sZGVyVWlkIjoiOTczNjQxOWYtNTgzNi00NjQ2LWE1NjUtZThlMmUzZGYzMWZmIiwidG9rZW5VaWQiOiJjYmM5N2IzMS1kMjcyLTRiZGYtYTk4NC05N2M4MzdmZjRhN2YiLCJhcGlBY2Nlc3NVaWQiOiI3YTUzMjgwMi0xZTJkLTQ1ZDgtYjU2NS01NDljMzBjN2M2YjEifQ.TB6yJ4qDqs_D1TmKKrPdxIEq29NTSv0DyKo9qgmoCzgwfo9-lrIg4y3CKm1-QLQGPrksj6BGKYeYP9QnBsgT5yKTjgUTTLH3PR2srk8uk48vervdHhDf9UHgWEoplGMuorFM4OaoFgSX5bJUnY1iOkwYFFgiOptwz0fLiua_vrdQJ_cLAMhVna7DQdime7bBqB5p4sOCsEuntW1DBlSuviHHnUmC7QBTRJ9zk1yDw5rQBgTj9ENkoofmtfL6SKB9vjDWF-SD9n_aYSoO2TQlz6CjmlSht1f--Y_PChKRnBJ1DWHsSVcQ52PNFZgcpGRGS4w1XcvXUkjaV_5SlkXLNAdWs9A5pn9clzk1EEuz52PBmFAp5QrvX121-NaRrJ9cs4gk60EVKBppqQ9yfcFi-DKK6jULydSkPtdRRV5RVmtTOSE4M9ksNQqsGmthOLwpj52sw7FjF9xCG9lhd0nPqUyMvvU4x2qaGR0Qt0lb5wBGrWwzIWMl9BGWYXn44TO4Q6p208SbGekPcM1QDn7makAjTekq8dhMUMxk3dCgxipwpqS0JXMX9T3ysCqdo5QF2emfyouErhFa7d5OLFWVF4zxb_FpPM8xQNRUlhgwmlCM3oZkiBQ5i7qCRKCbwDV7-iSFQBjfb7eVIG5zPbN4eAI2lOi7OyoQnKjsGcuqPT4',
    type: 'application/json'
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        await axios({
          url: '/api/v2/accounts',
          method: 'GET',
          headers
        }).then(res => {
          const { accounts } = res.data;
          accounts.map(account => {
            setAccountId(account.accountUid);
            setCategoryId(account.defaultCategory);
            setCurrency(account.currency);
            axios({
              url: `/api/v2/feed/account/${account.accountUid}/category/${
                account.defaultCategory
              }/?minTransactionTimestamp=${moment().format()}&maxTransactionTimestamp=${moment()
                .add(7, 'd')
                .format()}`,
              method: 'GET',
              headers
            }).then(res => {
              const { feedItems } = res.data;
              const filteredData = feedItems.filter(item => item.direction === 'OUT');
              setTransactionsDetails(filteredData);
            });
          });
        });
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
      }

      setIsLoading(false);
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [accountId]);

  const openSavingGoal = () => {
    if (savingGoalId) {
      return;
    }
    return axios({
      url: `/api/v2/account/${accountId}/savings-goals`,
      method: 'PUT',
      headers,
      data: {
        name: 'Trip to Paris',
        currency: 'GBP',
        target: {
          currency: 'GBP',
          minorUnits: 11223344
        },
        base64EncodedPhoto: 'string'
      }
    }).then(res => {
      const { savingsGoalUid } = res.data;
      console.log('savingsGoalUid: ', savingsGoalUid);
      // PUT /api/v2/account/{accountUid}/savings-goals/{savingsGoalUid}/add-money/{transferUid}

      setSavingGoalId(savingsGoalUid);
    });
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{errorMessage}</p>;
  }
  const total = [];

  return (
    <main className='App'>
      <header>
        <h1>Weekly expense</h1>
      </header>
      <section className='App-header'>
        <h2>Detailed breakdown</h2>
        <button type='button' onClick={openSavingGoal} disabled={savingGoalId}>
          Create a savings goal
        </button>

        <ul>
          {transactions.map(transaction => {
            const moneyAmount = transaction.amount.minorUnits / 100;
            const amountRounded = Math.ceil(moneyAmount);
            const amountSaved = parseFloat((amountRounded - moneyAmount).toFixed(2), 10);
            const acc = total.push(amountSaved);

            return (
              <>
                <h3>Date: {moment(transaction.transactionTime).format('DD-MM-YYYY')}</h3>
                <li>Type of payment: {transaction.spendingCategory}</li>
                <li>
                  Amount: {currency} {transaction.amount.minorUnits / 100}
                  Round Up Saving :{currency} {amountSaved}
                </li>
              </>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default App;
