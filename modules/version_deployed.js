const request = require("request");
const options = {
	method: 'GET',
	url: 'https://sandbox.altv.com/dugout',
	headers: {
		'cache-control': 'no-cache'
	}
};

const version = () => {
	return new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			let result = body.split(/<!--[^\[](.*?)-->/).filter(function(d) { return d !== '\n'}).pop();

			//body.split(/<!--[^\[](.*?)-->/).filter(Boolean).pop()
			if(/dugout-mena-v2/.test(process.env.DIR)) {
				result = body.split(/<!--[^\[](.*?)-->/).filter(Boolean).pop()
			}


			resolve(result)
		}, (err) => {
			reject(err)
		});
	})

}


module.exports = version;
