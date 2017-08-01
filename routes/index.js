var exec = require('child_process').exec;
var express = require('express');
var router = express.Router();
var configs = require('./../configs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(200, "OK");
  // res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){
    console.log(req.body);
    var serverToken = req.header("X-Hub-Signature");
    var gitEvent = req.header("X-GitHub-Event");
  
    // if(serverToken && serverToken != configs.secretToken){
    //   res.send(403, "unAuthorized token");
    // }
    
    var cmd = configs.shellCommand;
    // if(gitEvent == "push"){
      new Promise(function(fulfill, reject){
          var child = exec(cmd, function(error, stdout, stderr){
          console.log("stdout: ", stdout);
          console.log("stderr: ", stderr);
          console.log("error: ", error);
        });
        fulfill();
      }).then(res.send(200, "Ok"));
    }

    // res.send(200, "Ok");
});

module.exports = router;
