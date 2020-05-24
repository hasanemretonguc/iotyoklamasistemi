let loaderAnim = document.querySelector('#loader');

window.addEventListener('DOMContentLoaded', async (event) => {
    homepageSection.hidden = true;
    loaderAnim.hidden = false;
    await getListOfLists();
    await getAttList();
    await getPersonelList();
    await getUsersList();
    loaderAnim.hidden = true;
    homepageSection.hidden = false;
});
