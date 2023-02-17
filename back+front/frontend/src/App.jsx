import React from 'react';
import BalanceSection from './components/BalanceSection/BalanceSection';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';
import TransferList from './components/TransferList/TransferList';

const App = () => {

  return (
    <>
      <div className='header'>
        <a href="/">CryptoSHOP</a>
        <a href="/transfers">Open transfers list</a>
      </div>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<BalanceSection />}></Route>
            <Route path='/transfers' element={<TransferList />}></Route>
            <Route path='/transfers/:query' element={<TransferList />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;