import request from 'supertest';
import { preparedServer, setDatabase } from '../src';

const app = preparedServer().app;

let token = '';
let refferToken = '';

describe('EGG CHALLENGE TESTS', () => {
  beforeAll((done) => {
    setDatabase();
    done();
  });

  test('Hello API', () => {
    return request(app)
      .get('/')
      .then((data) => {
        expect(data.statusCode).toBe(200);
        expect(data.text).toBe('Welcome to EGG-Challenge Server');
      });
  });

  describe('Created Account', () => {
    test('ACCOUNT: ctevez | 201', () => {
      return request(app)
        .post('/api/account')
        .send({
          name: 'Carlos',
          lastname: 'Tevez',
          dni: '36794859',
          username: 'ctevez',
          password: 'azulyoro',
        })
        .then((data) => {
          expect(data.statusCode).toBe(201);
          expect(data.body).toHaveProperty('username');
          expect(data.body.username).toBe('ctevez');
          expect(data.body).toHaveProperty('accountId');
          expect(data.body.accountId).toBe(1);
          expect(data.body).toHaveProperty('personId');
          expect(data.body.personId).toBe(1);
        });
    });

    test('Login GET TOKEN | 200', () => {
      return request(app)
        .post('/api/login')
        .send({
          username: 'ctevez',
          password: 'azulyoro',
        })
        .then((data) => {
          expect(data.statusCode).toBe(200);
          expect(data.body).toHaveProperty('message');
          expect(data.body.message).toBe('Login successfully');
          token = data.headers['x-egg-token'];
        });
    });

    test('REFERENCE ACCOUNT: mpalermo | 201', () => {
      return request(app)
        .post('/api/referenceaccount')
        .set('x-egg-token', token)
        .send({
          name: 'Martin',
          lastname: 'Palermo',
          dni: '30804839',
          username: 'mpalermo',
          password: 'azulyoro',
        })
        .then((data) => {
          expect(data.statusCode).toBe(201);
          expect(data.body).toHaveProperty('accountId');
          expect(data.body.accountId).toBe(1);
          expect(data.body).toHaveProperty('personId');
          expect(data.body.personId).toBe(2);
          expect(data.body).toHaveProperty('username');
          expect(data.body.username).toBe('mpalermo');
        });
    });

    test('FAILED | NOT SEND PAYLOAD', () => {
      return request(app)
        .post('/api/account')
        .then((data) => {
          expect(data.statusCode).toBe(400);
          expect(data.body).toHaveProperty('message');
        });
    });

    test('FAILED CREATED REFERECE | NOT HAVE PERMISSION', () => {
      return request(app)
        .post('/api/referenceaccount')
        .send({
          name: 'Nicolas',
          lastname: 'Burdisso',
          dni: '3689207',
          username: 'nburdisso',
          password: 'azulyoro',
        })
        .then((data) => {
          expect(data.statusCode).toBe(401);
          expect(data.body).toHaveProperty('message');
          expect(data.body.message).toBe('You don´t have permissions');
        });
    });
  });

  describe('LOGIN', () => {
    test('FAILED Username not found | 400', () => {
      return request(app)
        .post('/api/login')
        .send({
          username: 'user123',
          password: 'fake',
        })
        .then((data) => {
          expect(data.statusCode).toBe(400);
          expect(data.body).toHaveProperty('message');
          expect(data.body.message).toBe('The username user123 was not found');
        });
    });

    test('FAILED Incorrect Password | 400', () => {
      return request(app)
        .post('/api/login')
        .send({
          username: 'ctevez',
          password: 'fake',
        })
        .then((data) => {
          expect(data.statusCode).toBe(400);
          expect(data.body).toHaveProperty('message');
          expect(data.body.message).toBe('Incorrect password');
        });
    });

    test('Reference GET TOKEN | 200', () => {
      return request(app)
        .post('/api/login')
        .send({
          username: 'mpalermo',
          password: 'azulyoro',
        })
        .then((data) => {
          expect(data.statusCode).toBe(200);
          expect(data.body).toHaveProperty('message');
          expect(data.body.message).toBe('Login successfully');
          refferToken = data.headers['x-egg-token'];
        });
    });
  });

  describe('UPDATE PERSON', () => {
    test('Owner Account -> Your Person | 200', () => {
      return request(app)
        .put('/api/person')
        .set('x-egg-token', token)
        .send({
          personId: 1,
          name: 'Carlitos',
        })
        .then((data) => {
          expect(data.statusCode).toBe(200);
          expect(data.body).toHaveProperty('personId');
          expect(data.body.personId).toBe(1);
          expect(data.body).toHaveProperty('name');
          expect(data.body.name).toBe('Carlitos');
        });
    });

    test('Owner Account -> Your Reffer Person | 200', () => {
      return request(app)
        .put('/api/person')
        .set('x-egg-token', token)
        .send({
          personId: 2,
          name: 'Titan',
        })
        .then((data) => {
          expect(data.statusCode).toBe(200);
          expect(data.body).toHaveProperty('personId');
          expect(data.body.personId).toBe(2);
          expect(data.body).toHaveProperty('name');
          expect(data.body.name).toBe('Titan');
        });
    });

    test('Reffer Account -> Your Person | 200', () => {
      return request(app)
        .put('/api/person')
        .set('x-egg-token', refferToken)
        .send({
          personId: 2,
          name: 'Martin',
        })
        .then((data) => {
          expect(data.statusCode).toBe(200);
          expect(data.body).toHaveProperty('personId');
          expect(data.body.personId).toBe(2);
          expect(data.body).toHaveProperty('name');
          expect(data.body.name).toBe('Martin');
        });
    });

    test('Reffer Account -> Owner Person | 400', () => {
      return request(app)
        .put('/api/person')
        .set('x-egg-token', refferToken)
        .send({
          personId: 1,
          name: 'Carlos',
        })
        .then((data) => {
          expect(data.statusCode).toBe(400);
          expect(data.body).toHaveProperty('message');
          expect(data.body.message).toBe('You don´t have permissions');
        });
    });

    test('Person not exist | 400', () => {
      return request(app)
        .put('/api/person')
        .set('x-egg-token', token)
        .send({
          personId: 3,
          name: 'Fran',
        })
        .then((data) => {
          expect(data.statusCode).toBe(400);
          expect(data.body).toHaveProperty('message');
          expect(data.body.message).toBe('Person not exist');
        });
    });
  });

  describe('GET REFFER', () => {
    test('Owner Account Get Your Reffer | 200', () => {
      return request(app)
        .get('/api/referenceaccount')
        .set('x-egg-token', token)
        .then((data) => {
          expect(data.statusCode).toBe(200);
          expect(Array.isArray(data.body)).toBe(true);
          expect(data.body.length).toBe(1);
          expect(data.body[0]).toHaveProperty('username');
          expect(data.body[0].username).toBe('mpalermo');
        });
    });

    test('Reffer Account Get Your Reffer | 400', () => {
      return request(app)
        .get('/api/referenceaccount')
        .set('x-egg-token', refferToken)
        .then((data) => {
          expect(data.statusCode).toBe(400);
          expect(data.body).toHaveProperty('message');
          expect(data.body.message).toBe('Your account isn´t a referrer');
        });
    });
  });

  afterAll((done) => {
    done();
  });
});
