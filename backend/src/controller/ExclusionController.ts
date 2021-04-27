import { Request, Response } from 'express';

import ExclusionService from '../service/ExclusionService';

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

    const exclusionList = await ExclusionService.updateList(
      'exclusionList.json',
      newIdentifier,
      tableName
    );

    return res.json({
      status: 1,
      exclusionList
    });
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
    console.log({ tableName });

    const exclusionList = await ExclusionService.addTable(
      'exclusionList.json',
      tableName
    );

    return res.json({
      status: 1,
      exclusionList
    });
  }

  public async deleteTable(req: Request, res: Response): Promise<Response> {
    const { tableName } = req.body;
    console.log({ tableName });

    const exclusionList = await ExclusionService.deleteTable(
      'exclusionList.json',
      tableName
    );

    return res.json({
      status: 1,
      exclusionList
    });
  }
}

export default new ExclusionController();
