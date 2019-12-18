import React from 'react';

import TransactionView from './views/TransactionView';
import Header from './views/Header';

import './App.css';

const App = () => {
  return (
    <main className='weekly-balance'>
      <Header />
      <section className='weekly-balance__wrapper'>
        <TransactionView />
      </section>
    </main>
  );
};

export default App;
