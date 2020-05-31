import { listenAndServe, ServerRequest } from "https://deno.land/std@v0.54.0/http/server.ts";
import { readJson } from "https://deno.land/std@v0.54.0/fs/mod.ts";

type ServiceState = Record<string, string[]>

const stateFilePath = await Deno.realPath("./state.json");
const state = await readJson(stateFilePath) as ServiceState

console.log(`Server: http://localhost:8000/`);
console.log(`State:`, state);

listenAndServe({port: 8000}, (req: ServerRequest) => {
  const keys = Object.keys(state) // [a, c, t]
  const lengths = keys.map((k: string) => state[k].length) // [2, 2, 3]
  const selectedIndexes = lengths.map((l: number) => Math.floor(Math.random() * l)) // [0, 0, 1]
  const selectedWords = keys.map((k: string, index: number) => state[k][selectedIndexes[index]]) // [app, config, tool]
  req.respond({ body: selectedWords.join(' ') });
})
