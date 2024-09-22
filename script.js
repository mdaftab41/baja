const apiUrl = 'https://bajaj-test.netlify.app/.netlify/functions/bfhl'; // Replace with your API endpoint

async function handleSubmit() {
    const jsonInput = document.getElementById('jsonInput').value;
    const inputError = document.getElementById('inputError');
    inputError.innerText = '';

    // Validate JSON
    try {
        const jsonData = JSON.parse(jsonInput);
        if (!jsonData.data) throw new Error("Invalid JSON structure");

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        document.getElementById('responseContainer').innerText = JSON.stringify(result, null, 2);
        document.getElementById('multiSelectContainer').style.display = 'block';
    } catch (error) {
        inputError.innerText = 'Error: ' + error.message;
    }
}

function filterResponse() {
    const response = JSON.parse(document.getElementById('responseContainer').innerText);
    const selectedOptions = Array.from(document.getElementById('multiSelect').selectedOptions).map(option => option.value);
    const filteredData = {};

    // Build the filtered data based on selected options
    if (selectedOptions.includes("alphabets")) {
        filteredData.alphabets = response.alphabets || []; // Use empty array if not available
    }
    if (selectedOptions.includes("numbers")) {
        filteredData.numbers = response.numbers || []; // Use empty array if not available
    }
    if (selectedOptions.includes("highestLowercase")) {
        filteredData.highestLowercase = response.highest_lowercase_alphabet || null; // Use null if not available
    }

    document.getElementById('filteredResult').innerText = JSON.stringify(filteredData, null, 2);
}
