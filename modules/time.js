const getTime = () => {
    const d = new Date();
    let time = 0;
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    if(d.getMinutes() < 10) {
        time = `${d.getHours()}:0${d.getMinutes()}`;
    } else {
        time = `${d.getHours()}:${d.getMinutes()}`;
    }
    return time;

}

module.exports = getTime();

