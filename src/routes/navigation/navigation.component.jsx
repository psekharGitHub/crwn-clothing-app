import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { signOutStart } from '../../store/user/user.action';
import {  NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
// import './navigation.styles.scss'

const Navigation = () => {
  const dispatch = useDispatch(); 

  // here 'state' refers to the state/structure of the entire root reducer(composed of multiple reducers)
  const currentUser  = useSelector(selectCurrentUser);

  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    Shop
                </NavLink>
                {
                  currentUser ? <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                  :
                  <NavLink to='/auth'>
                      Sign In
                  </NavLink>
                }
                <CartIcon />
            </NavLinks>
            { isCartOpen && <CartDropdown /> }
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  }
  
export default Navigation;