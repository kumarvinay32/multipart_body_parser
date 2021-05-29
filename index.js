const multer = require("multer");
const normalized_file_name = (file_name) => {
    let f_part = (file_name || "").split(".");
    let ext = "";
    if (f_part.length > 1) {
        ext = f_part[f_part.length - 1].trim().toLowerCase();
        delete f_part[f_part.length - 1];
    }
    file_name = f_part.join(" ").replace(/[^A-Za-z 0-9_]/g, " ").trim().replace(/[ ]+/g, "_").toLowerCase();
    if (ext) {
        file_name += "." + ext;
    }
    return file_name;
}
module.exports = multipart_body_parser;
function multipart_body_parser(req, res, next) {
    let upload = multer({
        storage: multer.memoryStorage()
    }).any();
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            next(new Error("Unable to handle multipart form data."));
        } else if (err) {
            next(err);
        } else {
            if (!req.body) {
                req.body = {};
            }
            for (const k in req.files) {
                let f = req.files[k];
                if (!Object.hasOwnProperty.call(req.body, f.fieldname)) {
                    req.body[f.fieldname] = [];
                }
                req.body[f.fieldname].push({
                    file_name: normalized_file_name(f.originalname),
                    encoding: f.encoding,
                    mimetype: f.mimetype,
                    size: f.size,
                    buffer: f.buffer
                });
            }
            delete req.files;
            next();
        }
    });
}