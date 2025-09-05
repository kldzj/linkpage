import { revalidatePath } from "next/cache";

export function GET(request: Request): Response {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.INVALIDATE_TOKEN || token !== process.env.INVALIDATE_TOKEN)
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/opengraph-image");
  return new Response("OK", { status: 200 });
}
