const Document = require("../models/document.model");
const cloudinary = require("../utils/cloudinary");

exports.getOneDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).send("document not found");
    }
    res
      .status(200)
      .send({ message: "document retreived with success", data: document });
  } catch (err) {
    res.status(err.status || 500).send(err.message || "something went wrong");
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res
      .status(200)
      .send({ message: "documents retreived successfully", data: documents });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addOneDocument = async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host"); // => "http://localhost:4000"
    // ! the link for the post image is "http://localhost:4000/uploads/name"
    const { title, author, pages, price, ownerId } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    const document = new Document({
      title,
      author,
      pages,
      price,
      image: result.secure_url,
      cloudinary_id: result.public_id,
      ownerId: ownerId,
    });
    // saving our new created instances
    const savedDocument = await document.save();
    res
      .status(201)
      .send({ message: "document created with success", data: savedDocument });
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong while adding a document");
  }
};

exports.updateOneDocument = async (req, res) => {
  try {
    if (req.file) {
      const { title, author, pages, price } = req.body;
      let d = await Document.findOne({ _id: req.params.id });
      await cloudinary.uploader.destroy(d.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path);
      const url = req.protocol + "://" + req.get("host");
      const document = await Document.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title,
          author: author,
          pages: pages,
          price: price,
          image: result.secure_url,
          cloudinary_id: result.public_id,
        },
        { new: true, useFindAndModify: false }
      );
      res
        .status(200)
        .send({ message: "document updated with success", data: document });
    } else {
      const { title, author, pages, price } = req.body;
      let document = await Document.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          title,
          author,
          pages,
          price,
        },
        { new: true, useFindAndModify: false }
      );
      res
        .status(200)
        .json({ message: "document updted with success", data: document });
    }
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong while updating document");
  }
};

exports.deleteOneDocument = async (req, res) => {
  try {
    // console.log(req.params.id);
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).send("document not found");
    }

    await cloudinary.uploader.destroy(document.cloudinary_id);
    await Document.findByIdAndDelete(req.params.id);
    res.status(200).send("document deleted");
  } catch (err) {
    res
      .status(err.status || 500)
      .send(err.message || "something went wrong while updating document");
  }
};

exports.getDocumentsOfUser = async (req, res) => {
  try {
    const documents = await Document.find({ ownerId: req.params.id });
    if (!documents) {
      return res.status(404).send({ message: "You have no documents" });
    }
    res
      .status(200)
      .send({ message: "documents retreived successfully", data: documents });
  } catch (err) {
    res.status(err.message || 500).send(err.message || "message");
  }
};
