import { useEffect, useState } from 'react';
import ProductsInfo from './ProductsInfo';
import DetailsProducts from './DetailsProducts';

const Details = ({searchSelect, setDataDetails}) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let sum = 0;
        selectedProducts.forEach(product => {
            sum += parseFloat(product.subtotal);
        });
        setTotal(sum);
        setDataDetails(selectedProducts)
        console.log(selectedProducts)
    }, [selectedProducts]);

    const handleRemoveProduct = (index) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts.splice(index, 1);
        setSelectedProducts(updatedProducts);
    };

    const handleAddProduct = (product) => {
        setSelectedProducts([...selectedProducts, product]);
    };

    
    
    
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-medium mb-4">Details</h1>
            <DetailsProducts onProductAdd={handleAddProduct} searchSelect={searchSelect} />
            {selectedProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between mb-4">
                    <ProductsInfo
                        name={product.name}
                        price={product.price}
                        quantity={product.quantity}
                        subtotal={product.subtotal}
                    />
                    <button onClick={() => handleRemoveProduct(index)} className="bg-blue-500 text-white px-4 py-2 mr-40 rounded hover:bg-blue-600">X</button>
                </div>
            ))}
            <div className="mb-4">
                <h4 className="mb-1">Total</h4>
                <input
                    type="number"
                    placeholder="Total"
                    value={total}
                    readOnly
                    className="border-none border-gray-300 p-2 max-w-[9rem] mr-3"
                />
            </div>

        </div>
    );
};

export default Details;


