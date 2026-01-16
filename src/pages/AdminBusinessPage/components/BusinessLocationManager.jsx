import React, { useEffect, useState } from "react";
import {
    getLocationsByBusiness,
    getUnassignedLocations,
    assignLocationToBusiness,
    unassignLocationFromBusiness,
} from "../api/locationApi";
import LocationDetails from "./LocationDetails";
import LocationCategoriesPage from "./LocationCategoriesPage";


const BusinessLocationManager = ({ businessId, onChange, onEditBack }) => {
    const [assigned, setAssigned] = useState([]);
    const [available, setAvailable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [location, setLocation] = useState(null);
    const [showCat, setShowCat] = useState(false);

    const handleManageCategories = (locationId, location) => {
        setShowCat(true);
        setSelectedLocationId(locationId);
        setLocation(location);
    };

    const unHandleManageCategories = () => {
        setShowCat(false);
        setSelectedLocationId(null);
        setLocation(null);
        loadLocations();
    };

    const loadLocations = async () => {
        try {
            setLoading(true);
            const [assignedRes, availableRes] = await Promise.all([
                getLocationsByBusiness(businessId),
                getUnassignedLocations(),
            ]);

            setAssigned(assignedRes);
            setAvailable(availableRes);
        } catch (err) {
            console.error(err);
            setError("Error loading locations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (businessId) {
            loadLocations();
        }
    }, [businessId]);



    const handleAssign = async (locationId) => {
        try {
            await assignLocationToBusiness(locationId, businessId);
            loadLocations();
            //onChange?.();
        } catch (err) {
            console.error(err);
            alert("❌ Failed to assign location");
        }
    };

    const handleUnassign = async (locationId) => {
        if (!window.confirm("Remove this location from business?")) return;

        try {
            await unassignLocationFromBusiness(locationId, businessId);
            loadLocations();
            //onChange?.();
        } catch (err) {
            console.error(err);
            alert("❌ Failed to remove location");
        }
    };

    if (loading) {
        return <p>Loading locations...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <>
            {showCat ? (
                <div style={{ margin: "20px auto", maxWidth: "600px" }}>
                    <button onClick={() => setShowCat(false)}>← Back to locations</button>
                    <LocationCategoriesPage
                        locationId={selectedLocationId}
                        location={location}
                        onEditBack={unHandleManageCategories}
                    />
                </div>
            ) : (
                <div
                    style={{
                        margin: "20px auto",
                        maxWidth: "600px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "15px",
                        backgroundColor: "#fafafa",
                    }}
                >
                    <h4>📍 Locations for this business</h4>

                    {/* ASSIGNED */}
                    <ul>
                        {assigned.length === 0 && <li>No locations assigned</li>}
                        {assigned.map((loc) => (
                            <li key={loc.id} style={{ marginBottom: "5px" }}>
                                <LocationDetails
                                    location={loc}
                                    actionLabel="Remove"
                                    onAction={handleUnassign}
                                    onManageCategories={() => handleManageCategories(loc.id, loc)}
                                />
                            </li>
                        ))}
                    </ul>

                    <hr />

                    {/* AVAILABLE */}
                    <h5>➕ Add existing location</h5>
                    {available.length === 0 && <p>No unassigned locations available</p>}

                    <ul>
                        {available.map((loc) => (
                            <li key={loc.id} style={{ marginBottom: "5px" }}>
                                <LocationDetails
                                    location={loc}
                                    actionLabel="Add"
                                    onAction={handleAssign}
                                    onManageCategories={() => handleManageCategories(loc.id, loc)}
                                    onEditBack={onEditBack}
                                />

                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default BusinessLocationManager;
