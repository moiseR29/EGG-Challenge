import { Request, Response, NextFunction } from 'express';
import { Logger, HTTP_STATUS, TOKEN_HEADER } from '../../../../utils';
import { AccountDAOImpl } from '../dao';
import { RefenrenceAccountDAOImpl } from '../../../referenceAccount/extern';
import { Login } from '../../usecase';

export class LoginController {
  async login(req: Request, res: Response, _next: NextFunction): Promise<any> {
    const Log: Logger = new Logger('Login');
    try {
      const accountDAO = new AccountDAOImpl();
      const referenceAccountDAO = new RefenrenceAccountDAOImpl();

      const useCase = new Login({
        accountDAO,
        referenceAccountDAO,
        payload: {
          username: req.body.username,
          password: req.body.password,
        },
      });

      const responseUseCase = await useCase.run();
      res.setHeader(TOKEN_HEADER, responseUseCase.token);
      return res
        .status(HTTP_STATUS.OK)
        .send({ message: responseUseCase.message });
    } catch (error) {
      Log.error(error.message);
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ message: error.message });
    }
  }
}
