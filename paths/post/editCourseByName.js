/**
 *
 * @param {import('../../mongoSetup')} db the mongo database to use
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res The response object
 */
 module.exports = async (db, req, res) => {
  try {
    let query = {courseName: req.body.courseName},
        update = {courseInstructor: req.body.instructorName};

    let course = await db.model('course').updateMany(query, update);
    if (!course.acknowledged || course.matchedCount === 0) {
      res.status(200).send(`Course: ${query.courseName} Not Found.`);
      return;
    }

    res.status(200).send(`Updated course's instructor to: ${update.courseInstructor}`);
  } catch (err) {
    res.status(500).send('failed to edit course instructor');
    console.debug('failed to edit course instructor: ' + err);
  }
}

