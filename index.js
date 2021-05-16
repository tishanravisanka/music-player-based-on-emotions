
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('./music-player-2fab1-firebase-adminsdk-zhvs4-2d89ec21c6.json');

var userEmotion = "Happy";
var userAgeType;

var songs = []; 
var songsList = [];   
var fomatedSongsList = [];                          

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

// })();

// requesting recomended song list
app.post("/getSongs", async (req, res) => {
  // const { email } = req.body;
  // const { emotion } = req.body;
  email = "new@gmail.com";


  // getting data from firestore database
  const UsersSnapshot = await db.collection('Users').get();
  const MusicSnapshot = await db.collection('Music').get();
  
  // get currentt user data
  UsersSnapshot.forEach((doc) => {
    if(doc.id == email){
      gender = doc.data().gender;
      userAge = doc.data().age;
    } 
  });
  
  // add songs to a array of dictionary
  MusicSnapshot.forEach((doc) => {
  
    songs=[]; 
  
    songs.push({
      key:   "age",
      value: doc.data().age
    });
  
    songs.push({
      key:   "emotion",
      value: doc.data().emotion
    });
  
    songs.push({
      key:   "link",
      value: doc.data().link
    });
  
    songs.push({
      key:   "singer",
      value: doc.data().singer
    });
  
    songs.push({
      key:   "title",
      value: doc.data().title
    });
    songsList.push(songs);
    
  });
  
    // recomend song bAsed on user emotion
    for (x in songsList){
      if(songsList[x][1].value==userEmotion){
        fomatedSongsList.push(songsList[x]);
        songsList.pop(songsList[x]);
        x--;
      }
  
  
    }
    // music recomand based on age
    if(songsList.length!=0){
      // catogorize songs based on recomended age
      if(userAge<18)
       userAgeType = "kid";
      else if(userAge<35)
       userAgeType = "young";
      else
        userAgeType = "old";
  
      for (x in songsList){
        // catogarize user based on age
        if(songsList[x][0].value<18)
          songsList[x][0].value = "kid";
        else if(songsList[x][0].value<35)
          songsList[x][0].value = "young";
        else
          songsList[x][0].value = "old";
      }
  
      for (x in songsList){
        if(songsList[x][0].value==userAgeType){
          fomatedSongsList.push(songsList[x]);
          songsList.pop(songsList[x]);
        }
        
      }
  
    }
  
    // add remainng songs
    if(songsList.length!=0){
      for (x in songsList){
        fomatedSongsList.push(songsList[x]);
      }
    }
      
    console.log(fomatedSongsList);
  



  res.send(fomatedSongsList);

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

app.listen(PORT, function() {
  console.log(`Listening on Port ${PORT}`);
});


