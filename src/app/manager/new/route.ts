import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

import { SimpleForm } from '~/types/form';

// NEW
export async function POST(request: Request) {
  const currentPath = process.cwd();

  // console.log('calling GET on manager');
  const bodyJson = (await request.json()) as SimpleForm;
  const customerNumber = bodyJson.customerNumber;
  console.log('New file with customerNumber', customerNumber);

  const pathToNewFile = path.join(currentPath, `./files/${customerNumber}.json`);

  const fileExists = existsSync(pathToNewFile);

  if (fileExists) {
    return new Response(undefined, {
      status: 409,
      statusText: 'Conflict: File already exists | use edit NOT new',
    });
  }

  await writeFile(pathToNewFile, JSON.stringify(bodyJson, undefined, 2), {
    encoding: 'utf-8',
  });

  return new Response(undefined, {
    status: 200,
  });
}
