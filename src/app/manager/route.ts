import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

import type { formDataExample } from '~/types/exampleJSON';

export async function POST(request: Request) {
  console.log('calling GET on manager');
  const bodyJson = request.json() as unknown as typeof formDataExample;

  const currentPath = process.cwd();
  console.log('🚀 ~ file: route.ts:9 ~ GET ~ currentPath:', currentPath);

  const pathToNewFile = path.join(currentPath, `./files/${bodyJson.customerNumber}.json`);
  console.log('🚀 ~ file: route.ts:9 ~ GET ~ pathToNewFile:', pathToNewFile);

  await writeFile(pathToNewFile, JSON.stringify(bodyJson, undefined, 2), {
    encoding: 'utf-8',
  });

  return NextResponse.json({ data: { hooray: 'da' } });
}
