import React from 'react';

import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { DAY_MONTH_FORMAT } from '../const/date-formats';
import { getAccounts, getTransactionsForAccount, saveToSavingGoal } from '../utils.js';
import { calculateTotalExpenditure } from '../selectors/calculate-amount';

const TransactionView = () => {
  const [accountId, setAccountId] = useState(null);

  const [transactions, setTransactionsDetails] = useState([]);
  const [currency, setCurrency] = useState([]);

  const [savedSuccesfully, setSavedSuccesfully] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const getTransactionDetails = () => {
    getAccounts()
      .then(res => {
        const { accounts } = res.data;

        return accounts.map(account => {
          setAccountId(account.accountUid);
          setCurrency(account.currency);
          getTransactionsForAccount(account).then(res => {
            const { feedItems } = res.data;
            const filteredData = feedItems.filter(
              item => item.direction === 'OUT' && item.spendingCategory !== 'SAVING'
            );
            setTransactionsDetails(filteredData);
          });
        });
      })
      .catch(error => {
        setIsLoading(false);

        console.log('error: ', error);

        setIsError(true);
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    getTransactionDetails();
    setIsLoading(false);
  }, []);

  const saveToGoal = amountSaved => {
    return saveToSavingGoal(accountId, amountSaved)
      .then(() => {
        setSavedSuccesfully(true);
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error.message);
      });
  };

  if (isLoading || !transactions.length) return <p>Loading...</p>;
  const total = [];
  let totalSave;
  return (
    <>
      <h2>Weekly transactions and savings</h2>

      <section className='weekly-balance__transactions'>
        <ul>
          {transactions &&
            transactions.map(transaction => {
              const moneyAmount = transaction.amount.minorUnits / 100;
              const amountRounded = Math.ceil(moneyAmount).toFixed(2);
              const amountSaved = parseFloat((amountRounded - moneyAmount).toFixed(2), 8);
              total.push(amountSaved);
              totalSave = calculateTotalExpenditure(total);

              return (
                <li key={transaction.feedItemUid} data-testid='transactionList'>
                  <div>
                    <p className='weekly-balance__transactions-description'>Date</p>
                    <time className='small'>
                      <span className='weekly-balance__transactions-date'>
                        {moment(transaction.transactionTime).format(DAY_MONTH_FORMAT)}
                      </span>
                    </time>
                  </div>
                  <div>
                    <p>
                      <span className='weekly-balance__transactions-currency'>{currency}</span>{' '}
                      <span className='weekly-balance__transactions-value'>
                        {transaction.amount.minorUnits / 100}
                      </span>
                    </p>
                    <p className='weekly-balance__transactions-category small'>
                      {transaction.spendingCategory}
                    </p>
                  </div>
                  <div>
                    <p data-testid='roundedPayment'>
                      {' '}
                      Total payment :{currency} {amountRounded}
                    </p>
                    <p data-testid='savedAmount'>
                      {' '}
                      Saved :{currency} {amountSaved}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
        <div className='weekly-balance__savings_details'>
          <p>
            Total saved this week {currency} {totalSave}
            {savedSuccesfully}
          </p>
          <button
            onClick={saveToGoal.bind(null, totalSave)}
            disabled={savedSuccesfully}
            data-testid='saveGoal'
          >
            Save {totalSave} to saving goal account
          </button>
          {savedSuccesfully ? (
            <p className='alert_success' role='alert-success'>
              Money succesfully added to your saving account
            </p>
          ) : (
            ''
          )}
          {isError ? <p role='alert'>{errorMessage}</p> : ''}
        </div>
      </section>
    </>
  );
};

export default TransactionView;
