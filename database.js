// ONLY HINDI IAS - Google Sheets Bridge
const SHEET_ID = '1ZwflkVbnRex-8rbr11-4PcUhJuHgUXMMaBUDpD7gQbY';
const SHEET_NAME = 'Sheet1'; 
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

let quizDatabase = {};

// Google Sheet से डेटा खींचने वाला फंक्शन
async function loadExternalData() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.text();
        const rows = data.split('\n').slice(1); // पहली हेडिंग वाली लाइन छोड़कर

        rows.forEach(row => {
            // CSV डेटा को टुकड़ों में बांटना
            const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (cols.length >= 7) {
                const subject = cols[0].replace(/"/g, '').trim();
                const question = {
                    q: cols[1].replace(/"/g, '').trim(),
                    a: cols[2].replace(/"/g, '').trim(),
                    b: cols[3].replace(/"/g, '').trim(),
                    c: cols[4].replace(/"/g, '').trim(),
                    d: cols[5].replace(/"/g, '').trim(),
                    ans: cols[6].replace(/"/g, '').trim().toLowerCase()
                };

                if (!quizDatabase[subject]) {
                    quizDatabase[subject] = [];
                }
                quizDatabase[subject].push(question);
            }
        });
        console.log("Database Updated from Google Sheet!");
    } catch (error) {
        console.error("Error loading sheet data:", error);
    }
}

// वेबसाइट लोड होते ही डेटा सिंक करें
loadExternalData();
