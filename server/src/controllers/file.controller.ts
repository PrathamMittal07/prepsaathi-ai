import { Request, Response, NextFunction } from 'express';
import { FileService } from '../services/file.service';

export class FileController {
  static async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user!;
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
      const file = await FileService.uploadFile(userId, req.file);
      res.status(201).json({ data: file });
    } catch (error) { next(error); }
  }

  static async listFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user!;
      const files = await FileService.getFiles(userId);
      res.status(200).json({ data: files });
    } catch (error) { next(error); }
  }

  static async deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user!;
      const { id } = req.params;
      await FileService.deleteFile(id as string, userId);
      res.status(204).send();
    } catch (error) { next(error); }
  }
}
