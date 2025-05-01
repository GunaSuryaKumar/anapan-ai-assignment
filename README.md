Anapan AI Internship Assignment
Overview
A competitive intelligence tool for Infosys to identify competitors collaborating with Virgin Media O2, displaying results in a searchable, exportable table.
Setup

Prerequisites:

Node.js (v16 or higher)
VS Code
Git


Installation:
npm install


Initialize Database:
npm run init-db


Run Server:
npm start


Access:Open http://localhost:3000 in a browser.


Deployment

Platform: Vercel
Steps:
Install Vercel CLI: npm i -g vercel
Deploy: vercel
Follow prompts to configure and deploy.



Project Structure
anapan-ai-assignment/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
├── server/
│   ├── routes/
│   │   ├── competitors.js
│   ├── data/
│   │   ├── initialize-db.js
│   │   ├── competitors.sqlite
│   ├── server.js
├── .gitignore
├── package.json
├── README.md

Features

Search for target accounts (e.g., Virgin Media).
Display competitor collaborations in a table.
Export results as CSV.

