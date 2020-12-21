export const AddToCartUtility = (oldState, nextState) => {
    console.log(oldState,nextState);
    const existingCartItem = oldState.find((item) => 
        item.cartItem._id === nextState.cartItem._id
    );

    if(existingCartItem){
        return oldState.data.map( data => 
            data.cartItem._id === nextState.cartItem._id ? {...data, quantity: data.cartItem.quantity + 1} : data
        )
    }else{
        return [...oldState, {...nextState, quantity : 1}]
    }
}

export const addQuantityUtility = (oldState, nextState) => {
    console.log(oldState,nextState);
    const existingCartItem = oldState.find((item) => 
        item._id === nextState._id
    );

    if(existingCartItem){
        existingCartItem.cartItem.quantity += 1;
        return [...oldState];
    }
}

export const removeQuantityUtility = (oldState, nextState) => {
    console.log(oldState,nextState);
    const existingCartItem = oldState.find((item) => 
        item._id === nextState._id
    );

    if(existingCartItem.cartItem.quantity === 1){
        oldState.filter(item => item._id !== nextState._id)
        return [...oldState]
    }
    else{
        existingCartItem.cartItem.quantity -= 1;
        return[...oldState];
    }
}