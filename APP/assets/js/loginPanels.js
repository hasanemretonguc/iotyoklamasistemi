const btnGoForgetPassword = document.querySelector('#helpPassword');
const btnGoLogin = document.querySelector('#loginPageBtn');

const loginPage = document.querySelector('#login');
const forgotPassword = document.querySelector('#forgotPassword');

btnGoForgetPassword.addEventListener("click", () => {
    loginPage.hidden = true;
    forgotPassword.hidden = false;
});

btnGoLogin.addEventListener("click", () => {
    loginPage.hidden = false;
    forgotPassword.hidden = true;
});
