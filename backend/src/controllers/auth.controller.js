const userModel =  require("../models/usermodel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerUserController(req , res){

    const {username , email ,password } = req.body

    if(!username || !email || !password) 
    {
        return res.status(400).json({
            message: "Please enter valid details"
        })
    }

    const isUserExists = await userModel.findOne({

        $or: [{username}, {email}]

    })

    if(isUserExists)
    {
        return res.status(400).json({
            message:"The user already exists"
        })
    }

    const hash = await bcrypt.hash(password , 10)
    const user = await userModel.create({
        username ,
        email,
        password:hash
    })

    const token = jwt.sign(
        {id:user._id , username:user.username },
        process.env.JWT_SECRET
    )

    res.cookie("token", token)

    res.status(201).json({
        message :"User registered !!",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

async function loginUserController(req,res)
{

    const {email , password} = req.body
    if(!email || !password)
    {
        return res.status(400).json({
            message : "Enter valid credentials"
        })
    }

    const user = await userModel.findOne(
        {email}  
    )

    if(!user)
    {
        return res.status(400).json({
            message : "This user does not exists"
        })
    }

    const isPasswordValid = await bcrypt.compare(password ,user.password)

    if(!isPasswordValid)
    res.status(401).json(
            {
            message: "Enter a valid password"
        })
    
    const token = jwt.sign(
        {id:user._id , username:user.username },
        process.env.JWT_SECRET
    )

    res.cookie("token", token)

    res.status(201).json({
        message :"User login success !!",
        user: {
            id:user._id ,
            username:user.username,
            email:user.email
        }
    })
}



async function getMeController(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Success",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

async function logoutController(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}

module.exports = {
    registerUserController, loginUserController, getMeController, logoutController
}