import path from 'path';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { readdir, readFile, rm, writeFile } from 'fs/promises';
import type { SimpleForm } from '../types/simpleForm';
import { existsSync } from 'fs';
import { readFile, readdir, rm, writeFile } from 'fs/promises';
import { formValidator } from './utils/sharedManager';
import { checkIfCompleted } from './utils/formCheck';

export interface FormFile {
  filename: string;
  imported: SimpleForm;
}

@Injectable()
export class AppService {
  private readonly folders = ['active', 'completed'] as const;

  async getAllFormsFromDir(type: typeof this.folders[number]) {
    const currentPath = process.cwd();
    const dirPath = path.join(currentPath, `./uploads/${type}`);

    const filesFromDir = await readdir(dirPath);

    const files: FormFile[] = [];

    for (const file of filesFromDir) {
      if (!file.endsWith('.json')) continue;

      const pathToFile = path.join(dirPath, file);

      const fileContent = await readFile(pathToFile, { encoding: 'utf-8' });
      const parsedFile = JSON.parse(fileContent);

      files.push({
        filename: file,
        imported: parsedFile,
      });
    }

    return files;
  }

  async getSingleForm(formPath: string) {
    const currentPath = process.cwd();
    const pathToFile = path.join(currentPath, `./uploads/${formPath}`);

    const file = await readFile(pathToFile, { encoding: 'utf-8' });
    const parsedFile = JSON.parse(file);
    return parsedFile;
  }

  async deleteFile(folder: string, filename: string) {
    if (!filename || !folder) {
      return new Response(undefined, {
        status: 400,
        statusText: 'Bad Request: filename or folder is undefined',
      });
    }

    await rm(path.join(process.cwd(), `./uploads/${folder}/${filename}`));

    return new Response(undefined, {
      status: 200,
    });
  }

  /** Edit (existing) */
  async putFile(folder: string, body: SimpleForm) {
    const currentPath = process.cwd();

    const customerNumber = body.customerNumber;

    if (!folder) {
      throw new BadRequestException('folder is undefined');
    }
    const incomingPathToFile = path.join(
      currentPath,
      `./uploads/${folder}/${customerNumber}.json`,
    );

    const fileExists = existsSync(incomingPathToFile);

    if (!fileExists) {
      throw new NotFoundException(
        'File does not exist | use new file NOT edit',
      );
    }

    await formValidator(body);

    const formCompleted = checkIfCompleted(body);

    const neededFolder = formCompleted ? 'completed' : 'active';
    if (folder !== neededFolder) {
      await rm(incomingPathToFile);
    }

    const correctPathToFile = path.join(
      currentPath,
      `./uploads/${neededFolder}/${customerNumber}.json`,
    );

    await writeFile(correctPathToFile, JSON.stringify(body, undefined, 2), {
      encoding: 'utf-8',
    });

    return new Response(undefined, {
      status: 200,
    });
  }

  /** New (non-existing) */
  async postFile(body: SimpleForm) {
    const currentPath = process.cwd();
    const customerNumber = body.customerNumber;

    const pathInActiveCheck = path.join(
      currentPath,
      `./uploads/active/${customerNumber}.json`,
    );
    const pathInCompletedCheck = path.join(
      currentPath,
      `./uploads/completed/${customerNumber}.json`,
    );
    const fileExists =
      existsSync(pathInActiveCheck) || existsSync(pathInCompletedCheck);

    if (fileExists) {
      throw new ConflictException('File already exists | use edit NOT new');
    }

    await formValidator(body);

    const formCompleted = checkIfCompleted(body);

    const folder = formCompleted ? 'completed' : 'active';
    const pathToNewFile = path.join(
      currentPath,
      `./uploads/${folder}/${customerNumber}.json`,
    );

    await writeFile(pathToNewFile, JSON.stringify(body, undefined, 2), {
      encoding: 'utf-8',
    });
  }
}
