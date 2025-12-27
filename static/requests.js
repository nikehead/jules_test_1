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
                alert('의뢰 등록 실패');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버 오류가 발생했습니다.');
        }
    });
});

async function loadRequests() {
    try {
        const response = await fetch('/api/requests');
        if (response.ok) {
            const requests = await response.json();
            const tbody = document.querySelector('#requestsTable tbody');
            tbody.innerHTML = ''; // Clear existing rows

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
    } catch (error) {
        console.error('Error loading requests:', error);
    }
}
