const { get } = require('./tests');

const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    res.send(await Student.findAll());
  } catch (err) { next(err) }
});

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
    res.status(201).send(newStudent);
  } catch(err) { next(err) }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const matchingStudent = await Student.findById(id);
    if (!matchingStudent) res.sendStatus(404);
    else {
      res.send(matchingStudent);
    }
  } catch (err) { next(err) }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const matchingStudent = await Student.findById(id);
    const update = await matchingStudent.update(req.body);
    res.send(update);
  } catch (err) { next(err) }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const matchingStudent = await Student.findById(id);
    if (!matchingStudent) res.sendStatus(404);
    else {
      await matchingStudent.destroy();
      res.sendStatus(204);
    }
  } catch(err) { next(err) }
});

module.exports = router;
