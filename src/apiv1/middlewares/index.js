module.exports ={
    isLogin: (req,res,next)=>{
        if(req.user){
            next()
        }else{
            res.send(401,"chưa đăng nhập ")
        }
    }
    
}