let personelList;
let userList;

async function getListOfLists() {
    const listOfListURI = "https://nodeattapi.herokuapp.com/api/list/listOfLists";
    const list = await getReq(listOfListURI);
    console.log(list);
    let registerData = '';

    const lastPersonel = document.querySelector('#lastPersonel');
    const lastUser = document.querySelector('#lastUser');
    const todayCountText = document.querySelector('#todayCount');
    const totalCountText = document.querySelector('#totalCountText');
    let todayCount = 0;
    let totalCount = 0;

    const last = list[list.length - 1];
    lastPersonel.innerHTML = last.Personel.name;
    lastUser.innerHTML = last.User.name;

    list.forEach(element => {
        let updatedAt = new Date(element.updatedAt);
        let clock = `${updatedAt.getUTCHours()}:${updatedAt.getUTCMinutes()}`;
        let date = `${updatedAt.getDate()}/${updatedAt.getMonth()}/${updatedAt.getFullYear()}`;
        let today = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
        const table = document.querySelector('#myTable');
        registerData = `<tr>
            <td hidden> ${element._id} </td>
            <td hidden> ${element.User._id} </td>
            <td> ${element.User.name} </td>
            <td hidden> ${element.Personel._id} </td>
            <td> ${element.Personel.name} </td>
            <td hidden> ${element.listName} </td>
            <td> ${element.className} </td>
            <td hidden> ${element.createdAt} </td>
            <td hidden> ${element.updatedAt} </td>
            <td> ${date} </td>
            <td> ${clock} </td>
        </tr>
        `;
        table.innerHTML += registerData;
        if (date == today) todayCount++;
        totalCount++;
    });

    todayCountText.innerHTML = todayCount;
    totalCountText.innerHTML = totalCount;
}

async function getPersonelList() {
    const personelListURI = "https://nodeattapi.herokuapp.com/api/personel/list";
    const table = document.querySelector('#personelTable');
    table.innerHTML = '';
    const list = await getReq(personelListURI);
    personelList = list;
    let personelData = '';
    list.forEach((personel, index) => {
        let updatedAt = new Date(personel.updatedAt);
        let clock = `${updatedAt.getUTCHours()}:${updatedAt.getUTCMinutes()}`;
        let date = `${updatedAt.getDate()}/${updatedAt.getMonth()}/${updatedAt.getFullYear()}`;

        personelData = `<tr>
            <th>${personel._id}</th>
            <th>${personel.name}</th>
            <th>${personel.no}</th>
            <th>${personel.email}</th>
            <th>${personel.cardNo}</th>
            <th>${clock} - ${date}</th>
            <th><button id="btnEdit${index}" onclick="editMe(${index})" class="btn btn-outline-warning">Düzenle</button> </th>
            <th><button id="btnDelete${index}" onclick="deleteMe(${index})" class="btn btn-outline-danger">Sil</button> </th>
        </tr>
        `;

        table.innerHTML += personelData;
    });

}

async function getUsersList() {
    const usersListURI = "https://nodeattapi.herokuapp.com/api/user/list";

    const table = document.querySelector('#userTable');
    const list = await getReq(usersListURI);
    userList = list;
    table.innerHTML = '';
    let usersData = '';
    list.forEach((user, index) => {
        let updatedAt = new Date(user.updatedAt);
        let clock = `${updatedAt.getUTCHours()}:${updatedAt.getUTCMinutes()}`;
        let date = `${updatedAt.getDate()}/${updatedAt.getMonth()}/${updatedAt.getFullYear()}`;

        usersData = `<tr>
            <th>${user._id}</th>
            <th>${user.name}</th>
            <th>${user.className}</th>
            <th>${user.email}</th>
            <th>${user.cardNo}</th>
            <th>${user.role}</th>
            <th><button id="btnUserDelete${index}" onclick="delUser(${index})" class="btn btn-outline-danger">Sil</button> </th>
        </tr>
        `;

        table.innerHTML += usersData;
    });
}

async function getAttList() {
    const attListURI = "https://nodeattapi.herokuapp.com/api/list";

    const table = document.querySelector('#attList');
    const list = await getReq(attListURI);
    let attData = '';
    list.forEach((record, index) => {
        let updatedAt = new Date(record.updatedAt);
        let clock = `${updatedAt.getUTCHours()}:${updatedAt.getUTCMinutes()}`;
        let date = `${updatedAt.getDate()}/${updatedAt.getMonth()}/${updatedAt.getFullYear()}`;

        attData = `<tr>
            <th>${record.listName}</th>
            <th>${record.Personel.name}</th>
            <th hidden>${record.Personel._id}</th>
            <th>${record.className}</th>
            <th>${date}</th>
            <th>${clock}</th>
            <th>${record._id}</th>
            <th hidden>${record.User._id}</th>
            <th hidden>${record.User.name}</th>
        </tr>
        `;

        table.innerHTML += attData;
    });
}

