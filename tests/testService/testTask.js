var {
    taskService
} = require('../../service/taskService');
var Task = require('../../entity/Task');

/* var task = new Task({
    id: 1,
    uid: '6cd704f606bf11e981bd00163e0ce679'
});

taskService.queryTaskTreeById(task).then(res => {
    console.log('tree:', res)
}) */
var task = new Task({
    uid:'6cd704f606bf11e981bd00163e0ce679',
    name:'test'+Math.random().toFixed(2),
    des:Math.random().toFixed(2),
    pid:0,
    creatime: new Date().getTime(),
    startime:new Date().getTime(),
    endtime:new Date().getTime()+1000*60*60*24*10,
    status:5
})
taskService.addTask(task).then(result=>{
    console.log(result)
})