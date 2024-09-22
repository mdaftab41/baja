const { parse } = require('querystring');

// Function to decode base64 string
const decodeBase64 = (base64String) => {
    return Buffer.from(base64String, 'base64').toString('binary');
};

// Utility functions
const validateFile = (file_b64) => {
    try {
        const decoded = decodeBase64(file_b64);
        const sizeInKB = Buffer.byteLength(decoded, 'binary') / 1024;
        const isValid = true; // Assuming it's valid for example purposes
        return { file_valid: isValid, file_size_kb: sizeInKB, file_mime_type: 'application/pdf' };
    } catch (err) {
        return { file_valid: false, file_size_kb: 0, file_mime_type: null };
    }
};

const getHighestLowercase = (alphabets) => {
    const lowercaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
    if (lowercaseAlphabets.length > 0) {
        return [lowercaseAlphabets.sort().reverse()[0]];
    }
    return [];
};

// User data (hardcoded for example)
const user_id = "john_doe_17091999";
const email = "john@xyz.com";
const roll_number = "ABCD123";

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const { data, file_b64 } = JSON.parse(event.body);
        
        // Validate input
        if (!data) {
            return {
                statusCode: 400,
                body: JSON.stringify({ is_success: false, message: 'Invalid input' }),
                headers: { 'Access-Control-Allow-Origin': '*' }
            };
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));

        // Get highest lowercase alphabet
        const highestLowercaseAlphabet = getHighestLowercase(alphabets);

        // File validation
        const fileInfo = file_b64 ? validateFile(file_b64) : { file_valid: false, file_size_kb: 0, file_mime_type: null };

        return {
            statusCode: 200,
            body: JSON.stringify({
                is_success: true,
                user_id: user_id,
                email: email,
                roll_number: roll_number,
                numbers: numbers,
                alphabets: alphabets,
                highest_lowercase_alphabet: highestLowercaseAlphabet,
                file_valid: fileInfo.file_valid,
                file_mime_type: fileInfo.file_mime_type,
                file_size_kb: fileInfo.file_size_kb
            }),
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
    } else if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify({ operation_code: 1 }),
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
    }

    // Handle other HTTP methods
    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
        headers: { 'Access-Control-Allow-Origin': '*' }
    };
};
