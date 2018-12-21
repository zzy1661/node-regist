var TaskDao = require('../../dao/TaskDao');
var Task = require('../../entity/Task');
var taskDao = new TaskDao();
// taskDao.queryTasks().then(tasks=>{
//     taskDao.deleteTask(tasks[0]).then(results=>{
//         console.log('delete',results);
//     })
// })
/* var newTask = new Task({name:`task${Math.random().toFixed(2)}`});
taskDao.addTask(newTask).then((result)=>{
    console.log('add',result);
}).catch(err=>{
    console.log(err);
}) */
taskDao.queryTaskById({id:1}).then(task=>{
    task.name = 'newtask';
    console.log(task);
    taskDao.updateTask(task).then(results=>{
        console.log('update',results);
    }).catch(err=>{
        console.log(err);
    })
}).catch(err=>{
    console.log(err);
})

