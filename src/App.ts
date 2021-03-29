import express from 'express';
import colors from 'colors';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    createConnection()
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
