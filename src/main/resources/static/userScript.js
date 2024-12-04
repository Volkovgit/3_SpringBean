const leftNavItems = document.getElementsByClassName('left_nav_item')
const right_bar_container_header = document.getElementsByClassName('right-bar-container-header')[0] // Главный заголовок
const card_header = document.getElementsByClassName('card-header-item')[0] // элемент отвечает за текст 'Add new user' и 'All users'
const right_nav = document.getElementsByClassName('right_nav')[0] // Анимация центральной навигации между User table и New User
const card = document.getElementsByClassName('card-body')[0]; // центральный элемент карточки, в который вставляются данные


// function removeClassFromFirstElementAndSetToSecond(item1, item2, className) {
//     item1.classList.remove(className)
//     item2.classList.add(className)
// }

function setTableWitUsers(user) {
    let table = '<table class="table-with-users table table-striped">';
    table += '<thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Email</th><th>Role</th></tr></thead><tbody class="table-with-users-body">'
    table += `<tr><td>${user.id}</td><td>${user.firstName}</td><td>${user.lastName}</td><td>${user.age}</td><td>${user.email}</td><td>${user.roles.map(role => `<span>${role.replace('ROLE_', '')}</span>`)}</td>`;
    table += "</tr>"
    table += "</tbody></table>"
    card.innerHTML = table;
}

function setHeader(user){
    let roleHeaderList = ""
    for (let role of user.roles) {
        roleHeaderList += `<li class="px-1 text-white">${role.replace("ROLE_", "")}</li>`
    }
    document.getElementById('header-role-list').innerHTML = roleHeaderList;
    document.getElementById('current-user-email').textContent = `${user.email} with roles:`
}

function setTextHeader(){
    leftNavItems[0].classList.add('active')
    leftNavItems[0].classList.remove('link-dark')
    card_header.textContent = 'About user'
    right_bar_container_header.textContent = "User information-page"
}


document.addEventListener("DOMContentLoaded", function () { // При инициализации тут мы запрашиваем данные
    httpGet('/user').then(res => {
        res = JSON.parse(res);
        setTextHeader()
        setHeader(res)
        setTableWitUsers(res)
    })
})


// for (let item of leftNavItems) {
//     item.onclick = () => {
//         let prevActiveElement = document.getElementsByClassName('nav-link active left_nav_item')[0]
//         if (prevActiveElement.textContent != item.textContent) {
//             removeClassFromFirstElementAndSetToSecond(prevActiveElement, item, 'active')
//             removeClassFromFirstElementAndSetToSecond(item, prevActiveElement, 'link-dark')
//             if (item.textContent == "USER") {
//                 card_header.textContent = 'About user'
//                 right_bar_container_header.textContent = "User information-page"
//                 right_nav.classList.add('hide-element')
//                 setTableWitUsers(true);
//             }
//         }
//
//     }
// }

// const right_nav_item = document.getElementsByClassName('right_nav_item') // центральное меню навигации между "User table" и "New user"
// for (let item of right_nav_item) {
//     item.onclick = () => {
//         let prevActiveElement = document.getElementsByClassName('nav-link active right_nav_item')[0]
//         if (prevActiveElement.textContent != item.textContent) {
//             setFirstButton(prevActiveElement, item)
//         }
//     }
// }


async function httpGet(url) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return await xmlHttp.responseText;
}
