const pool=require('./connection')
function adminModel()
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
        
	this.addcat=(catnm,caticonnm)=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="insert into addcat values(NULL,?,?)"
				var sqlData=[catnm,caticonnm]
				con.query(query,sqlData,(err,result)=>{
					con.release()
					err ? reject(err):resolve(result)
				})
			})
		})	
	}
	
	this.addsubcat=(catnm,subcatnm,caticonnm)=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="insert into addsubcat values(NULL,?,?,?)"
				var sqlData=[subcatnm,catnm,caticonnm]
				con.query(query,sqlData,(err,result)=>{
					con.release()
					err ? reject(err):resolve(result)
				})
			})
		})	
	}
	
	this.fetchUsers=()=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				var query="select * from register where role='user'"
				con.query(query,(err,result)=>{
					con.release()
					err ? reject(err):resolve(result)
				})
			})
		})
	}	
	this.manageUserStatus=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			pool.getConnection((err,con)=>{
				if(userDetails.status=='block')
					var query="update register set status=0 where regid=?"
				else if(userDetails.status=='unblock')
					var query="update register set status=1 where regid=?"
				else
					var query="delete from register where regid=?"	
				var sqlData=[userDetails.regid]
				con.query(query,sqlData,(err,result)=>{
					con.release()
					err ? reject(err) : resolve(result);
				})	
			})
		})
	}


}


module.exports=new adminModel()









