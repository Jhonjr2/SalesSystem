"use client"
import { useEffect, useState } from 'react';
import dataBranches from '../data/sucursales/sucursale.json';

const BranchOffice = ({ search, setSearch }) => {
    const [branches, setBranches] = useState([]);
    const [selectBranch, setSelectBranch] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('');



    useEffect(() => {
        setBranches(dataBranches);
    }, []);

    useEffect(() => {
        if (selectBranch) {
            setSelectedCurrency(selectBranch.divisa);
        }
    }, [selectBranch]);


    const results = search && branches.filter(e => {
        const searchTerm = search.toLowerCase().trim();
        const [searchBranch] = searchTerm.split(" ");

        return e.sucursal.toLowerCase().includes(searchBranch)

    })


    const handleInputChange = (e) => {
        setSearch(e.target.value.toLowerCase());
        setSelectBranch(null);
        setSelectedCurrency('');
    };

    const handleSelectBranch = (e) => {
        setSelectBranch(e);
        setSearch(e.sucursal);
        setSelectedCurrency(e.divisa);

    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const searchTerm = search.trim().toLowerCase();
            const branch = branches.find(e => e.sucursal.toLowerCase() === searchTerm);
            if (branch) {
                setSelectBranch(branch);
                setSelectedCurrency(branch.divisa);
            }
        }
    };


    return (
        <div className="flex flex-col md:flex-row gap-y-4 mb-4">
            <div className="mr-4">
                <h3>Branch Office</h3>
                <div className="inline-block relative">
                    <input
                        type="text"
                        placeholder="Search Branch Office..."
                        value={search}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="border-none border-gray-300 p-2 w-full md:w-64 lg:w-96 xl:w-96 mr-7"
                    />
                    {!selectBranch && (
                        <ul className="absolute z-10 left-0 w-full md:w-96 bg-white pl-4 rounded shadow-lg mt-1">
                            {search &&
                                results.map(e => (
                                    <div key={e.sucursal} onClick={() => handleSelectBranch(e)} className="cursor-pointer hover:bg-gray-100">
                                        <li>{e.sucursal}</li>
                                    </div>
                                ))}
                        </ul>
                    )}
                </div>
            </div>
            <div>
                <h4>Currency</h4>
                <input
                    type="text"
                    placeholder="Currency"
                    value={selectedCurrency}
                    onChange={handleInputChange}
                    readOnly
                    className="border-none border-gray-300 p-2 max-w-[9rem] md:mr-3"
                />
            </div>
        </div>

    );
};


export default BranchOffice