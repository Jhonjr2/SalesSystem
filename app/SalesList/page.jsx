"use client"
import { useEffect, useState } from 'react';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [detalleVisibleIndex, setDetalleVisibleIndex] = useState(null);

  useEffect(() => {
    const ventasGuardadas = JSON.parse(localStorage.getItem('datos')) || [];
    setVentas(ventasGuardadas);
  }, []);

  const handleVerDetalles = (index) => {
    setDetalleVisibleIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lista de Ventas</h1>
      {ventas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ventas.map((venta, index) => (
            <div key={index} className="bg-white shadow-lg rounded-md p-4" style={{ overflow: 'hidden' }}>
              <h2 className="text-lg font-semibold mb-2">{venta.search}</h2>
              <p className="text-sm text-gray-600 mb-2">{venta.searchSelect}</p>
              <button
                onClick={() => handleVerDetalles(index)}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
              >
                {detalleVisibleIndex === index ? 'Ocultar Detalles' : 'Ver Detalles'}
              </button>
              {detalleVisibleIndex === index && (
                <div className="mt-4" style={{ maxHeight: '500px', overflow: 'hidden', transition: 'max-height 0.5s ease-in-out' }}>
                  <h3 className="text-xl font-semibold mb-2">Detalles:</h3>
                  {venta.dataDetails && (
                    <ul className="divide-y divide-gray-200">
                      {venta.dataDetails.map((detalle, i) => (
                        <li key={i} className="py-2">
                          <div className='flex '>
                            <span className="block font-semibold">Product:</span>
                            <span className="block ml-3">{detalle.name}</span>
                          </div>
                          <div className='flex'>
                            <span className="block font-semibold">Precio:</span>
                            <span className="block ml-6">{detalle.price}</span>
                          </div>
                          <div className='flex'>
                            <span className="block font-semibold">Cantidad:</span>
                            <span className="block ml-2">{detalle.quantity}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ventas;
