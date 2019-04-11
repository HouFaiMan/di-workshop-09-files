var fs = require('fs');
var fileContents = fs.readFileSync('names.txt', 'utf-8');
var namesArray = fileContents.split('\r\n');
var reverseArray = namesArray.reverse();

function reverseName(str) {
    return str.split("").reverse().join("");
}

for (var name of namesArray) {
    var reversedName = reverseName(name);
    fs.writeFileSync(reversedName, reversedName, 'utf-8');
}