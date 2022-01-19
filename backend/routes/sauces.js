const express = require("express");
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

//POST:OBJ CREER
router.get("/sauces", auth, sauceCtrl.getAllSauce);
router.get("/sauces/:id", auth, sauceCtrl.getOneSauce);
router.post("/sauces", auth, multer, sauceCtrl.createSauce);
router.put("/sauces/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/sauces/:id", auth, sauceCtrl.deleteSauce);
router.post("/sauces/:id/like", auth, multer, sauceCtrl.ajouterLike);


module.exports = router;
