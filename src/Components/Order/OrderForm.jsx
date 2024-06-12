import classes from './OrderForm.module.css'
import useForm from '../../hooks/use-Form'

export default function OrderForm(props) {

    const { value: nameValue, isValid: nameIsValid,
        hasError: nameHasError, onBlur: onNameBlur,
        onChange: onNameChange, reset: nameReset } = useForm(val => val !== '');

    const { value: addressValue, isValid: addressIsValid,
        hasError: addressHasError, onBlur: onAddressBlur,
        onChange: onAddressChange, reset: addressReset } = useForm(val => val !== '');

    const { value: noteValue, onChange: onNoteChange, reset: noteReset } = useForm(val => { });

    function formSubmissionHandler(e) {
        onNameBlur();
        onAddressBlur();
        e.preventDefault();
        if (!nameIsValid && !addressIsValid) {
            return
        }
        props.onSubmit(nameValue, addressValue, noteValue);
        nameReset();
        addressReset()
        noteReset();
    }


    return (<form onSubmit={formSubmissionHandler}>
        <div className={`${nameHasError ? classes['form-control'] + ' ' + classes['invalid'] : classes['form-control']}`}>
            <label htmlFor='firstName'>Name *</label>
            <input type='text' id='firstName' value={nameValue} onBlur={onNameBlur} onChange={onNameChange} />
            {nameHasError && <p className={classes['error-text']}>Please enter a valid name</p>}
        </div>
        <div className={`${addressHasError ? classes['form-control'] + ' ' + classes['invalid'] : classes['form-control']}`}>
            <label htmlFor='address'>Address *</label>
            <input type='text' id='address' value={addressValue} onBlur={onAddressBlur} onChange={onAddressChange} />
            {addressHasError && <p className={classes['error-text']}>Please enter a valid Address</p>}
        </div>
        <div className={classes['form-control']}>
            <label htmlFor='note'>Side note (optional)</label>
            <input type='text' id='note' value={noteValue} onChange={onNoteChange} />
            {props.hasError && <p className={classes['error-text']}>Please enter a valid Address</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' className={classes['button--alt']} onClick={props.onClose}>Go back to Cart</button>
            <button className={classes.button} onClick={formSubmissionHandler}>Confirm Order</button>
        </div>
    </form>)
}