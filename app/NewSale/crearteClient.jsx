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

    // console.log('Estado actual de formData:', formData);


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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input
                type="text"
                name="RUT"
                value={formData.RUT}
                onChange={handleChange}
                placeholder="RUT"
                className="input-field"
            />
            <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="input-field"
            />
            <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                className="input-field"
            />
            <input
                type="text"
                name="direccion.calle"
                value={formData.direccion.calle}
                onChange={handleChange}
                placeholder="Calle"
                className="input-field"
            />
            <input
                type="text"
                name="direccion.numero"
                value={formData.direccion.numero}
                onChange={handleChange}
                placeholder="Número"
                className="input-field"
            />
            <input
                type="text"
                name="direccion.comuna"
                value={formData.direccion.comuna}
                onChange={handleChange}
                placeholder="Comuna"
                className="input-field"
            />
            <input
                type="text"
                name="direccion.ciudad"
                value={formData.direccion.ciudad}
                onChange={handleChange}
                placeholder="Ciudad"
                className="input-field"
            />
            <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="input-field"
            />
            <button type="submit" className="btn-primary">Crear Cliente</button>
        </form>
    );
};

export default AddUserForm;
