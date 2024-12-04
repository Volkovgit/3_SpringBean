const leftNavItems = document.getElementsByClassName('left_nav_item')
const right_bar_container_header = document.getElementsByClassName('right-bar-container-header')[0] // Главный заголовок
const card_header = document.getElementsByClassName('card-header-item')[0] // элемент отвечает за текст 'Add new user' и 'All users'
const right_nav = document.getElementsByClassName('right_nav')[0] // Анимация центральной навигации между User table и New User
const card = document.getElementsByClassName('card-body')[0]; // центральный элемент карточки, в который вставляются данные

let userList = [];
let roleList = [];

function removeClassFromFirstElementAndSetToSecond(item1, item2, className) {
    item1.classList.remove(className)
    item2.classList.add(className)
}

// добавляем события на кнопку EDIT в таблице
function setButtonEditEvent() {
    for (let btn_edit of document.getElementsByClassName('btn-edit-user')) {
        btn_edit.onclick = (e) => {
            httpGet(`/admin/user/${e.target.getAttribute("userId")}`).then(user => {
                user = JSON.parse(user);
                document.getElementsByClassName('modal-user-id')[0].setAttribute("value", `${user.id}`);
                document.getElementsByClassName('modal-user-email')[0].setAttribute("value", `${user.email}`);
                document.getElementsByClassName('modal-user-password')[0].setAttribute("value", `${user.password}`);
                document.getElementsByClassName('modal-user-firstname')[0].setAttribute("value", `${user.firstName}`);
                document.getElementsByClassName('modal-user-lastname')[0].setAttribute("value", `${user.lastName}`);
                document.getElementsByClassName('modal-user-age')[0].setAttribute("value", `${user.age}`);
                for (let opt of document.getElementsByClassName('modal-user-roles')[0].getElementsByTagName('option')) {
                    opt.removeAttribute("selected")
                    if (user.roles.includes(opt.getAttribute("value"))) opt.setAttribute("selected", "selected")
                }
                document.getElementsByClassName('btn-set-edit-user')[0].classList.remove('hide-element')
                document.getElementsByClassName('btn-model-delete-user')[0].classList.add('hide-element')
            })

        }
    }
}

// Добавляем события на кнопку DELETE в таблице
function setButtonDeleteEvent() {
    for (let btn_delete of document.getElementsByClassName('btn-delete-user')) {
        btn_delete.onclick = (e) => {
            httpGet(`/admin/user/${e.target.getAttribute("userId")}`).then(user => {
                user = JSON.parse(user);
                document.getElementsByClassName('modal-user-id')[0].setAttribute("value", `${user.id}`);
                document.getElementsByClassName('modal-user-email')[0].setAttribute("value", `${user.email}`);
                document.getElementsByClassName('modal-user-email')[0].setAttribute("disabled", `disabled`);
                document.getElementsByClassName('modal-user-password')[0].setAttribute("value", `${user.password}`);
                document.getElementsByClassName('modal-user-password')[0].setAttribute("disabled", `disabled`);
                document.getElementsByClassName('modal-user-firstname')[0].setAttribute("value", `${user.Firstname}`);
                document.getElementsByClassName('modal-user-firstname')[0].setAttribute("disabled", `disabled`);
                document.getElementsByClassName('modal-user-lastname')[0].setAttribute("value", `${user.Lastname}`);
                document.getElementsByClassName('modal-user-lastname')[0].setAttribute("disabled", `disabled`);
                document.getElementsByClassName('modal-user-age')[0].setAttribute("value", `${user.age}`);
                document.getElementsByClassName('modal-user-age')[0].setAttribute("disabled", `disabled`);
                for (let opt of document.getElementsByClassName('modal-user-roles')[0].getElementsByTagName('option')) {
                    opt.removeAttribute("selected")
                    if (user.roles.includes(opt.getAttribute("value"))) opt.setAttribute("selected", "selected")
                }
                document.getElementsByClassName('modal-user-roles')[0].setAttribute("disabled", `disabled`);
                document.getElementsByClassName('btn-set-edit-user')[0].classList.add('hide-element')
                document.getElementsByClassName('btn-model-delete-user')[0].classList.remove('hide-element')
            })

        }
    }
}

