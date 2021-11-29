//dependencies
var express = require('express');
var router = express.Router();
const ManagerModel = require('../../dataModel/managerModel'); // This Is manager Model file
var bcrypt = require('bcryptjs'); // this is used for converting to password in encrypted form
var jwt = require('jsonwebtoken'); // This is require for token

// Manager Register/Sign Up Api
router.post('/managerSignUp', function (req, res){
    let data ={
        firstname:req.body.fname,
        lastname:req.body.lname,
        address:req.body.address,
        phone:req.body.phone,
        email:req.body.email,
        dob:req.body.Dob,
        password:getPasswordHash(req.body.password),/** get password hash function Used here for encrypted password */
        company:req.body.company
    }
        var ManagerData = new ManagerModel(data)
        ManagerData.save((err,response)=>{
            if(err){
                res.send(err)
            } else {
                res.send(response)
            }
        });
      
});

// Manager Login Api
router.post('/managerLogin', function(req, res){
    /** if condition for check id email and password present or not */
    if (!req.body.email || !req.body.password) {
        return res.status(400).send("arguments missing");
    }
    else {
        try {
            /* First find manager details are available or not */
            ManagerModel.findOne({email: req.body.email },
                 {
                     email: 1,
                     password: 1,
            },(err,response ) => {
                if(response == null){
                    return res.send({status: false, message: "Invalid Email" });
                }else{
                    /** update manager data that its logged in as active field to true */
                    ManagerModel.update({ _id: response._id },
                        { $set: { isActive:'true' } }, (err, results) => {
                            if (err) {
                                res.send(err)
                            } else {
                                /** used bcrypt module or npm for compare password enter is right or wrong */
                                const result = bcrypt.compareSync(req.body.password, response.password);
                                    if (result) {
                                        const userObject = response.toObject();
                                        delete userObject.password;
                                        /** const expiry usered for schedule or set time for token expired */
                                        const expiry = Math.floor((Date.now() + (24 * 60 * 60 * 1000)) / 1000);
                                        const token = jwt.sign({
                                            userObject,
                                            exp: expiry
                                        }, "secret_for_now");
                                        const refToken = jwt.sign({
                                            userObject,
                                            exp: expiry
                                        }, "some_other_secret");
                                        res.status(200).send({
                                            status: true,
                                            token: token,
                                            refToken: refToken,
                                            Admin: response,
                                        });
                                    } else {
                                        return res.send({status: false, message: "Incorrect Password" });
                                    }
                            }
                        })
                }
            });
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
});
/** this function used fr encrypted from of password */
function getPasswordHash(pwd){
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pwd, salt);
}
module.exports = router;