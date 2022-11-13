/**
 *
 * @param {import('../../mongoSetup')} db the mongo database to use
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res The response object
 */
module.exports = async (db, req, res) => {
  try {
    let query = {studentID: req.body.id},
        update = {courses: []};

    let student = await db.model('student').updateMany(query, update);
    if (!student.acknowledged || student.matchedCount === 0) {
      res.status(200).send(`Student: ${query.studentID} Not Found.`);
      return;
    }

    res.status(200).send(`Rmoved student from all classes`);
  } catch (err) {
    res.status(500).send('failed to remove classes from the student');
    console.debug('failed to remove classes from student: ' + err);
  }
}