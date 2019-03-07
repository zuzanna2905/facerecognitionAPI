const server = require('./server');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

let mockId = 34;
let mockName = Math.random().toString(36).substring(7);
let mockPassword = Math.random().toString(36).substring(10);
let mockName2 = 'Ala';
let mockPassword2 = 'aladyn';
let mockUrl = 'https://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg';

describe('profile actions', () => {
  describe('register', () => {
  it('it should POST register', () => {
    chai.request(server)
    .post('/register')
    .send({
      "name": mockName,
      "email": mockName + "@gmail.com",
      "password": mockPassword
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
    });
  })  
  it('it should not POST register with error dupplicate', () => {
    chai.request(server)
    .post('/register')
    .send({
      "name": mockName,
      "email": mockName + "@gmail.com",
      "password": mockPassword
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.to.equal('unable to register');
    });
  })  
  it('it should not POST register with error uncomplited all data', () => {
    chai.request(server)
    .post('/register')
    .send({
      "name": '',
      "email": '',
      "password": ''
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.to.equal('incorrect form submission');
    });
  });  
  it('it should not POST register with error uncomplited some data', () => {
    chai.request(server)
    .post('/register')
    .send({
      "name": mockName,
      "email": '',
      "password": mockPassword
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.to.equal('incorrect form submission');
    });
  });
  });
  describe('profile', () => {
  it('it should GET profile', () => {
    chai.request(server)
    .get('/profile/'+mockId)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      });
  });
  it('it should not GET profile with wrong ID', () => {
    const mockBigID = 1000000000000;
    chai.request(server)
    .get('/profile/'+mockBigID)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.to.equal('error getting user');
      });
  });
  it('it should not GET profile with worng ID url', () => {
    const mockUrlID = '-10d0';
    chai.request(server)
    .get('/profile/'+mockUrlID)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.to.equal('error getting user');
      });
  });
  });
  describe('signin', () => {
  it('it should POST signin', () => {
    chai.request(server)
    .post('/signin')
    .send({
      "email": mockName2 + "@gmail.com",
      "password": mockPassword2
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
    });
  });
  it('it should not POST signin with wrong credentials', () => {
    chai.request(server)
    .post('/signin')
    .send({
      "email": mockName2 + "@gmail.com",
      "password": mockPassword2 + 'hsjdhsjdh'
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.to.equal('wrong credentials');
    });
  });
  it('it should not POST signin with uncomplitted data', () => {
    chai.request(server)
    .post('/signin')
    .send({
      "email": mockName2 + "@gmail.com",
      "password": ''
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.to.equal('incorrect form submission');
    });
  });
  });
});

describe('images actions', () => {
  it('it should PUT new image', () => {
    chai.request(server)
    .put('/image')
    .send({
      "id": mockId
    })
    .end((err, res) => {
      res.should.have.status(200);
    });
  });  
  it('it should not PUT new image with wrong id', () => {
    chai.request(server)
    .put('/image')
    .send({
      "id": "dsjbu76f78d778"
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.to.equal('unable to get entries');
    });
  });  
  it('it should POST new image', () => {
    chai.request(server)
    .post('/imageurl')
    .send({
      "input": mockUrl
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
    });
  });
  it('it should not POST new image with empty url', () => {
    chai.request(server)
    .post('/imageurl')
    .send({
      "input": ''
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.to.equal('unable to get work');
    });
  });
});