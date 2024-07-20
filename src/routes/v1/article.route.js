const express = require("express");
const { authController, articleController } = require("../../controllers");
const media = require('../../utils/media')
const router = express.Router();


router.post("/create", media.validateFiles(),articleController.create);
router.get("/all",articleController.getAll);
router.get("/:id",articleController.getById);
router.put("/:id",articleController.updateById);
router.delete("/:id",articleController.deleteById);



module.exports = router;
