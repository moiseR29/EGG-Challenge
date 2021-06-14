import { Router } from 'express';
import { UpdatePersonController } from './UpdatePersonController';
import { JWTMiddleware } from '../../../common/service';

export class PersonController {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  get router(): Router {
    this._router.put(
      '/person',
      [new JWTMiddleware().jwt],
      new UpdatePersonController().updatePerson,
    );
    return this._router;
  }
}
