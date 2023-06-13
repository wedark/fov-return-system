import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

import { SimpleForm } from '~/types/form';
import { checkIfCompleted, validateForm } from '~/utils/formCheck';
import { formValidator } from '~/utils/sharedManager';

// NEW
export async function POST(request: Request) {
  const currentPath = process.cwd();
  const bodyJson = (await request.json()) as SimpleForm;
  const customerNumber = bodyJson.customerNumber;
  console.log('New file with customerNumber', customerNumber);

  const pathInActiveCheck = path.join(currentPath, `./files/active/${customerNumber}.json`);
  const pathInCompletedCheck = path.join(currentPath, `./files/completed/${customerNumber}.json`);
  const fileExists = existsSync(pathInActiveCheck) || existsSync(pathInCompletedCheck);

  if (fileExists) {
    return new Response(undefined, {
      status: 409,
      statusText: 'Conflict: File already exists | use edit NOT new',
    });
  }

  const validate = await formValidator(bodyJson);
  if (validate) {
    return validate;
  }

  const formCompleted = checkIfCompleted(bodyJson);

  const folder = formCompleted ? 'completed' : 'active';
  const pathToNewFile = path.join(currentPath, `./files/${folder}/${customerNumber}.json`);

  await writeFile(pathToNewFile, JSON.stringify(bodyJson, undefined, 2), {
    encoding: 'utf-8',
  });

  return new Response(undefined, {
    status: 200,
  });
}