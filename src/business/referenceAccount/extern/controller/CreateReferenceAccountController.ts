import { Request, Response, NextFunction } from 'express';
import { Logger, HTTP_STATUS } from '../../../../utils';
import { RefenrenceAccountDAOImpl } from '../dao';
import { CreateReferenceAccount } from '../../useCase';
import { PersonaDAOImpl } from '../../../person/extern';
import { AccountDAOImpl } from '../../../account/extern';

export class ReferenceCreateAccountController {
  async createAccount(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<any> {
    const Log: Logger = new Logger('Reference Create Account');
    try {
      const accountDAO = new AccountDAOImpl();
      const personaDAO = new PersonaDAOImpl();
      const referenceAccountDAO = new RefenrenceAccountDAOImpl();

      const useCase = new CreateReferenceAccount({
        referenceAccountDAO,
        accountDAO,
        personaDAO,
        payload: {
          username: req.body.username,
          password: req.body.password,
          dni: req.body.dni,
          name: req.body.name,
          lastname: req.body.lastname,
        },
        tokenData: req.body.tokenData,
      });

      const responseUseCase = await useCase.run();
      return res.status(HTTP_STATUS.CREATED).send(responseUseCase);
    } catch (error) {
      Log.error(error.message);
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ message: error.message });
    }
  }
}
