const bcrypt = require('bcryptjs');
const { where } = require('sequelize');
const validator = require("validator");
const jwt = require("jsonwebtoken")

const { Users } = require("../../../models");
const imagekit = require("../../../lib/imagekit");

async function getAllUsers(req, res) {
    try {
        const users = await Users.findAll({
            order: ['id']
        });

        if (users.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "No data users found",
                isSuccess: false,
                data: null,
            });
        }

        res.status(200).json({
            status: "Success",
            message: "Success get users data",
            isSuccess: true,
            data: {
                users,
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

async function getUserbyId(req, res) {
    try {
        const id = req.params.id;
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "No data user found",
                isSuccess: false,
                data: null,
            });
        }

        res.status(200).json({
            status: "Success",
            message: "Success get user data",
            isSuccess: true,
            data: {
                user,
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

async function createUser(req, res) {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: "Failed",
                message: "Email address already in use!",
                isSuccess: false,
                data: null,
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                status: "Failed",
                message: 'Email is not valid',
                isSuccess: false,
                data: null,
            });
        }

        if (!validator.isLength(password, { min: 8 })) {
            return res.status(400).json({
                status: "Failed",
                message: 'Password at least 8 char',
                isSuccess: false,
                data: null,
            });
        }
        else if (!validator.isLength(password, { max: 100 })) {
            return res.status(400).json({
                status: "Failed",
                message: 'Password max 100 char',
                isSuccess: false,
                data: null,
            });
        }

        if (req.file) {
            console.log("ok")
            const file = req.file;
            const split = file.originalname.split(".");
            const ext = split[split.length - 1];

            const uploadedImage = await imagekit.upload({
                file: file.buffer,
                fileName: `${split[0]}-${Date.now()}.${ext}`,
            });
            if (!uploadedImage) {
                return res.status(500).json({
                    status: "Failed",
                    message: "Cant add uploadimage",
                    isSuccess: false,
                    data: null,
                });
            }
            else if (uploadedImage) {
                const newUser = await Users.create({
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    phone,
                    fotoProfil: uploadedImage.url,
                    role: "admin"
                })

                res.status(200).json({
                    status: "Success",
                    message: "Success create admin data",
                    isSuccess: true,
                    data: {
                        newUser,
                    },
                });
            }
        }
        else {
            const newUser = await Users.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone,
                role: "admin"
            });

            res.status(200).json({
                status: "Success",
                message: "Success create admin data",
                isSuccess: true,
                data: {
                    newUser,
                },
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
                message: error.message,
                isSuccess: false,
                data: null,
            });
        }
    }
}

async function currentUser(req, res) {
    try {
        const current = req.user;
        const id  = current.id
        const email = current.email
        const role = current.role
        const iat = current.iat
        const exp = current.exp

        const iatDate = new Date(iat * 1000).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const expDate = new Date(exp * 1000).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

        console.log(current, iat, exp)
        if (!current || Object.keys(current).length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "No data users authenticated found",
                isSuccess: false,
                data: null,
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Success get users data",
            isSuccess: true,
            data: {
                current: {
                    id,
                    email,
                    role,
                    iat: iatDate,
                    exp: expDate
                },
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

module.exports = {
    getAllUsers,
    getUserbyId,
    createUser,
    currentUser
}