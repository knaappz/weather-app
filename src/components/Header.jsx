import React, { useState } from 'react';

const Header = ({ onSearchChange, onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  const handleSearchClick = () => {
    onSearchSubmit(); 
  };

  return (
    <section id='header' className='w-full bg-sky-100 flex flex-wrap flex-col items-center justify-center px-5 py-5 sm:py-0 sm:px-10 sm:flex-row sm:justify-between'>
      <img className='w-48' src="assets/logo3.png" alt="Logo" />
      <div id="search-wrapper" className='flex justify-evenly gap-5'>
        <input
          className='p-2 rounded-md outline-none w-3/4 bg-sky-200 placeholder-slate-500'
          placeholder='Wyszukaj miasto...'
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className='bg-white p-2 rounded-md w-20 uppercase'
          onClick={handleSearchClick}
        >
          Szukaj
        </button>
      </div>
    </section>
  );
};

export default Header;
