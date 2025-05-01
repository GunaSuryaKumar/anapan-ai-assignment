const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('C:/Users/kguna/Downloads/anapan-ai-assignment/server/data/competitors.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to SQLite database');
});

// Create competitors table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS competitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            target TEXT,
            competitor TEXT,
            description TEXT,
            source TEXT
        )
    `);

    // Insert sample data
    const stmt = db.prepare(`
        INSERT INTO competitors (target, competitor, description, source)
        VALUES (?, ?, ?, ?)
    `);
    const competitors = [
        ['Virgin Media', 'TCS', 'Cloud-first data strategy enhancing customer experience and agility.', 'https://www.linkedin.com/posts/paolaolivari_virgin-media-o2-partners-with-tcs-for-cloud-first-activity-7316201299815923712-AVYB/'],
        ['Virgin Media', 'Accenture', 'Private 5G solutions for UK businesses with edge computing and AI.', 'https://newsroom.accenture.com/news/2024/virgin-media-o2-partners-with-accenture-to-enhance-private-5g-solutions-for-uk-businesses-tapping-into-estimated-half-a-billion-pound-uk-market'],
        ['Virgin Media', 'Tech Mahindra', 'Managed network operations for fiber-optic infrastructure.', 'https://www.linkedin.com/posts/ellen-gregory-ba-hons-04b89095_techmahindra-diwali2021-virginmediao2-activity-6861774185182568448-d2Ju/'],
        ['Virgin Media', 'Capgemini', 'AI-driven solutions for network optimization and customer experience.', 'https://www.capgemini.com/no-no/industries/telecommunications/ai-in-telecommunications/'],
        ['Virgin Media', 'Wipro', 'IT architecture simplification for business systems.', 'https://www.telcotitans.com/telefonicawatch/wipro-and-tech-m-back-grand-designs-for-o2-architecture/2888.article'],
        ['Virgin Media', 'Deloitte', 'Developed ESG strategy "Better Connections Plan" for sustainability.', 'https://www.deloitte.com/uk/en/about/story/impact/virgin-media-o2s-esg-strategy.html'],
        ['Virgin Media', 'EY', 'AI-driven sustainability strategies for telecom sector.', 'https://www.libertyglobal.com/liberty-global-and-ey-report-outlines-path-for-telco-sector-to-realise-major-ai-driven-sustainability-gains/']
    ];
    competitors.forEach(comp => stmt.run(comp));
    stmt.finalize();

    console.log('Database initialized with sample data');
    db.close();
});