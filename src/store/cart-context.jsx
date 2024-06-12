import React from "react";

const cartContext = React.createContext({
    amount: 0,
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    order: () => { }
})

export default cartContext;