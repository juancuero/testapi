export namespace Database {
  export const DB_CONNECTION = process.env.DB_CONNECTION ?? 'mysql';
  export const DB_HOST = process.env.DB_HOST ?? 'localhost';
  export const DB_PORT = Number(String(process.env.DB_DATABASE)) ?? 3306;
  export const DB_DATABASE = process.env.DB_DATABASE ?? '';
  export const DB_USERNAME = process.env.DB_USERNAME ?? 'root';
  export const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
  export const DB_DATABASE_TESTING = process.env.DB_DATABASE_TESTING ?? '';
}
