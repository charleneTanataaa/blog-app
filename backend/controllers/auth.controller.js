// register
const User = require('../models/User');
const bcrypt = require("bcryptjs")

exports.register = async (req, res) => {
    console.log("REGISTER HIT", req.body);

    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password) 
            return res.status(400).json({message: "All fields required."})
        
        const userExists = await User.findOne({ email })

        if(userExists)
            return res.status(400).json({message: "User already exists."})

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password: hashedPassword});
        res.status(201).json({message: "User registered successfully."})
    } catch (error){
        console.log(error);
    }
}

// login
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    console.log("Login starts");
    try{
        const {email, password} = req.body;
        if(!email || !password)
            return res.status(400).json({message: "All fields are required."});

        const user = await User.findOne({email});
        if(!user)
            return res.status(401).json({ message: "User not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(401).json({ message: "Invalid credentials." });
        
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}