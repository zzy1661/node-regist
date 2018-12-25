var TaskDao = require('../dao/TaskDao');
var Task = require('../entity/Task');
var taskDao = new TaskDao();

exports.taskService = {
    addTask(task) {
        return taskDao.addTask(task);
    },
    deleteTask(task) {
        return taskDao.deleteTask(task);
    },
    updateTask(task) {
        return taskDao.deleteTask(task);
    },
    queryTasks(task) {
        return taskDao.queryTasks(task);
    },
    queryTaskById(task) {
        return taskDao.queryTaskById(task);
    },
    queryTaskTreeById(task) {
        taskDao.queryTasks(task).then(results=>{
            var taskList = results.length.map(i=>new Task(i))
            var allTree = taskService.allTree(taskList);
            return allTree;
        })
    },
    taskListToTree(taskList) {
        var tree = [];
        taskList.forEach(task=>{
            if(!task.pid) {
                tree.push(task);
            }else {
                var pTask = taskList.filter(t=>
                    t.id == task.id
                )
                if(pTask) {
                    pTask.children = pTask.children || [];
                    pTask.push(task);
                }
            }
        })
        return tree;
    }
}