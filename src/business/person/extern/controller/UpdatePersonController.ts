import { Request, Response, NextFunction } from 'express';
import { Logger, HTTP_STATUS } from '../../../../utils';
import { PersonaDAOImpl } from '../dao';
import { AccountDAOImpl } from '../../../account/extern';
import { UpdatePerson } from '../../usecase';

export class UpdatePersonController {
  async updatePerson(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<any> {
    const Log: Logger = new Logger('Update Person');
    try {
      const { jwtData, ...rest } = req.body;

      const personaDAO = new PersonaDAOImpl();
      const accountDAO = new AccountDAOImpl();

      const useCase = new UpdatePerson({
        personaDAO,
        payload: {
          ...rest,
        },
        jwtData,
        accountDAO,
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
