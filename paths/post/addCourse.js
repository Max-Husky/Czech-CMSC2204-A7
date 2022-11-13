/**
 *
 * @param {import('../../mongoSetup')} db the mongo database to use
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res The response object
 */
module.exports = async (db, req, res) => {
  try {
    let course = new (db.model('course'))(req.body);
    await course.save();
    res.status(200).send('Added course: ' + course.courseName);
  } catch (err) {
    res.status(500).send('failed to add course');
    console.debug('failed to add course: ' + err);
  }
}
