import express from 'express';
import colors from 'colors';
import 'reflect-metadata';
import cors from 'cors';
import bodyParser from 'body-parser';

import Database from './Database';
import ExclusionService from './service/ExclusionService';

import routes from './routes';
class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.express.use(cors());
    this.express.use(bodyParser.json());

    this.express.use(routes);
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
