import { Request, Response, NextFunction } from 'express';
import { Logger, HTTP_STATUS } from '../../../../utils';
import { RefenrenceAccountDAOImpl } from '../dao';
import { GetReferenceAccount } from '../../useCase';

export class GetReferenceAccountController {
  async getAccount(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<any> {
    const Log: Logger = new Logger('Get Reference Account');
    try {
      const referenceAccountDAO = new RefenrenceAccountDAOImpl();

      const useCase = new GetReferenceAccount({
        referenceAccountDAO,
        tokenData: req.body.tokenData,
      });

      const responseUseCase = await useCase.run();
      return res.status(HTTP_STATUS.OK).send(responseUseCase);
    } catch (error) {
      Log.error(error.message);
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ message: error.message });
    }
  }
}
