/**
 *
 * @param {import('../../mongoSetup')} db the mongo database to use
 * @param {import('express').Request} req the request object
 * @param {import('express').Response} res The response object
 */
module.exports = async (db, req, res) => {
  try {
    let query = {fname: req.body.queryFname},
        update = {fname: req.body.fname, lname: req.body.lname};

    let student = await db.model('student').updateMany(query, update);
    if (!student.acknowledged || student.matchedCount === 0) {
      res.status(200).send(`Student: ${query.fname} Not Found.`);
      return;
    }

    res.status(200).send(`Updated ${student.modifiedCount} student's names to: ${update.fname} ${update.lname}`);
  } catch (err) {
    res.status(500).send('failed to edit students name');
    console.debug('failed to edit students name: ' + err);
  }
}

