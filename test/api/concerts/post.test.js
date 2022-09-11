const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const Concert = require('../../../models/concert.model');

const expect = chai.expect;
const request = chai.request;

describe('POST /api/concerts', () => {
  it('/ should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/concerts').send({
      performer: 'John Doe',
      genre: 'Rock',
      price: 25,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg',
    });
    const newConcert = await Concert.findOne({ performer: 'John Doe' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newConcert).to.not.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
