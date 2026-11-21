import { Request, Response } from "express"
import { profileServices } from "./profile.service"

const profileCreate = async(req: Request, res: Response)=> {

    try {
        const result = await profileServices.profileCreate(req.body);

        res.status(201).json({
            success: true,
            message: "User Profile Created Successfully",
            data : result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error.message
        })
    }
}

export const profileController = {
    profileCreate,
}