import React, { useEffect, useState } from "react";
import { getCategoriesByIds } from "../api/categoryApi";
import { updateLocation } from "../api/locationApi"; // enable when backend ready
import { updateCategory } from "../api/categoryApi";
import DetailsModal from "./DetailsModal";
import AddCategoryModal from "./AddCategoryModal.jsx";
const LocationCategoriesPage = ({ locationId, location, onEditBack }) => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(false);
    const [editedLocation, setEditedLocation] = useState({});
    const [detailsModal, setDetailsModal] = useState({
        open: false,
        category: null
    });

    useEffect(() => {
        if (location) {
            setEditedLocation(location);
        }
    }, [location]);

    useEffect(() => {
        const loadCategories = async () => {
            if (!location?.categoriesList || location.categoriesList.length === 0) {
                setCategories([]);
                return;
            }
            try {
                const data = await getCategoriesByIds(location.categoriesList);
                setCategories(data);
            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };

        loadCategories();
    }, [location]);

    useEffect(() => {
        const loadCategories = async () => {
            if (!editedLocation?.categoriesList || editedLocation.categoriesList.length === 0) {
                setCategories([]);
                return;
            }
            try {
                const data = await getCategoriesByIds(editedLocation.categoriesList);
                setCategories(data);
            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };

        loadCategories();
    }, [editedLocation.categoriesList]);


    const borrarCatgoria = async (catLocationId) => {
        try {
            const [categoryId, locationId] = catLocationId.split(':');
            const updatedCategories = categories.filter(cat => cat.id !== categoryId);
            setCategories(updatedCategories);
            // 2️⃣ Update location.categoriesList (IDs only)
            setEditedLocation(prev => {
                const updated = {
                    ...prev,
                    categoriesList: prev.categoriesList.filter(id => id !== categoryId)
                };
                console.log("Updating location with categoriesList:", updated);
                updateLocation(locationId, updated); // ✅ correct
                return updated;
            });
            alert("✅ Category deleted (frontend only)");

        } catch (err) {
            console.error(err);
            alert("❌ Error deleting category");
        }
    };
    const saveLocation = async () => {
        try {
            await updateLocation(locationId, editedLocation);
            setIsEditingLocation(false);
            alert("Location updated (frontend only)");
        } catch (err) {
            console.error(err);
            alert("Error updating location");
        }
    };
    const updateCategoryData = async (categoryId, categoryData) => {
        try {
            const updatedCat = await updateCategory(categoryId, categoryData);
            setEditingCategory(null);
            alert("✅ Category updated successfully");

        } catch (err) {
            console.error("Failed to update category", err);
            alert("❌ Error updating category");
        }
    };

    const cancelLocationEdit = () => {
        setEditedLocation(location);
        setIsEditingLocation(false);
    };



    const openDetailsModal = (category) => {
        setDetailsModal({
            open: true,
            category
        });
    };

    const closeDetailsModal = () => {
        setDetailsModal({
            open: false,
            category: null
        });
    };

    const openAddCategoryModal = () => {
        setAddCategoryModalOpen(true);
    }

    let count = 0;

    return (
        <div style={{ maxWidth: "1200px", margin: "20px auto" }}>
            <h1>📍 {location?.name}</h1>

            {/* LOCATION TABLE */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "10px" }}>
                <tbody>

                    <LocationRow
                        label="Name"
                        value={editedLocation.name}
                        editing={isEditingLocation}
                        onChange={(v) =>
                            setEditedLocation(prev => ({ ...prev, name: v }))
                        }
                    />

                    <LocationRow
                        label="Description"
                        value={editedLocation.description}
                        editing={isEditingLocation}
                        onChange={(v) =>
                            setEditedLocation(prev => ({ ...prev, description: v }))
                        }
                    />

                    <LocationRow
                        label="Address"
                        value={editedLocation.address}
                        editing={isEditingLocation}
                        textarea
                        onChange={(v) =>
                            setEditedLocation(prev => ({ ...prev, address: v }))
                        }
                    />

                    <LocationRow
                        label="City"
                        value={editedLocation.city}
                        editing={isEditingLocation}
                        onChange={(v) =>
                            setEditedLocation(prev => ({ ...prev, city: v }))
                        }
                    />

                    <LocationRow
                        label="State"
                        value={editedLocation.state}
                        editing={isEditingLocation}
                        onChange={(v) =>
                            setEditedLocation(prev => ({ ...prev, state: v }))
                        }
                    />

                    <LocationRow
                        label="ZIP"
                        value={editedLocation.zip}
                        editing={isEditingLocation}
                        onChange={(v) =>
                            setEditedLocation(prev => ({ ...prev, zip: v }))
                        }
                    />

                    <LocationRow
                        label="Phone"
                        value={editedLocation.phone}
                        editing={isEditingLocation}
                        onChange={(v) =>
                            setEditedLocation(prev => ({ ...prev, phone: v }))
                        }
                    />

                    <LocationRow
                        label="OXXO"
                        value={editedLocation.oxxo}
                        editing={isEditingLocation}
                        onChange={(v) =>
                            setEditedLocation(prev => ({ ...prev, oxxo: v }))
                        }
                    />

                    <LocationRow
                        label="Tarjeta Bancomer"
                        value={editedLocation.tarjetaBancomer}
                        editing={isEditingLocation}
                        onChange={(v) =>
                            setEditedLocation(prev => ({ ...prev, tarjetaBancomer: v }))
                        }
                    />

                </tbody>
            </table>


            {/* LOCATION ACTIONS */}
            {!isEditingLocation ? (
                <button onClick={() => setIsEditingLocation(true)}>
                    ✏️ Edit Location
                </button>
            ) : (
                <>
                    <button onClick={saveLocation}>💾 Save</button>
                    <button onClick={cancelLocationEdit} style={{ marginLeft: "10px" }}>
                        Cancel
                    </button>
                </>
            )}

            <hr />

            {/* CATEGORIES */}
            <h2>🗂 Categories</h2>

            <button onClick={() => openAddCategoryModal()}>
                + AGREGAR
            </button>

            {categories.length === 0 ? (
                <p>No categories yet</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f0f0f0" }}>
                            <th style={th}>Borrar</th>
                            <th style={th}>Image</th>
                            <th style={th}>Name</th>
                            <th style={th}>Description</th>
                            <th style={th}>Actions</th>
                            <th style={th}>Detalles</th>
                            <th style={th}>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => {
                            const isEditing = editingCategory?.id === cat.id;

                            return (
                                <tr key={cat.id}>
                                    {/* IMAGE */}
                                    <td style={td}>{++count}
                                    </td>
                                    <td style={td}>
                                        <button onClick={() => borrarCatgoria(cat.id + ':' + editedLocation.id)}>Borrar</button>
                                    </td>
                                    <td style={td}>
                                        {isEditing ? (
                                            <input
                                                value={editingCategory.image || ""}
                                                onChange={(e) =>
                                                    setEditingCategory({
                                                        ...editingCategory,
                                                        image: e.target.value
                                                    })
                                                }
                                                style={input}
                                                placeholder="Image URL"
                                            />
                                        ) : (
                                            cat.image
                                        )}
                                    </td>

                                    {/* NAME */}
                                    <td style={td}>
                                        {isEditing ? (
                                            <input
                                                value={editingCategory.name}
                                                onChange={(e) =>
                                                    setEditingCategory({
                                                        ...editingCategory,
                                                        name: e.target.value
                                                    })
                                                }
                                                style={input}
                                            />
                                        ) : (
                                            cat.name
                                        )}
                                    </td>

                                    {/* DESCRIPTION */}
                                    <td style={td}>
                                        {isEditing ? (
                                            <input
                                                value={editingCategory.description || ""}
                                                onChange={(e) =>
                                                    setEditingCategory({
                                                        ...editingCategory,
                                                        description: e.target.value
                                                    })
                                                }
                                                style={input}
                                            />
                                        ) : (
                                            cat.description || "—"
                                        )}
                                    </td>

                                    {/* ACTIONS */}
                                    <td style={td}>
                                        {!isEditing ? (
                                            <button onClick={() => setEditingCategory({ ...cat })}>
                                                ✏️ Edit
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setCategories(categories.map(c =>
                                                            c.id === editingCategory.id ? editingCategory : c
                                                        ));
                                                        updateCategoryData(editingCategory.id, editingCategory);
                                                        // TODO: call updateCategory API
                                                    }}
                                                >
                                                    💾 Update
                                                </button>
                                                <button
                                                    onClick={() => setEditingCategory(null)}
                                                    style={{ marginLeft: "8px" }}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </td>
                                    <td style={td}>
                                        <button onClick={() => openDetailsModal(cat)}>
                                            📋 Detalles
                                        </button>
                                    </td>
                                </tr>

                            );
                        })}

                    </tbody>

                </table>
            )}

            <hr />
            <button onClick={onEditBack}>← Back</button>
            {/* DETAILS MODAL */}
            {detailsModal.open && (
                <DetailsModal
                    locationId={locationId}
                    locationName={location?.name}
                    category={detailsModal.category}
                    onClose={closeDetailsModal}
                />
            )}
            {/*ADD CATEGORY MODAL */}
            <AddCategoryModal
                open={addCategoryModalOpen}
                locationId={locationId}

                existingCategoryIds={editedLocation.categoriesList || []} // ✅ FIX
                onClose={() => setAddCategoryModalOpen(false)}
                onAdd={(newCategories) => {
                    setCategories(prev => {
                        const existingIds = new Set(prev.map(c => c.id));

                        const filtered = newCategories.filter(
                            c => !existingIds.has(c.id)
                        );

                        return [...prev, ...filtered];
                    });
                    // 2️⃣ Update location.categoriesList (IDs only)
                    setEditedLocation(prev => {
                        const currentIds = new Set(prev.categoriesList || []);
                        newCategories.forEach(cat => currentIds.add(cat.id));

                        const updated = {
                            ...prev,
                            categoriesList: Array.from(currentIds)
                        };
                        console.log("Updating location with categoriesList:", updated);
                        updateLocation(locationId, updated); // ✅ correct

                        return updated;
                    });

                    setAddCategoryModalOpen(false);
                }}
            />

        </div>
    );
};

/* ---------- HELPERS ---------- */
const LocationRow = ({ label, value, editing, onChange, textarea }) => (
    <tr>
        <td style={labelTd}>{label}</td>
        <td style={valueTd}>
            {editing ? (
                textarea ? (
                    <textarea
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        style={textareaStyle}
                        rows={3}
                    />
                ) : (
                    <input
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        style={input}
                    />
                )
            ) : (
                value || "—"
            )}
        </td>
    </tr>
);


/* ---------- STYLES ---------- */

const th = {
    border: "1px solid #ddd",
    padding: "8px"
};

const td = {
    border: "1px solid #ddd",
    padding: "8px"
};

const labelTd = {
    width: "25%",
    fontWeight: "bold",
    background: "#f9f9f9",
    border: "1px solid #ddd",
    padding: "8px"
};

const valueTd = {
    border: "1px solid #ddd",
    padding: "8px"
};

const input = {
    width: "100%",
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px"
};

const textareaStyle = {
    width: "100%",
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "vertical"
};


export default LocationCategoriesPage;
