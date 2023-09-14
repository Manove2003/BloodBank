const express =require('express');
const { registerController, loginController,currentUserController,updatecurrentUserController } = require('../controllers/authControllers');
const router=express.Router();
const verifyJWT=require('../midddlewares/authMiddleware')

//register || POST
router.post('/register',registerController)

// Login || POST
router.post('/login',loginController)


// Get current user || GET
router.get('/current-user',verifyJWT,currentUserController)

// Update current user ||Post
router.put('/update_current_user/:id',updatecurrentUserController)
module.exports=router