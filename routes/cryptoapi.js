var crypto = require('crypto');

function cryptoapi()
{

this.encryptData=(data)=>{
var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update(data, 'utf8', 'hex')
mystr += mykey.final('hex');
return mystr
}

this.decryptData=(data)=>{
var mykey1 = crypto.createDecipher('aes-128-cbc', 'mypassword');
var mystr1 = mykey1.update(data, 'hex', 'utf8')
mystr1 += mykey1.final('utf8');
return mystr1
}

   }

module.exports=new cryptoapi()
