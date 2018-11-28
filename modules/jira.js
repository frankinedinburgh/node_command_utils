const request = require('request');

const summary = () => {
    return new Promise(function(json){
        request(url, {
            json: true,
            auth: {
                username: process.env.JIRA_USERNAME,
                password: process.env.JIRA_PASSWORD
            }
        }, (error, response, body) => {
            if(error) return console.log('Unable to connect to the JIRA server', process.env);

            if(response.statusCode !== 200) return console.log(response.statusMessage);

            const issues = body.issues;

            const QA = issues.map(d => {
                const {summary, assignee} = d.fields;
                return Object.assign({}, {
                    key: d.key,
                    summary,
                    assignee: assignee !== null && typeof assignee === 'object' ? assignee.displayName : 'unassigned'
                });
            })

            json(QA);
        });
    });
};


const fetchTickets = (query) => {
    return new Promise(function(resolve, reject){
        request(query, {
            json: true,
            auth: {
                username: process.env.JIRA_USERNAME,
                password: process.env.JIRA_PASSWORD
            }
        }, (error, response, body) => {

            if(error) reject(error);

            if(response.statusCode !== 200) reject(`ERROR for => ${process.env.JIRA_PASSWORD}\n` + response.url + '\n' +response.statusMessage);

            resolve(body);

        });
    });
};


const postComment = (ticket, comment) => {

    const options = {
        method: 'POST',
        url: `${process.env.JIRA_URL}/rest/api/2/issue/${ticket}/comment`,
        auth: {
            username: process.env.JIRA_USERNAME,
            password: process.env.JIRA_PASSWORD,
            sendImmediately: true
        },
        body: {
            body: comment
        },
        json: true
    };


    return new Promise(function(resolve, reject){
        request(options, (error, response, body) => {

            if(error) return reject(error);

            console.log(response.statusCode)

            if(response.statusCode !== 201) return reject(response.statusMessage);

            resolve(body);

        });
    });
};



module.exports = {
    summary,
		fetchTickets,
    postComment
};
