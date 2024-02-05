"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";


import dataClients from '../data/clientes/clientes.json';
import AddUserForm from './crearteClient';
import BranchOffice from './BranchOffice';
import Details from './Details/Details';

const page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [createdClients, setCreatedClients] = useState([]);
  const [search, setSearch] = useState('');
  const [searchSelect, setSearchSelect] = useState('');
  const [dataDetails, setDataDetails] = useState('');

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  useEffect(() => {
    setClients(dataClients);
  }, []);



  const handleClickSave = () => {
    const datos = {
      search,
      searchSelect,
      dataDetails
    };
    const datosGuardados = JSON.parse(localStorage.getItem('datos')) || [];
    datosGuardados.push(datos);
    localStorage.setItem('datos', JSON.stringify(datosGuardados));

    alert('Datos guardados correctamente');
  };

  const allClients = [...clients, ...createdClients];

  const results = search && allClients.filter(e => {
    const searchTerm = search.toLowerCase().trim();
    const [searchName, searchLastName] = searchTerm.split(" ");

    return e.nombre.toLowerCase().includes(searchName) || e.apellido.toLowerCase().includes(searchLastName)

  })

  const handleInputChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    setSelectedClient(null)
  };

  const handleAddClient = (newClient) => {
    setCreatedClients(prevClients => [...prevClients, newClient]);
    setShowModal(false);
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setSearch(`${client.nombre} ${client.apellido}`);
  };

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : user ? (
        <>
          <div className="pl-5 md:pl-20">
            <div className="flex items-center flex-col md:flex-row mb-9">
              <img className="w-20 h-auto mb-4 md:mb-0 md:mr-4" src="../../image_sale.png" alt="" />
              <div className="p-3 flex-col md:flex-row items-center w-full">
                <h1 className="text-2xl md:text-3xl mb-3 md:mb-0 font-bold md:mr-4 pb-3">New Sale</h1>
                <hr className=" w-4/5 border-black-200 border-t-4" />
              </div>
            </div>
            <h2 className="text-2xl mb-4 font-medium">Documents</h2>
            <div className="flex flex-col md:flex-row gap-y-4 mb-4">
              <div className="mb-4 md:mb-0 mr-8 flex items-center">
                <div className="inline-block relative">
                  <h4>Client</h4>
                  <input
                    type="text"
                    placeholder="Search Client..."
                    value={search}
                    onChange={handleInputChange}
                    className="border-none border-gray-300 p-2 w-full md:w-96 mr-2"
                  />
                  {selectedClient ? null : (
                    <ul className="absolute z-10 left-0 w-full md:w-96 bg-white pl-4 rounded shadow-lg mt-1">
                      {search &&
                        results.map(e => (
                          <div key={e.id} onClick={() => handleSelectClient(e)} className="cursor-pointer hover:bg-gray-100">
                            <li>{e.nombre} {e.apellido}</li>
                          </div>
                        ))
                      }
                    </ul>
                  )}
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2.5 mt-6 mr-5 rounded hover:bg-blue-600"
                  onClick={() => setShowModal(true)}
                >
                  +
                </button>
              </div>
              <BranchOffice search={searchSelect} setSearch={setSearchSelect} />
            </div>
            <div className="flex mb-4">
              <div className="flex-1">
                <Details setDataDetails={setDataDetails} searchSelect={searchSelect} />
              </div>
            </div>
            <button onClick={handleClickSave} className="bg-blue-500 text-white px-4 py-2 mb-10 rounded hover:bg-blue-600 md:mr-4">
              Save
            </button>
          </div>
          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded shadow-lg">
                <AddUserForm onAddClient={handleAddClient} />
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold mt-5"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}


        </>
      ) : (
        <div className="flex flex-col justify-center p-10">
        <div className="text-center text-red-600">
          <p className="text-3xl font-bold mb-4">Error 401:</p>
          <p className="text-xl mb-6">Unauthorized Access</p>
          <p className="text-lg">You are not authorized to view this content. Please sign in to proceed.</p>
        </div>
      </div>
      

      )}
    </div>
  );
};

export default page;
