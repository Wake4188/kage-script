import { createAPIFileRoute } from "@tanstack/react-start/api";
import { z } from "zod";
import { callGeminiJson } from "../../lib/gemini";

const schema = z.object({
  kind: z.enum(["encode", "decode"]),
  input: z.string().min(1).max(2000),
  prompt: z.string().min(1),
  targetLang: z.string().min(2).max(8).optional(),
});

export const APIRoute = createAPIFileRoute("/api/translate")({
  POST: async ({ request }: { request: Request }) => {
    try {
      const body = await request.json();
      const parsed = schema.safeParse(body);
      if (!parsed.success) {
        return new Response(JSON.stringify({ error: "Invalid request" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      const data = parsed.data;
      const result = await callGeminiJson(data.kind, data.input, data.prompt, data.targetLang);
      return new Response(JSON.stringify({ result }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } catch (error) {
      console.error("Translate API error", error);
      return new Response(JSON.stringify({ error: "Gemini request failed" }), {
        status: 502,
        headers: { "content-type": "application/json" },
      });
    }
  },
});
