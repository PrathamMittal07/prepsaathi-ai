import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user!;
      const profile = await UserService.getProfile(id);
      res.status(200).json({ data: profile });
    } catch (error) { next(error); }
  }

  static async updateMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user!;
      const updated = await UserService.updateProfile(id, req.body);
      res.status(200).json({ data: updated });
    } catch (error) { next(error); }
  }

  static async getMyPreferences(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }

  static async updatePreferences(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }

  static async updateUserRoles(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }

  static async searchUsers(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: [] });
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    res.status(204).send();
  }
}
