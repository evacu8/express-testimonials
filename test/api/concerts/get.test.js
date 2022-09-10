const server = require('../../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const Concert = require('../../../models/concert.model');

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: '630b2df9b19aea3a61f4f746',
      performer: 'John Doe',
      genre: 'Rock',
      price: 25,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg',
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: '630b2df9b19aea3a61f4f747',
      performer: 'Rebekah Parker',
      genre: 'R&B',
      price: 25,
      day: 1,
      image: '/img/uploads/2f342s4fsdg.jpg',
    });
    await testConcertTwo.save();
  });

  it('/concerts should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/concerts/:id should return one concert by :id ', async () => {
    const res = await request(server).get(
      '/api/concerts/630b2df9b19aea3a61f4f747'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
    expect(res.body.performer).to.be.equal('Rebekah Parker');
  });

  it('/concerts/random should return one random concert', async () => {
    const res = await request(server).get('/api/concerts/random');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/concerts/performer/:performer should return all concerts of performer', async () => {
    const res = await request(server).get(
      '/api/concerts/performer/Rebekah_Parker'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].performer).to.equal('Rebekah Parker');
  });

  it('/concerts/genre/:genre should return all concerts of the genre', async () => {
    const res = await request(server).get('/api/concerts/genre/rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].performer).to.equal('John Doe');
  });

  it('/concerts/price/:price_min/:price_max should return all concerts within price range', async () => {
    const res = await request(server).get('/api/concerts/price/20/30');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(2);
  });

  it('/concerts/day/:day should return all concerts of the day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(2);
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
