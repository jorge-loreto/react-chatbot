import React, { useEffect, useState } from "react";
import { getCourseDetails, updateCourseDetails } from "../api/categoryApi"; // update when ready

const DetailsModal = ({ locationId, locationName, category, onClose }) => {
    const [details, setDetails] = useState(null);
    const [editedDetails, setEditedDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const data = await getCourseDetails(locationId, category.id);
                setDetails(data);
                setEditedDetails(data); // clone for editing
            } catch (err) {
                console.error("Failed to load course details", err);
            } finally {
                setLoading(false);
            }
        };

        loadDetails();
    }, [locationId, category.id]);

    const handleUpdate = async () => {
        try {
            // 🔌 connect backend when ready
            await updateCourseDetails(locationId, category.id, editedDetails);

            setDetails(editedDetails);
            setIsEditing(false);
            alert("✅ Course details updated");
        } catch (err) {
            console.error("Update failed", err);
            alert("❌ Failed to update details");
        }
    };

    const cancelEdit = () => {
        setEditedDetails(details);
        setIsEditing(false);
    };

    return (
        <div style={modalOverlay}>
            <div style={modalBox}>
                <h3 style={{ marginTop: 0 }}>📍 Location & Category Details</h3>

                {/* BASIC INFO */}
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                        <InfoRow label="Location ID" value={locationId} />
                        <InfoRow label="Location Name" value={locationName} />
                        <InfoRow label="Category ID" value={category.id} />
                        <InfoRow label="Category Name" value={category.name} />
                    </tbody>
                </table>

                <hr />

                <h4>📚 Detalles del curso</h4>

                {loading ? (
                    <p>Loading details...</p>
                ) : details ? (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                            <EditableRow
                                label="Horario"
                                value={editedDetails.horario}
                                editing={isEditing}
                                onChange={(v) =>
                                    setEditedDetails({ ...editedDetails, horario: v })
                                }
                            />
                            <EditableRow
                                label="Start Date"
                                value={editedDetails.startDate}
                                editing={isEditing}
                                onChange={(v) =>
                                    setEditedDetails({ ...editedDetails, startDate: v })
                                }
                            />
                            <EditableRow
                                label="Inscripción"
                                value={editedDetails.costoInscripcion}
                                editing={isEditing}
                                type="number"
                                onChange={(v) =>
                                    setEditedDetails({
                                        ...editedDetails,
                                        costoInscripcion: Number(v)
                                    })
                                }
                            />
                            <EditableRow
                                label="Colegiatura"
                                value={editedDetails.costoColegiatura}
                                editing={isEditing}
                                type="number"
                                onChange={(v) =>
                                    setEditedDetails({
                                        ...editedDetails,
                                        costoColegiatura: Number(v)
                                    })
                                }
                            />
                            <EditableRow
                                label="Admisión"
                                value={editedDetails.admision}
                                editing={isEditing}
                                checkbox
                                onChange={(v) =>
                                    setEditedDetails({ ...editedDetails, admision: v })
                                }
                            />

                            {/* ACTION ROW */}
                            <tr>
                                <td style={modalLabel}>Actions</td>
                                <td style={modalValue}>
                                    {!isEditing ? (
                                        <button onClick={() => setIsEditing(true)}>
                                            ✏️ Edit
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={handleUpdate}>💾 Update</button>
                                            <button
                                                onClick={cancelEdit}
                                                style={{ marginLeft: "8px" }}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No details found</p>
                )}

                <div style={{ textAlign: "right", marginTop: "20px" }}>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

/* ---------- HELPERS ---------- */

const InfoRow = ({ label, value }) => (
    <tr>
        <td style={modalLabel}>{label}</td>
        <td style={modalValue}>{value}</td>
    </tr>
);

const EditableRow = ({
    label,
    value,
    editing,
    onChange,
    type = "text",
    checkbox
}) => (
    <tr>
        <td style={modalLabel}>{label}</td>
        <td style={modalValue}>
            {editing ? (
                checkbox ? (
                    <input
                        type="checkbox"
                        checked={!!value}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                ) : (
                    <input
                        type={type}
                        value={value ?? ""}
                        onChange={(e) => onChange(e.target.value)}
                        style={input}
                    />
                )
            ) : checkbox ? (
                value ? "Sí" : "No"
            ) : (
                value
            )}
        </td>
    </tr>
);

/* ---------- STYLES ---------- */

const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
};

const modalBox = {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "420px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
};

const modalLabel = {
    fontWeight: "bold",
    padding: "8px",
    background: "#f9f9f9",
    border: "1px solid #ddd",
    width: "40%"
};

const modalValue = {
    padding: "8px",
    border: "1px solid #ddd"
};

const input = {
    width: "100%",
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px"
};

export default DetailsModal;
