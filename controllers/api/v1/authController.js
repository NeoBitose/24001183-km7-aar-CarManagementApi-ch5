const bcrypt = require('bcryptjs');
const { where } = require('sequelize');
const validator = require("validator");

const { Users } = require("../../../models");

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                status: "Failed",
                message: 'Email is not valid',
                isSuccess: false,
                data: null,
            });
        }

        const newUser = await Users.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
        })
        res.status(201).json({
            status: "Success",
            message: "Register user successfully",
            isSuccess: true,
            data: {
                newUser,
            },
        });
    }
    catch (error) {
        if (error.name === "SequelizeValidationError") {
            const errorMessage = error.errors.map((err) => err.message);
            return res.status(400).json({
                status: "Failed",
                message: errorMessage[0],
                isSuccess: false,
                data: null,
            });
        } else if (error.name === "SequelizeDatabaseError") {
            return res.status(400).json({
                status: "Failed",
                message: error.message || "Database error",
                isSuccess: false,
                data: null,
            });
        } else {
            return res.status(500).json({
                status: "Failed",
                message: "An unexpected error occurred",
                isSuccess: false,
                data: null,
            });
        }
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDetail = await Users.findOne({
            where: { email }
        });

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                status: "Failed",
                message: 'Email is not valid',
                isSuccess: false,
                data: null,
            });
        }

        if (!validator.isLength(password, {min: 8})) {
            return res.status(400).json({
                status: "Failed",
                message: 'Password at least 8 char',
                isSuccess: false,
                data: null,
            });
        }
        else if (!validator.isLength(password, {max: 100})) {
            return res.status(400).json({
                status: "Failed",
                message: 'Password max 100 char',
                isSuccess: false,
                data: null,
            });
        }

        if (!userDetail) {
            return res.status(404).json({
                status: "Failed",
                message: "Cannot find spesific users",
                isSuccess: false,
                data: null,
            });
        }

        const hashedPassword = userDetail.password
        const isCorrectPass = await bcrypt.compare(password, hashedPassword)

        if (isCorrectPass) {
            res.status(201).json({
                status: "Success",
                message: "Login user successfully",
                isSuccess: true,
                data: {
                    email: email,
                    firstName: userDetail.firstName,
                    lastName: userDetail.lastName,
                    phone: userDetail.phone
                },
            });
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "Password is incorrect!",
                isSuccess: false,
                data: null,
            });
        }
    }
    catch (error) {
        if (error.name === "SequelizeValidationError") {
            const errorMessage = error.errors.map((err) => err.message);
            return res.status(400).json({
                status: "Failed",
                message: errorMessage[0],
                isSuccess: false,
                data: null,
            });
        } else if (error.name === "SequelizeDatabaseError") {
            return res.status(400).json({
                status: "Failed",
                message: error.message || "Database error",
                isSuccess: false,
                data: null,
            });
        } else {
            return res.status(500).json({
                status: "Failed",
                message: "An unexpected error occurred",
                isSuccess: false,
                data: null,
            });
        }
    }
}

module.exports = {
    register,
    login
}