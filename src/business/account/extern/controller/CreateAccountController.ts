import { Request, Response, NextFunction } from 'express';
import { Logger, HTTP_STATUS, TOKEN_HEADER } from '../../../../utils';
import { AccountDAOImpl } from '../dao';
import { CreateAccount } from '../../usecase';
import { PersonaDAOImpl } from '../../../person/extern';

export class CreateAccountController {
  async createAccount(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<any> {
    const Log: Logger = new Logger('Create Account');
    try {
      const accountDAO = new AccountDAOImpl();
      const personaDAO = new PersonaDAOImpl();

      const useCase = new CreateAccount({
        accountDAO,
        personaDAO,
        payload: {
          username: req.body.username,
          password: req.body.password,
          dni: req.body.dni,
          name: req.body.name,
          lastname: req.body.lastname,
        },
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
