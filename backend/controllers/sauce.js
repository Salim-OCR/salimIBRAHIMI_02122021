const Sauce = require("../models/Sauce");
const fs = require("fs");

//GET Toutes les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//GET ID d'une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//POST Créé une sauce
exports.createSauce = (req, res, next) => {
  console.log(req.body.sauce);
  const sauceObjet = JSON.parse(req.body.sauce);
  console.log(sauceObjet);

  const sauce = new Sauce({
    ...sauceObjet,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    // likes:0,
    // dislikes:0,
    // usersLiked: [],
    // usersDisliked: []
  });
  sauce
    .save()
    .then(() =>
      res.status(201).json({ message: "Objet enregistré !", image: "File" })
    )
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

//MODIFIER une sauce + id + image
exports.modifySauce = (req, res, next) => {
  const sauceObjet = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObjet, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

//DELETE une
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//POST LIKES
exports.ajouterLike = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((postLikes) => {
      switch (req.body.like) {
        case 1:
          if (!postLikes.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
              .then(() =>res.status(200).json({ message: "Likes modifié = +1 !" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case -1:
          if (!postLikes.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id },
              {$inc: { dislikes: 1 },$push: { usersDisliked: req.body.userId }})
              .then(() => res.status(200).json({ message: "disLikes modifié = +1 !" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case 0:
          if (!postLikes.Sauce.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id },
              { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
              .then(() => res.status(200).json({ message: "Likes modifié = 0 !" }))
              .catch((error) => res.status(400).json({ error }));
          };

          if (!postLikes.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {$inc: { dislikes: -1 },$pull:{ usersDisliked: req.body.userId }})
              .then(() => res.status(200).json({ message: "disLikes modifié = 0 !" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
