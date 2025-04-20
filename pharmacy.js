document.addEventListener('DOMContentLoaded', () => {
    const addDrugForm = document.getElementById('addDrugForm');
    const searchDrugForm = document.getElementById('searchDrugForm');
    const drugsTableBody = document.getElementById('drugsTableBody');

    addDrugForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const code = document.getElementById('code').value;
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;

        const drug = { code, name, description, price };

        try {
            const response = await fetch('/api/drugs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(drug),
            });

            if (response.ok) {
                alert('Drug added successfully');
                addDrugForm.reset();
                fetchDrugs();
            } else {
                alert('Failed to add drug');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding drug');
        }
    });

    searchDrugForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('searchName').value;

        try {
            const response = await fetch(`/api/drugs?name=${encodeURIComponent(name)}`);
            const drugs = await response.json();
            displayDrugs(drugs);
        } catch (error) {
            console.error('Error:', error);
            alert('Error searching drugs');
        }
    });

    const fetchDrugs = async () => {
        try {
            const response = await fetch('/api/drugs');
            const drugs = await response.json();
            displayDrugs(drugs);
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching drugs');
        }
    };

    const displayDrugs = (drugs) => {
        drugsTableBody.innerHTML = '';
        drugs.forEach(drug => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${drug.code}</td>
                <td>${drug.name}</td>
                <td>${drug.description}</td>
                <td>${drug.price}</td>
            `;
            drugsTableBody.appendChild(row);
        });
    };

    fetchDrugs();
});