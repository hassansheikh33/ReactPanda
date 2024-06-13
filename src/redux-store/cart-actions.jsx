import { cartActions } from "./cart-slice";

export const order = (state, name, address, note) => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://http-react-cc4f7-default-rtdb.firebaseio.com/Orders.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    totalAmount: `$${state.totalAmount.toFixed(2)}`,
                    items: state.items,
                    name,
                    address,
                    sideNote: note
                })
            });
            if (!response.ok) {
                throw new Error(`An error occured, status: ${response.status}`);
            }
            dispatch(cartActions.reset());
        } catch (err) {
            console.log(err);
        }
    }
}