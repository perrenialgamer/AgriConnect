
const approvedCrops = [
    "Arecanut", "Other Kharif pulses", "Rice", "Banana", "Cashewnut", "Coconut", "Dry ginger", "Sugarcane",
    "Sweet potato", "Tapioca", "Black pepper", "Dry chillies", "other oilseeds", "Turmeric", "Maize", "Moong(Green Gram)",
    "Urad", "Arhar/Tur", "Groundnut", "Sunflower", "Bajra", "Castor seed", "Cotton(lint)", "Horse-gram", "Jowar", "Korra",
    "Ragi", "Tobacco", "Gram", "Wheat", "Masoor", "Sesamum", "Linseed", "Safflower", "Onion", "other misc. pulses",
    "Samai", "Small millets", "Coriander", "Potato", "Other Rabi pulses", "Soyabean", "Beans & Mutter(Vegetable)", "Bhindi",
    "Brinjal", "Citrus Fruit", "Cucumber", "Grapes", "Mango", "Orange", "other fibres", "Other Fresh Fruits", "Other Vegetables",
    "Papaya", "Pome Fruit", "Tomato", "Mesta", "Cowpea(Lobia)", "Lemon", "Pome Granet", "Sapota", "Cabbage", "Rapeseed &Mustard",
    "Peas (vegetable)", "Niger seed", "Bottle Gourd", "Varagu", "Garlic", "Ginger", "Oilseeds total", "Pulses total", "Jute",
    "Peas & beans (Pulses)", "Blackgram", "Paddy", "Pineapple", "Barley", "Sannhamp", "Khesari", "Guar seed", "Moth",
    "Other Cereals & Millets", "Cond-spcs other", "Turnip", "Carrot", "Redish", "Arcanut (Processed)", "Atcanut (Raw)",
    "Cashewnut Processed", "Cashewnut Raw", "Cardamom", "Rubber", "Bitter Gourd", "Drum Stick", "Jack Fruit", "Snak Guard",
    "Tea", "Coffee", "Cauliflower", "Other Citrus Fruit", "Water Melon", "Total foodgrain", "Kapas", "Colocosia", "Lentil",
    "Bean", "Jobster", "Perilla", "Rajmash Kholar", "Ricebean (nagadal)", "Ash Gourd", "Beet Root", "Lab-Lab", "Ribed Guard",
    "Yam", "Pump Kin", "Apple", "Peach", "Pear", "Plums", "Litchi", "Ber", "Other Dry Fruit", "Jute & mesta"
];

const aboutCrops = async (req, res) => {
    try {
        const { city, state, date } = req.body;

        // 1. Input Validation
        if (!city || !state) {
            return res.status(400).json({ error: "City and state are required in the request body." });
        }

        // Use provided date or current date if not provided
        const currentDate = date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        // 2. Construct the Prompt for Gemini
        // The prompt now explicitly asks for a description for each crop.
        const prompt = `Given the location ${city}, ${state} and the current date ${currentDate}, recommend the best crops to grow.
        The crops MUST be selected ONLY from the following list: ${approvedCrops.join(', ')}.
        For each recommended crop, provide a brief description explaining why it is suitable for the given location and time.
        Provide the response as a JSON array of objects. Each object should have two properties: "cropName" (string) and "description" (string).
        Example: [{"cropName": "Rice", "description": "Suitable for the climate and soil type, good water availability during monsoon season."}, {"cropName": "Wheat", "description": "Ideal for winter cultivation due to cooler temperatures and sufficient irrigation."}]
        `;

        // 3. Gemini API Configuration and Call
        const geminiApiKey = process.env.GEMINI_API_KEY; // Get API key from environment variables
        if (!geminiApiKey) {
            console.error("GEMINI_API_KEY environment variable is not set.");
            return res.status(500).json({ error: "Server configuration error: Gemini API key is missing." });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            "cropName": { "type": "STRING" },
                            "description": { "type": "STRING" } // Changed from 'reason' to 'description'
                        },
                        // Ensure the order of properties in the output
                        "propertyOrdering": ["cropName", "description"]
                    }
                }
            }
        };

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // 4. Handle API Response
        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error("Gemini API error response:", errorData);
            return res.status(apiResponse.status).json({
                error: "Failed to get crop recommendations from Gemini API.",
                details: errorData.error ? errorData.error.message : "Unknown API error"
            });
        }

        const result = await apiResponse.json();

        // Check for the expected structure of the Gemini response
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {

            const jsonString = result.candidates[0].content.parts[0].text;
            let recommendedCrops;
            try {
                recommendedCrops = JSON.parse(jsonString);

                // Optional: A final check to ensure crops are from the approved list,
                // although the prompt and schema should guide Gemini to do this.
                const filteredCrops = recommendedCrops.filter(crop =>
                    approvedCrops.includes(crop.cropName)
                );

                return res.status(200).json({ success: true, crops: filteredCrops });

            } catch (parseError) {
                console.error("Failed to parse Gemini response JSON:", parseError);
                return res.status(500).json({ error: "Gemini API returned invalid JSON format.", details: parseError.message });
            }
        } else {
            console.error("Unexpected Gemini API response structure:", result);
            return res.status(500).json({ error: "Failed to get valid crop recommendations from Gemini API. Unexpected response structure." });
        }

    } catch (error) {
        console.error("Error in aboutCrops controller:", error);
        // Generic catch for any unexpected errors during the process
        res.status(500).json({ error: "Internal server error.", details: error.message });
    }
};

export default aboutCrops;