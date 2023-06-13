import { rm } from 'fs/promises';

import path from 'path';

export async function DELETE(request: Request) {
  const url = new URL(request.url).href;
  const params = url.split('/').pop()?.split('?');
  const filename = params ? params[0] : undefined;
  const folder = params ? params[1] : undefined;

  if (!filename || !folder) {
    return new Response(undefined, {
      status: 400,
      statusText: 'Bad Request: filename or folder is undefined',
    });
  }

  await rm(path.join(process.cwd(), `./files/${folder}/${filename}`));

  return new Response(undefined, {
    status: 200,
  });
}