function setTableWitUsers(currentUser = false) {
    let table = '<table class="table-with-users table table-striped">';
    if (!currentUser) {
        httpGet("/admin/user").then(res => {
            let users = JSON.parse(res);
            table += '<thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Email</th><th>Role</th><th>Edit</th><th>Delete</th></tr></thead><tbody class="table-with-users-body">'
            for (let user of users) {
                table += `<tr><td>${user.id}</td><td>${user.firstName}</td><td>${user.lastName}</td><td>${user.age}</td><td>${user.email}</td><td>${user.roles.map(role => `<span>${role.replace('ROLE_', '')}</span>`)}</td>`;
                table += `<td><button type=\"button\" class=\"btn btn-primary btn-edit-user\" userId="${user.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></td><td><button type=\"button\" class=\"btn btn-danger btn-delete-user\" userId="${user.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button></td></tr>`
            }
            table += "</tbody></table>"
            card.innerHTML = table;
            setButtonEditEvent()
            setButtonDeleteEvent()
        })
    } else {
        httpGet("/user").then(res => {
            let user = JSON.parse(res);
            table += '<thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Email</th><th>Role</th></tr></thead><tbody class="table-with-users-body">'
            table += `<tr><td>${user.id}</td><td>${user.firstName}</td><td>${user.lastName}</td><td>${user.age}</td><td>${user.email}</td><td>${user.roles.map(role => `<span>${role.replace('ROLE_', '')}</span>`)}</td>`;
            table += "</tr>"
            table += "</tbody></table>"
            card.innerHTML = table;
        })

    }
}

function setFormForNewUser() {
    const formHtml = " <form class=\"form-new-user\" id=\"formNewUser\">\n" +
        "                            <div class=\"input-group mb-2\">\n" +
        "                                <span class=\"input-group-text\" id=\"basic-addon1\">Email</span>\n" +
        "                                <input type=\"text\" class=\"form-control\" placeholder=\"Email\" aria-label=\"Email\"\n" +
        "                                    aria-describedby=\"basic-addon1\" id=\"email\">\n" +
        "                                <span class=\"input-group-text\">Password</span>\n" +
        "                                <input type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"Password\"\n" +
        "                                    id=\"password\">\n" +
        "                            </div>\n" +
        "                            <div class=\"input-group mb-3\">\n" +
        "                                <span class=\"input-group-text\">Firstname</span>\n" +
        "                                <input type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"Firstname\"\n" +
        "                                    id=\"Firstname\">\n" +
        "                                <span class=\"input-group-text\">Lastname</span>\n" +
        "                                <input type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"Lastname\"\n" +
        "                                    id=\"lastname\">\n" +
        "                                <span class=\"input-group-text\">Age</span>\n" +
        "                                <input type=\"number\" class=\"form-control\" placeholder=\"\" aria-label=\"Age\" id=\"age\">\n" +
        "                            </div>\n" +
        "                            <div class=\"input-group mb-3\">\n" +
        "                                <span class=\"input-group-text\">Roles</span>\n" +
        "                                <select class=\"form-select\" multiple aria-label=\"Multiple select example\" id=\"createRoles\" name=\"roles[]\">\n" +
        "                                </select>\n" +
        "                            </div>\n" +
        "                            <div class=\"col-auto\">\n" +
        "                                <button type=\"submit\" class=\"btn btn-primary mb-3 btn-create-user\">Add new user</button>\n" +
        "                            </div>\n" +
        "                        </form>"
    card.innerHTML = formHtml;
    setRolesOption('createRoles')
    document.getElementsByClassName('form-new-user')[0].addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            email: document.forms.formNewUser.email.value,
            password: document.forms.formNewUser.password.value,
            firstName: document.forms.formNewUser.Firstname.value,
            lastName: document.forms.formNewUser.lastname.value,
            age: document.forms.formNewUser.age.value,
            roles: getSelectValues(document.forms.formNewUser.createRoles)
        }
        console.log('Create user: ');
        httpRequest(`/admin/user`, data, 'POST').then(res => {
                $('#exampleModal').modal('hide');
                setTableWitUsers()
            }
        )
    });
}

