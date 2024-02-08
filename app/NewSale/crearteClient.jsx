"use client"
import { useState } from 'react';

const AddUserForm = ({ onAddClient }) => {
    const [formData, setFormData] = useState({
        id: '',
        RUT: '',
        nombre: '',
        apellido: '',
        direccion: {
            calle: '',
            numero: '',
            comuna: '',
            ciudad: ''
        },
        telefono: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('direccion')) {
            setFormData(prevState => ({
                ...prevState,
                direccion: {
                    ...prevState.direccion,
                    [name.split('.')[1]]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddClient(formData);
        setFormData({
            id: '',
            RUT: '',
            nombre: '',
            apellido: '',
            direccion: {
                calle: '',
                numero: '',
                comuna: '',
                ciudad: ''
            },
            telefono: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4 pl-5 pr-5">
            <input
                type="text"
                name="RUT"
                value={formData.RUT}
                onChange={handleChange}
                placeholder="RUT"
                className="input-field border mt-6 pl-3 rounded"
            />
            <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="input-field border mt-4 pl-3 rounded"
            />
            <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                className="input-field border mt-4 pl-3 rounded"
            />
            <input
                type="text"
                name="direccion.calle"
                value={formData.direccion.calle}
                onChange={handleChange}
                placeholder="Calle"
                className="input-field border mt-4 pl-3 rounded"
            />
            <input
                type="text"
                name="direccion.numero"
                value={formData.direccion.numero}
                onChange={handleChange}
                placeholder="Número"
                className="input-field border mt-4 pl-3 rounded"
            />
            <input
                type="text"
                name="direccion.comuna"
                value={formData.direccion.comuna}
                onChange={handleChange}
                placeholder="Comuna"
                className="input-field border mt-4 pl-3 rounded"
            />
            <input
                type="text"
                name="direccion.ciudad"
                value={formData.direccion.ciudad}
                onChange={handleChange}
                placeholder="Ciudad"
                className="input-field border mt-4 pl-3 rounded"
            />
            <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="input-field border mt-4 pl-3 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2.5 mt-6 mr-5 rounded hover:bg-blue-600">Crear Cliente</button>
        </form>
    );
};

export default AddUserForm;
