const inquirer = require("inquirer")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const employees = []
const fs = require("fs")

function start() {
    console.log("Welcome message")
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name? (Required')",
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID? (Required')",
        },
        {
            type: "input",
            name: "email",
            message: "What is your Email Address? (Required')",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number? (Required')",
        }
    ]).then(response => {
        console.log(response)
        createManager(response);
    })
}

function createManager({ name, id, email, officeNumber }) {
    console.log("")
    let manager = new Manager(name, id, email, officeNumber)
    employees.push(manager)
    createNext();
}

function createNext() {
    inquirer.prompt({
        type: "list",
        name: "next",
        message: "What would you like to create next?(Required)'",
        choices: ["Engineer", "Intern", "Done"],
    }).then(response => {
        console.log(response)
        switch (response.next) {
            case "Engineer":
                createEngineer();
                break

            case "Intern":
                createIntern();
                break

            case "Done":
                createHtml();
                break
        }

    })

}

function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What's the Engineer's name? (Required')",
        },
        {
            type: "input",
            name: "id",
            message: "What's the Engineer's id? (Required')",
        },
        {
            type: "input",
            name: "email",
            message: "What's the Engineer's email? (Required')",
        },
        {
            type: "input",
            name: "github",
            message: "What's the Engineer's github username? (Required')",
        },
    ]).then(({name, id,email, github}) => {
        let newEngineer = new Engineer(name, id, email, github)
        employees.push(newEngineer)
        createNext();
    })
};

function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What's the Interns name? (Required')",
        },
        {
            type: "input",
            name: "id",
            message: "What's the Interns id? (Required')",
        },
        {
            type: "input",
            name: "email",
            message: "What's the Interns email? (Required')",
        },
        {
            type: "input",
            name: "school",
            message: "What school does the Intern attend? (Required')",
        },
    ]

    ).then(({name, id, email, school}) => {
        let newIntern = new Intern(name, id, email, school)
        employees.push(newIntern)
        createNext();
    })
};

function createHtml() {
    const html = `
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Employee Database</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
            </head>
        <body>
        <div class="row justify-content-around">
        ${employees.map(employee => createCard(employee)).join("")}
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
        </body>

    </html>
    `
fs.writeFileSync("dist/index.html", html)
}

function createCard(employee) {
    const role = employee.getRole()
    let extraProp;
    if (role == "Manager") {
        extraProp = `<p class="card-text"> office number: ${employee.officeNum}</p>`
    }
    else if (role == "Engineer") {
        extraProp = `<p class="card-text">Github Username: ${employee.github}</p>`
    }
    else {
        extraProp = `<p class="card-text">School Name: ${employee.school}</p>`
    }
    return `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${employee.name}</h5>
        <h6 class="card-subtitle mb-2">${employee.getRole()}</h6>
        <p class="card-text">${employee.id}</p>
        <p class="card-text">${employee.email}</p>
        ${extraProp}
        </div>
    </div>
`
}

start();
