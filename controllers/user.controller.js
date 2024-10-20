const User = require('../Model/User');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            throw new Error('User already exists');
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
        });

        await newUser.save();

        return res.status(200).json({ status: 'success' });
    } catch (error) {
        return res.status(400).json({ status: 'fail', error: error.message });
    }
};

userController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
                //token
                const token = await user.generateToken()
                return res.status(200).json({ status: "success", user, token })
            }
        }
        throw new Error("invalid email or password")
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
}





userController.getUser = async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);
        if (user) {
            return res.status(200).json({ status: "success", user });
        }
        return res.status(404).json({ status: "fail", message: "User not found" });
    } catch (error) {
        if (!res.headersSent) {
            return res.status(500).json({ status: "error", error: error.message });
        }
    }
};


module.exports = userController;
