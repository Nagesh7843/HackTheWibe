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

// Load complaints
async function loadComplaints() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/api/complaints/my-complaints', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        const complaintsList = document.getElementById('complaintsList');

        if (data.complaints.length === 0) {
            complaintsList.innerHTML = '<p>No complaints submitted yet.</p>';
            return;
        }

        let html = '';
        data.complaints.forEach(complaint => {
            const statusClass = `status-${complaint.status}`;
            html += `
                <div class="complaint-item">
                    <div>
                        <strong>Complaint #${complaint._id.slice(-8)}</strong>
                        <p>${complaint.message.substring(0, 100)}...</p>
                        <span class="complaint-status ${statusClass}">${complaint.status}</span>
                        <small style="display: block; margin-top: 0.5rem; color: #666;">
                            Submitted: ${new Date(complaint.createdAt).toLocaleDateString()}
                        </small>
                    </div>
                </div>
            `;
        });

        complaintsList.innerHTML = html;
    } catch (error) {
        console.error('Error loading complaints:', error);
        document.getElementById('complaintsList').innerHTML = '<p>Error loading complaints</p>';
    }
}

// Submit complaint
document.getElementById('complaintForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = document.getElementById('message').value;
    const proofImages = document.getElementById('proofImages').files;
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('message', message);
    
    for (let i = 0; i < proofImages.length; i++) {
        formData.append('proofImages', proofImages[i]);
    }

    try {
        const response = await fetch('/api/complaints/submit', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        const data = await response.json();
        const messageEl = document.getElementById('submitMessage');

        if (response.ok) {
            messageEl.textContent = 'Complaint submitted successfully!';
            messageEl.className = 'message success';
            messageEl.style.display = 'block';
            document.getElementById('complaintForm').reset();
            loadComplaints();
            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 5000);
        } else {
            messageEl.textContent = data.message || 'Failed to submit complaint';
            messageEl.className = 'message error';
            messageEl.style.display = 'block';
        }
    } catch (error) {
        const messageEl = document.getElementById('submitMessage');
        messageEl.textContent = 'An error occurred. Please try again.';
        messageEl.className = 'message error';
        messageEl.style.display = 'block';
    }
});

// Load complaints on page load
loadComplaints();

// --- Add: ensure dashboard "Student Login" links/buttons go to the real login page ---
function fixStudentLoginLinks() {
    const targetPath = '/login-student.html';

    // Normalize anchor hrefs and add safe click handler
    document.querySelectorAll('a[href="/login-student"], a[href="/login-student.html"]').forEach(a => {
        a.href = targetPath;
        a.addEventListener('click', (e) => { e.preventDefault(); window.location.href = targetPath; });
    });

    // Buttons that explicitly target student login via id or data attribute
    document.querySelectorAll('button#studentLoginBtn, button[data-target="student-login"]').forEach(btn => {
        btn.addEventListener('click', () => { window.location.href = targetPath; });
    });

    // Fallback: elements (links or buttons) whose visible text mentions "student login"
    document.querySelectorAll('a, button').forEach(el => {
        const text = (el.textContent || '').trim();
        if (/student\s*login/i.test(text)) {
            if (el.tagName === 'A') {
                el.href = targetPath;
                el.addEventListener('click', (e) => { e.preventDefault(); window.location.href = targetPath; });
            } else {
                el.addEventListener('click', () => { window.location.href = targetPath; });
            }
        }
    });
}

// Run after DOM ready (safe even if script loaded later)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixStudentLoginLinks);
} else {
    fixStudentLoginLinks();
}
