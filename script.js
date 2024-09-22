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

// function filterResponse() {
//     const response = JSON.parse(document.getElementById('responseContainer').innerText);
//     const selectedOptions = Array.from(document.getElementById('multiSelect').selectedOptions).map(option => option.value);
//     const filteredData = {};

//     // Build the filtered data based on selected options
//     if (selectedOptions.includes("alphabets")) {
//         filteredData.numbers = response.alphabets || []; // Use empty array if not available
//     }
//     if (selectedOptions.includes("numbers")) {
//         filteredData.numbers = response.numbers || []; // Use empty array if not available
//     }
//     if (selectedOptions.includes("highestLowercase")) {
//         filteredData.highestLowercase = response.highest_lowercase_alphabet || null; // Use null if not available
//     }

//     // Format the output for display
//     const resultStrings = Object.entries(filteredData)
//         .map(([key, value]) => `${key}: ${value.length > 0 ? value.join(', ') : 'No data'}`)
//         .join('\n');

//     document.getElementById('filteredResult').innerText = resultStrings || 'No data available for selected filters';
// }
 
function filterResponse() {
    const responseText = document.getElementById('responseContainer').innerText;

    if (responseText) {
        const response = JSON.parse(responseText);
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

        // Format the output for display
        const resultStrings = Object.entries(filteredData)
            .map(([key, value]) => `${key}: ${value.length > 0 ? value.join(', ') : 'No data'}`)
            .join('\n');

        document.getElementById('filteredResult').innerText = resultStrings || 'No data available for selected filters';

        // Clear the response container
        document.getElementById('responseContainer').innerText = '';
    }
}
