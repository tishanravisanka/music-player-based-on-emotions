
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('./music-player-2fab1-firebase-adminsdk-zhvs4-2d89ec21c6.json');

var userEmotion = "Happy";
var email = 'admin@gmail.com';
var myEmotion;
var userAgeType;
var songs = []; 
var songsList = [];   
var fomatedSongsList = [];                          



var Algorithmia = require("algorithmia");

var input = {
  "image": "https://cnet3.cbsistatic.com/img/gk7d6AQXuqmtPNmnZI2gMaNySyA=/970x0/2018/09/05/7274da05-85a9-4646-b41f-a4b22c597507/captain-marvel-brie-larson-1.jpg",
  "numResults": 7
};
Algorithmia.client("simrefs0uXt5Rszmey8TZeqN74v1")
  .algo("deeplearning/EmotionRecognitionCNNMBP/1.0.1") // timeout is optional
  .pipe(input)
  .then(function(response) {
    myEmotion = response.get();
  });




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();



(async ()=>{

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

  // songs=[]; 

  songsList.push({
    "age": doc.data().age,
    "emotion": doc.data().emotion,
    "link": doc.data().link,
    "singer": doc.data().singer,
    "title": doc.data().title
  });

  // songsList.push(songs);
  
});

  // recomend song bAsed on user emotion
  for (x in songsList){
    console.log(songsList[x]);
    if(songsList[x].emotion==userEmotion){
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
      if(songsList[x].age<18)
        songsList[x].age = "kid";
      else if(songsList[x].age<35)
        songsList[x].age = "young";
      else
        songsList[x].age = "old";
    }

    for (x in songsList){
      if(songsList[x].age==userAgeType){
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
    
  // console.log(fomatedSongsList);
  console.log(JSON.stringify(fomatedSongsList));

})();

// requesting recomended song list
app.get("/getSongs", function(req, res) {
  //  const { email } = req.body;  
  res.send(JSON.stringify(fomatedSongsList));

});

// requesting recomended song list
app.post("/", async(req, res) => {
  const { email } = req.body;
  return res.send(JSON.parse(email));

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


app.listen(PORT, function() {
  console.log(`Listening on Port ${PORT}`);
});


