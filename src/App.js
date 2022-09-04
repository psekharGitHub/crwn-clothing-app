import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from '../src/routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
// import SignIn from '../src/sign-in-form/sign-in-form.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import './categories.styles.scss';

const App = () => {
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
