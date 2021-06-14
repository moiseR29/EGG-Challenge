export interface Database {
  port: number;
  user: string;
  password: string;
  database: string;
  host: string;
}

export interface Session {
  salt: number;
  secret: string;
}

export interface Server {
  port: number;
  basePath: string;
}

export interface Config {
  database: Database;
  session: Session;
  server: Server;
}
