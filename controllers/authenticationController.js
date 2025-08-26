const users = require("../db/models/users")
const bcrypt = require("bcryptjs")
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
        if (addUser) {
            return res.status(200).send({
                sucess: true,
                message: "successfully signed up"
            })
        }
    } catch (error) {
        console.log("error while signing up: ", error)
    }
}