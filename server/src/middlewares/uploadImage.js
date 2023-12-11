const multer = require('multer');
const fs = require('fs');
const { host, port } = require('../../config/application');
const ServerError = require('../errors/ServerError');

const uploadImage = (destination, fileKey) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '.jpg');
    },
  });

  const upload = multer({ storage });

  return (req, res, next) => {
    upload.single(fileKey)(req, res, (err) => {
      if (err) {
        throw new ServerError();
      } else {
        if (req.file) {
          req.body[`${fileKey}Url`] =
            `http://${host}:${port}/${fileKey}/${req.file.filename}`;
        }
        next();
      }
    });
  };
};

module.exports = uploadImage;