import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/button.component';

import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
//Uncomment to use css file
// import './cart-dropdown.styles.scss';   

const CartDropdown = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);

    const navigate = useNavigate();

    const goToCheckoutHandler = () =>  {
        navigate('/checkout');
        dispatch(setIsCartOpen(!isCartOpen));
    }
    return (
        <CartDropdownContainer>
            <CartItems>
                { cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>)
                    ) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                };
            </CartItems>
            <Button onClick={goToCheckoutHandler} style={{fontSize: 12}}>Go To Checkout</Button>
        </CartDropdownContainer>
    );
}
export default CartDropdown;