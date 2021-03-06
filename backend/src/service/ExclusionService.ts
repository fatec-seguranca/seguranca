import * as fs from 'fs';
import { ConnectionOptions, createConnection, getConnection } from 'typeorm';

import colors from 'colors';

interface ExclusionFile {
  table: string;
  identifiers: Array<number>;
}

interface DatabaseFile {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}
class ExclusionService {
  public async updateList(
    filename: string,
    newIdentifier: number,
    tableName: string
  ): Promise<ExclusionFile[]> {
    try {
      if (!fs.existsSync('exclusionList.json')) {
        console.log('File not found');
        //TODO: No caso do arquivo não existir ele deve ser criado seguindo o modelo declarado na interface
      } else {
        let rawdata = fs.readFileSync(filename);
        let fileData: ExclusionFile[] = JSON.parse(rawdata.toString());
        await this.establishDatabaseConnection();
        const connection = await getConnection('exlConn');
        const queryRunner = connection.createQueryRunner();

        await queryRunner.connect();

        await queryRunner
          .query(`SELECT * FROM ${tableName} WHERE id=${newIdentifier} LIMIT 1`)
          .then((data) => {
            if (data.length === 0) {
              throw new Error(
                `There is no register on the table ${tableName} with the id ${newIdentifier}.`
              );
            }
          });
        for (let i = 0; i < fileData.length; i++) {
          if (fileData[i].table === tableName) {
            fileData[i].identifiers.push(newIdentifier);
            break;
          }
        }

        fs.writeFileSync(filename, JSON.stringify(fileData));
        this.closeConnection();
        return fileData;
      }
    } catch (error) {
      this.closeConnection();
      throw new Error(error.message);
    }
  }

  public async executeList(filename: string) {
    try {
      let rawdata = fs.readFileSync(filename);
      let fileData: ExclusionFile[] = JSON.parse(rawdata.toString());
      await this.establishDatabaseConnection();
      const connection = await getConnection('exlConn');
      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      for (let i = 0; i < fileData.length; i++) {
        if (fileData[i].identifiers.length >= 1) {
          for (let id in fileData[i].identifiers) {
            console.log(
              colors.yellow(
                `Deleting record with id ${fileData[i].identifiers[id]} on table ${fileData[i].table}`
              )
            );
            await queryRunner
              .query(
                `SELECT * FROM ${fileData[i].table} WHERE id=${fileData[i].identifiers[id]}`
              )
              .then(async (data: any[]) => {
                if (data.length > 0) {
                  await queryRunner
                    .query(
                      `DELETE FROM ${fileData[i].table} WHERE id=${fileData[i].identifiers[id]}`
                    )
                    .then(() => {
                      console.log(colors.green(`Record deleted successfully!`));
                    });
                } else {
                  console.log(colors.red('Record has already been deleted.'));
                }
              });
          }
        }
      }
      this.closeConnection();
    } catch (error) {
      this.closeConnection();
      throw new Error(error.message);
    }
  }

  public async getList(filename: string) {
    try {
      let rawdata = fs.readFileSync(filename);
      let fileData: ExclusionFile[] = JSON.parse(rawdata.toString());

      return fileData;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public deleteID(
    filename: string,
    identifier: number,
    tableName: string
  ): ExclusionFile[] {
    try {
      if (!fs.existsSync('exclusionListTest.json')) {
        console.log('File not found');
        //TODO: No caso do arquivo não existir ele deve ser criado seguindo o modelo declarado na interface
      } else {
        let rawdata = fs.readFileSync(filename);
        let fileData: ExclusionFile[] = JSON.parse(rawdata.toString());

        for (let i = 0; i < fileData.length; i++) {
          if (fileData[i].table === tableName) {
            fileData[i].identifiers = fileData[i].identifiers.filter((id) => {
              return identifier != id;
            });
          }
        }

        fs.writeFileSync(filename, JSON.stringify(fileData));
        return fileData;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async addTable(
    filename: string,
    tableName: string
  ): Promise<ExclusionFile[]> {
    try {
      if (!fs.existsSync('exclusionListTest.json')) {
        console.log('File not found');
        //TODO: No caso do arquivo não existir ele deve ser criado seguindo o modelo declarado na interface
      } else {
        let rawdata = fs.readFileSync(filename);
        let exclusionList: ExclusionFile[] = JSON.parse(rawdata.toString());

        const tablesRegistered = exclusionList.map((item) => {
          return item.table;
        });
        await this.establishDatabaseConnection();
        const connection = await getConnection('exlConn');
        const queryRunner = connection.createQueryRunner();

        await queryRunner.connect();

        await queryRunner.query(`SELECT * FROM ${tableName} LIMIT 1`);

        if (tablesRegistered.indexOf(tableName) !== -1) {
          throw new Error(`Table ${tableName} is already registered.`);
        }
        exclusionList.push({
          table: tableName,
          identifiers: []
        });

        fs.writeFileSync(filename, JSON.stringify(exclusionList));
        this.closeConnection();
        return exclusionList;
      }
    } catch (error) {
      this.closeConnection();
      throw new Error(error.message);
    }
  }

  public deleteTable(filename: string, tableName: string): ExclusionFile[] {
    if (!fs.existsSync('exclusionListTest.json')) {
      console.log('File not found');
      //TODO: No caso do arquivo não existir ele deve ser criado seguindo o modelo declarado na interface
    } else {
      let rawdata = fs.readFileSync(filename);
      let fileData: ExclusionFile[] = JSON.parse(rawdata.toString());

      for (let i = 0; i < fileData.length; i++) {
        if (fileData[i].table === tableName) {
          fileData = fileData.filter((item) => {
            return tableName != item.table;
          });
        }
      }

      fs.writeFileSync(filename, JSON.stringify(fileData));
      return fileData;
    }
  }

  public async createDatabaseConnection(
    host: string,
    port: string,
    username: string,
    password: string,
    database: string
  ): Promise<void> {
    try {
      const databaseConfig: ConnectionOptions = {
        name: 'exlConn',
        //TODO: Futuramente o SGBD também deve ser customizável
        type: 'mysql',
        host,
        port: parseInt(port),
        username,
        password,
        database
      };
      await createConnection(databaseConfig).then(async () => {
        fs.writeFileSync(
          'exclusionListConnection.json',
          JSON.stringify(databaseConfig)
        );
        await getConnection('exlConn').close();
      });
    } catch (error) {}
  }

  public async getDatabaseConfig(): Promise<DatabaseFile> {
    try {
      let rawdata = fs.readFileSync('exclusionListConnection.json');
      let databaseConfig: DatabaseFile = JSON.parse(rawdata.toString());

      return databaseConfig;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async establishDatabaseConnection() {
    try {
      const databaseConfig = await this.getDatabaseConfig();
      await createConnection({
        name: 'exlConn',
        type: 'mysql',
        host: databaseConfig.host,
        port: parseInt(databaseConfig.port),
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.database
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async closeConnection() {
    try {
      await getConnection('exlConn').close();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new ExclusionService();
