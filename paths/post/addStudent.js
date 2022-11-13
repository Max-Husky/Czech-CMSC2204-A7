/**
 *
 * @param {import('../../mongoSetup')} db the mongo database to use
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res The response object
 */
module.exports = async (db, req, res) => {
  try {
    let student = new (db.model('student'))(req.body);
    await student.save();
    res.status(200).send('Added student: ' + student.fname + ' ' + student.lname);
  } catch (err) {
    res.status(500).send('failed to add student');
    console.debug('failed to add student: ' + err);
  }
}
