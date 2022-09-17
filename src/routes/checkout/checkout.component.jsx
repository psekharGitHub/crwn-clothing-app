import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';
import { useSelector } from 'react-redux';
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {
    const cartItems  = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>Product</div>
                <div className='header-block'>Description</div>
                <div className='header-block'>Quantity</div>
                <div className='header-block'>Price</div>
                <div className='header-block'>Remove</div>
            </div>
            { cartItems.map((cartItem) => 
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <span className='total'>Total: ${cartTotal}</span>
            <PaymentForm />
        </div>
    );
}

export default Checkout;