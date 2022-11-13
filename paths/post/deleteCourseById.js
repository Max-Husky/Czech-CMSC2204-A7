/**
 *
 * @param {import('../../mongoSetup')} db the mongo database to use
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res The response object
 */
module.exports = async (db, req, res) => {
  try {
    let query = {courseID: req.body.id};

    let course = await db.model('course').deleteMany(query);
    if (!course.acknowledged || course.deletedCount === 0) {
      res.status(200).send(`No Object found`);
      return;
    }

    res.status(200).send(`Deleted ${course.deletedCount} courses`);
  } catch (err) {
    res.status(500).send('failed to delete course');
    console.debug('failed to delete course: ' + err);
  }
}
