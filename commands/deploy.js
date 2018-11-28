const command = require('../modules/command');
const {USER, DIR} = process.env;

function deployToSandbox(location) {
	command(`rsync -r ${DIR}/dist/. altv-sandbox-front3:/var/www/${location}`, (err, res) => {
		if(err) return console.log(`Unable to deploy to sandbox server for ${USER}`)
		console.log(`Successfully deployed to ${USER}'s site`)
	})
}

deployToSandbox(process.env.LOCATION);



