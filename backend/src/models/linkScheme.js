import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
    {
        shortCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        targetUrl: {
            type: String,
            required: true,
            trim: true,
        },
        totalClicks: {
            type: Number,
            default: 0,
        },
        lastClickedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

// Helper: Increment clicks
linkSchema.methods.recordClick = async function () {
    this.totalClicks += 1;
    this.lastClickedAt = new Date();
    await this.save();
};

export default mongoose.model("Link", linkSchema);
