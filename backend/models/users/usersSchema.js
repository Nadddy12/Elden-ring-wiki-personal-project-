import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
            return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: 'Please enter a valid Email',
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
            return /^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$/.test(v);
        },
        message: 'Password must be at least 6 characters with at least one capital letter',
        },
    },
    role: {
        type: String,
        enum: ['user' , 'admin' , 'mod'],
        default: 'user',
    },
}  ,{timestamps: true,
    versionKey: false});
    
usersSchema.methods.createJWT =  function() {
    return jwt.sign({id: this._id, username:this.username,  email:this.email, role:this.role
    } , process.env.JWT_KEY , { expiresIn: "12h" });
};

export const User = mongoose.model("User", usersSchema);