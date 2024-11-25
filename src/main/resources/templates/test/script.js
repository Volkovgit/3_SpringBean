const leftNavItems = document.getElementsByClassName('left_nav_item')
const right_bar_container_header = document.getElementsByClassName('right-bar-container-header')[0] // Главный заголовок
const card_header = document.getElementsByClassName('card-header-item')[0] // элемент отвечает за текст 'Add new user' и 'All users'
const right_nav = document.getElementsByClassName('right_nav')[0] // Анимация центральной навигации между User table и New User
const card = document.getElementsByClassName('card-body')[0]; // центральный элемент карточки, в который вставляются данные

const users = [
    {
        "id": 83,
        "age": 30,
        "Firstname": "Erika",
        "Lastname": "Wilkins",
        "email": "erikawilkins@tingles.com",
        "password": "aliqua24excepteur",
        "roles": [
            "TEST", "USER"
        ]
    },
    {
        "id": 87,
        "age": 28,
        "Firstname": "Charles",
        "Lastname": "Nichols",
        "email": "charlesnichols@tingles.com",
        "password": "dolore26dolore",
        "roles": [
            "ADMIN",
            "TEST"
        ]
    },
    {
        "id": 48,
        "age": 37,
        "Firstname": "Graciela",
        "Lastname": "Bailey",
        "email": "gracielabailey@tingles.com",
        "password": "dolor38enim",
        "roles": [
            "TEST",
            "USER"
        ]
    },
    {
        "id": 17,
        "age": 39,
        "Firstname": "Deirdre",
        "Lastname": "Zimmerman",
        "email": "deirdrezimmerman@tingles.com",
        "password": "ipsum29nostrud",
        "roles": [
            "USER",
            "TEST"
        ]
    },
    {
        "id": 6,
        "age": 20,
        "Firstname": "Miranda",
        "Lastname": "Best",
        "email": "mirandabest@tingles.com",
        "password": "laboris26veniam",
        "roles": [
            "SELLER",
            "USER",
            "TEST"
        ]
    },
    {
        "id": 76,
        "age": 25,
        "Firstname": "Heidi",
        "Lastname": "Petty",
        "email": "heidipetty@tingles.com",
        "password": "exercitation24eu",
        "roles": [
            "USER",
            "TEST"
        ]
    },
    {
        "id": 57,
        "age": 29,
        "Firstname": "Boyd",
        "Lastname": "Gates",
        "email": "boydgates@tingles.com",
        "password": "reprehenderit28laborum",
        "roles": [
            "SELLER",
            "TEST"
        ]
    },
    {
        "id": 43,
        "age": 26,
        "Firstname": "Hancock",
        "Lastname": "Aguirre",
        "email": "hancockaguirre@tingles.com",
        "password": "voluptate37excepteur",
        "roles": [
            "ADMIN",
            "TEST",
            "SELLER"
        ]
    },
    {
        "id": 76,
        "age": 22,
        "Firstname": "Manning",
        "Lastname": "Gentry",
        "email": "manninggentry@tingles.com",
        "password": "non25duis",
        "roles": [
            "SELLER",
            "ADMIN"
        ]
    },
    {
        "id": 37,
        "age": 39,
        "Firstname": "Marsh",
        "Lastname": "Leon",
        "email": "marshleon@tingles.com",
        "password": "nisi40consectetur",
        "roles": [
            "SELLER",
            "USER"
        ]
    },
    {
        "id": 2,
        "age": 30,
        "Firstname": "Holmes",
        "Lastname": "Howell",
        "email": "holmeshowell@tingles.com",
        "password": "dolor28quis",
        "roles": [
            "TEST",
            "ADMIN"
        ]
    },
    {
        "id": 2,
        "age": 39,
        "Firstname": "Day",
        "Lastname": "Talley",
        "email": "daytalley@tingles.com",
        "password": "aute35ea",
        "roles": [
            "USER"
        ]
    },
    {
        "id": 5,
        "age": 35,
        "Firstname": "Barrera",
        "Lastname": "Benton",
        "email": "barrerabenton@tingles.com",
        "password": "enim27id",
        "roles": [
            "ADMIN",
            "TEST"
        ]
    },
    {
        "id": 11,
        "age": 34,
        "Firstname": "Jaime",
        "Lastname": "Hernandez",
        "email": "jaimehernandez@tingles.com",
        "password": "dolor33anim",
        "roles": [
            "USER"
        ]
    },
    {
        "id": 63,
        "age": 30,
        "Firstname": "Talley",
        "Lastname": "Schneider",
        "email": "talleyschneider@tingles.com",
        "password": "est20incididunt",
        "roles": [
            "USER"
        ]
    }
]

function removeClassFromFirstElementAndSetToSecond(item1, item2, className) {
    item1.classList.remove(className)
    item2.classList.add(className)
}

