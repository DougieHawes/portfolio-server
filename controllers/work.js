const Work = require("../models/workModel");

exports.createWork = async (req, res) => {
  const { title, siteLink, codeLink, description, date } = req.body;

  try {
    const newWork = new Work({
      title,
      siteLink,
      codeLink,
      description,
      date,
    });

    const work = await newWork.save();

    res.json(work);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};

exports.getWorks = async (req, res) => {
  try {
    const works = await Work.find().sort({ date: -1 });
    res.json(works);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};
