import * as fs from 'fs';
import { getConnection, getRepository } from 'typeorm';

import colors from 'colors';

interface ExclusionFile {
  table: string;
  identifiers: Array<number>;
}

class ExclusionService {
  public updateList(
    filename: string,
    newIdentifier: number,
    tableName: string
  ): ExclusionFile[] {
    if (!fs.existsSync('exclusionListTest.json')) {
      console.log('File not found');
      //TODO: No caso do arquivo não existir ele deve ser criado seguindo o modelo declarado na interface
    } else {
      let rawdata = fs.readFileSync(filename);
      let fileData: ExclusionFile[] = JSON.parse(rawdata.toString());

      for (let i = 0; i < fileData.length; i++) {
        console.log(i);

        if (fileData[i].table === tableName) {
          fileData[i].identifiers.push(newIdentifier);
        }
      }

      fs.writeFileSync(filename, JSON.stringify(fileData));
      return fileData;
    }
  }

  public async executeList(filename: string) {
    let rawdata = fs.readFileSync(filename);
    let fileData: ExclusionFile = JSON.parse(rawdata.toString());

    const connection = await getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    for (let id in fileData.identifiers) {
      console.log(
        colors.yellow(
          `Deleting record with id ${fileData.identifiers[id]} on table ${fileData.table}`
        )
      );
      await queryRunner
        .query(
          `SELECT * FROM ${fileData.table} WHERE id=${fileData.identifiers[id]}`
        )
        .then(async (data: any[]) => {
          if (data.length > 0) {
            await queryRunner
              .query(
                `DELETE FROM ${fileData.table} WHERE id=${fileData.identifiers[id]}`
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

  public async getList(filename: string) {
    let rawdata = fs.readFileSync(filename);
    let fileData: ExclusionFile[] = JSON.parse(rawdata.toString());

    return fileData;
  }

  public deleteID(
    filename: string,
    identifier: number,
    tableName: string
  ): ExclusionFile[] {
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
  }

  public addTable(filename: string, tableName: string): ExclusionFile[] {
    if (!fs.existsSync('exclusionListTest.json')) {
      console.log('File not found');
      //TODO: No caso do arquivo não existir ele deve ser criado seguindo o modelo declarado na interface
    } else {
      let rawdata = fs.readFileSync(filename);
      let fileData: ExclusionFile[] = JSON.parse(rawdata.toString());
      fileData.push({
        table: tableName,
        identifiers: []
      });

      fs.writeFileSync(filename, JSON.stringify(fileData));
      return fileData;
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
}

export default new ExclusionService();
