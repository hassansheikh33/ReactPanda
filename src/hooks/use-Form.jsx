import { useState } from "react";

export default function useForm(validator) {
    const [value, setValue] = useState('');
    const [wasTouched, setWasTouched] = useState(false);

    const isValid = validator(value);
    const hasError = !isValid && wasTouched;

    function onChange(e) {
        setValue(e.target.value);
    }

    function onBlur() {
        setWasTouched(true);
    }

    function reset() {
        setValue('');
        setWasTouched(false);
    }

    return {
        value,
        isValid,
        hasError,
        onChange,
        onBlur,
        reset
    }

}