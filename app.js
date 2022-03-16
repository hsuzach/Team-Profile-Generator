const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { resolvePtr } = require("dns");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let team = [];


function start(){
  function setManager(){
    inquirer.prompt([
      {
        name: 'managerName',
        type: 'input',
        message: "What is the manager's name?",
      },
      {
        name: 'managerId',
        type: 'input',
        message: "What is the manager's employee ID?",
      },
      {
        name: 'managerEmail',
        type: 'input',
        message: "What is the manager's email?",
      },
      {
        name: 'managerOfficeNumber',
        type: 'input',
        message: "What is the manager's office number?",
      },
    ])
    .then((data) => {
      
      const newManager = new Manager(
        data.managerName, 
        data.managerId, 
        data.managerEmail, 
        data.managerOfficeNumber

      )
      team.push(newManager);
      assignTeam();
      
    });
  }
  
  function assignTeam(){
    inquirer.prompt([
      {
        name: 'role',
        type: 'list',
        message: "What type of employee would you like to add?",
        choices: ['Engineer', 'Intern', 'I am finished adding members'],
      }
    ])
    .then((data) => {
      if (data.role === 'Engineer'){
        inquirer.prompt([
          {
            name: 'engineerName',
            type: 'input',
            message: "What is this engineer's name?",
          },
          {
            name: 'engineerId',
            type: 'input',
            message: "What is the engineer's employee ID?",
          },
          {
            name: 'engineerEmail',
            type: 'input',
            message: "What is this engineer's email?",
          },
          {
            name: 'engineerGithub',
            type: 'input',
            message: "What is this engineer's GitHub username?",
          },
        ])
        .then((data) =>{
          const newEngineer = new Engineer(
            data.engineerName,
            data.engineerId,
            data.engineerEmail,
            data.engineerGithub,
          );
          
          team.push(newEngineer);
          assignTeam();
        })

      }
      if (data.role === 'Intern'){
        inquirer.prompt([
          {
            name: 'internName',
            type: 'input',
            message: "What is this intern's name?",
          },
          {
            name: 'internId',
            type: 'input',
            message: "What is the intern's Employee ID?",
          },
          {
            name: 'internEmail',
            type: 'input',
            message: "What is this intern's email?",
          },
          {
            name: 'internSchool',
            type: 'input',
            message: "What school is this intern attending?",
          },
        ])
        .then((data) =>{
          const newIntern = new Intern(
            data.internName,
            data.internId,
            data.internEmail,
            data.internSchool,
          );
          
          team.push(newIntern);
          assignTeam();
        })
      }
      if (data.role === 'I am finished adding members'){

        console.log(team);

        function renderTeam(){
          if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
          }

          fs.writeFile(outputPath, render(team), err =>{
            if (err){
              console.log(err)
              return
            }
          })
        }
        renderTeam();
      }
      
    })
  }
  setManager();

}
start();
  



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
