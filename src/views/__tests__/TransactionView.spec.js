import React from 'react';
import { cleanup, render, fireEvent, waitForElement, wait } from '@testing-library/react';
import { getAccounts, getTransactionsForAccount, saveToSavingGoal } from '../../utils';

import '@testing-library/jest-dom/extend-expect';
import TransactionView from '../TransactionView';

const accounts = [
  {
    accountUid: '46dbe869-8d14-4981-853a-668f901869b4',
    defaultCategory: '9ea1f548-389a-4d66-b0a7-8123d66018a2',
    currency: 'GBP'
  }
];

const transactions = [
  {
    amount: { currency: 'GBP', minorUnits: 1014 },
    direction: 'OUT',
    feedItemUid: 'c59b2b41-6b78-4bcc-a87c-3331f3f69a13',
    spendingCategory: 'PAYMENTS'
  },
  {
    amount: { currency: 'GBP', minorUnits: 1314 },
    direction: 'OUT',
    feedItemUid: 'c59b2b41-6b88-4bcc-a87c-3331f3f69a13',
    spendingCategory: 'EATING_OUT'
  }
];

jest.mock('../../utils');

describe('<TransactionView />', () => {
  afterEach(cleanup, jest.clearAllMocks());
  it('should render loading spinner on load, and render lists of transactionS on succesful data fetch', async () => {
    // mock to get account ID
    getAccounts.mockResolvedValueOnce({
      data: {
        accounts
      }
    });
    // mock to get transactions items
    getTransactionsForAccount.mockResolvedValueOnce({
      data: {
        feedItems: transactions
      }
    });
    const { getByText, getAllByTestId } = await render(<TransactionView />);
    const loading = getByText('Loading...');
    expect(loading).toHaveTextContent(/loading/i);
    expect(getAccounts).toHaveBeenCalledTimes(1);
    expect(getTransactionsForAccount).toHaveBeenCalledTimes(1);

    const resolvedElem = await waitForElement(() => getAllByTestId('transactionList'));
    expect(resolvedElem).toHaveLength(2);
  });

  it('should render payment and total payments correctly', async () => {
    // mock to get account ID
    getAccounts.mockResolvedValueOnce({
      data: {
        accounts
      }
    });
    // mock to get transactions items
    getTransactionsForAccount.mockResolvedValueOnce({
      data: {
        feedItems: transactions
      }
    });
    const { getByText, getAllByTestId } = await render(<TransactionView />);

    const resolvedElem = await waitForElement(() => getByText('10.14'));
    transactions.forEach(transaction =>
      expect(getByText(transaction.spendingCategory)).toBeInTheDocument()
    );
    expect(resolvedElem).toBeInTheDocument();

    const roundedPayments = getAllByTestId('roundedPayment');
    roundedPayments.forEach(rounded => expect(rounded).toBeInTheDocument());
  });

  it('should render savings correctly', async () => {
    // mock to get account ID
    getAccounts.mockResolvedValueOnce({
      data: {
        accounts
      }
    });
    // mock to get transactions items
    getTransactionsForAccount.mockResolvedValueOnce({
      data: {
        feedItems: transactions
      }
    });
    const { getAllByTestId } = await render(<TransactionView />);

    const savedAmount = await waitForElement(() => getAllByTestId('savedAmount'));
    savedAmount.forEach(saved => expect(saved).not.toBeNull());
    jest.clearAllMocks();
  });

  it('should render successful message correctly', async () => {
    // mock to get account ID
    getAccounts.mockResolvedValueOnce({
      data: {
        accounts
      }
    });
    // mock to get transactions items
    getTransactionsForAccount.mockResolvedValueOnce({
      data: {
        feedItems: transactions
      }
    });
    const { getByTestId, getByText } = await render(<TransactionView />);

    //const button = await getByTestId('saveGoal');
    const button = await waitForElement(() => getByTestId('saveGoal'));

    fireEvent.click(button, saveToSavingGoal.mockResolvedValueOnce());
    const savedMessage = await waitForElement(() =>
      getByText('Money succesfully added to your saving account')
    );
    expect(savedMessage).toBeInTheDocument();
  });
});
