export const JWT_SECRET = process.env.JWT_SECRET ?? 'Jwt-secret';
export const username = process.env.PG_USERNAME;
export const password = process.env.PG_PASSWORD;
export const host = process.env.PGHOST;
export const database = process.env.PG_DATABASE;
export const port = process.env.PG_PORT ?? '5432';