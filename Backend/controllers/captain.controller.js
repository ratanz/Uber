const captainModel = require("../models/captain.model")
const captainService = require("../services/captain.service")
const { validationResult } = require("express-validator")
const BlacklistTokenModel = require("../models/blacklistToken.model")
const bcrypt = require("bcrypt")


module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

    const { fullname, email, password, vehicle } = req.body

    const isCaptainAlreadyExist = await captainModel.findOne({ email })
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: "Captain already exists" })
    }

    const hashedPassword = await captainModel.hashPassword(password)

        const captain = await captainModel.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hashedPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        })

        const token = await captain.generateToken()

        res.status(201).json({ token, captain })
    } catch (error) {
        console.error("Captain registration error:", error)
        res.status(500).json({ message: "Error registering captain" })
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

        // Debug log
        console.log("Login attempt for email:", email);

        const captain = await captainModel.findOne({ email }).select("+password")
        if(!captain){
            console.log("No captain found with email:", email);
            return res.status(400).json({ message: "Invalid email or password" })
        }

        // Debug log
        console.log("Found captain:", captain._id);
        console.log("Stored hashed password exists:", !!captain.password);

        // Make sure password comparison is working
        const isMatch = await bcrypt.compare(password, captain.password);
        console.log("Password match result:", isMatch);

        if(!isMatch){
            console.log("Password does not match for captain:", captain._id);
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const token = await captain.generateToken()
        
        // Remove sensitive data
        const captainResponse = captain.toObject();
        delete captainResponse.password;
        
        res.status(200).json({ 
            token, 
            captain: captainResponse,
            message: "Login successful"
        })
    } catch (error) {
        console.error("Login error details:", error);
        res.status(500).json({ 
            message: "Error during login", 
            error: error.message 
        })
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain })

}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await BlacklistTokenModel.create({ token })
    
    res.clearCookie("token");

    res.status(200).json({ message: "Logout successful" })
}