import mongoose from "mongoose";

export interface IProject extends Document{
    user: mongoose.Types.ObjectId;
    title: string;
    description: string;
    techStack: string[];
    gitHubLink?: string;
    liveLink?: string
}

const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    techStack: [{
        type: String
    }],
    gitHubLink: {
        type: String
    },
    liveLink: {
        type: String
    }
}, {
    timestamps: true
});

const Project = mongoose.model("Project", projectSchema);

export default Project;

