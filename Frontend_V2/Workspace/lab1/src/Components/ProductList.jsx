import { useEffect, useState } from "react";    
import ProductCard from "./ProductCard";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [Loading, setLoading] = useState(false);

    const loadProductsAsync = async () => {
        setLoading(true);
        try{
            const data = await fetchProducts();
            setProducts(data);
        }catch{
            alert("Failed to load products");
        }
        setLoading(false);
    };

    const loadProductsPromise = () => {
        setLoading(true);

        fetchProducts()
            .then((data) => setProducts(data))
            .catch(() => alert("Failed to load products"))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        loadProductsAsync();
    }, []);

    return (
        <div>
            <h3>Products</h3>

            <button onClick={loadProductsAsync}>Reload(Async/Await)</button>
            <button onClick={loadProductsPromise}>Reload(Promise)</button>

            {Loading && <p>Loading products...</p>}

            {!Loading && products.map((product => (
                <ProductCard 
                    key={product.id} {...product} />
            )))}
        </div>
    );
};
const fetchProducts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Laptop", price: 99999 },
                { id: 2, name: "Smartphone", price: 69981460 },
                { id: 3, name: "Tablet", price: 49958087554518 },
            ]);
        }
        , 1500);
    });
};

export default ProductList;