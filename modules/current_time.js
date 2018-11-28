function currentTime() {
	let d = new Date();
	let time = d.toLocaleString()
	time = time.split(' ');
	time = time[time.length - 1].replace(/[^\d:-]/g,'');
	return time;
}

module.exports = currentTime;
