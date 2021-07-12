const formidable = require("formidable");
const fs = require("fs");

const Work = require("../models/workModel");

exports.createWork = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "image could not be uploaded",
      });
    }

    let newWork = new Work(fields);

    if (files.image) {
      newWork.image.data = fs.readFileSync(files.image.path);
      newWork.image.contentType = files.image.type;
    }

    newWork.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: "server error",
        });
      }

      res.status(200).json(result);
    });
  });
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
