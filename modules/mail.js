const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const nodemailer = require('nodemailer');
const emails = require('./emails');
const sendMessage = require('./message');


if(process.env.USER === 'frankhague') {

	console.log('email => ' + process.env.EMAIL_ACCOUNT);
	console.log('password => ' + process.env.EMAIL_PASSWORD);
	//process.exit();
}

// Create the transporter with the required configuration for Outlook
// change the user and pass !
const transporter = nodemailer.createTransport({
	host: 'smtp.office365.com',
	port: 587,
	secure: false, // use SSL
	auth: {
		user: process.env.EMAIL_ACCOUNT,
		pass: process.env.EMAIL_PASSWORD
	}
});

sendMessage('include: ').then(res => {

// setup e-mail data
	const mailOptions = {
		from: `"${process.env.EMAIL_ACCOUNT} " <${process.env.EMAIL_ACCOUNT}>`, // sender address (who sends)
		//from: '"frank@altv.com " <frank@altv.com>', // sender address (who sends)
		//to: argv.email,
		to: emails.to,
		cc: emails.cc,
		subject: 'JWPLAYER release to SANDBOX', // Subject line
		html: res // html body
	};

// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error) return console.log(error);

		console.log('Message sent: ' + info.response);
	});
});




process.on('exit', (code) => {
	console.log(`EMAIL has been sent at ${process.env.EMAIL_ACCOUNT}`);
	//console.log(Object.keys(transporter));
});