function setRolesOption(idElement) {
    let option = ""
    for (let role of roleList) {
        option += `<option value="${role}">${role.replace("ROLE_", "")}</option>`
    }
    document.getElementById(idElement).innerHTML = option;
}

document.addEventListener("DOMContentLoaded", function () { // При инициализации тут мы запрашиваем данные
    setTableWitUsers()
    httpGet("/admin/role").then(res => {
        roleList = JSON.parse(res)
        setRolesOption('roles')
    })
    httpGet('/user').then(res => {
        res = JSON.parse(res);
        let roleHeaderList = ""
        for (let role of res.roles) {
            roleHeaderList += `<li class="px-1 text-white">${role.replace("ROLE_", "")}</li>`
        }
        document.getElementById('header-role-list').innerHTML = roleHeaderList;
        document.getElementById('current-user-email').textContent = `${res.email} with roles:`
    })
    console.log('test');
})

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

function setFirstButton(prevActiveElement, item) {
    removeClassFromFirstElementAndSetToSecond(prevActiveElement, item, 'active')
    if (item.textContent == "New User") {
        card_header.textContent = 'Add new user'
        setFormForNewUser()
    }
    if (item.textContent == "User table") {
        card_header.textContent = 'All users'
        setTableWitUsers()
    }
}

for (let item of leftNavItems) {
    item.onclick = () => {
        let prevActiveElement = document.getElementsByClassName('nav-link active left_nav_item')[0]
        if (prevActiveElement.textContent != item.textContent) {
            removeClassFromFirstElementAndSetToSecond(prevActiveElement, item, 'active')
            removeClassFromFirstElementAndSetToSecond(item, prevActiveElement, 'link-dark')
            if (item.textContent == "USER") {
                // тут админ должен запрашивать и отображать информацию о себе
                card_header.textContent = 'About user'
                right_bar_container_header.textContent = "User information-page"
                right_nav.classList.add('hide-element')
                setTableWitUsers(true);
            }
            if (item.textContent == "ADMIN") {
                card_header.textContent = 'All Users'
                right_bar_container_header.textContent = "Admin panel"
                right_nav.classList.remove('hide-element')
                setFirstButton(document.getElementById('admin_user_table_element_new'), document.getElementById('admin_user_table_element_users'))
            }
        }

    }
}

const right_nav_item = document.getElementsByClassName('right_nav_item') // центральное меню навигации между "User table" и "New user"
for (let item of right_nav_item) {
    item.onclick = () => {
        let prevActiveElement = document.getElementsByClassName('nav-link active right_nav_item')[0]
        if (prevActiveElement.textContent != item.textContent) {
            setFirstButton(prevActiveElement, item)
        }
    }
}


//Отвечает за кнопку EDIT в модальном окне
document.getElementsByClassName('btn-set-edit-user')[0].onclick = (e) => {
    e.preventDefault();
    const data = {
        id: document.forms.formEditUser.userId.value,
        email: document.forms.formEditUser.email.value,
        password: document.forms.formEditUser.password.value,
        firstName: document.forms.formEditUser.Firstname.value,
        lastName: document.forms.formEditUser.lastname.value,
        age: document.forms.formEditUser.age.value,
        roles: getSelectValues(document.forms.formEditUser.roles)
    }
    console.log(data)
    httpRequest(`/admin/user/${data.id}`, data, 'PUT').then(res => {
            $('#exampleModal').modal('hide');
            setTableWitUsers()
        }
    )
};
// Клин на кнопку DELETE в модальном окне
document.getElementsByClassName('btn-model-delete-user')[0].onclick = (e) => {
    e.preventDefault();
    console.log(document.forms.formEditUser.userId.value)
    $('#exampleModal').modal('hide');
    httpRequest(`/admin/user/${document.forms.formEditUser.userId.value}`, null, 'DELETE').then(res => {
            $('#exampleModal').modal('hide');
            setTableWitUsers()
        }
    )
};


async function httpGet(url) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return await xmlHttp.responseText;
}

async function httpRequest(url, data, method) {
    const body = data == null ? {
        method: method,
        headers: {
            'Content-type': 'application/json'
        }
    } : {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url,body);
    const resStatus = await response.status;
    return resStatus;
}