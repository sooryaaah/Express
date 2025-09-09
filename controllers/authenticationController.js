const users = require("../db/models/users")
const bcrypt = require("bcryptjs")
const generateOtp = require("../utils/otpGenerated").generateOtp
const otpSchema = require("../db/models/otp");

exports.signUp = async (req, res) => {
    try {
        let body = req.body;
        let userName = body.username      // 2nd username is from front-end
        if (!userName) {
            return res.status(400).json({
                success: false,
                message: "Username not found",

            })
        }

        let email = body.email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please enter email'
            })
        }

        let password = body.password
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please enter password"
            })
        }

        const userEmail = await users.findOne({
            email
        })
        if (userEmail) {
            return res.status(400).send({
                success: false,
                message: "email already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = {
            name: userName,
            email,
            password: hashedPassword
        }

        const addUser = await users.create(newUser);

        return res.status(200).send({
            sucess: true,
            message: "successfully signed up"
        })

    } catch (error) {
        console.log("error while signing up: ", error)
        return res.status(400).send({
            success: false,
            message: error.message || error
        })
    }
}

exports.logIn = async (req, res) => {
    try {
        let body = req.body;
        let email = body.email;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please enter email"
            })
        }
        let password = body.password;
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "please enter password"
            })
        }

        const userData = await users.findOne({ email: email })
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "email not found"
            })
        }

        const passwordCheck = await bcrypt.compareSync(password, userData.password)

        if (passwordCheck) {
            return res.status(200).json({
                success: true,
                message: "successful"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }


    } catch (err) {
        console.log(err)
    }
}


exports.emailVerification = async (req, res) => {
    try {
        let body = req.body;
        let email = body.email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "please enter email"
            })
        }
        const userEmail = await users.findOne({ email: email })
        
        if (!userEmail) {
            return res.status(400).json({
                success: false,
                message: "email not found"
            })
            
            
 
        } let oneTimePass = generateOtp()
            console.log(oneTimePass)
            

            const newOtp = {
                email : userEmail.email,
                otp : oneTimePass
                
            }
            const otpass = await otpSchema.create(newOtp);
           return res.status(200).json({
                success: true,
                message: "otp generated, please check your email",
                data : userEmail.email
            })
    } catch (error) {
        console.log("error :", error)
        return res.status(400).json({
            success: false,
            message: error.message || error
        })
    }
}

exports.otpVerification = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}