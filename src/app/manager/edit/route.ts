import { NextResponse } from 'next/server';
import { writeFile, rm } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

import { NextApiResponse } from 'next';
import { checkIfCompleted } from '~/utils/formCheck';
import { SimpleForm } from '~/types/form';
import { formValidator } from '~/utils/sharedManager';

// EDIT
export async function POST(request: Request) {
  const currentPath = process.cwd();

  // get everything after ? in url
  const url = new URL(request.url).href;
  const folder = url.split('?').pop();

  const bodyJson = (await request.json()) as SimpleForm;
  const customerNumber = bodyJson.customerNumber;
  console.log('Edit file with customerNumber', customerNumber);

  if (!folder) {
    return new Response(undefined, {
      status: 400,
      statusText: 'Bad Request: folder is undefined',
    });
  }
  const incomingPathToFile = path.join(currentPath, `./files/${folder}/${customerNumber}.json`);

  const fileExists = existsSync(incomingPathToFile);

  if (!fileExists) {
    console.log('ERROR: file does not exist');
    return new Response(undefined, {
      status: 404,
      statusText: 'File does not exist | use new file NOT edit',
    });
  }

  const validate = await formValidator(bodyJson);
  if (validate) {
    return validate;
  }

  const formCompleted = checkIfCompleted(bodyJson);

  const neededFolder = formCompleted ? 'completed' : 'active';
  if (folder !== neededFolder) {
    await rm(incomingPathToFile);
  }

  const correctPathToFile = path.join(
    currentPath,
    `./files/${neededFolder}/${customerNumber}.json`,
  );

  await writeFile(correctPathToFile, JSON.stringify(bodyJson, undefined, 2), {
    encoding: 'utf-8',
  });

  return new Response(undefined, {
    status: 200,
  });
}
