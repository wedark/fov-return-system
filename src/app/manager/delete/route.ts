import { rm } from 'fs/promises';

import path from 'path';

export async function DELETE(request: Request) {
  const url = new URL(request.url).href;
  const b = url.split('/').pop();

  await rm(path.join(process.cwd(), `./files/${b}`));

  return new Response(undefined, {
    status: 200,
    // headers: { 'Set-Cookie': `token=${token}` },
  });
}
