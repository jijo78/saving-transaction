import React from 'react';
import logo from '../images/mastercard-logo.png';

const Header = () => {
  return (
    <header className='weekly-balance__header'>
      <p>STARLING BANK</p>

      <picture className='weekly-balance__header-logo'>
        <img src={logo} alt='Mastercard logo' className='weekly-balance__header-logo-img' />
      </picture>
    </header>
  );
};

export default Header;
