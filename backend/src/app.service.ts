import { Injectable } from '@nestjs/common';
// import { readdir, readFile, rm, writeFile } from 'fs/promises';
import type { SimpleForm } from '../types/simpleForm';

interface FormFile {
  filename: string;
  imported: SimpleForm;
}

type FormFiles = {
  [key: string]: FormFile;
}

@Injectable()
export class AppService {
  private readonly folders = ['active', 'completed'];


  getHello(): string {
    return 'Hello World!';
  }

  getAllCompletedForms(){}

  getAllActiveForms(){}


  deleteFile() {

  }

  /** Edit (existing) */
  putFile() {

  }

  /** Add (new) */
  postFile() {

  }
}
