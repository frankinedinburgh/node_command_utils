let emails = {
	cc: [
		'frank@altv.com'
	],
	to: [
		'frank@altv.com'
	]
}



if(process.env.CC && process.env.CC === 'all') {
	 emails = {
		cc: [
			'hugh@altv.com',
			//'ciara@altv.com',
			'neil@altv.com',
			//'cian@altv.com',
			//'balazs@altv.com',
			'frank@altv.com',
			'nithin@altv.com',
			//'esidor@altv.com',
		],
		to: [
			//'frank@altv.com',
			//'balazs@altv.com',
			'kyran@altv.com',
			'esidor@altv.com',
			'brendan@altv.com',
			'declan@altv.com',
		]
	}
}




module.exports = emails;

