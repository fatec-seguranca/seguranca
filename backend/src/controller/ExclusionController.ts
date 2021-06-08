import { Request, Response } from 'express';

import ExclusionService from 'exclusion-list';

class ExclusionController {
  public async index(req: Request, res: Response): Promise<Response> {
    const exclusionList = await ExclusionService.getList('exclusionList.json');
    return res.json({
      status: 1,
      exclusionList
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { newIdentifier, tableName } = req.body;

    try {
      const exclusionList = await ExclusionService.updateList(
        'exclusionList.json',
        newIdentifier,
        tableName
      );
      return res.json({
        status: 1,
        exclusionList
      });
    } catch (error) {
      return res.json({
        status: 0,
        error: error.message
      });
    }
  }

  public async deleteId(req: Request, res: Response): Promise<Response> {
    const { identifier, tableName } = req.body;
    console.log({ identifier, tableName });

    const exclusionList = await ExclusionService.deleteID(
      'exclusionList.json',
      identifier,
      tableName
    );

    return res.json({
      status: 1,
      exclusionList
    });
  }

  public async save(req: Request, res: Response): Promise<Response> {
    const { tableName } = req.body;

    try {
      const exclusionList = await ExclusionService.addTable(
        'exclusionList.json',
        tableName
      );
      return res.json({
        status: 1,
        exclusionList
      });
    } catch (error) {
      return res.json({
        status: 0,
        error: error.message
      });
    }
  }

  public async deleteTable(req: Request, res: Response): Promise<Response> {
    const { tableName } = req.body;

    const exclusionList = await ExclusionService.deleteTable(
      'exclusionList.json',
      tableName
    );

    return res.json({
      status: 1,
      exclusionList
    });
  }

  public async createConnection(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { host, port, username, password, database } = req.body;

    try {
      await ExclusionService.createDatabaseConnection(
        host,
        port,
        username,
        password,
        database
      );
      return res.json({
        status: 1
      });
    } catch (error) {
      return res.json({
        status: 0,
        error: error.message
      });
    }
  }

  public async getDatabaseConnection(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const databaseConfig = await ExclusionService.getDatabaseConfig();
      return res.json({
        status: 1,
        databaseConfig
      });
    } catch (error) {
      return res.json({
        status: 0,
        error: error.message
      });
    }
  }
}

export default new ExclusionController();
