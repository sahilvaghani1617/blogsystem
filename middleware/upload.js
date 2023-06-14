const multer = require("multer");
const AVATAR_PATH = ("/uploads/user");
const path = require("path")

console.log("-------------------multer----------------------")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH))
  },
  filename: function (req, file, cb) {
    console.log(req.file);
    const ext = file.mimetype.split("/")[1];   /* fileinextensionconvert jpg,png other*/
    cb(null, `${file.fieldname} - ${Date.now()}.${ext}`)
  }

})


const upload = multer({ storage: storage }).single('image');

module.exports = { upload }