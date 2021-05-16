
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
const admin = require('firebase-admin');

const serviceAccount = require('./music-player-2fab1-firebase-adminsdk-zhvs4-2d89ec21c6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// const docRef = db.collection('uers').doc('alovelace');

// (async ()=>{
// await docRef.set({
//   first: 'Ad',
//   last: 'Lovelace',
//   born: 1815
// });
// })();


// (async ()=>{
// const snapshot = await db.collection('Users').get();
// snapshot.forEach((doc) => {
//   // console.log(doc.id, '=>', doc.data());
// });
// })();

app.get("/", function(req, res) {
  //when we get an http get request to the root/homepage
  res.send("Hello World");
});




// app.post("/getSongs", async (req, res) => {
//   const { email } = req.body;
//   console.log(email);

//   let user = await User.findOne({ email });
//   console.log(user);
//   if (!user) {
//     return res.json({ msg: "no user found with that email" });
//   }
  

//   var token = jwt.sign({ id: user.id }, "password");
//   return res.json(user);
// });







// // // db
// // // mongodb://<dbuser>:<dbpassword>@ds049558.mlab.com:49558/auth
// // // async function connectDB() {
// // //   await mongoose.connect(
// // //     "mongodb+srv://chatAuth:chatAuth00@cluster0.horu0.mongodb.net/users?retryWrites=true&w=majority",
// // //     { useUnifiedTopology: true, useNewUrlParser: true }
// // //   );

// // //   console.log("db connected");
// // // }
// // // connectDB();

// // this takes the post body
// app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.send("Hello World!"));
// //model
// // var schema = new mongoose.Schema({ email: "string", password: "string" });
// // var User = mongoose.model("User", schema);
// // signup route api
// app.post("/signup", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email);
//   console.log(password);
  
//   let user = await User.findOne({ email });

//   if (user) {
//     return res.json({ msg: "Email already taken" });
//   }

//    user = new User({
//     email,
//     password,
//   });
//   console.log(user);

//   await user.save();
//   var token = jwt.sign({ id: user.id }, "password");
//   res.json({ token: token });
// //   res.json({ token: "1234567890" });
//   // check db for email if email say the email is already taken
//   //   return res.send("Signup api route");
// });
// // login route api
// app.post("/find", async (req, res) => {
//   const { email } = req.body;
//   console.log(email);

//   let user = await User.findOne({ email });
//   console.log(user);
//   if (!user) {
//     return res.json({ msg: "no user found with that email" });
//   }
  

//   var token = jwt.sign({ id: user.id }, "password");
//   return res.json(user);
// });
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     console.log(email);
  
//     let user = await User.findOne({ email });
//     console.log(user);
//     if (!user) {
//       return res.json({ msg: "no user found with that email" });
//     }
//     if (user.password !== password) {
//       return res.json({ msg: "password is not correct" });
//     }
  
//     var token = jwt.sign({ id: user.id }, "password");
//     return res.json({ token: token });
//   });
// app.listen(5000, () => console.log("Example app listening on port 5000!"));