// ONLY HINDI IAS - Advanced Google Sheet Bridge
const SHEET_ID = '1ZwflkVbnRex-8rbr11-4PcUhJuHgUXMMaBUDpD7gQbY';
const SHEET_NAME = 'Sheet1'; 
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

let quizDatabase = {};
let isDataLoaded = false;

// Google Sheet से डेटा खींचने वाला फंक्शन
async function loadExternalData() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.text();
        
        // CSV डेटा को लाइनों में बाँटना
        const rows = data.split('\n').slice(1); 

        rows.forEach(row => {
            // कोमा के आधार पर कॉलम अलग करना (एडवांस तरीका)
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
        
        isDataLoaded = true;
        console.log("Database Ready!");
        
        // अगर वेबसाइट लोड हो चुकी है, तो क्विज़ शुरू करने का इशारा दें
        if (typeof window.startQuizAfterLoading === "function") {
            window.startQuizAfterLoading();
        }
    } catch (error) {
        console.error("Error loading sheet data:", error);
    }
}

// तुरंत डेटा लोड करना शुरू करें
loadExternalData();
