const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const QUERY = encodeURIComponent(process.env.QUERY);
const url = `${process.env.JIRA_URL}/rest/api/2/search?jql=${QUERY}`;
const { fetchTickets } = require('../modules/jira');

const getTickets = () => {
	fetchTickets(url).then(res => {
		let data =
			res.issues
				 .map(({key, fields}) => ({key,
					 summary: fields.summary,
					 description: fields.description,
					 assignee: fields.assignee.name,
					 status: fields.status.name
				 }));

		fs.writeFile(path.join(process.env.DEST, 'tickets.json'), JSON.stringify(data, null, 4), (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});

	}).catch(err => {

		return console.log('ERROR \n' + err)

	})
}


getTickets();
