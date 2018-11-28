const commit = require('./command')

function getBranch() {
	return new Promise(resolve =>{
		commit(`cd ${process.env.DIR} && git describe --all && git rev-parse --short HEAD`, (err, data) =>{
			if (err) return console.log(err);
			let arr = data.split('\n').filter(Boolean);
			resolve({
				branch: arr[ 0 ],
				commit: arr[ 1 ]
			})
		})
	})
}


module.exports = getBranch;
