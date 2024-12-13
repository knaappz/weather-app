import React, { useState } from 'react';

const Header = ({ onSearchChange, onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleSearchClick = () => {
    onSearchSubmit(); 
  };

  return (
    <section id='header' className='w-full bg-sky-100 flex px-16 flex-row items-center justify-between'>
      <img className='w-48' src="assets/logo3.png" alt="Logo" />
      <div id="search-wrapper" className='w-1/3 flex justify-evenly'>
        <input
          className='p-2 rounded-md outline-none w-3/4 bg-sky-200 placeholder-slate-500'
          placeholder='Wyszukaj miasto...'
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          className='bg-white p-2 rounded-md w-20 uppercase'
          onClick={handleSearchClick}
        >
          Szukaj
        </button>

        {/* fakebutton do usunięcia */}
        {/* <button
          className='bg-white p-2 rounded-md w-20 uppercase text-slate-600'
        >
          Szukaj
        </button> */}
      </div>
    </section>
  );
};

export default Header;
