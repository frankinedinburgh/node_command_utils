const pug = require('pug');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const tickets = require('./tickets.json')
const emails = require('../modules/emails');
const timeOfCommit = require('../modules/time_of_commit')
const { getBranch } = require('../modules/get_branch')
const size = require('../modules/size')
const currentTime = require('../modules/current_time')



getBranch().then(res => {
	return res;
}).then(data => {
	timeOfCommit().then(res => {
		const obj = Object.assign(res, data);
		const deployedAt= currentTime();
		const {branch, commit, date, time} = obj;
		const weight = size(path.join(process.env.DIR, '/dist'));
		const message = `\n<!-- time_of_deployment: ${deployedAt} branch: ${branch} commit: ${commit} date: ${date} time: ${time} -->`;
		const options = {
			debug: false,
			pretty: true
		};
		const compiledFunction = pug.compileFile('views/email.pug', options);
		const transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			port: 587,
			secure: false, // use SSL
			auth: {
				user: process.env.EMAIL_ACCOUNT,
				pass: process.env.EMAIL_PASSWORD
			}
		});
		const mailOptions = {
			from: `"${process.env.EMAIL_ACCOUNT} " <${process.env.EMAIL_ACCOUNT}>`,
			to: emails.to,
			cc: emails.cc,
			subject: process.env.SUBJECT || 'Tickets deployed',
			html: compiledFunction({
				tickets,
				branch,
				weight,
				date,
				commit,
				time: deployedAt,
				message
			})
		};

		transporter.sendMail(mailOptions, function(error, info){
			if(error) return console.log(error);

			console.log('Message sent: ' + info.response);
		});
	})
})






