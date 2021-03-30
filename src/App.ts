import express from 'express';
import colors from 'colors';
import 'reflect-metadata';

import Database from './Database';
import ExclusionService from './services/ExclusionService';
class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    Database.createDatabaseConnection()
      .then(
        async (): Promise<void> => {
          console.log(colors.green('Database connection stablished'));

          await ExclusionService.executeList('exclusionList.json');
        }
      )
      .catch((error) => {
        console.log(colors.red('Error while creating database connection'));
        console.log(colors.red(`Error: ${error}`));
      });
  }
}

export default new App().express;
