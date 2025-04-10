import React, { useEffect } from 'react';


const ApiComponent = ({ text, onApiResponse }) => {
    useEffect(() => {
        if (text) {
            const fetchApi = async () => {
                const url = `http://localhost:5000/chat/places`;
                try {
                    const res = await fetch(url, { method: 'GET' });
                    console.log(res);
                    if (res.ok) {
                        const data = await res.json(); // Assuming API returns JSON
                        onApiResponse(data); // Send the response back to parent
                    } else {
                        console.error("API Error:", res.statusText);
                        onApiResponse(`Error: ${res.statusText}`);
                    }
                } catch (error) {
                    console.error("Fetch Error:", error);
                    onApiResponse(`Error: ${error.message}`);
                }
            };

            fetchApi();
        }
    }, [text, onApiResponse]);


    return null; // This component only handles the API call; it doesn't render anything
};

export default ApiComponent;
