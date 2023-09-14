const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    role:{type:String,required:true,enum:["admin", "donar"]},
    name:{type:String,required:function(){
        if(this.role==='donar' | this.role==='admin'){
            return true
        }
        return false
    }},
    fathername:{type:String,required:function(){
        if(this.role==='donar' ){
            return true
        }
        return false
    }},
    email:{type:String,required:[true,'email is required']},
    password:{type:String,required:[true,'password is required']},
    bloodgroup:{type:String,required:function(){
        if(this.role==='donar'){
            return true
        }
        return false
    }},
    contact:{type:String,required:function(){
        if(this.role==='donar' ){
            return true
        }
        return false
    }},
    nukh:{type:String,required:function(){
        if(this.role==='donar' ){
            return true
        }
        return false
    }},
    akkah:{type:String,required:function(){
        if(this.role==='donar' ){
            return true
        }
        return false
    }}  
},{timestamps:true});

module.exports=mongoose.model('user',userSchema)