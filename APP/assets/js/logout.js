const logoutButton = document.querySelector('#logoutButton');

logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('user');
    window.location.href = "login.html";
}); 