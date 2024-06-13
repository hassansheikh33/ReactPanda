import { cartActions } from "./cart-slice";

export const order = (state, name, address, note) => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://http-react-cc4f7-default-rtdb.firebaseio.com/reactPandaOrders.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    totalAmount: `$${state.totalAmount.toFixed(2)}`,
                    items: state.items,
                    totalItems: state.totalItems,
                    name,
                    address,
                    sideNote: note
                })
            });
            if (!response.ok) {
                throw new Error(`An error occured, status: ${response.status}`);
            }
            dispatch(cartActions.setCart({ items: [], totalItems: 0, totalAmount: 0 }));
        } catch (err) {
            console.log(err);
        }
    }
}

export const sendCartData = (cart) => {
    return async () => {
        try {
            const response = await fetch('https://http-react-cc4f7-default-rtdb.firebaseio.com/reactPandaCart.json', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    items: cart.items,
                    totalAmount: cart.totalAmount.toFixed(2),
                    totalItems: cart.totalItems,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error occured while sending cart: ${response.statusText}`);
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://http-react-cc4f7-default-rtdb.firebaseio.com/reactPandaCart.json');
            if (!response.ok) {
                throw new Error(`Error occured while fetching cart: ${response.statusText}`);
            }
            const data = await response.json();
            dispatch(cartActions.setCart({ items: data.items || [], totalAmount: Number(data.totalAmount), totalItems: Number(data.totalItems) }))
        } catch (err) {
            console.log(err);
        }
    }
}