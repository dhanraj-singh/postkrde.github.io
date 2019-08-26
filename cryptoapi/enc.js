console.log("Actual Data : abc")

var crypto = require('crypto');

var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update('abc', 'utf8', 'hex')
mystr += mykey.final('hex');

console.log("Data after ecryption : "+mystr); 
//34feb914c099df25794bf9ccb85bea72

var mykey1 = crypto.createDecipher('aes-128-cbc', 'mypassword');
var mystr1 = mykey1.update(mystr, 'hex', 'utf8')
mystr1 += mykey1.final('utf8');

console.log("Data after decryption : "+mystr1); //abc  
