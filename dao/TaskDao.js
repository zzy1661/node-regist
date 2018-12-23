var client = require('./dbConnect.js');
var Task = require('../entity/Task');
class TaskDao {
    constructor() {
        this.client = client;
    }
    addTask(task, uid) {
        return new Promise((resolve, reject) => {
            var inputs = ['name', 'des', 'pid', 'creatime', 'endtime', 'status'];
            var sql = `insert into tasks (${inputs.join()}, uid) values (${inputs.map(i => '?').join()}, ?)`;
            var params = inputs.map(i => task[i]);
            params.push(uid);
            this.client.query(sql, params, (err, results, fields) => {
                if (err) reject(err);
                resolve(results);
            });
        })
    }
    deleteTask(task, uid) {
        return new Promise((resolve, reject) => {
            var sql = `update tasks set del = 1 where id = ?`;
            if(uid) {
                sql += 'and uid = ?';
            }
            this.client.query(sql,[task.id,uid], (err, results, fields) => {
                if (err) reject(err)
                resolve(results);
            })
        })
    } 
    updateTask(task, uid) {
        return new Promise((resolve, reject) => {
            var inputs = ['name', 'des', 'pid', 'endtime', 'status'];
            var updateFields = [];
            var values = [];
            inputs.forEach(i => {
                if (task[i] !== null && task[i] !== undefined) {
                    values.push(task[i]);
                    updateFields.push(` ${i} = ? `);
                }
            })
            var sql = `update tasks set ${updateFields.join()} where id = ${task.id}`;
            if(uid) {
                sql += 'and uid = ?';
                values.push(uid);
            }
            this.client.query(sql, values, (err, results, fields) => {
                if (err) reject(err);
                resolve(results);
            });
        })

    }
    queryTasks(task, uid) {
        return new Promise((resolve, reject) => {
            var conditions = [];
            var values = [];
            if (task) {
                var { name, creatime, endtime, status } = task;
                if (name !== null || name !== undefined) { conditions.push('name = ?'); values.push(name) }
                if (creatime !== null || creatime !== undefined) { conditions.push('creatime = ?'); values.push(creatime) }
                if (endtime !== null || endtime !== undefined) { conditions.push('endtime = ?'); values.push(endtime) }
                if (status !== null || status !== undefined) { conditions.push('status = ?'); values.push(status) }
            }
            var conditionStr = conditions.length > 0 ? `where ${conditions.join(' and ')}` : '';
            var sql = `select id,name,des,pid,creatime,endtime,status from tasks ${conditionStr}`;
            if(uid) {
                sql += 'where uid = ?';
                values.push(uid);
            }
            this.client.query(sql, values, (err, results, fields) => {
                if (err) reject(err);
                results.length > 0 ? resolve(results.map(i => new Task(i))) : resolve([]);

            })
        })

    }  
    queryTaskById(task, uid) {
        return new Promise((resolve, reject) => {
            var sql = `select id,name,des,pid,creatime,endtime,status from tasks where id = ?`;
            if(uid) {
                sql += 'and uid = ?';
            }
            this.client.query(sql, [task.id, uid], (err, results, fields) => {
                if (err) reject(err);
                results.length > 0 ? resolve(new Task(results[0])) : resolve(null);
            })
        });

    }
}
module.exports = TaskDao;