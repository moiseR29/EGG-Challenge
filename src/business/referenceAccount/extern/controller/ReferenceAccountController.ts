import { Router } from 'express';
import { ReferenceCreateAccountController } from './CreateReferenceAccountController';
import { JWTMiddleware } from '../../../common/service';

export class ReferenceAccountController {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  get router(): Router {
    this._router.post(
      '/referenceaccount',
      [new JWTMiddleware().jwt],
      new ReferenceCreateAccountController().createAccount,
    );
    return this._router;
  }
}
