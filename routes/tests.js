const router = require('express').Router();
const Test = require('../db/models/test');

router.get('/', async (req, res, next) => {
  try {
    res.send(await Test.findAll());
  } catch(err) { next(err) }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    res.send(await Test.findById(id));
  } catch (err) { next(err) }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const newTest = await Test.create({
      subject: req.body.subject,
      grade: req.body.grade,
      studentId: studentId
    });
    res.status(201).send(newTest);
  } catch(err) { next(err) }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const matchingTest = await Test.findById(id);
    if (!matchingTest) res.sendStatus(404);
    else {
      await matchingTest.destroy();
      res.sendStatus(204);
    }
  } catch (err) { next(err) }
});

module.exports = router;
