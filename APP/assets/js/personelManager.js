
async function addMe() {
    const form = document.querySelector('#personelNew');
    form.style.display = "block";

    const closeFormBtn = document.querySelector('#closePersonelNew');
    closeFormBtn.addEventListener('click', () => form.style.display = "none");

    const newBtn = document.querySelector('#personelNewBtn');

    const personelNameText = document.querySelector('#personelNewNameText');
    const personelNoText = document.querySelector('#personelNewNoText');
    const personelEmailText = document.querySelector('#personelNewEmailText');
    const personelCardNoText = document.querySelector('#personelNewCardNoText');

    newBtn.addEventListener('click', async () => {
        const registerPersonelURI = "https://nodeattapi.herokuapp.com/api/personel/register";

        const res = await sendPOST(registerPersonelURI, {
            name: personelNameText.value,
            email: personelEmailText.value,
            no: personelNoText.value,
            cardNo: personelCardNoText.value
        });

        document.querySelector('#personelNewMessage').innerHTML = res;

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

async function editMe(index) {

    const personel = personelList[index];
    const form = document.querySelector('#personelEdit');
    form.style.display = "block";

    const closeFormBtn = document.querySelector('#closePersonelEdit');
    closeFormBtn.addEventListener('click', () => form.style.display = "none");

    const saveBtn = document.querySelector('#personelSaveBtn');

    const personelIDText = document.querySelector('#personelIDText');
    const personelNameText = document.querySelector('#personelNameText');
    const personelNoText = document.querySelector('#personelNoText');
    const personelEmailText = document.querySelector('#personelEmailText');
    const personelCardNoText = document.querySelector('#personelCardNoText');

    personelIDText.innerHTML = personel._id;
    personelNameText.value = personel.name;
    personelNoText.value = personel.no;
    personelEmailText.value = personel.email;
    personelCardNoText.value = personel.cardNo;

    saveBtn.addEventListener('click', async () => {
        const updatePersonelURI = "https://nodeattapi.herokuapp.com/api/personel/update";

        const res = await sendPOST(updatePersonelURI, {
            id: personelIDText.innerHTML,
            name: personelNameText.value,
            email: personelEmailText.value,
            no: personelNoText.value,
            cardNo: personelCardNoText.value
        });

        console.log(res);

        if (JSON.parse(res)) {
            document.querySelector('#personelUpdateMessage').innerHTML = 'Güncellendi';
            setTimeout(async () => {
                form.style.display = "none"
                await getPersonelList();
            }, 500);
        }
        else {
            document.querySelector('#personelUpdateMessage').innerHTML = res;
        }


    });

}

async function deleteMe(index) {
    const personel = personelList[index];
    const removePersonelURI = "https://nodeattapi.herokuapp.com/api/personel/remove";
    if (confirm('Silmek istediğinden emin misin?')) {
        const res = await sendPOST(removePersonelURI, { id: personel._id });
        alert(res);
        setTimeout(async () => {
            await getPersonelList();
        }, 500);
    }
}