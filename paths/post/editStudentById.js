/**
 *
 * @param {import('../../mongoSetup')} db the mongo database to use
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res The response object
 */
module.exports = async (db, req, res) => {
  try {
    let query = {studentID: req.body.id},
        update = {fname: req.body.fname};

    let student = await db.model('student').updateOne(query, update);
    if (!student.acknowledged || student.matchedCount === 0) {
      res.status(200).send(`Student id: ${req.body.id} Not Found.`);
      return;
    }

    res.status(200).send(`Updated student's (${query.studentID}) name to: ${update.fname}`);
  } catch (err) {
    res.status(500).send('failed to edit student first name');
    console.debug('failed to edit student first name: ' + err);
  }
}
