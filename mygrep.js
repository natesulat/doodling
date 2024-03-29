// You run it like this
//      node mygrep.js <QUERY> <FILEPATH>

// So if you don't have four arguments, you're already in trouble
if (process.argv.length !== 4) {
    console.log("Dude. You need four arguments. What am I looking for? THINK FOR A SECOND!!!");
    process.exit(1865);
}

var fs = require('fs'),
    query = process.argv[2],
    path = process.argv[3] + '/',
    enc = 'utf8',
    directory = fs.readdirSync(path, enc);

mygrep(path, directory, query);

// Take a path, a directory array, and a query
// For all files in the directory array, execute the grep
// If you come across a directory, recursively execute the function on it
function mygrep(p, d, q) {

    var ln = d.length,
        i = 0;

    while (i < ln) {
        let name = p + d[i],
            stat = fs.statSync(name);

        // In Node 10+, you can use fs.Dirent objects to check this
        // I do not have Node 10+, so this is how I did it
        if (stat.isDirectory()) {
            let dir = fs.readdirSync(name);
            mygrep(name + '/', dir, q);
        } else {
            printMatchingLines(name, q);
        }
        i++;
    }

}

// Separation of concerns!
// In fairness, the <find> and <print> actions could semantically be considered
// different, but when I started separating it out my brain started leaking out
// of my ears so I had to stop
function printMatchingLines(file, query) {
    var text = fs.readFileSync(file, enc),
        lines = text.split('\n');

    lines.forEach(function (line, index) {
        if (line.indexOf(query) > -1) {
            index++;
            console.log(file + ":" + index + "\t" + line);
        }
    });
}