const btnHelp = document.querySelector('#btnHelp');
const btnHelping = document.querySelector('#btnHelping');
const emailHelp = document.querySelector('#inputHelpEmail');
const message = document.querySelector('#message');
const inputResetCode = document.querySelector('#inputResetCode');

const helpURI = "https://nodeattapi.herokuapp.com/api/user/resetpassword/";

btnHelp.addEventListener('click', async () => {
    console.log("Geliyorumm");
    if (!emailHelp.value) return;
    try {
        let res = await sendReq(helpURI, { email: email.value });
        message.innerHTML = res;
    } catch (error) {
        message.innerHTML = "Bir sıkıntı var!";
    }
});

btnHelping.addEventListener('click', async () => {
    if (inputResetCode.hidden) {
        message.innerHTML = "Kodu aşağı yaz!";
        emailHelp.placeholder = "Buraya yeni şifreni yaz!";
        emailHelp.value = "";
        btnHelp.hidden = true;
        inputResetCode.hidden = false;
        btnHelping.innerHTML = "Sıfırla";
        return;
    }

    if (!(emailHelp.value || inputResetCode.value)) return;

    console.log("Sıfırlıyorum");
    let uri = helpURI + inputResetCode.value;
    console.log(uri);
    try {
        console.log(`Yeni şifre: ${emailHelp.value}`);
        let res = await sendReq(uri, { newPassword: emailHelp.value });
        message.innerHTML = res;
        inputResetCode.hidden = true;
        emailHelp.hidden = true;
        btnHelping.hidden = true;
    } catch (error) {
        message.innerHTML = error.message;
    }

});