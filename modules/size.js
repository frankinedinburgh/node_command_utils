const fs = require('fs');
const path = require('path');

// du -ach ./dist // unix command

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), filelist)
            : filelist.concat({
                name: file,
                path: path.join(dir, file),
                size: fs.statSync(path.join(dir, file)).size
            });
    });
    return filelist;
};


function totalSize(dir) {
    let build = walkSync(dir);
    build = build.map(value => value.size);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return bytesToMegaBytes(build.reduce(reducer));
}

function bytesToMegaBytes(val) {
    if(val > 999999) {
        return val / 1000000 + ' Mb'
    }
}

module.exports = totalSize;



