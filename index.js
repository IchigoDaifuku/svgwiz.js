// Import the filesystem module 
const fs = require("fs"); 
const { parse, stringify } = require('svgson')
const process = require('process');
fileArray = []
var directory_nameIn = "./files-in/";
var directory_nameOut = "./files-out/"; 
colour = ["#6a0dad", "purple-"]

let filenames = fs.readdirSync(directory_nameIn); 


start()
function start() {
console.log("\nFilenames in directory:"); 
filenames.forEach((file) => { 
  if (fileArray.includes(file)) {
    console.log("finished")
    process.exit(0);
  }
  return read(file);
}); 
}


function read(file) {
  let fileName = file
  console.log("file name is:" + fileName)
  fs.readFile(directory_nameOut+fileName, 'utf8' , async (err, data) => {
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
  svgJson.attributes.stroke = colour[0]
  let fileToSave = stringify(svgJson)
  fs.writeFile(directory_nameOut+colour[1]+fileName, fileToSave, function(err,data) {
  fileArray.push(fileName)
    if (err) {
      return console.log(err);
    }
    start()
  });
}
