import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            required: true,
            type: String
        },
        lastName: {
            type: String
        }
    },
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student"
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    refreshTokenHash: {
        type: String
    }

},
    {
        timestamps: true
    })

const userModel = mongoose.model("User", userSchema)

export default userModel