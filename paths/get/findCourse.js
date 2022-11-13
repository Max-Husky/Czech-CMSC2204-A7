/**
 *
 * @param {import('../../mongoSetup')} db the mongo database to use
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res The response object
 */
 module.exports = async (db, req, res) => {
    res.status(200).send(JSON.stringify((await db.model('course').find(req.body))));
  }