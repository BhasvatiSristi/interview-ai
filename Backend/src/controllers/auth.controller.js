const userModel=require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');


/**
*@name registerUserController
*@description Controller to handle user registration
*@access Public
*/
async function registerUserController(req,res){
    const {username,email,password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({message:"All fields are required"})
    }

    const isUserPresent = await userModel.findOne({
        $or:[{username},{email}]
    })
    if(isUserPresent){
        return res.status(400).json({message:"User already exists. Please login to continue."})
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await userModel.create({
        username,
        email,
        password:hashedPassword
    })

    const token = jwt.sign(
        {id : newUser._id, username: newUser.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email
        }
    })
}

/**
 * @name loginUserController
 * @description Controller to handle user login
 * @access Public
 */
async function loginUserController(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message:"No user found with this email"})
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({message:"Incorrect email or password"})
    }

    const token = jwt.sign(
        {id : user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
        }

/**
 * @name logoutUserController
 * @description Controller to handle user logout
 * @access Public
 */
async function logoutUserController(req,res){
    const token = req.cookies.token;
    if(token){
        //blacklisting the token cause the token will be alive till it expires
        await tokenBlacklistModel.create({token})
    }
    //clearing the token from cookie
    res.clearCookie("token");
    res.status(200).json({message:"User logged out successfully"})
}

/**
 * @name getMeController
 * @description Controller to get the logged in user's details
 * @access Private
 */
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports = {registerUserController,loginUserController,logoutUserController,getMeController}