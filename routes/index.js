var express = require('express');
var router = express.Router();

var serviceAccount = require("../kongosa.json");

var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kongossa-978cc.firebaseio.com/"
});

var db = admin.database();
var dataRef = db.ref('mean_data');
var data_post =  dataRef.child('data_post/');

var ObjData = {};

data_post.on('value',function (snapshot) {
    ObjData = snapshot.val();
},function (errObj) {
    console.log('Read Data is failed!' + errObj);
});



/* GET home page. */
router.get('/posts', function(req, res, next) {
 res.send(ObjData);
});

router.post('/posts',function (req, res) {
   if(!req.body) return res.status = 400;
    data_post.push(req.body,function (err) {
        if(err){
            console.log('Data could not be save! ' + err);
        }

        else{
            console.log('Data Was Saved!');
        }
    });
});

module.exports = router;
