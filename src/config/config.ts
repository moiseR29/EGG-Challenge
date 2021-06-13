export interface Database {
  port: number;
  user: string;
  password: string;
  database: string;
  host: string;
}

export interface Config {
  database: Database;
  port: number;
}
