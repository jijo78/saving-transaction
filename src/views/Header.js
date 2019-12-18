import React from 'react';
import logo from '../images/mastercard-logo.png';

const Header = () => {
  return (
    <header className='weekly-balance__header'>
      <h1>STARLING BANK</h1>
      <picture className='weekly-balance__header-logo'>
        <img src={logo} alt='Mastercard logo' className='weekly-balance__header-logo-img' />
      </picture>
    </header>
  );
};

export default Header;
