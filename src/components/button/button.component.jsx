import { BaseButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from './button.styles';
// import './button.styles.scss';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
};

//using special map object which tells among all the buttons inside BUTTON_TYPE_CLASS return the
//button-type I want. { ... } [array/object] --> is a map object syntax
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,

    }[buttonType]
);

const Button = ({ children,buttonType, isLoading,...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
            <CustomButton disabled={isLoading} {...otherProps}> 
                { isLoading ? <ButtonSpinner /> : children} 
            </CustomButton>
        //Uncomment this for using with button.styles.scss
        // <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
        //     {children}
        // </button>
    );
}

export default Button;