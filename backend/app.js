const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/user");
const sauceRoutes = require('./routes/sauces');



const app = express();
app.use(express.json());
app.use(cors());



// MONGODB CONNECT
mongoose
  .connect(
    "mongodb+srv://Hot_Takes:sasa@cluster0.b58ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));



//
//  SAUCES
// 

// app.get("/api/sauces", (req, res) => {
//   const sauces = [
//     {
//       userId: "O2_test",
//       name: "piq02",
//       manufacturer: "entreprise01",
//       description: "ca pic",
//       mainPepper: "color red",
//       imageUrl:"https://www.asiamarche.fr/1988-large_default/sauce-pimentee-sriracha-150g-coq.jpg ",
//       heat: 10
//       // likes: 1
//       // dislikes: 0,
//       // usersLiked: 'usersLiked',
//       // usersDisliked: 'usersDisliked'
//     }
//   ];
//   res.status(200).json(sauces);
// });

app.use("/api/auth", userRoutes);
app.use('/api', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;
