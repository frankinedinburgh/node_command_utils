const fs = require('fs')
const path = require('path')
const file = path.join(process.env.DIR, '/dist/index.html');
const timeOfCommit = require('../modules/time_of_commit')
const getBranch = require('../modules/get_branch')
const currentTime = require('../modules/current_time')


function appendGitVersionToIndex(file, message){
    fs.appendFile(file, message, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

getBranch().then(res => {
    return res;
}).then(data => {
    timeOfCommit().then(res => {
        const obj = Object.assign(res, data);
        const deployedAt= currentTime();
        const message = `\n<!-- time_of_deployment: ${deployedAt} branch: ${obj.branch} commit: ${obj.commit} date: ${obj.date} time: ${obj.time} -->`;
        appendGitVersionToIndex(file, message)
    })
});



