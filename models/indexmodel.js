const pool=require('./connection')
function indexModel()
{
	this.verifyusers=(email)=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="update register set status=1 where email=?"
				var sqlData=[email]
				con.query(query,sqlData,(err,result)=>{
					con.release()
					err ? reject(err) : resolve(result);
				})
			})
		})	
	}
	
	this.fetchpost=(data)=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				
				if(data.sprice==undefined && data.city==undefined)
				{
				var query="select * from addpost where adssubcat=?"
				var sqlData=[data.scnm]
				}
				else if(data.sprice!=undefined)
				{
				var query="select *  from addpost where adssubcat = ? and  adsprice BETWEEN ? AND ?"
				var sqlData=[data.scnm,data.sprice,data.eprice]
				}
				else
				{
				var query="select *  from addpost where adssubcat = ? and  adscity=?"
				var sqlData=[data.scnm,data.city]
				}
				
				con.query(query,sqlData,(err,result)=>{
					con.release()
					err ? reject(err) : resolve(result);
				})
			})
		})        
        }
	
	
	
	this.fetchSubCat=(cnm)=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="select * from addsubcat where catnm=?"
				var sqlData=[cnm]
				con.query(query,sqlData,(err,result)=>{
					con.release()
					err ? reject(err) : resolve(result);
				})
			})
		})        
        }
        
        this.fetchAll=(tbl_nm)=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="select * from "+tbl_nm
				con.query(query,(err,result)=>{
					con.release()
					err ? reject(err) : resolve(result);
				})
			})
		})        
        }
	
	
	this.registerUser=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="insert into register values(NULL,?,?,?,?,?,?,?,0,'user')"
				var sqlData=[userDetails.name,userDetails.email,userDetails.password,userDetails.address,userDetails.city,userDetails.mobile,userDetails.gender]
				con.query(query,sqlData,(err,result)=>{
					con.release()
					err ? reject(err) : resolve(result);
				})
			})
		})
	}
	
	this.loginUser=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="select * from register where email=? and password=? and status=1"
				var sqlData=[userDetails.email,userDetails.password]
				con.query(query,sqlData,(err,result)=>{
					con.release()
					err ? reject(err) : resolve(result);
				})
			})
		})		
	}


this.fetchads=(adsid)=>{

return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="select * from addpost where adsid=?"
				var sqlData=[adsid]
				con.query(query,sqlData,(err,result)=>{
					con.release()
					err ? reject(err) : resolve(result);
				})
			})
		})

 	
}


}


module.exports=new indexModel()









