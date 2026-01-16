const LocationDetails = ({ location, actionLabel, onAction, onManageCategories }) => {

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px",
                backgroundColor: "#fff",
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >
                <tbody>
                    <tr>
                        <td style={labelStyle}>Name</td>
                        <td style={valueStyle}>{location.name}</td>
                    </tr>

                    <tr>
                        <td style={labelStyle}>Description</td>
                        <td style={valueStyle}>
                            {location.description || "—"}
                        </td>
                    </tr>

                    <tr>
                        <td style={labelStyle}>Address</td>
                        <td style={valueStyle}>
                            {location.address}<br />
                            {location.city}, {location.state} {location.zip}
                        </td>
                    </tr>

                    <tr>
                        <td style={labelStyle}>Phone</td>
                        <td style={valueStyle}>
                            {location.phone || "—"}
                        </td>
                    </tr>

                    <tr>
                        <td style={labelStyle}>Categories</td>
                        <td style={valueStyle}>
                            {location.categoriesList?.length
                                ? location.categoriesList.join(", ")
                                : "—"}
                        </td>
                    </tr>

                    <tr>
                        <td style={labelStyle}>Payments</td>
                        <td style={valueStyle}>
                            {location.tarjetaBancomer && "💳 Bancomer "}
                            {location.oxxo && "🏪 OXXO"}
                            {!location.tarjetaBancomer && !location.oxxo && "—"}
                        </td>
                    </tr>

                    {onAction && (
                        <tr>
                            <td style={labelStyle}>Action</td>
                            <td style={valueStyle}>
                                <button
                                    onClick={() => onAction(location.id)}
                                    style={{
                                        padding: "6px 12px",
                                        borderRadius: "4px",
                                        border: "none",
                                        cursor: "pointer",
                                        backgroundColor:
                                            actionLabel === "Remove"
                                                ? "#dc3545"
                                                : "#28a745",
                                        color: "white",
                                    }}
                                >
                                    {actionLabel}
                                </button>
                                <button
                                    onClick={() => onManageCategories(location)}
                                    style={{
                                        marginLeft: "8px",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        border: "none",
                                        padding: "6px 12px",
                                        borderRadius: "4px",
                                    }}
                                >
                                    🗂 Manage Categories
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const labelStyle = {
    width: "140px",
    padding: "6px 8px",
    fontWeight: "600",
    verticalAlign: "top",
    borderBottom: "1px solid #eee",
    backgroundColor: "#fafafa",
};

const valueStyle = {
    padding: "6px 8px",
    borderBottom: "1px solid #eee",
};

export default LocationDetails;
