export default async function handler(req, res) {
    const { id } = req.query;
    
    // यहाँ उस असली वेबसाइट का डोमेन डालें (जैसे https://khanglobalstudies.com)
    const TARGET_DOMAIN = "https://khanglobalstudies.com"; 
    const targetUrl = `${TARGET_DOMAIN}/api/v1/classroom/${id}`;

    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'X-Sunny-Req': 'sunny', // यह उनके डेटा की सुरक्षा चाबी है
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': TARGET_DOMAIN
            }
        });

        const data = await response.json();
        res.status(200).json(data); // आपकी वेबसाइट को डेटा वापस देना
    } catch (error) {
        res.status(500).json({ error: "Data fetch failed" });
    }
}
