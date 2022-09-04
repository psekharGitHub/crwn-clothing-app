import { Fragment,useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import {  NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
// import './navigation.styles.scss'

const Navigation = () => {

  const { currentUser,setCurrentUser } = useContext(UserContext);
  console.log(currentUser);

  const { isCartOpen } = useContext(CartContext);


  const signOutHandler = async() => {
    const res = await signOutUser();
    // console.log(res);
    setCurrentUser(null); 
  }

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
                  currentUser ? <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
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