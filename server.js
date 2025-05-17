const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/images", (req, res) => {
  const dirPath = path.join(__dirname, "public", "images");
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read image folder" });
    }
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    res.json(imageFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
