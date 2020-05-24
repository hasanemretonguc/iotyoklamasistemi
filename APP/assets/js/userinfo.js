

window.addEventListener('DOMContentLoaded', async (event) => {
    const usernameText = document.querySelector('#username');
    let user = JSON.parse(sessionStorage.getItem('user'))[0];
    usernameText.innerHTML = user.name;
});