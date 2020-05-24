let email = document.querySelector('#inputEmail');
let password = document.querySelector('#inputPassword');
let loginButton = document.querySelector('#loginButton');
let loaderAnim = document.querySelector('#loader');

const loginURI = "https://nodeattapi.herokuapp.com/api/user/login";
const userInfoURI = "https://nodeattapi.herokuapp.com/api/user/list";

$(document).ready(() => {
    console.log('ready');
})

loginButton.addEventListener("click", async () => {
    try {
        if (!(email.value || password.value)) throw 'Boşluk var';

        sessionStorage.removeItem('auth-token');

        loginInfo = { email: email.value, password: password.value };
        console.log(`Giriş yapılıyor: ${loginInfo.email}`);
        loginButton.hidden = true;
        loaderAnim.hidden = false;
        const res = await sendReq(loginURI, loginInfo);

        var decoded = await jwt_decode(res);
        if (decoded._id) {
            sessionStorage.setItem('auth-token', JSON.stringify(res));
            const user = await getReq(userInfoURI);
            sessionStorage.setItem('user', JSON.stringify(user));
            window.location.href = "homepage.html";
        }
        else {
            loginButton.hidden = false;
            loaderAnim.hidden = true;
            throw 'Yok bidaha dene';
        }
    } catch (error) {
        email.placeholder = "Bişi yanlış gibi";
        email.value = "";
        password.value = "";
        loginButton.hidden = false;
        loaderAnim.hidden = true;
    }

});