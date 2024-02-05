import React from 'react';

const ProductsInfo = ({ name, price, quantity, subtotal }) => {
    return (
        <div className="flex flex-col md:flex-row gap-y-4 mb-4">
            <div className="mr-4">
                <input
                    type="text"
                    value={name}
                    readOnly
                    className="border-none border-gray-300 p-2 md:w-64 w-110 xl:w-96 mr-5"
                />
            </div>
            <div className="mr-4">
                <input
                    type='number'
                    value={quantity}
                    readOnly
                    className="border-none border-gray-300 p-2 max-w-[9rem] mr-3"
                />
            </div>
            <div className="mr-4">
                <input
                    type="number"
                    value={price}
                    readOnly
                    className="border-none border-gray-300 p-2 max-w-[9rem] mr-3"
                />
            </div>
            <div className="mr-4">
                <input
                    type="number"
                    value={subtotal}
                    readOnly
                    className="border-none border-gray-300 p-2 max-w-[9rem] mr-3"
                />
            </div>
        </div>
    );
};

export default ProductsInfo;
