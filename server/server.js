const express = require('express');
   const path = require('path');
   const competitorsRouter = require('./routes/competitors');
   const db = require('./db'); // Import db from db.js

   const app = express();
   const port = process.env.PORT || 3000;

   // Serve static files
   app.use(express.static(path.join(__dirname, '../public')));

   // API routes
   app.use('/api', competitorsRouter);

   // Start server
   app.listen(port, () => {
       console.log(`Server running on http://localhost:${port}`);
   });

   module.exports = { app, db };