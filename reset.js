//used to delete made team.html from Team-Page Folder

const fs = require('fs');
if (fs.existsSync('./Team-Page/team.html')) {
  fs.unlinkSync('./Team-Page/team.html');
  console.log('/Team-Page/ folder reset!');
}
