const express = require("express")
const authController = require("../controllers/auth.controller")
const authRouter = express.Router()


authRouter.post("/register" ,authController.registerUserController)

authRouter.post("/login" , authController.loginUserController)

authRouter.get("/me", authController.getMeController)

authRouter.post("/logout", authController.logoutController)

module.exports = authRouter