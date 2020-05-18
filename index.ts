import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import cepPromise from "https://cdn.pika.dev/cep-promise@^3.0.9";

const PORT: number = 3000;
const HOST: string = "localhost";

const router = new Router();
const app = new Application();

interface Cep {
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
}

router.get(
  "/:cep",
  async ({ response, params }: { response: any; params: any }) => {
    const { cep } = params;
    const res: Cep = await cepPromise(cep);
    response.body = res;
  },
);

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);
