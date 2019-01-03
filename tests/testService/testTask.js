var {
    taskService
} = require('../../service/taskService');
var Task = require('../../entity/Task');

var task = new Task({
    id: 1,
    uid: '6cd704f606bf11e981bd00163e0ce679'
});

taskService.queryTaskTreeById(task).then(res => {
    console.log('tree:', res)
})
