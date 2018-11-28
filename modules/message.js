const os = require('os')
const size = require('./size')
const commit = require('./command')
const timeOfCommit = require('./time_of_commit')
const getBranch = require('./get_branch')
const currentTime = require('./current_time')


const sendMessage = (title) => {
    return new Promise(resolve => {
        currentTime().then(res => {
            return res;
        }).then(res => {
            getBranch().then(data => {
                return Object.assign({currentTime: res}, data);
            }).then(res => {
                timeOfCommit().then(data => {
                    const { currentTime, branch, commit, date, time } = Object.assign(res, data);
                    let message = `<strong>Size: </strong>${size}<br></strong></strong><strong>Branch: </strong>${branch}<br><strong>Commit: </strong>${commit}<br/>`;
                    message += `<strong>Date: </strong>${date}<br/><strong>Time of deployment: </strong>${currentTime}<br/><strong>Time of commit: </strong>${time}<br/>`;
                    resolve(`<div>
                    <h4>${title}</h4>
                    <p>First interation of JWPlayer migration to ALTV mena. Unable to find tickets for the JWPlayer migration in Jira</p>
                    <small>${message}</small>
                  </div>`)
                })
            })
        })
    });
}

module.exports = sendMessage;
