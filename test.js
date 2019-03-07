const server = require('./server');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('profile actions', () => {
  let id = 34;
  let name = Math.random().toString(36).substring(7);
  let password = Math.random().toString(36).substring(10);
  it('it should POST register', () => {
    chai.request(server)
    .post('/register')
    .send({
      "name": name,
      "email": name + "@gmail.com",
      "password": password
    })
    .end((err, res) => {
      res.body.should.be.a('object');
      id = res.body.id;
    });
  })
  it('it should GET profile', () => {
    chai.request(server)
    .get('/profile/'+id)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      });
  });
  // it('it should DELETE user', () => {
  //   chai.request(server)
  //   .delete('/profile/'+ )
  //   .end((err, res) => {
  //     res.should.have.status(200);
  //   });
  // })
});