// добавляем события на кнопку EDIT в таблице
function setButtonEditEvent() {
    for (let btn_edit of document.getElementsByClassName('btn-edit-user')) {
        btn_edit.onclick = (e) => {
            const user = users.find(u => u.id == parseInt(e.target.getAttribute("userId")))
            document.getElementsByClassName('modal-user-id')[0].setAttribute("value", `${user.id}`);
            document.getElementsByClassName('modal-user-email')[0].setAttribute("value", `${user.email}`);
            document.getElementsByClassName('modal-user-password')[0].setAttribute("value", `${user.password}`);
            document.getElementsByClassName('modal-user-firstname')[0].setAttribute("value", `${user.Firstname}`);
            document.getElementsByClassName('modal-user-lastname')[0].setAttribute("value", `${user.Lastname}`);
            document.getElementsByClassName('modal-user-age')[0].setAttribute("value", `${user.age}`);
            for (let opt of document.getElementsByClassName('modal-user-roles')[0].getElementsByTagName('option')) {
                opt.removeAttribute("selected")
                if (user.roles.includes(opt.getAttribute("value"))) opt.setAttribute("selected", "selected")
            }
            document.getElementsByClassName('btn-set-edit-user')[0].classList.remove('hide-element')
            document.getElementsByClassName('btn-model-delete-user')[0].classList.add('hide-element')
        }
    }
}

// Добавляем события на кнопку DELETE в таблице
function setButtonDeleteEvent() {
    for (let btn_delete of document.getElementsByClassName('btn-delete-user')) {
        btn_delete.onclick = (e) => {
            const user = users.find(u => u.id == parseInt(e.target.getAttribute("userId")))
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
        }
    }
}

function setTableWitUsers(users, mode = null) {

    let table = '<table class="table-with-users table table-striped">';
    if (!mode) {
        table += '<thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Email</th><th>Role</th><th>Edit</th><th>Delete</th></tr></thead><tbody class="table-with-users-body">'
    } else {
        table += '<thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Email</th><th>Role</th></tr></thead><tbody class="table-with-users-body">'
    }
    for (let user of users) {
        table += `<tr><td>${user.id}</td><td>${user.Firstname}</td><td>${user.Lastname}</td><td>${user.age}</td><td>${user.email}</td><td>${user.roles.map(role => `<span>${role}</span>`)}</td>`;
        if (!mode) {
            table += `<td><button type=\"button\" class=\"btn btn-primary btn-edit-user\" userId="${user.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></td><td><button type=\"button\" class=\"btn btn-danger btn-delete-user\" userId="${user.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button></td></tr>`
        } else {
            table += "</tr>"
        }
    }
    table += "</tbody></table>"
    card.innerHTML = table;
    setButtonEditEvent()
    setButtonDeleteEvent()
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
        "                                <select class=\"form-select\" multiple aria-label=\"Multiple select example\" id=\"roles\" name=\"roles[]\">\n" +
        "                                <!-- <select multiple id=\"roles\" name=\"roles[]\"> -->\n" +
        "                                    <option selected>Open this select menu</option>\n" +
        "                                    <option value=\"1\">One</option>\n" +
        "                                    <option value=\"2\">Two</option>\n" +
        "                                    <option value=\"3\">Three</option>\n" +
        "                                </select>\n" +
        "                            </div>\n" +
        "                            <div class=\"col-auto\">\n" +
        "                                <button type=\"submit\" class=\"btn btn-primary mb-3 btn-create-user\">Add new user</button>\n" +
        "                            </div>\n" +
        "                        </form>"
    card.innerHTML = formHtml;
    document.getElementsByClassName('form-new-user')[0].addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            email: document.forms.formNewUser.email.value,
            password: document.forms.formNewUser.password.value,
            firstname: document.forms.formNewUser.Firstname.value,
            lastname: document.forms.formNewUser.lastname.value,
            age: document.forms.formNewUser.age.value,
            roles: getSelectValues(document.forms.formNewUser.roles)
        }
        console.log('Create user: ');
        console.log(data)
    });
}

document.addEventListener("DOMContentLoaded", setTableWitUsers(users)) // При инициализации тут мы запрашиваем данные

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
        setTableWitUsers(users)
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
                setTableWitUsers([{
                    "id": 83,
                    "age": 30,
                    "Firstname": "Erika",
                    "Lastname": "Wilkins",
                    "email": "erikawilkins@tingles.com",
                    "password": "aliqua24excepteur",
                    "roles": [
                        "TEST", "USER"
                    ]
                }], 1);
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
        firstname: document.forms.formEditUser.Firstname.value,
        lastname: document.forms.formEditUser.lastname.value,
        age: document.forms.formEditUser.age.value,
        roles: getSelectValues(document.forms.formEditUser.roles)
    }
    $('#exampleModal').modal('hide');
    console.log(data)
};
// Клин на кнопку DELETE в модальном окне
document.getElementsByClassName('btn-model-delete-user')[0].onclick = (e) => {
    e.preventDefault();
    const data = {
        id: document.forms.formEditUser.userId.value,
        email: document.forms.formEditUser.email.value,
        password: document.forms.formEditUser.password.value,
        firstname: document.forms.formEditUser.Firstname.value,
        lastname: document.forms.formEditUser.lastname.value,
        age: document.forms.formEditUser.age.value,
        roles: getSelectValues(document.forms.formEditUser.roles)
    }
    console.log("Delete user: ")
    console.log(data)
    $('#exampleModal').modal('hide');
    // document.getElementById("exampleModal").classList.remove('show');
};


async function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return await xmlHttp.responseText;
}