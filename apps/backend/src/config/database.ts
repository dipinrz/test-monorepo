import { DataSource } from 'typeorm';
import { Todo } from '../entities/Todo';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'course',
  synchronize: true, // Set to false in production
  logging: false,
  entities: [Todo],
  migrations: [],
  subscribers: [],
});
