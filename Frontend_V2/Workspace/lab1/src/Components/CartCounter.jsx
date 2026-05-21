const CartCounter = () => {

    const createCart = () => {
        let count = 0;

        return  () => {
            count += 1;
            return count;
        };
    };
    const addToCart = createCart();

    const handleAdd = () => {
        alert(`Items in cart: ${currentCount}`);
    };

    return (
        <div className="product">
            <h3>Cart</h3>
            <button onClick={handleAdd}>Add to Cart</button>
        </div>
    );
};

export default CartCounter;