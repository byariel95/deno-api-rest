import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import router from './src/routes/index.routes.ts';

const PORT = 3500;

// initialization 
const app = new Application();


app.use(router.routes());
app.use(router.allowedMethods()); // allow all methods post, put etc

console.log(`server on port: ${PORT}`)
await app.listen({port: PORT});



