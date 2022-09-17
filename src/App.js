import React from 'react';

import { useEffect } from "react";
import { useDispatch } from 'react-redux';  // React hook for dispatch

import { Routes,Route } from 'react-router-dom';

import { checkUserSession } from './store/user/user.action';

import Home from '../src/routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import './categories.styles.scss';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(checkUserSession())
      // eslint-disable-next-line
    }, []); // we can add 'dispatch' inside the dependency argument if we get eslint errors.

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
