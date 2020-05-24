window.addEventListener('DOMContentLoaded', async (event) => {
    let token = JSON.parse(sessionStorage.getItem('auth-token'));
    const page = window.location.pathname.split("/").pop();
    if (token) {
        try {
            let user = jwt_decode(token);
            if (page !== "homepage.html")
                window.location.href = "homepage.html";
        } catch (error) {
            console.log("Giriş yapılmamış!");
        }
    }
    else if (page !== "login.html")
        window.location.href = "login.html";
});
