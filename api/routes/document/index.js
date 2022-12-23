const express = require("express");
const router = express.Router();
const DocumentsController = require("../../controllers/document.controller");
const checkLogin = require("../../middleware/auth");
const upload = require("../../middleware/upload");
module.exports = () => {
  router.post(
    "/documents/create",
    checkLogin,
    upload.single("image"),
    DocumentsController.addOneDocument
  );
  router.get("/documents/:id", DocumentsController.getOneDocumentById);
  router.get("/documents", DocumentsController.getDocuments);
  router.put(
    "/documents/edit/:id",
    checkLogin,
    DocumentsController.updateOneDocument
  );
  router.delete(
    "/documents/delete/:id",
    checkLogin,
    DocumentsController.deleteOneDocument
  );
  router.get(
    "/documents/user/:id",
    checkLogin,
    DocumentsController.getDocumentsOfUser
  );
  return router;
};
