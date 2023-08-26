const express =require('express');
const { registerController, loginController,currentUserController } = require('../controllers/authControllers');
const router=express.Router();
const verifyJWT=require('../midddlewares/authMiddleware')

//register || POST
router.post('/register',registerController)

// Login || POST
router.post('/login',loginController)
module.exports=router

// Get current user || GET
router.get('/current-user',verifyJWT,currentUserController)