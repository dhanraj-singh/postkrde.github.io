const pool=require('./connection')
function userModel()
{

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
	this.addPost=(adsDetails,file_nm1,file_nm2,file_nm3,file_nm4)=>
	{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="insert into addpost values(null,?,?,?,?,?,?,?,?,?,?,0)"
				var sqlData=[adsDetails.adstitle,adsDetails.adssubcat,adsDetails.adsdescription,adsDetails.adsprice,file_nm1,file_nm2,file_nm3,file_nm4,adsDetails.adscity,adsDetails.userid]
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
	
	this.payment=(urldata)=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="insert into payment values(NULL,?,?,?,?)"
				var sqlData=[urldata.uid,urldata.adsid,urldata.pprice,Date()]
				con.query(query,sqlData,(err,result)=>{
					con.release()
					err ? reject(err) : resolve(result);
				})
			})
		})
	}
	
}



module.exports=new userModel()









