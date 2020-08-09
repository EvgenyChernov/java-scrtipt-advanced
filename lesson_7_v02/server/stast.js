const moment = require('moment');
const fs = require('fs');

const stast = (action) => {


    fs.readFile('./server/db/stats.json', 'utf-8', (err, data) => {
        if (!err) {
           let dataObject = JSON.parse(data);
            console.log(dataObject);
            dataObject.push({"action": action, "data": moment().format('LLLL')})
            console.log(dataObject) ;
            fs.writeFile('./server/db/stats.json', JSON.stringify(dataObject), (err) => {
                if (err) throw err;
                console.log('Data has been added!');
            });
        }
    });




}
module.exports = stast;

// console.log(action);
// console.log(moment().format('LLLL'))