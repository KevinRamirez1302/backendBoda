import 'dotenv/config';

// 2. Importamos el Pool de 'pg'
import { Pool } from 'pg';

// 3. La configuración es idéntica
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// 4. Exportamos nuestro objeto usando 'export default'
export default {
  query: (text, params) => pool.query(text, params),
};
