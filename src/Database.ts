import { createConnection, getConnection } from 'typeorm';

class Database {
  public static async createDatabaseConnection(): Promise<void> {
    await createConnection();
  }

  public static async closeConnection(): Promise<void> {
    await getConnection().close();
  }

  public static async clear(): Promise<void> {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    for (let index in entities) {
      const repository = connection.getRepository(entities[index].name);
      await repository.query(`DELETE FROM ${entities[index].tableName}`);
    }
  }
}

export default Database;
