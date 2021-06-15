import { Router } from 'express';
import { ReferenceCreateAccountController } from './CreateReferenceAccountController';
import { GetReferenceAccountController } from './GetReferenceAccount';
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
    this._router.get(
      '/referenceaccount',
      [new JWTMiddleware().jwt],
      new GetReferenceAccountController().getAccount,
    );
    return this._router;
  }
}
