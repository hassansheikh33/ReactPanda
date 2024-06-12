import cartContext from "./cart-context";
import { useReducer } from "react";

const cartReducer = (prevState, action) => {
    if (action.type === 'ADD') {
        const updatedTotal = prevState.totalAmount + (action.item.price * action.item.amount); //criteria to update the total will remain same
        const existingItemIndex = prevState.items.findIndex(item => item.id === action.item.id);
        const existingItem = prevState.items[existingItemIndex];
        let updatedItems;

        if (existingItem) {
            const updatedItem = { ...existingItem, amount: existingItem.amount + action.item.amount };
            updatedItems = [...prevState.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems = prevState.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotal
        }
    } else if (action.type === 'REMOVE') {
        let updatedItems;
        const selectedItemIndex = prevState.items.findIndex(item => item.id === action.id);
        const selectedItem = prevState.items[selectedItemIndex];
        const updatedTotal = prevState.totalAmount - selectedItem.price;
        if (selectedItem.amount === 1) {
            updatedItems = prevState.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...selectedItem, amount: selectedItem.amount - 1 };
            updatedItems = [...prevState.items];
            updatedItems[selectedItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotal
        }
    }
    else if (action.type === 'ORDER') {
        return {
            items: [],
            totalAmount: 0
        }
    }
    return {
        items: [],
        totalAmount: 0
    }
}

export default function CartProvider(props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [], totalAmount: 0 });

    function addToCartHandler(item) {
        dispatchCartAction({ type: 'ADD', item: item })
    }

    function removeFromCartHandler(id) {
        dispatchCartAction({ type: 'REMOVE', id: id });
    }

    function orderHandler() {
        dispatchCartAction({ type: 'ORDER' });
    }

    const cartCtx = {
        items: cartState.items,       //setting the items to the latest snapshot
        totalAmount: cartState.totalAmount, //setting the totalAmount to the latest snapshot
        addItem: addToCartHandler,
        removeItem: removeFromCartHandler,
        order: orderHandler
    }


    //adding an objecting containing real values to the value prop of the provider
    return (
        <cartContext.Provider value={cartCtx}>
            {props.children}
        </cartContext.Provider>
    )
}