const express = require('express');
const url = require('url');
const mailapi = require('./mailapi');
const cryptoapi = require('./cryptoapi');
const indexModel=require('../models/indexModel')
const router = express.Router();

/* Middleware to destroy session */
router.use(function(req, res, next) {
 	if(req.session.sunm!=undefined)	
 	{
 		req.session.destroy()
 	}
 	next()
});	


/* Middleware to check & fetch cookies */
router.all('/login',function(req, res, next) {
 	cunm=""
	cpass=""
 	if(req.cookies.cunm!=undefined)	
 	{
 		cunm=cryptoapi.decryptData(req.cookies.cunm)
 		cpass=cryptoapi.decryptData(req.cookies.cpass)
 	}
 	next()
});	


/* GET home page. */
router.get('/', function(req, res, next) {
  indexModel.fetchAll('addcat').then((result)=>{
	res.render('index',{'catlist':result});  
  }).catch((err)=>{console.log(err)})	
});

router.get('/home', function(req, res, next) {
  indexModel.fetchAll('addcat').then((result)=>{
	res.render('index',{'catlist':result});  
  }).catch((err)=>{console.log(err)})	
});

router.get('/about', function(req, res, next) {
  res.cookie('cunm','admin',{'maxAge':1000*3600})
  res.cookie('cpass','admin123',{'maxAge':1000*3600})
  /*
  To remove cookie	
  res.cookie('cunm','admin',{'maxAge':-1000*3600})
  res.cookie('cpass','admin123',{'maxAge':-1000*3600})
  */
  //console.log(req.cookies)
  
  res.render('about',{'cunm':req.cookies.cunm,'cpass':req.cookies.cpass});
});

router.get('/contact', function(req, res, next) {
//Set useful variables for paypal form
var paypalURL = 'https://www.sandbox.paypal.com/cgi-bin/webscr'; 

//Test PayPal API URL
var paypalID = 'mikhil008@gmail.com'; 
//Business Email

var pname='Test Product'
var pprice=500

res.render('contact',{'paypalURL':paypalURL,'paypalID':paypalID,'pname':pname,'pprice':pprice});
});

router.get('/register', function(req, res, next) {
  res.render('register',{'output':''});
});
router.post('/register', function(req, res, next) {
  
  indexModel.registerUser(req.body).then((result)=>{
  	mailapi.mymail(req.body)
  	res.render('register',{'output':'Register successfully'});
  }).catch((err)=>{	
  	res.render('register',{'output':'Registeration failed'});
  })
});

router.get('/verifyusers', function(req, res, next) {
  var email=url.parse(req.url,true).query.email
  indexModel.verifyusers(email).then((result)=>{
   res.render('verifyusers');
  }).catch((err)=>{console.log(err)})
});


/*router.all('/register', function(req, res, next) {
  if(req.method=='GET')
  	res.render('register');
  else	
  	res.send('post /register working');
});*/


router.get('/service', function(req, res, next) {
  res.render('service');
});

router.get('/login', function(req, res, next) {
  res.render('login',{'output':'','cunm':cunm,'cpass':cpass});
});
router.post('/login', function(req, res, next) {
  indexModel.loginUser(req.body).then((result)=>{
  	if(result.length>0)
  	{
  		if(req.body.chk!=undefined)
  		{
  			newcunm=cryptoapi.encryptData(req.body.email)
  			newcpass=cryptoapi.encryptData(req.body.password)
  			res.cookie('cunm',newcunm,{'maxAge':1000*3600*24*365})
  			res.cookie('cpass',newcpass,{'maxAge':1000*3600*24*365})
  		}
  		req.session.sunm=req.body.email
  		req.session.srole=result[0].role
  		req.session.save()
  		if(result[0].role=='admin')
	  		res.redirect('/admin')
		if(result[0].role=='user')
	  		res.redirect('/users')
  	}
  	else	
  		res.render('login',{'output':'Login failed','cunm':cunm,'cpass':cpass});
  }).catch((err)=>{
  	console.log(err)
  })

});

router.get('/buylogin', function(req, res, next) {
  var adsid=url.parse(req.url,true).query.adsid
  res.render('buylogin',{'output':'','adsid':adsid});
});
router.post('/buylogin', function(req, res, next) {
  
  indexModel.loginUser(req.body).then((result)=>{
  	if(result.length>0)
  	{
  		req.session.sunm=req.body.email
  		req.session.srole=result[0].role
  		req.session.sadsid=req.body.adsid
  		req.session.save()
  		if(result[0].role=='user')
	  		res.redirect('/users/usersbuy')
  	}
  	else	
  		res.render('login',{'output':'Login failed','cunm':cunm,'cpass':cpass});
  }).catch((err)=>{
  	console.log(err)
  })
  
  
});



router.get('/viewsubcat', function(req, res, next) {
  var cnm=url.parse(req.url,true).query.cnm
  indexModel.fetchSubCat(cnm).then((result)=>{
	res.render('viewsubcat',{'subcatlist':result});  
  }).catch((err)=>{console.log(err)})		
});

router.get('/viewpost', function(req, res, next) {
  var urlobj=url.parse(req.url,true).query
  var scnm=urlobj.scnm
  indexModel.fetchpost(urlobj).then((result)=>{
	res.render('viewpost',{'postlist':result,'scnm':scnm});  
  }).catch((err)=>{console.log(err)})	
  
});


router.get('/adsdetails', function(req, res, next) {
  var adsid=url.parse(req.url,true).query.adsid 
  indexModel.fetchads(adsid).then((result)=>{
    res.render('adsdetails',{'adsdetails':result[0]});	
  }).catch((err)=>{
    console.log(err) 	
  })
  
});



module.exports = router;
