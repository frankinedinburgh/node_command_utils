const commit = require('./command')
function timeOfCommit() {
	return new Promise(resolve => {
		commit(`cd ${process.env.DIR} && git show -s --format="%ci"`, (err, data) => {
			if(err) return console.log(err)
			resolve({
				date: data.split(' ')[0],
				time: data.split(' ')[1]
			});
		})
	})
}

module.exports = timeOfCommit;
