const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

const employees = []
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

function addEmployee() {

    inquirer.prompt([{
            type: "list",
            name: "role",
            message: "Select employee role:",
            choices: ["Manager", "Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "Employee name:"
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Employee email:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Manager's office number:",
            when: function (questions) {
                return questions.role === "Manager"
            }
        },
        {
            type: "input",
            name: "gitHub",
            message: "Engineer's GitHub username:",
            when: function (questions) {
                return questions.role === "Engineer"
            }
        },
        {
            type: "input",
            name: "school",
            message: "Intern's school name:",
            when: function (questions) {
                return questions.role === "Intern"
            }
        },
        {
            type: "list",
            name: "another",
            message: "Would you like to enter another employee?",
            choices: ["YES", "NO"]
        }
    ]).then(response => {

        if (response.role === "Manager") {
            const managerInfo = new Manager(response.name, response.id, response.email, response.officeNumber)
            employees.push(managerInfo)
            console.log(employees)
        }

        if (response.role === "Engineer") {
            const engineerInfo = new Engineer(response.name, response.id, response.email, response.gitHub)
            employees.push(engineerInfo)
            console.log(employees)
        }

        if (response.role === "Intern") {
            const internInfo = new Intern(response.name, response.id, response.email, response.school)
            employees.push(internInfo)
            console.log(employees)
        }

        if (response.another === "YES") {
            addEmployee()
        } else {

            fs.writeFile("./lib/htmlData.html", render(employees), error => {
                if (error) throw error;
                console.log("You have successfully generated a new member!");
            });


        }
    })

}

addEmployee()