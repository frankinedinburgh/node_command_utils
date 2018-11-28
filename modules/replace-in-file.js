const fs = require('fs');
const path = require('path');
const command = require('./command');
const replace = require('modules/replace-in-file');
const file = `${process.env.DIR}/index.html`;


function setCachedScripts() {
    command('ls -A ./dist/scripts/vendor* && ls -A ./dist/scripts/scripts* && ls -A ./dist/styles/main* && date +%m%d%y', (err, data) => {
        if(err) return console.log(err)

        const response = data.split('\n').filter(Boolean);
        const files = response.map(d => {
            let result = d.split('/').filter(Boolean);
            result = result[result.length - 1];
            if(/\.js/.test(result)) {
                result = result.slice(0, -3)
            }

            if(/\.css/.test(result)) {
                result = result.slice(0, -4)
            }

            return result;
        });

        const options = {
            files: file,
            from: [/replace-vendor-script/g, /vendor_unique/g, /replace-script/g, /script_unique/g, /replace-style/g, /style_unique/g],
            to: [files[0], files[0], files[1], files[1], files[2], files[2]],
        };

        replace(options, (error, changes) => {
            if (error) {
                return console.error('Error occurred:', error);
            }
            console.log('Modified files:', changes.join(', '));
        });

    })
}

function replaceWithHosted() {
    const options = {
        files: file,
        from: [/script src="\/scripts/g, /href="\/styles/g, /ng-strict-di/g, /base href="\/"/g, /href="\/files/g],
        to: ['script src="https://assets.altv.com/scripts', 'href="https://assets.altv.com/styles', '', "base href='/dugout/'", 'href="https://assets.altv.com'],
    };

    replace(options, (error, changes) => {
        if (error) {
            return console.error('Error occurred:', error);
        }
        console.log('Modified files:', changes.join(', '));
    });

}


setCachedScripts();
replaceWithHosted();


