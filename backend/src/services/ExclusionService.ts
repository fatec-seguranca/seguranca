import * as fs from 'fs';
import { getConnection, getRepository } from 'typeorm';

import colors from 'colors';
interface ExclusionFile {
  table: string;
  identifiers: Array<number>;
}

class ExclusionService {
  public updateList(filename: string, newIdentifier: number): void {
    if (!fs.existsSync('exclusionListTest.json')) {
      console.log('File not found');
      //TODO: No caso do arquivo não existir ele deve ser ciado seguindo o modelo declarado na interface
    } else {
      let rawdata = fs.readFileSync('exclusionListTest.json');
      let fileData: ExclusionFile = JSON.parse(rawdata.toString());

      fileData.identifiers.push(newIdentifier);

      fs.writeFileSync(filename, JSON.stringify(fileData));
      console.log(fileData);
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
}

export default new ExclusionService();
