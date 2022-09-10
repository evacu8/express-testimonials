const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concert.findOne().skip(rand);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const per = req.params.performer;
    const performer = performerTransform(per);
    const concerts = await Concert.find({ performer: performer });
    if (!concerts) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const gen = req.params.genre;
    const genre = genreTransform(gen);
    const concerts = await Concert.find({ genre: genre });
    if (!concerts) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const price_min = req.params.price_min;
    const price_max = req.params.price_max;
    const concerts = await Concert.find({
      $and: [{ price: { $gt: price_min } }, { price: { $lt: price_max } }],
    });
    if (!concerts) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const day = req.params.day;
    const concerts = await Concert.find({ day: day });
    if (!concerts) res.status(404).json({ message: 'Not found' });
    else {
      res.json(concerts);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      concert.image = image;
      await concert.save();
      return res.json(concert);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await concert.remove();
      return res.json(concert);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const performerTransform = (string) => {
  const partials = string.split('_');
  const transformed = [];
  for (let partial of partials) {
    partial.charAt(0).toUpperCase() + partial.slice(1);
    transformed.push(partial);
  }
  return transformed.join(' ');
};

const genreTransform = (string) => {
  if (string === 'r&b') {
    return string.toUpperCase();
  } else return string[0].toUpperCase() + string.slice(1);
};
