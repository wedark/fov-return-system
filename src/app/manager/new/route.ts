import { NextResponse } from 'next/server';
import { writeFile, rm } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

import type { formDataExample } from '~/types/exampleJSON';
import { NextApiResponse } from 'next';

// NEW
export async function POST(request: Request) {
  console.log(request);

  const currentPath = process.cwd();

  // console.log('calling GET on manager');
  const bodyJson = (await request.json()) as unknown as typeof formDataExample;
  const customerNumber = bodyJson.customerNumber;

  const pathToNewFile = path.join(currentPath, `./files/${customerNumber}.json`);

  const fileExists = existsSync(pathToNewFile);

  if (fileExists) {
    return new Response(undefined, {
      status: 409,
      statusText: 'Conflict: File already exists | use edit NOT new',
    });
  }

  // console.log(bodyJson);

  // console.log('🚀 ~ file: route.ts:9 ~ GET ~ currentPath:', currentPath);

  // console.log('🚀 ~ file: route.ts:9 ~ GET ~ pathToNewFile:', pathToNewFile);

  await writeFile(pathToNewFile, JSON.stringify(bodyJson, undefined, 2), {
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
