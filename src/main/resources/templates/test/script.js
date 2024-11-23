const leftNavItems = document.getElementsByClassName('left_nav_item')
const right_bar_container_header = document.getElementsByClassName('right-bar-container-header')[0] // Главный заголовок
const card_header = document.getElementsByClassName('card-header-item')[0] // элемент отвечает за текст 'Add new user' и 'All users'
const right_nav = document.getElementsByClassName('right_nav')[0] // Анимация центральной навигации между User table и New User
const right_nav_item = document.getElementsByClassName('right_nav_item')
const form_new_user = document.getElementsByClassName('form-new-user')[0] // форма создания нового пользователя
const table_with_users = document.getElementsByClassName('table-with-users')[0] // админская таблица со всеми пользователями


const state = {
    leftStatus: document.getElementsByClassName('nav-link active left_nav_item')[0].textContent,
    rigthStatus: document.getElementsByClassName('nav-link active right_nav_item')[0].textContent
}

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

function firstRemoveAndSetClassToSecond(item1, item2, className) {
    item1.classList.remove(className)
    item2.classList.add(className)
}


// const table_body =       // body
function tableGenerator(users, mode = null) {
    let table = '';
    if (!mode) {
        table += '<thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Email</th><th>Role</th><th>Edit</th><th>Delete</th></tr></thead><tbody class="table-with-users-body">'
    }
    else {
        table += '<thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Email</th><th>Role</th></tr></thead><tbody class="table-with-users-body">'
    }
    for (let user of users) {
        table += `<tr><td>${user.id}</td><td>${user.Firstname}</td><td>${user.Lastname}</td><td>${user.age}</td><td>${user.email}</td><td>${user.roles.map(role => `<span>${role}</span>`)}</td>`;
        if (!mode) {
            table += "<td><a href=\"/admin/user/update/1\"><button type=\"button\" class=\"btn btn-primary\">Edit</button></a></td><td><a href=\"/admin/user/delete/1\"><button type=\"button\" class=\"btn btn-danger\">Delete</button></a></td></tr></tbody>"
        } else {
            table += "</tr></tbody>"
        }

    }
    table_with_users.innerHTML = table;
}
document.addEventListener("DOMContentLoaded", tableGenerator(users)) // При инициализации типо запрашиваем данные


// document.getElementsByClassName('btn-create-user')[0].onclick = (data) => {
//     const doc = new FormData(form_new_user).entries()
//     console.log(doc);
// }


form_new_user.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData))
    // for(let [name, value] of formData) {
    //     alert(`${name} = ${value}`); // key1=value1, потом key2=value2
    //   }
    const data = {
        email: document.forms.formNewUser.email.value,
        password: document.forms.formNewUser.password.value,
        firstname: document.forms.formNewUser.Firstname.value,
        lastname: document.forms.formNewUser.lastname.value,
        age: document.forms.formNewUser.age.value,
        roles: getSelectValues(document.forms.formNewUser.roles)
    }
    console.log(data)
    // formData.entries().forEach(el => {
    //     console.log(el)
    // })

    // Now you can use formData.get('foo'), for example.
    // Don't forget e.preventDefault() if you want to stop normal form .submission
});

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
    firstRemoveAndSetClassToSecond(prevActiveElement, item, 'active')
    httpGet('test').then(value => { console.log(value) })
    if (item.textContent == "New User") {
        card_header.textContent = 'Add new user'
        firstRemoveAndSetClassToSecond(form_new_user, table_with_users, 'hide-element')
    }
    if (item.textContent == "User table") {
        card_header.textContent = 'All users'
        firstRemoveAndSetClassToSecond(table_with_users, form_new_user, 'hide-element')
        tableGenerator(users)
    }
}

console.log(leftNavItems)
for (let item of leftNavItems) {
    item.onclick = () => {
        console.log(item.textContent)
        let prevActiveElement = document.getElementsByClassName('nav-link active left_nav_item')[0]
        if (prevActiveElement.textContent != item.textContent) {
            firstRemoveAndSetClassToSecond(prevActiveElement, item, 'active')
            firstRemoveAndSetClassToSecond(item, prevActiveElement, 'link-dark')
            if (item.textContent == "USER") {
                // тут админ должен запрашивать и отображать информацию о себе
                card_header.textContent = 'About user'
                right_bar_container_header.textContent = "User information-page"
                card_header.textContent = "About user"
                right_nav.classList.add('hide-element')
                tableGenerator([{
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
                firstRemoveAndSetClassToSecond(table_with_users, form_new_user, 'hide-element')
                firstRemoveAndSetClassToSecond(table_with_users, form_new_user, 'link-dark')
            }
            if (item.textContent == "ADMIN") {
                card_header.textContent = 'All Users'
                right_bar_container_header.textContent = "Admin panel"
                card_header.textContent = "All users"
                right_nav.classList.remove('hide-element')
                setFirstButton(document.getElementById('admin_user_table_element_new'), document.getElementById('admin_user_table_element_users'))
            }
        }

    }
}

// Анимация центральной навигации между User table и New User



for (let item of right_nav_item) {
    item.onclick = () => {
        let prevActiveElement = document.getElementsByClassName('nav-link active right_nav_item')[0]
        if (prevActiveElement.textContent != item.textContent) {
            setFirstButton(prevActiveElement, item)
        }
    }
}


async function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return await xmlHttp.responseText;
}