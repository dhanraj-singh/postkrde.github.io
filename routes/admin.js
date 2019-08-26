const express = require('express');
const url = require('url');
const path = require('path');
const adminModel=require('../models/adminModel')
const router = express.Router();


/* Middleware to check user */
router.use(function(req, res, next) {
 	if(req.session.sunm==undefined  ||  req.session.srole!='admin')	
 	{
 		res.redirect("/login")
 	}
 	next()
});	



/* middleware to fetch category list*/

router.all('/addsubcat', function(req, res, next) {
   adminModel.fetchAll('addcat').then((result)=>{
  	clist=result  
  	next()
  }).catch((err)=>{
  	console.log(err)
  }) 
});



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('adminhome',{'cunm':req.session.sunm});
});

router.get('/manageusers', function(req, res, next) {
  adminModel.fetchUsers().then((result)=>{
  	res.render('manageusers',{'result':result});
  }).catch((err)=>{
  	console.log(err)
  })
});

router.get('/manageuserstatus', function(req, res, next) {
  var urlData=url.parse(req.url,true).query
  adminModel.manageUserStatus(urlData).then((result)=>{
  	res.redirect('/admin/manageusers')
  }).catch((err)=>{
  	console.log(err)
  })
});

router.get('/addcat', function(req, res, next) {
  res.render('addcat',{'output':''});
});

router.post('/addcat', function(req, res, next) {
  var catnm=req.body.catnm
  var caticon=req.files.caticon
  var caticonnm=Date.now()+"-"+caticon.name
  var caticonpath=path.join(__dirname,"../public/uploads",caticonnm)
  caticon.mv(caticonpath)
  
 adminModel.addcat(catnm,caticonnm).then((result)=>{
 	res.render('addcat',{'output':'Category added successfully'});
 }).catch((err)=>{
 	console.log(err)
 })  

});

router.get('/addsubcat', function(req, res, next) {
	res.render('addsubcat',{'output':'','clist':clist}); 	
});

router.post('/addsubcat', function(req, res, next) {
  var catnm=req.body.catnm
  var subcatnm=req.body.subcatnm
  var caticon=req.files.caticon
  var caticonnm=Date.now()+"-"+caticon.name
  var caticonpath=path.join(__dirname,"../public/uploads",caticonnm)
  caticon.mv(caticonpath)
  
 adminModel.addsubcat(catnm,subcatnm,caticonnm).then((result)=>{
 	res.render('addsubcat',{'output':'Sub Category added successfully','clist':clist});
 }).catch((err)=>{
 	console.log(err)
 })  

});


module.exports = router;









