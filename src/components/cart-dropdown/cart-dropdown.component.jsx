import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../../components/button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';
//Uncomment to use css file
// import './cart-dropdown.styles.scss';   

const CartDropdown = () => {
    const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () =>  {
        navigate('/checkout');
        setIsCartOpen(!isCartOpen);
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