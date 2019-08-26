const express = require('express');
const path = require('path');
const url = require('url');
const userModel=require('../models/userModel')
const router = express.Router();

/* Middleware to check user */
router.use(function(req, res, next) {
 	if(req.session.sunm==undefined ||  req.session.srole!='user')	
 	{
 		res.redirect("/login")
 	}
 	next()
});	

router.use('/postads',function(req,res,next){
	userModel.fetchAll('addsubcat').then((result)=>{
		sclist=result
		next()
	}).catch((err)=>{
		console.log(err)
		next()
	})
	
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userhome',{'cunm':req.session.sunm});
});

router.get('/usersbuy', function(req, res, next) {
  adsid=req.session.sadsid
  userModel.fetchads(adsid).then((result)=>{

//Set useful variables for paypal form
var paypalURL = 'https://www.sandbox.paypal.com/cgi-bin/webscr'; 

//Test PayPal API URL
var paypalID = 'harrybhilai250-myseller@gmail.com'; 
//Business Email

var pname=result[0].adssubcat
var pprice=result[0].adsprice
var pimage=result[0].file1
	
	  res.render('usersbuy',{'cunm':req.session.sunm,'adsid':adsid,'paypalURL':paypalURL,'paypalID':paypalID,'pname':pname,'pprice':pprice,'pimage':pimage});  
  }).catch((err)=>{
  	console.log(err)
  })
});


router.get('/successbuy', function(req, res, next) {
  var urldata=url.parse(req.url,true).query
  userModel.payment(urldata).then((result)=>{
	  res.render('successbuy');  
  }).catch((err)=>{
  	console.log(err)
  })

});

router.get('/cancelbuy', function(req, res, next) {
  res.render('cancelbuy');
});


router.get('/postads', function(req, res, next) {
  res.render('postads',{'sclist':sclist,'cunm':req.session.sunm,'output':''});
});

router.post('/postads', function(req, res, next) {
  adsDetails=req.body
  adsImages=req.files

  if(adsImages.file1!=undefined)
  {
  	myfile1=adsImages.file1
  	file_nm1=Date()+'-'+myfile1.name
  	file_path1=path.join(__dirname,"../public/uploads",file_nm1)
  	myfile1.mv(file_path1)
  }
  else
  	file_nm1="logo.jpeg"
  	
  if(adsImages.file2!=undefined)
  {
  	myfile2=adsImages.file2
  	file_nm2=Date()+'-'+myfile2.name
  	file_path2=path.join(__dirname,"../public/uploads",file_nm2)
  	myfile2.mv(file_path2)
  }
  else
  	file_nm2="logo.jpeg"	
  
  if(adsImages.file3!=undefined)
  {
  	myfile3=adsImages.file3
  	file_nm3=Date()+'-'+myfile3.name
  	file_path3=path.join(__dirname,"../public/uploads",file_nm3)
  	myfile3.mv(file_path3)
  }
  else
  	file_nm3="logo.jpeg"
  	
  	
  if(adsImages.file4!=undefined)
  {
  	myfile4=adsImages.file4
  	file_nm4=Date()+'-'+myfile4.name
  	file_path4=path.join(__dirname,"../public/uploads",file_nm4)
  	myfile4.mv(file_path4)
  }
  else
  	file_nm4="logo.jpeg"	
  
  userModel.addPost(adsDetails,file_nm1,file_nm2,file_nm3,file_nm4).then((result)=>{
	 res.render('postads',{'sclist':sclist,'cunm':req.session.sunm,'output':'Post added successfully.....'});  	
  }).catch((err)=>{console.log(err)})
  
});

module.exports = router;










