const path = require('path');
const readline = require('readline');
const command = require('./command');
const {USER, HOME, DIR} = process.env;



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



rl.question('Would you like to deploy to \nhttps://sandbox.altv.com/dugout ? ', (answer) => {
    if(/yes/i.test(answer)) {
				deployToSandbox('dugout');
        rl.write('deploying to https://sandbox.altv.com/dugout');
        rl.close();
    }
    deployToSandbox('frank');
    rl.write('deploying to https://frank.altv.com\n');
    rl.close();
});




function deployToSandbox(location) {
    if(USER === 'frankhague') {
        command(`rsync -r ${DIR}/dist/. altv-sandbox-front3:/var/www/${location}`, (err, res) => {
            if(err) return console.log(`Unable to deploy to sandbox server for ${USER}`)
						console.log(`Successfully deployed to ${USER}'s site`)
        })
    } else {
        console.log(`to deploy to sandbox\nedit =>\n${path.relative(HOME, __filename)}\nand configure for ${USER}`)
    }
}



