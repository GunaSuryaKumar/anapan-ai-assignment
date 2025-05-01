document.addEventListener('DOMContentLoaded', () => {
    fetchCompetitors();

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('search-btn');
    const resetButton = document.getElementById('reset-btn');
    const fullscreenButton = document.getElementById('fullscreen-btn');
    const tableContainer = document.querySelector('.table-container');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            console.log('Search triggered with query:', query);
            fetchCompetitors(query);
        }
    });

    // Search on button click
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        console.log('Search triggered with query:', query);
        fetchCompetitors(query);
    });

    // Reset search
    resetButton.addEventListener('click', () => {
        searchInput.value = '';
        fetchCompetitors();
    });

    // Full-screen toggle
    fullscreenButton.addEventListener('click', () => {
        tableContainer.classList.toggle('fullscreen');
        const isFullscreen = tableContainer.classList.contains('fullscreen');
        fullscreenButton.innerHTML = isFullscreen 
            ? '<i class="fas fa-compress"></i> Exit Full Screen'
            : '<i class="fas fa-expand"></i> Full Screen';
    });

    // Export button
    document.getElementById('export-btn').addEventListener('click', exportToCSV);
});

async function fetchCompetitors(query = '') {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.remove('d-none');
    
    try {
        const response = await fetch(`/api/competitors?competitor=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const competitors = await response.json();
        console.log('Fetched competitors:', competitors);
        renderTable(competitors, query);
    } catch (error) {
        console.error('Error fetching competitors:', error);
        renderTable([], query);
    } finally {
        loadingSpinner.classList.add('d-none');
    }
}

function renderTable(competitors, query) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    if (!competitors || competitors.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3">No competitors found.</td></tr>';
        return;
    }

    const highlightQuery = query.toLowerCase();
    competitors.forEach((comp, index) => {
        const row = document.createElement('tr');
        row.style.setProperty('--row-index', index);
        const competitorText = highlightQuery && comp.competitor.toLowerCase().includes(highlightQuery)
            ? comp.competitor.replace(
                  new RegExp(highlightQuery, 'gi'),
                  match => `<span class="highlight">${match}</span>`
              )
            : comp.competitor;
        row.innerHTML = `
            <td>${competitorText}</td>
            <td class="description-cell">${comp.description}</td>
            <td><a href="${comp.source}" target="_blank"><i class="fas fa-link"></i> View Source</a></td>
        `;
        // Add click to expand description
        row.addEventListener('click', () => {
            const descriptionCell = row.querySelector('.description-cell');
            descriptionCell.classList.toggle('expanded');
            if (descriptionCell.classList.contains('expanded')) {
                descriptionCell.innerHTML = `<div class="description-tooltip">${comp.description}</div>`;
            } else {
                descriptionCell.innerHTML = comp.description;
            }
        });
        tableBody.appendChild(row);
    });
}

function exportToCSV() {
    const rows = document.querySelectorAll('#tableBody tr');
    if (rows.length === 0 || rows[0].textContent === 'No competitors found.') {
        alert('No data to export.');
        return;
    }

    let csv = 'Competitor,Description,Source\n';
    rows.forEach(row => {
        const cols = row.querySelectorAll('td');
        const competitor = `"${cols[0].textContent.replace(/"/g, '""')}"`;
        const description = `"${cols[1].textContent.replace(/"/g, '""')}"`;
        const source = `"${cols[2].querySelector('a').href.replace(/"/g, '""')}"`;
        csv += `${competitor},${description},${source}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'competitors.csv';
    a.click();
    URL.revokeObjectURL(url);
}