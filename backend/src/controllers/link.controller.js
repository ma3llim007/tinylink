import { ApiError, ApiResponse } from "../utils/apiResponse.js";
import Link from "../models/linkScheme.js";
import crypto from "crypto";

const createLink = async (req, res) => {
    let { code, targetUrl } = req.body;

    if (!targetUrl) {
        return res.status(400).json(new ApiError(400, "Target URL is required"));
    }
    if (!/^https?:\/\//i.test(targetUrl)) {
        return res.status(400).json(new ApiResponse(400, "Invalid URL"));
    }

    try {
        if (!code || code?.trim() === "") {
            code = crypto.randomBytes(3).toString("hex");
        } else {
            if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
                return res.status(400).json(new ApiError(400, "Invalid Code Format"));
            }

            const exitsCode = await Link.findOne({ shortCode: code });
            if (exitsCode) {
                return res.status(409).json(new ApiError(409, "Code Already Exists"));
            }
        }

        const newLink = await Link.create({
            shortCode: code,
            targetUrl: targetUrl,
        });

        return res.status(201).json(new ApiResponse(201, newLink, "Link Created Successfully!"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Something Went Wrong While Creating a Link"));
    }
};

const listLinks = async (req, res) => {
    try {
        const lists = await Link.find().sort({ createdAt: -1 });
        return res.status(200).json(new ApiResponse(200, lists, "Links Fetch Successfully!"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Something Went Wrong While Fetching Links"));
    }
};

const deleteLink = async (req, res) => {
    const { code } = req.params;

    if (!code) {
        return res.status(404).json(new ApiError(404, "Code Is Required To Delete Link"));
    }

    const link = await Link.findOne({ shortCode: code });
    if (!link) {
        return res.status(404).json(new ApiError(404, "Link Not Found"));
    }

    const deleteUrl = await Link.deleteOne({ shortCode: code });
    if (!deleteUrl.acknowledged) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong While Deleting The Link"));
    }

    return res.status(200).json(new ApiResponse(200, {}, "Link Deleted Successfully"));
};

const redirectUrl = async (req, res) => {
    const { code } = req.params;

    if (!code) {
        return res.status(404).json(new ApiError(404, "Code is Required"));
    }

    try {
        const redirectLink = await Link.findOne({ shortCode: code });
        if (!redirectLink) {
            return res.status(400).json(new ApiError("Link Not Found"));
        }

        await redirectLink.recordClick();

        return res.redirect(302, redirectLink.targetUrl);
    } catch (error) {
        return res.status(400).json(new ApiError(400, "Something Went Wrong While Redirect Link"));
    }
};

const getLinkStats = async (req, res) => {
    const { code } = req.params;

    const link = await Link.findOne({ shortCode: code });
    if (!link) {
        return res.status(404).json(new ApiError(404, "Link Not Found"));
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                shortCode: link.shortCode,
                targetUrl: link.targetUrl,
                totalClicks: link.totalClicks,
                lastClickedAt: link.lastClickedAt,
                createdAt: link.createdAt,
            },
            "Stats Fetched Successfully"
        )
    );
};

export { createLink, listLinks, deleteLink, redirectUrl, getLinkStats };
