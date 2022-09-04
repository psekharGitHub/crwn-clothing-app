import { FormInputLabel, Input, Group } from './form-input.styles';

import './form-input.styles.scss';

const FormInput = ({label, ...otherProps}) => {
    return (
        <Group>
            <Input { ...otherProps }/>
            {label && (
                <FormInputLabel shrink={ otherProps.value.length }>
                    {label}
                </FormInputLabel>
                /*{ Uncomment when using css file 
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label> } */
            )}
        </Group>
    );
}

export default FormInput;

/** using ...otherProps indicates rest of the props and spreading in over input tag is a handy way to use data received as props
 * because all the fields are inside same tag itself
 */