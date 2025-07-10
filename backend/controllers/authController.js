const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users.js")

const generateToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

// registering user
exports.registerUser= async(req,res)=>{
const { name, email, password, role, fcmToken }= req.body;
    if(!email||!password|| !name)
         return res.status(400).json({message:"All fields are required"})
  // checking exixting user
const exists = await Users.findOne({email});
     if(exists) return res.status(400).json({message:"User already exists"})
// hasing password
     const hashed = await bcrypt.hash(password,10);
     const user = await Users.create({
        name,
        email,
        password: hashed,
        role,
        fcmToken,
     });

     const token = generateToken(user);
     res.status(201).json({
       user: { id: user._id, name: user.name, email: user.email, role: user.role },
       token,
     });
};

// login user
exports.loginUser = async (req, res) => {
    const { email, password, fcmToken } = req.body;
  
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });
  
    if (fcmToken) {
      user.fcmToken = fcmToken;
      await user.save();
    }
  
    const token = generateToken(user);
    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  };
