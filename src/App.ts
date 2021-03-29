import express from 'express';
import colors from 'colors';
import 'reflect-metadata';

import Database from './Database';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    Database.createDatabaseConnection()
      .then((): void => {
        console.log(colors.green('Database connection stablished'));
      })
      .catch((error) => {
        console.log(colors.red('Error while creating database connection'));
        console.log(colors.red(`Error: ${error}`));
      });
  }
}

export default new App().express;
