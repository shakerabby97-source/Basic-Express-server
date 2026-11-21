import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async(req: Request, res: Response)=> {

    const result = await authService.loginUser(req.body)

    try {
        res.status(200).json({
            success: true,
            message: "Login Successful",
            data: result
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
            
        })
    }
}

export const authController = {
    loginUser,
}