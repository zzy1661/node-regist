var express = require('express');
var router = express.Router();
var Task = require('../entity/Task');
var { taskService } = require('../service/taskService');
var ResResult = require('../entity/ResResult')
var jwt = require("jsonwebtoken");
var uuid = require('uuid/v4')();

//查所有 /tasks?status=0
router.get('/',(req,res) => {
    var task = new Task({uid:req.user.id});
    //根据状态查
    var status = req.query.status;
   
    task.status = status;
    console.log('req.query',req.query,status)
    console.log(task)
    taskService.queryTasks(task).then(results=>{
        var r = new ResResult({code:0,data:results})
        res.json(r)
    })
    
})

//根据id查
router.get('/:id',(req,res) => {
    var id = req.params.id;
    var task = new Task({id:id,uid:req.user.id});
    taskService.queryTaskById(task).then(results=>{
        var r = new ResResult({code:0,data:results[0]})
        res.json(r)
    })
})

module.exports = router;