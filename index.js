// Import the filesystem module 
const fs = require("fs"); 
const { parse, stringify } = require('svgson')
var directory_name = "./files/"; 
color = "#A2432F"

let filenames = fs.readdirSync(directory_name); 


nextFile()
async function nextFile() {
console.log("\nFilenames in directory:"); 
filenames.forEach((file) => { 
    read(file);
}); 
}


function read(x) {
  let fileName = x
  console.log("file name is:" + fileName)
  fs.readFile(directory_name+x, 'utf8' , async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    let svgJson = await parse(data)
    JSON.stringify(svgJson, null, 2)
    writeTo(svgJson, fileName)
  })
}


function writeTo(svgJson, fileName) {
  svgJson.attributes.stroke = "#A2432F"
  let fileToSave = stringify(svgJson)
  console.log(fileToSave)
  fs.writeFile(directory_name+"new "+fileName, fileToSave, function(err,data) {
    if (err) {
      return console.log(err);
    }
    nextFile()
  });
}
