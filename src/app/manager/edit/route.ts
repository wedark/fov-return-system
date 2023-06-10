import { NextResponse } from 'next/server';
import { writeFile, rm } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

import type { formDataExample } from '~/types/exampleJSON';
import { NextApiResponse } from 'next';

// EDIT
export async function POST(request: Request) {
  console.log(JSON.stringify(request, undefined, 2));
  // const url = new URL(request.url).href;
  // get action and file params from GET params of the url

  // console.log('🚀 ~ file: route.ts:9 ~ GET ~ HUI:', url);

  const currentPath = process.cwd();

  // console.log('calling GET on manager');
  const bodyJson = (await request.json()) as unknown as typeof formDataExample;
  const customerNumber = bodyJson.customerNumber;

  // search that file exists
  const incomingPathToFile = path.join(currentPath, `./files/${customerNumber}.json`);

  const fileExists = existsSync(incomingPathToFile);

  // console.log('🚀 ~ file: route.ts:9 ~ GET ~ currentPath:', currentPath);

  if (!fileExists) {
    // console.log('🚀 ~ file: route.ts:9 ~ GET ~ fileExists:', fileExists);
    return new Response(undefined, {
      status: 404,
      // error description
      statusText: 'File does not exist | use new file NOT edit',

      // headers: { 'Set-Cookie': `token=${token}` },
    });
  }

  // const pathToNewFile = path.join(currentPath, `./files/${bodyJson.customerNumber}.json`);
  // console.log('🚀 ~ file: route.ts:9 ~ GET ~ pathToNewFile:', pathToNewFile);

  await writeFile(incomingPathToFile, JSON.stringify(bodyJson, undefined, 2), {
    encoding: 'utf-8',
  });

  // set header to 200
  // const response = NextResponse.next();
  // response.headers.set('Content-Type', 'application/json');
  // return response;

  return new Response(undefined, {
    status: 200,
    // headers: { 'Set-Cookie': `token=${token}` },
  });
}

export async function DELETE(request: Request) {
  // console.log('referrer', request.);

  // get fileName from get params of request link
  const url = new URL(request.url).href;
  const b = url.split('/').pop();

  // console.log('🚀 ~ file: route.ts:9 ~ GET ~ url:', b);

  // const currentPath = process.cwd();
  // console.log('🚀 ~ file: route.ts:9 ~ GET ~ currentPath:', currentPath);
  // delete file
  await rm(path.join(process.cwd(), `./files/${b}`));

  return new Response(undefined, {
    status: 200,
    // headers: { 'Set-Cookie': `token=${token}` },
  });
}
