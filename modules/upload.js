const path  = require('path');
const command  = require('./command');



function uploadAssetsToS3() {

	if(!process.env.DIR) {
		return console.log('Please define the DIR environment variable in you command')
	}

	let images = path.join(process.env.DIR, 'app/images/');
	let styles = path.join(process.env.DIR, 'dist/styles/');
	let scripts = path.join(process.env.DIR, 'dist/scripts/');
	let baseCommand = `aws s3 cp --recursive --cache-control max-age=604800 --expires 'Tue, 19 Jan 2039 03:14:07 GMT'`;
	if(process.env.USER === 'frankhague') {
		baseCommand += ' --profile=altv';
	}

	let destinations = [
		{from: `${images}`, to: 's3://assets.altv.com/images/'},
		{from: `${styles}`, to: 's3://assets.altv.com/styles/'},
		{from: `${scripts}`, to: 's3://assets.altv.com/scripts/'},
	];

	destinations.map(d => {
		console.log()
		command(`${baseCommand} ${d.from} ${d.to}`, (err, data) => {
			if(err) return console.log(err)
			console.log(`DEPLOY ${d.from} ${d.to} => \n`)
		})
	})

}

uploadAssetsToS3();
//module.exports = uploadAssetsToS3;




