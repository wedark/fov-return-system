import { NextResponse } from 'next/server';
import { writeFile, rm } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

import type { formDataExample } from '~/types/exampleJSON';
import { NextApiResponse } from 'next';

// EDIT
export async function POST(request: Request) {
  const currentPath = process.cwd();

  const bodyJson = (await request.json()) as unknown as typeof formDataExample;
  const customerNumber = bodyJson.customerNumber;
  console.log('Edit file with customerNumber', customerNumber);

  const incomingPathToFile = path.join(currentPath, `./files/${customerNumber}.json`);

  const fileExists = existsSync(incomingPathToFile);

  if (!fileExists) {
    console.log('ERROR: file does not exist');
    return new Response(undefined, {
      status: 404,
      statusText: 'File does not exist | use new file NOT edit',
    });
  }

  await writeFile(incomingPathToFile, JSON.stringify(bodyJson, undefined, 2), {
    encoding: 'utf-8',
  });

  return new Response(undefined, {
    status: 200,
  });
}
