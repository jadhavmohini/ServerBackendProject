var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* get Mangaer and employee file routing */
const manager = require("../src/data/manager");
const employee = require("../src/data/employee");
router.use("/manager", manager);
router.use("/employee", employee);
module.exports = router;
