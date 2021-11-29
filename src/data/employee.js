var express = require('express');
/* This is employee model file path */ 
const employeeModel = require('../../dataModel/employeeModel');
var router = express.Router();
var shortid = require('shortid'); /** this is file path for short id module */

/* Employee Register/Sign Up Api */
router.post('/addEmployee', function (req, res) {
var Id=shortid.generate(); /* This is added for creating unique Employee id*/ 
    let data = {
        empId: Id,
        firstname: req.body.fname,
        lastname: req.body.lname,
        address: req.body.address,
        mobile: req.body.phoneNumber,
        email: req.body.email,
        dob: req.body.Dob,
        city: req.body.city
    }
    var employeeData = new employeeModel(data)

    employeeData.save((err, response) => {
        if (err) {
            res.send(err)
        } else {
            res.send(response)
        }
    });

});
/** Get Employee List Api */
router.get('/employeeList', function (req, res) {
    employeeModel.find({'RowStatus': 0}, (err, resp) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(resp)
        }
    })

});
/** Get Employee Details On Id Api */
router.get('/employeeDetailsOnId/:id', function (req, res) {
    employeeModel.findOne({_id:req.params.id}, (err, responce) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send(responce)
        }
    })

});
/** Update employee details api */
router.post('/update', function (req, res) {
    console.log(req.body,"letddddddddddddd")
    employeeModel.findOneAndUpdate({_id: req.body.id},
        { $set: { 
            'firstname': req.body.fname,
            'lastname': req.body.lname,
            'address': req.body.address,
            'mobile': req.body.phoneNumber,
            'email': req.body.email,
            'dob': req.body.Dob,
            'city': req.body.city
         } }, function(err,resp){
        if(err){
          res.send(err)
        } else {
          res.send(resp)
        }
    });
  });
  /** Soft Delete employee details on id Api*/
  router.post('/remove', function (req, res) {
    employeeModel.update({_id: req.body.id}, { $set: { 'RowStatus': 1 } }, function(err,resp){
        if(err){
          res.send(err)
        } else {
          res.send(resp)
        }
    });
  });
module.exports=router;