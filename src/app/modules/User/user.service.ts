import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const { email } = payload;

  // check duplicate user
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      'User already exists!',
      'create user with another username and email',
    );
  }

  // create user
  const result = await User.create(payload);

  return result;
};

export const getSingleUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

// UPDATE user profile
const updateUserProfile = async (
  userId: string,
  payload: Partial<TUser>,
): Promise<TUser | null> => {
  try {
    if (payload.email) {
      const existingUser = await User.findOne({
        email: payload.email,
        _id: { $ne: userId },
      });
      if (existingUser) {
        throw new AppError(
          httpStatus.ALREADY_REPORTED,
          'Email already in use by another user',
          'Update user profile failed',
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    if (!updatedUser) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `User with id ${userId} not found`,
        'Update user profile failed',
      );
    }

    return updatedUser;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || 'Error updating user profile',
      'Update user profile failed',
    );
  }
};

export const UserServices = {
  createUserIntoDB,
  updateUserProfile,
};
