// frontend/script.js

const queryButton = document.getElementById("queryButton");

const resultText = document.getElementById("resultText");


queryButton.addEventListener("click", async () => {

    const latitude =
        document.getElementById("latitude").value;

    const longitude =
        document.getElementById("longitude").value;


    // Input validation
    if (latitude === "" || longitude === "") {

        resultText.innerHTML =
            "Please enter both latitude and longitude.";

        return;
    }


    // Show loading message
    resultText.innerHTML =
        "Retrieving geoid height...";


    try {

        // Backend API URL
        const apiURL =
            `https://nepal-geoid-height-api.onrender.com/geoid_height?lat=${latitude}&lon=${longitude}`;


        // Send request
        const response = await fetch(apiURL);


        // Check server response
        if (!response.ok) {

            throw new Error(
                "Backend server error"
            );
        }


        // Parse JSON
        const data = await response.json();


        // Display results
        resultText.innerHTML = `
            <strong>Latitude:</strong> ${data.latitude}<br>
            <strong>Longitude:</strong> ${data.longitude}<br>
            <strong>Geiod Height:</strong> ${data.geoid_height.toFixed(2)} meters
        `;

    } catch (error) {

        console.error(error);

        resultText.innerHTML =
            "Failed to retrieve geoid height.";
    }

});
