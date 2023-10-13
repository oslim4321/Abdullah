
const verificationCodes = [
    758163, 387611, 733363, 739153, 293930,
    157202, 550710, 640827, 775884, 188470,
    598366, 590618, 172374, 430823, 218964,
    754716, 168166, 352756, 895337, 333146,
    944373, 984034, 744490, 693352, 525748,
    419068, 951104, 856929, 265444, 302768,
    794304, 678558, 161470, 174692, 112339,
    962998, 659211, 663684, 432946, 576908,
    983343, 505711, 986096, 582575, 178758,
    388620, 724741, 891359, 300675, 450477
]

const SERVICE_PLAN_ID = "0be9ac01228d435da15aaaceceb22729";
const API_TOKEN = "8e13d3a3c1884d6faa3b45d7ae150d4b";
const SINCH_NUMBER = "+447520651063"

/**
 * Handles the POST request to send a verification code via SMS.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - A JSON response indicating the success or failure of the operation.
 * @throws {Error} - If there's an error during the SMS sending process.
 */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    try {
        // Extract the 'number' from the request body
        const { number } = req.body;

        // Generate a random verification code from 'verificationCodes' array
        const randomCodeIndex = Math.floor(Math.random() * verificationCodes.length);
        const randomCode = verificationCodes[randomCodeIndex];

        // Send an SMS using the Sinch API
        let resp = await fetch('https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + API_TOKEN
            },
            body: JSON.stringify({
                from: SINCH_NUMBER,
                to: [number],
                body: 'Your Maglo Verification Code is: ' + randomCode
            })
        })

        // Parse the response from Sinch API
        resp = await resp.json();
        
        // Check if the response indicates an invalid parameter format
        if (resp.code === "syntax_invalid_parameter_format") {
            return res.status(500).json({ success: false, message: "Invalid Number" })
        }

        // Check if the SMS was sent successfully
        if (resp.id) {
            return res.status(200).json({ success: true, message: "Verification Code Sent" })
        }

        // If neither condition is met, something went wrong
        return res.status(500).json({ success: false, message: "Something Went Wrong" });
    } catch (error) {
        // If there's an error during the SMS sending process, log it and return an error response
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })
    }
}
