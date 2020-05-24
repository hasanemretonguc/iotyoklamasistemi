const homepageBtn = document.querySelector('#homepageBtn');
const personelSectionBtn = document.querySelector('#personelSectionBtn');
const userListSectionBtn = document.querySelector('#userListSectionBtn');
const attListSectionBtn = document.querySelector('#attListSectionBtn');

const homepageSection = document.querySelector('#homepageSection');
const personelListSection = document.querySelector('#personelListSection');
const userListSection = document.querySelector('#userListSection');
const attListSection = document.querySelector('#attListSection');


homepageBtn.addEventListener('click', event => {
    homepageSection.hidden = false;
    personelListSection.hidden = true;
    userListSection.hidden = true;
    attListSection.hidden = true;
});
personelSectionBtn.addEventListener('click', event => {
    homepageSection.hidden = true;
    personelListSection.hidden = false;
    userListSection.hidden = true;
    attListSection.hidden = true;
});
userListSectionBtn.addEventListener('click', event => {
    homepageSection.hidden = true;
    personelListSection.hidden = true;
    userListSection.hidden = false;
    attListSection.hidden = true;
});
attListSectionBtn.addEventListener('click', event => {
    homepageSection.hidden = true;
    personelListSection.hidden = true;
    userListSection.hidden = true;
    attListSection.hidden = false;
});