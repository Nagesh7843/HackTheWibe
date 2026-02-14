function studentLogin() {
    // Check if already logged in
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole === 'student') {
        window.location.href = '/student-dashboard';
        return;
    }
    // Redirect to dedicated login page
    window.location.href = '/login-student';
}

function adminLogin() {
    // Check if already logged in
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole === 'admin') {
        window.location.href = '/admin-dashboard';
        return;
    }
    // Redirect to dedicated login page
    window.location.href = '/login-admin';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function closeAdminModal() {
    document.getElementById('adminLoginModal').style.display = 'none';
}

window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const adminModal = document.getElementById('adminLoginModal');
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target == adminModal) {
        adminModal.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Handle student login form
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const password = document.getElementById('password').value.trim();

            console.log('📝 Attempting student login with phone:', phoneNumber);

            if (!phoneNumber || !password) {
                alert('Please enter both phone number and password');
                return;
            }

            try {
                const response = await fetch('/api/students/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phoneNumber, password })
                });

                const data = await response.json();
                console.log('📡 API Response:', { status: response.status, message: data.message });

                if (response.ok) {
                    console.log('✅ Login successful, storing token');
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userRole', 'student');
                    localStorage.setItem('userId', data.student.id);
                    window.location.href = '/student-dashboard';
                } else {
                    console.log('❌ Login failed:', data.message);
                    alert('❌ ' + (data.message || 'Login failed'));
                }
            } catch (error) {
                console.error('❌ Network error:', error);
                alert('❌ An error occurred. Please try again.');
            }
        });
    }

    // Handle admin login form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('adminEmail').value.trim();
            const password = document.getElementById('adminPassword').value.trim();

            console.log('📝 Attempting admin login with email:', email);

            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }

            try {
                const response = await fetch('/api/admins/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log('📡 API Response:', { status: response.status, message: data.message });

                if (response.ok) {
                    console.log('✅ Admin login successful, storing token');
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userRole', 'admin');
                    localStorage.setItem('adminId', data.admin.id);
                    window.location.href = '/admin-dashboard';
                } else {
                    console.log('❌ Admin login failed:', data.message);
                    alert('❌ ' + (data.message || 'Login failed'));
                }
            } catch (error) {
                console.error('❌ Network error:', error);
                alert('❌ An error occurred. Please try again.');
            }
        });
    }
});
