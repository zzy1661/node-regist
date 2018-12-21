var mysql = require('mysql');
var crypto = require('crypto');
var { dbSec } = require('../sec');
//数据库密码解密
var decipher = crypto.createDecipher('aes192', dbSec);
var dec = decipher.update('11092b078079188a6d71e7e60a6cba38', 'hex', 'utf8');//编码方式从hex转为utf-8;
dec += decipher.final('utf8');//编码方式从utf-8;

function connectServer() {

    var client = mysql.createConnection({
        host: '47.94.108.50',
        user: 'root',
        password: dec,
        database: 'dev'
    })
    client.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + client.threadId);
    });

    return client;
}
module.exports = connectServer()
