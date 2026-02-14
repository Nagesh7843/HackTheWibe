// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/';
}

checkAuth();

let allComplaints = [];

// Load all complaints
async function loadComplaints() {
    const token = localStorage.getItem('token');

    try {
        console.log('📋 Loading complaints...');
        const response = await fetch('/api/complaints/all', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Complaints loaded:', data.complaints.length);
        allComplaints = data.complaints || [];
        
        updateStats();
        displayComplaints(allComplaints);
    } catch (error) {
        console.error('❌ Error loading complaints:', error);
        document.getElementById('complaintsTable').innerHTML = `<p style="color: red;">❌ Error loading complaints: ${error.message}</p>`;
    }
}

// Update statistics
function updateStats() {
    const total = allComplaints.length;
    const pending = allComplaints.filter(c => c.status === 'pending').length;
    const resolved = allComplaints.filter(c => c.status === 'resolved').length;

    document.getElementById('totalComplaints').textContent = total;
    document.getElementById('pendingComplaints').textContent = pending;
    document.getElementById('resolvedComplaints').textContent = resolved;
}

// Display complaints
function displayComplaints(complaints) {
    const table = document.getElementById('complaintsTable');

    if (complaints.length === 0) {
        table.innerHTML = '<p>No complaints found.</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Severity</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    complaints.forEach(complaint => {
        const date = new Date(complaint.createdAt).toLocaleDateString();
        const studentName = typeof complaint.studentId === 'object' 
            ? complaint.studentId.name 
            : complaint.studentId || 'Unknown';
        
        html += `
            <tr onclick="viewComplaint('${complaint._id}')">
                <td>${studentName}</td>
                <td>${complaint.studentPhone}</td>
                <td><span class="complaint-status status-${complaint.status}">${complaint.status}</span></td>
                <td><span class="complaint-status status-${complaint.severity}">${complaint.severity}</span></td>
                <td>${date}</td>
                <td><button class="btn btn-secondary" onclick="event.stopPropagation(); viewComplaint('${complaint._id}')">View</button></td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    table.innerHTML = html;
}

// Filter complaints
function filterComplaints() {
    const status = document.getElementById('statusFilter').value;

    if (status === '') {
        displayComplaints(allComplaints);
    } else {
        const filtered = allComplaints.filter(c => c.status === status);
        displayComplaints(filtered);
    }
}

// View complaint details
async function viewComplaint(complaintId) {
    // Redirect to dedicated complaint detail page
    window.location.href = `/complaint-detail.html?id=${complaintId}`;
}

// Update complaint
async function updateComplaint(event, complaintId) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const status = document.getElementById('newStatus').value;
    const severity = document.getElementById('newSeverity').value;
    const adminNotes = document.getElementById('adminNotes').value;

    console.log('📝 Updating complaint:', { complaintId, status, severity });

    try {
        const response = await fetch(`/api/complaints/${complaintId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status, severity, adminNotes })
        });

        if (response.ok) {
            console.log('✅ Complaint updated successfully');
            alert('Complaint updated successfully');
            closeComplaintModal();
            loadComplaints();
        } else {
            console.error('❌ Failed to update complaint');
            alert('Failed to update complaint');
        }
    } catch (error) {
        console.error('❌ Error updating complaint:', error);
        alert('An error occurred');
    }
}

// Close modal
function closeComplaintModal() {
    document.getElementById('complaintModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('complaintModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Load complaints on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Admin dashboard page loaded');
    loadComplaints();
});
