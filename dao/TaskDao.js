var client = require('./dbConnect.js');
var Task = require('../entity/Task');
class TaskDao {
    constructor() {
        this.client = client;
    }
    addTask(task) {
        return new Promise((resolve, reject) => {
            var inputs = ['name', 'des', 'pid', 'creatime', 'endtime', 'status', 'uid'];
            var sql = `insert into tasks (${inputs.join()}) values (${inputs.map(i => '?').join()})`;
            var params = inputs.map(i => task[i]);            
            this.client.query(sql, params, (err, results, fields) => {
                if (err) reject(err);
                resolve(results);
            });
        })
    }
    deleteTask(task) {
        return new Promise((resolve, reject) => {
            var sql = `update tasks set del = 1 where id = ? and uid = ?`;
           
            this.client.query(sql,[task.id,task.uid], (err, results, fields) => {
                if (err) reject(err)
                resolve(results);
            })
        })
    } 
    updateTask(task) {
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
            var sql = `update tasks set ${updateFields.join()} where id = ${task.id} and uid = ?`;
            values.push(task.uid);
            this.client.query(sql, values, (err, results, fields) => {
                if (err) reject(err);
                resolve(results);
            });
        })

    }
    queryTasks(task) {
        return new Promise((resolve, reject) => {
            var conditions = [];
            var values = [];
            if (task) {
                var { name, creatime, endtime, status,uid } = task;
                console.log('name',name)
                if (name !== null && name !== undefined) { conditions.push('name = ?'); values.push(name) }
                if (creatime !== null && creatime !== undefined) { conditions.push('creatime = ?'); values.push(creatime) }
                if (endtime !== null && endtime !== undefined) { conditions.push('endtime = ?'); values.push(endtime) }
                if (status !== null && status !== undefined) { conditions.push('status = ?'); values.push(status) }
                conditions.push('uid = ?'); values.push(task.uid)
            }
            var conditionStr = conditions.length > 0 ? `where ${conditions.join(' and ')}` : '';
            var sql = `select id,name,des,pid,creatime,endtime,status from tasks ${conditionStr} and del = 0`;
            
            this.client.query(sql, values, (err, results, fields) => {
                console.log(err)
                if (err) reject(err);
                console.log(sql,values)               
                results.length > 0 ? resolve(results.map(i => new Task(i))) : resolve([]);

            })
        })

    }  
    queryTaskById(task) {
        return new Promise((resolve, reject) => {
            var sql = `select id,name,des,pid,creatime,endtime,status from tasks where id = ? and uid = ?`;         
            this.client.query(sql, [task.id, task.uid], (err, results, fields) => {
                if (err) reject(err);
                results.length > 0 ? resolve(new Task(results[0])) : resolve(null);
            })
        });
    }
}
module.exports = TaskDao;