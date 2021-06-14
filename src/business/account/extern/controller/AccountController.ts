import { Router } from 'express';
import { CreateAccountController } from './CreateAccountController';
import { LoginController } from './LoginController';

export class AccountController {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  get router(): Router {
    this._router.post('/login', new LoginController().login);
    this._router.post('/account', new CreateAccountController().createAccount);
    return this._router;
  }
}
