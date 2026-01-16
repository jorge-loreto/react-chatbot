import React, { useState } from "react";
import { createLocation } from "../api/locationApi";

const LocationForm = ({ businessId, onCancel, onSuccess }) => {
    const [location, setLocation] = useState({
        name: "",
        description: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        categoriesList: [],
        tarjetaBancomer: "",
        oxxo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLocation((prev) => ({
            ...prev,
            [name]:
                name === "categoriesList"
                    ? value.split(",").map((c) => c.trim())
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createLocation(location, businessId);
            alert("✅ Location saved successfully!");

            onSuccess?.(); // 👈 THIS resets everything
        } catch (err) {
            console.error("Error saving location", err);
            alert("❌ Error saving location");
        }
    };


    return (
        <div style={{ border: "1px solid #ccc", padding: 20 }}>
            <h3>New Location</h3>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
            />

            <input
                name="description"
                placeholder="Description"
                onChange={handleChange}
            />

            <input
                name="address"
                placeholder="Address"
                onChange={handleChange}
            />

            <input
                name="city"
                placeholder="City"
                onChange={handleChange}
            />

            <input
                name="state"
                placeholder="State"
                onChange={handleChange}
            />

            <input
                name="zip"
                placeholder="ZIP"
                onChange={handleChange}
            />

            <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
            />

            <input
                name="categoriesList"
                placeholder="Categories (comma separated)"
                onChange={handleChange}
            />

            <input
                name="tarjetaBancomer"
                placeholder="Tarjeta Bancomer"
                onChange={handleChange}
            />

            <input
                name="oxxo"
                placeholder="OXXO"
                onChange={handleChange}
            />

            <div style={{ marginTop: 10 }}>
                <button
                    type="button"
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "6px",
                    }}
                >
                    Save Location
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    style={{ marginLeft: 10 }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LocationForm;
