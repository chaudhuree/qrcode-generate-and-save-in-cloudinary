const express = require("express");
const app = express();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const port = 3000;

// setup cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
// function to upload image to cloudinary
const uploadImage = async (data) => {
  try {
    const cloudinaryUrl = cloudinary.url(`qr-codes-folder/${data}`);
    return cloudinaryUrl;
  } catch (error) {
    return error;
  }
};

/**
 * for adding extra transformations
 * const cloudinaryUrl = cloudinary.url(`qr-codes-folder/${data}`, {
      transformation: [
        { effect: "make_transparent" },
        { effect: "replace_color:yellow" },
        { background: "black" },
        { effect: "vectorize", fetch_format: "svg" },
      ],
    });
 */
app.get("/", (req, res) => {
  res.send("Hello chaudhuree!");
});

// api to generate qr code and save in cloudinary
app.get("/generate-qr-code", async (req, res) => {
  try {
    const { data } = req.query;
    const cloudinaryUrl = await uploadImage(data);
    res.status(200).json({ imageUrl:cloudinaryUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
