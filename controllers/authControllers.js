const userModel =require("../models/userModel")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const registerController=async(req,res)=>{
    try {
        const existingUser=await userModel.findOne({email:req.body.email})
        // validation
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"User Already exist"
            })
        }
        // hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        req.body.password=hashedPassword;

        //rest data
        const user=new userModel(req.body);
        await user.save();
        return res.status(201).send({
            success:true,
            message:"User Registered Successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Register Api",
            error
        })
    }
}

// login callback
const loginController=async(req,res)=>{
    try {
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Invalid Credentials"
            })
        }
        // compare password
        const comparePassword = await bcrypt.compare(req.body.password,user.password)
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.status(200).send({
            success:true,
            message:"Login Succcessfully",
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message:"Error in Login Api",
            error
        })
    }
}
const currentUserController=async(req,res)=>{
      try {
        const user=await userModel.findOne({_id:req.body.userId})
        return res.status(200).send({
            success:true,
            message:"User Fetched Successfully",
            user
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"unable to get current user"
        })
    }
}
const updatecurrentUserController=async(req,res)=>{
    const id = req.params.id;
    const {role,name,fathername,email,password,bloodgroup,contact,nukhu,akkahu}=req.body;
        let updateData;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        

    try {
        updateData=await userModel.findByIdAndUpdate(id,{
            role,
            name:name,
            fathername:fathername,
            bloodgroup:bloodgroup,
            contact:contact,
            nukh:nukhu,
            akkah:akkahu,
            email:email,
            password:hashedPassword
        });
        
        await updateData.save().then(()=>res.status(200).send({
            success:true,
            message:"User Upated Data Successfully",
            updateData
        }))
    } catch (error) {
        console.log(error);
    }
}

module.exports={registerController,loginController,currentUserController,updatecurrentUserController}