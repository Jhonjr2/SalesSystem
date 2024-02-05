import { useState, useEffect } from 'react';
import dataProducts from '../../data/products/productos.json';

const DetailsProducts = ({ onProductAdd, searchSelect }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const filteredProducts = dataProducts.filter(e => e.sucursal === searchSelect)
        setProducts(filteredProducts)
        console.log(filteredProducts)
    }, [searchSelect]);

    useEffect(() => {
        if (selectedProduct) {
            setPrice(selectedProduct.price);
        }
    }, [selectedProduct]);

    const handleInputChange = (e) => {
        setSearch(e.target.value.toLowerCase());
        setSelectedProduct(null);
        setPrice(0);
        setQuantity(0);
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setSearch(product.name);
        setPrice(product.price);
        setQuantity(1);
    };


    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const searchTerm = search.trim().toLowerCase();
            const product = products.find(p => p.name.toLowerCase() === searchTerm);
            if (product) {
                setSelectedProduct(product);
                setPrice(product.price);
            }
        }
    };

    const calculateSubtotal = () => {
        return quantity * price;
    };

    const handleAddProduct = () => {
        if (selectedProduct) {
            const newProduct = {
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: quantity,
                subtotal: calculateSubtotal()
            };
            onProductAdd(newProduct);

        }
        setPrice('')
        setQuantity('')
        setSearch('')
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className='flex flex-col md:flex-row gap-2'>
                <div className="mr-4">
                    <h3 className="mb-1">Name</h3>
                    <div className='inline-block relative'>
                        <input
                            type="text"
                            placeholder="Search Products..."
                            value={search}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="border-none border-gray-300 p-2 md:w-64 w-110 xl:w-96 mr-5"
                        />
                        <ul className="absolute z-10 left-0 w-96 bg-white pl-4 rounded shadow-lg mt-1">
                            {selectedProduct ? null :
                                search &&
                                products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
                                    <div key={product.id} onClick={() => handleSelectProduct(product)} className="cursor-pointer hover:bg-gray-100">
                                        <li>{product.name}</li>
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="mr-4">
                    <h4 className="mb-1">Quantity</h4>
                    <input
                        type='number'
                        placeholder="Quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="border-none border-gray-300 p-2 max-w-[9rem] mr-3"
                    />
                </div>
                <div className="mr-4">
                    <h4 className="mb-1">Price</h4>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        readOnly
                        className="border-none border-gray-300 p-2 max-w-[9rem] mr-3"
                    />
                </div>
                <div className="mr-4">
                    <h4 className="mb-1">Subtotal</h4>
                    <input
                        type="number"
                        placeholder="Subtotal"
                        value={calculateSubtotal()}
                        readOnly
                        className="border-none border-gray-300 p-2 max-w-[9rem] mr-3"
                    />
                </div>
            </div>
            <button onClick={handleAddProduct} className="bg-blue-500 text-white px-6 mt-7 rounded hover:bg-blue-600">Add</button>
        </div>
    );
};

export default DetailsProducts;
