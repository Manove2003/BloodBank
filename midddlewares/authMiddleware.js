const JWT=require('jsonwebtoken')

const verifyJWT=async(req,res,next) =>{

        const authHeader= req.headers['authorization'];
        if(!authHeader) return res.status(401).send({
                            success:false,
                            message:"Auth Failed if"
                        });
        console.log(authHeader);
        const token=authHeader.split(' ')[1];
        JWT.verify(
            token,
            process.env.JWT_SECRET,
            (err,decode)=>{
                if(err) return res.status(403).send({
                    success:false,
                    message:"Auth Failed invalid token"
                });
                req.body.userId=decode.userId;
                next();
            }
            )
}
module.exports=verifyJWT