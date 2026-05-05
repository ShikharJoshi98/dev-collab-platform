import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export interface IUser {
    _id: string,
    name: string;
    email: string;
    password: string;
    bio?: string,
    skills?: string[],
    gitHubUsername?: string
}

export interface IUserDocument extends IUser, Document {
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    bio: {
        type: String
    },
    skills: [{
        type: String
    }],
    gitHubUsername: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);       
    }
    else {
        return;
    }
});

userSchema.set("toJSON", {
    transform: function (_, ret: any) {
        delete ret.password;
        return ret;
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;