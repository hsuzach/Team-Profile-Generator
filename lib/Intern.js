// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
// In addition to `Employee`'s properties and methods, `Intern` will also have:

//   * school 

//   * getSchool()

//   * getRole() // Overridden to return 'Intern'

const Employee = require("../lib/Employee");

class Intern extends Employee {
  constructor (name, id, email, school){
    super (name, id, email);
    this.school = school
  };
  
  getRole(){
    return "Intern"
  };
  
  getSchool(){
    return this.school
  }

};

module.exports = Intern