const nodemailer = require('nodemailer');

function mymail(userDetails)
{
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dhanrajsaktawat0455@gmail.com',
    pass: '8818877045'
  }
});

const mailOptions = {
  from: 'dhanrajsaktawat0455@gmail.com',
  to: userDetails.email,
  subject: 'Confirmation mail for PostKrde.com',
  html: "<h1 style='color:green;'>Welcome to PostKrde.com</h1><p>You have successfully registered on this application , your login credentials are below</p><h3>Username : "+userDetails.email+"</h3><h3>Password : "+userDetails.password+"</h3><h1>click on link below to activate account </h1> http://localhost:3000/verifyusers?email="+userDetails.email
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
}

module.exports={'mymail':mymail}
