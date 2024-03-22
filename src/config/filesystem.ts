import multer from "multer";

const filesystem = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 500 * 1024 * 1024,
        files: 5,
    },
}).fields([]);

export default filesystem