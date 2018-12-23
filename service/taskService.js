var TaskDao = require('../dao/TaskDao');
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
    }
}