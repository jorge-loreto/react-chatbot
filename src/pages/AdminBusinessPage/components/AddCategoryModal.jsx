import React, { useEffect, useState } from "react";
import { getAllCategories } from "../api/categoryApi";

const AddCategoryModal = ({ open, existingCategoryIds, onAdd, onClose }) => {
    const [allCategories, setAllCategories] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (open) {
            getAllCategories().then(setAllCategories);
            setSelected([]); // reset selection when opening
        }
    }, [open]);

    const available = allCategories.filter(
        c => !existingCategoryIds.includes(c.id)
    );

    if (!open) return null;

    const handleCheckboxChange = (cat, checked) => {
        setSelected(prev =>
            checked
                ? [...prev, cat]
                : prev.filter(c => c.id !== cat.id)
        );
    };

    return (
        <div className="modal">
            <h3>Agregar categorías</h3>

            <table className="categories-table">
                <thead>
                    <tr>
                        <th>Seleccionar</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {available.length === 0 ? (
                        <tr>
                            <td colSpan="2">No hay categorías disponibles</td>
                        </tr>
                    ) : (
                        available.map(cat => (
                            <tr key={cat.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selected.some(c => c.id === cat.id)}
                                        onChange={(e) =>
                                            handleCheckboxChange(cat, e.target.checked)
                                        }
                                    />
                                </td>
                                <td>{cat.name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="modal-actions">
                <button onClick={() => onAdd(selected)} disabled={selected.length === 0}>
                    Agregar
                </button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default AddCategoryModal;
