import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

function generateUniqueDatabaseName() {
  const randomString = generateRandomString(10);
  return randomString;
}

function generateRandomString(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function connectToUserDatabase(databaseName: string) {
  const prisma = new PrismaClient({
    // Connection configuration for the user's database
    datasources: {
      db: {
        url: `postgresql://postgres:toor@localhost/${databaseName}`,
      },
    },
  });

  return prisma;
}

export async function createUserDatabase(zebi: string) {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'toor',
    database: 'postgres',
  });

  const client = await pool.connect();

  const databaseName = generateUniqueDatabaseName();

  try {
    // Create the new database
    await client.query(`CREATE DATABASE ${zebi}`);
    const prisma = connectToUserDatabase(zebi);
    return {
      prisma,
    };
  } catch (error) {
    // Handle the error appropriately
    console.error('Error creating database:', error);
  } finally {
    client.release();
  }
}
