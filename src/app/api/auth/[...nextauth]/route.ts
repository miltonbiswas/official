import { put } from '@vercel/blob';

export async function POST(req: Request) {
  const file = await req.blob();
  const filename = req.headers.get("x-vercel-filename") || "upload.bin";
  
  const { url } = await put(filename, file, { access: 'public' });

  return new Response(JSON.stringify({ url }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
