document.addEventListener('DOMContentLoaded', () => {
    loadRequests();

    document.getElementById('requestForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            requester: document.getElementById('requester').value,
            sample_name: document.getElementById('sample_name').value,
            magnification: document.getElementById('magnification').value,
            voltage: document.getElementById('voltage').value,
            description: document.getElementById('description').value
        };

        try {
            // Try to use the backend API
            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('의뢰가 성공적으로 등록되었습니다.');
                document.getElementById('requestForm').reset();
                loadRequests(); // Reload the list
            } else {
                throw new Error('Backend failed');
            }
        } catch (error) {
            console.log('Backend not available, using LocalStorage fallback.');
            // Fallback to LocalStorage
            const requests = JSON.parse(localStorage.getItem('sem_requests') || '[]');
            requests.push(formData);
            localStorage.setItem('sem_requests', JSON.stringify(requests));

            alert('의뢰가 로컬 저장소에 등록되었습니다 (오프라인 모드).');
            document.getElementById('requestForm').reset();
            loadRequests();
        }
    });
});

async function loadRequests() {
    const tbody = document.querySelector('#requestsTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    try {
        // Try to fetch from backend
        const response = await fetch('/api/requests');
        if (response.ok) {
            const requests = await response.json();
            renderTable(requests);
            // Also sync to local storage for consistency if needed, or just prefer backend
            return;
        } else {
            throw new Error('Backend 404');
        }
    } catch (error) {
        console.log('Backend not available, loading from LocalStorage.');
        const requests = JSON.parse(localStorage.getItem('sem_requests') || '[]');
        renderTable(requests);
    }
}

function renderTable(requests) {
    const tbody = document.querySelector('#requestsTable tbody');
    tbody.innerHTML = '';

    requests.forEach(req => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${req.requester}</td>
            <td>${req.sample_name}</td>
            <td>${req.magnification}</td>
            <td>${req.voltage}</td>
            <td>${req.description}</td>
        `;
        tbody.appendChild(row);
    });
}
