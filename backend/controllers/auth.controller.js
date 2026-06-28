import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";

// Register user

const registerUser = asyncHandler(async(req,res) => {
    
    const {name , email , password} = req.body;

    if(!name || !email || !password) return res.status(404).json({message : "All fields are required"})
    
    const existedUser = await User.findOne({email});

    if(existedUser){
        res.status(400).json({message : "User Already exists"});
        throw new Error("User already existed");
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    res.status(201).json({
        message: "User register successfully" , 
        user : {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
})

// login as a user

const loginUser = asyncHandler( async(req,res) => {
    const {email,password}  = req.body;
    const user = await User.findOne({email})

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        res.status(400);
        throw new Error("Invalid credentials")
    };
    const token = generateToken(user._id);
    res.json({message : "Login successfully", token})
})

const getMe = asyncHandler(async(req,res) => {
    try{
    res.status(200).json({
        success:true,
        message : "User fetched successfully",
        user : req.user
    });
}catch(error){
      res.status(500).json({
            success:false,
            message:"Failed to fetch user"
        });
}
})


export{
    registerUser,
    loginUser,
    getMe
}