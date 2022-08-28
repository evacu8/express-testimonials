const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat_ = await Seat.findOne().skip(rand);
    if (!seat_) res.status(404).json({ message: 'Not found' });
    else res.json(seat_);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat_ = await Seat.findById(req.params.id);
    if (!seat_) res.status(404).json({ message: 'Not found' });
    else res.json(seat_);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const seat_ = await Seat.findById(req.params.id);
    if (seat_) {
      seat_.day = day;
      seat_.seat = seat;
      seat_.client = client;
      seat_.email = email;
      await seat_.save();
      return res.json(seat_);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const seat_ = await Seat.findById(req.params.id);
    if (seat_) {
      await seat_.remove();
      return res.json(seat_);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
