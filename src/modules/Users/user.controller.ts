import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async(req: Request, res: Response)=> {

    try {

    const result = await userService.createUser(req.body)

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

const getAllUser = async (req: Request, res: Response) => {
  try {
    
    const result = await userService.getAllUser()

    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userService.getSingleUser(id as string)

    if (result.rowCount === 0) {
      throw new Error(`NO user exist, with id: ${id}`);
    }

    res.status(200).json({
      success: true,
      message: "user retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

const updateUserData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userService.updateUserData(req.body , id as string)
 
     if (result.rowCount === 0) {
      throw new Error(`NO user exist, with id: ${id}`);
    }

    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userService.deleteUser(id as string);

    if (result.rowCount === 0) {
      throw new Error(`NO user exist, with id: ${id}`);
    }

    res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUserData,
    deleteUser,
}