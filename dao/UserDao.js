var client = require('./dbConnect.js');
var User = require('../entity/User');

class UserDao {
    constructor() {
        this.client = client;
    }
    addUser(user) {
        return new Promise((resolve, reject) => {
            var inputs = ['id','name', 'pw', 'role', 'email'];
            var sql = `insert into user (${inputs.join()}) values ( ${inputs.map(i => '?').join()})`;
            var params = inputs.map(i => user[i]);
            this.client.query(sql, params, (err, results, fields) => {
                if (err) reject(err);
                resolve(results);
            });
        })
    }
    queryUserByName(name) {
        return new Promise((resolve, reject) => {
            var sql = `select id,name,pw,role,email from user where name = ?`;
            this.client.query(sql, [name], (err, results, fields) => {
                if (err) reject(err);
                resolve(results.map(i => new User(i)));
            });
        })
    }
    updateUser(user) {
        return new Promise((resolve, reject) => {
            var inputs = ['pw', 'email'];
            var updateFields = [];
            var values = [];
            inputs.forEach(i => {
                if (user[i] !== null && user[i] !== undefined) {
                    values.push(user[i]);
                    updateFields.push(` ${i} = ? `);
                }
            })
            var sql = `update user set ${updateFields.join()} where id = ${user.id}`;
            this.client.query(sql, values, (err, results, fields) => {
                if (err) reject(err);
                resolve(results);
            });
        })
    }
}
module.exports = UserDao;