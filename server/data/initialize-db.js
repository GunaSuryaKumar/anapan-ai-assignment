/*const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'competitors.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to SQLite database.');
});

db.serialize(() => {
    // Create competitors table
    db.run(`
        CREATE TABLE IF NOT EXISTS competitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            target TEXT,
            competitor TEXT,
            description TEXT,
            source TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
            return;
        }
        console.log('Created competitors table.');
    });

    // Insert data
    const competitors = [
        ['Virgin Media', 'TCS', 'Cloud-first data strategy enhancing customer experience and agility.', 'https://www.linkedin.com/posts/paolaolivari_virgin-media-o2-partners-with-tcs-for-cloud-first-activity-7316201299815923712-AVYB/'],
        ['Virgin Media', 'Accenture', 'Private 5G solutions for UK businesses with edge computing and AI.', 'https://newsroom.accenture.com/news/2024/virgin-media-o2-partners-with-accenture-to-enhance-private-5g-solutions-for-uk-businesses-tapping-into-estimated-half-a-billion-pound-uk-market'],
        ['Virgin Media', 'Tech Mahindra', 'Managed network operations for fiber-optic infrastructure.', 'https://www.linkedin.com/posts/ellen-gregory-ba-hons-04b89095_techmahindra-diwali2021-virginmediao2-activity-6861774185182568448-d2Ju/'],
        ['Virgin Media', 'Capgemini', 'AI-driven solutions for network optimization and customer experience.', 'https://www.capgemini.com/no-no/industries/telecommunications/ai-in-telecommunications/'],
        ['Virgin Media', 'Wipro', 'IT architecture simplification for business systems.', 'https://www.telcotitans.com/telefonicawatch/wipro-and-tech-m-back-grand-designs-for-o2-architecture/2888.article'],
        ['Virgin Media', 'Deloitte', 'Developed ESG strategy "Better Connections Plan" for sustainability.', 'https://www.deloitte.com/uk/en/about/story/impact/virgin-media-o2s-esg-strategy.html'],
        ['Virgin Media', 'EY', 'AI-driven sustainability strategies for telecom sector.', 'https://www.libertyglobal.com/liberty-global-and-ey-report-outlines-path-for-telco-sector-to-realise-major-ai-driven-sustainability-gains/']
    ];

    const insertStmt = db.prepare('INSERT INTO competitors (target, competitor, description, source) VALUES (?, ?, ?, ?)');
    competitors.forEach(([target, competitor, description, source]) => {
        insertStmt.run(target, competitor, description, source, (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            }
        });
    });
    insertStmt.finalize();

    console.log('Inserted competitor data into database.');
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});*/