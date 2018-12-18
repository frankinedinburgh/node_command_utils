const request = require("request");
const options = {
	method: 'GET',
	url: 'https://www.altv.com/dugout',
	headers: {
		'cache-control': 'no-cache'
	}
};

const version = () => {
	return new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			const result = body.split(/<!--[^\[](.*?)-->/).filter(function(d) { return d !== '\n'}).pop();
			resolve(result)
		}, (err) => {
			reject(err)
		});
	})

}


module.exports = version;
