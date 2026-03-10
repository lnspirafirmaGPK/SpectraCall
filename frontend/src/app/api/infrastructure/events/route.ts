import { streamSeedEvents } from "@/lib/mock/infrastructure";

const encoder = new TextEncoder();

export async function GET() {
  let interval: NodeJS.Timeout | undefined;

  const stream = new ReadableStream({
    start(controller) {
      let index = 0;
      interval = setInterval(() => {
        const seed = streamSeedEvents[index % streamSeedEvents.length];
        const event = {
          ...seed,
          id: `${seed.id}-${Date.now()}`,
          timestamp: new Date().toISOString(),
        };

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        index += 1;
      }, 1500);

      controller.enqueue(encoder.encode(": stream-started\n\n"));
    },
    cancel() {
      if (interval) {
        clearInterval(interval);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
