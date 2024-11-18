import dotenv from 'dotenv';
dotenv.config();

import { api } from "./src/api.js";

api.listen(process.env.SERVER_PORT, () => {
  console.log('API RODANDO!');
});
