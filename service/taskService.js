var TaskDao = require('../dao/TaskDao');
var Task = require('../entity/Task');
var taskDao = new TaskDao();


var taskService = {
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
        return taskDao.queryTasks(task).then(results=>{
            var taskList = results.map(i=>new Task(i))
            var allTree = taskService.taskListToTree(taskList);
            var res = allTree.filter(t=>t.id === task.id)[0];
            console.log(allTree,task.id)
            return res;
        })
    },
    taskListToTree(taskList) {
        var tree = [];
        taskList.forEach(task=>{
            console.log('det: ',task.id,task.pid);
            if(!task.pid) {
                tree.push(task);
            }else {
                var pTask = taskList.filter(t=>
                    t.id == task.pid
                )[0]
                if(pTask) {
                    pTask.children = pTask.children || [];
                    pTask.children.push(task);
                }
            }
        })
        console.log('t l',tree.length)
        return tree;
    }
}
exports.taskService = taskService;