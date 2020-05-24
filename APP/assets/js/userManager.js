async function addUser() {
    const form = document.querySelector('#userNew');
    form.style.display = "block";

    const closeFormBtn = document.querySelector('#closeUserNew');
    closeFormBtn.addEventListener('click', () => form.style.display = "none");

    const newBtn = document.querySelector('#userNewBtn');

    const userNewNameText = document.querySelector('#userNewNameText');
    const userNewClassNameText = document.querySelector('#userNewClassNameText');
    const userNewEmailText = document.querySelector('#userNewEmailText');
    const userNewRole = document.querySelector('#userNewRole');
    const userNewPassword = document.querySelector('#userNewPassword');
    const userNewCardNoText = document.querySelector('#userNewCardNoText');

    newBtn.addEventListener('click', async () => {
        const registerPersonelURI = "https://nodeattapi.herokuapp.com/api/user/register";

        const res = await sendPOST(registerPersonelURI, {
            name: userNewNameText.value,
            email: userNewEmailText.value,
            cardNo: userNewCardNoText.value,
            role: userNewRole.value,
            password: userNewPassword.value,
            className: userNewClassNameText.value
        });

        document.querySelector('#userNewMessage').innerHTML = res;
        try {
            if (JSON.parse(res)) {
                setTimeout(async () => {
                    form.style.display = "none"
                    await getUsersList();
                }, 500);
            }
        } catch (error) {

        }

    });
}
async function delUser(index) {
    const user = userList[index];
    const removeUserURI = "https://nodeattapi.herokuapp.com/api/user/delete";
    if (confirm('Silmek istediğinden emin misin?')) {
        if (confirm('Silersen yoklama listelerinde isim gözükmez bak!')) {
            const res = await sendPOST(removeUserURI, { id: user._id });
            alert(JSON.parse(res).message);
            setTimeout(async () => {
                await getUsersList();
            }, 500);
        }

    }
}