// Auth Modal Toggle
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const closeModals = document.querySelectorAll('.close-modal');
const userDropdown = document.getElementById('userDropdown');
const userBtn = document.getElementById('userBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Check if user is logged in from localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    // Hide auth buttons and show user dropdown
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    userDropdown.style.display = 'block';
    document.getElementById('usernameDisplay').textContent = currentUser.name.split(' ')[0];
}

// Show login modal
loginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('active');
});

// Show register modal
registerBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.add('active');
});

// Switch to register from login
switchToRegister?.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    registerModal.classList.add('active');
});

// Switch to login from register
switchToLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.remove('active');
    loginModal.classList.add('active');
});

// Close modals
closeModals.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        registerModal.classList.remove('active');
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
    }
});

// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Get users from localStorage or initialize empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find user
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Save current user to localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Update UI
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            userDropdown.style.display = 'block';
            document.getElementById('usernameDisplay').textContent = user.name.split(' ')[0];
            
            // Close modal
            loginModal.classList.remove('active');
            
            // Show success message
            alert(`¡Bienvenido de nuevo, ${user.name.split(' ')[0]}!`);
        } else {
            alert('Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        }
    });
}

// Register Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }
        
        // Get users from localStorage or initialize empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
            alert('Este correo electrónico ya está registrado. Por favor, utiliza otro o inicia sesión.');
            return;
        }
        
        // Create new user
        const newUser = {
            name,
            email,
            password
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Update UI
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userDropdown.style.display = 'block';
        document.getElementById('usernameDisplay').textContent = name.split(' ')[0];
        
        // Close modal
        registerModal.classList.remove('active');
        
        // Show success message
        alert(`¡Registro exitoso, ${name.split(' ')[0]}! Ahora estás conectado.`);
    });
}

// Logout
logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove current user from localStorage
    localStorage.removeItem('currentUser');
    
    // Update UI
    loginBtn.style.display = 'inline-block';
    registerBtn.style.display = 'inline-block';
    userDropdown.style.display = 'none';
    
    // Show success message
    alert('Has cerrado sesión correctamente. ¡Vuelve pronto!');
});