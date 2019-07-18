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

function mygrep(p, d, q) {

    var ln = d.length,
        i = 0;

    while (i < ln) {
        let name = p + d[i];
            stat = fs.statSync(name);

        if (stat.isDirectory()) {
            let dir = fs.readdirSync(name);
            mygrep(name + '/', dir);
        } else {
            let text = fs.readFileSync(name, enc),
                lines = text.split('\n');

            lines.forEach(function (line, index) {
                if (line.indexOf(q) > -1) {
                    index++;
                    console.log(name + ":" + index + "\t" + line);
                }
            })
        }
        i++;
    }

}