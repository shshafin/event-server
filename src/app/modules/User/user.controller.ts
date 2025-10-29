import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import { AuthServices } from '../Auth/auth.service';
import httpStatus from 'http-status';
// import sendResponse from '../../shared/sendResponse';
// import httpStatus from 'http-status';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.createUserIntoDB(req.body);
    const { _id, email, createdAt, updatedAt } = result;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id,
        email,
        createdAt,
        updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  try {
    await AuthServices.forgotPassword(email);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Password reset email sent. Please check your inbox.',
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    await AuthServices.resetPassword(token, newPassword);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Password has been reset successfully.',
    });
  } catch (error) {
    next(error);
  }
};

const updateUserProfile: RequestHandler = async (req, res, next) => {
  const userId = req.params.id;
  const payload = { ...req.body };

  if (req.files && (req.files as any).image) {
    payload.image = `/uploads/${(req.files as any).image[0].filename}`;
  }

  try {
    const updatedUser = await UserServices.updateUserProfile(userId, payload);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createUser,
  updateUserProfile,
};
