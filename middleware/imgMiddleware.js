import fs from "fs";

export const imgMiddleware = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "Жодного файлу не вибрано!" });
    }
    let files = Object.values(req.files).flat();
    for (const file of files) {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);
        return res
          .status(400)
          .json({
            message: "Формат файлу невірний, дозволено лише jpeg/png/webp",
          });
      }
      if (file.size > 1024 * 1024 * 10) {
        removeTmp(file.tempFilePath);
        return res
          .status(400)
          .json({ message: "Максимальний дозволений розмір файлу 10 мбайт" });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};
