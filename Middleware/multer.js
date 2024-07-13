const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalname = file.originalname;
    cb(null, `${uniqueSuffix}-${originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
