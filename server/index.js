const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.


const{getGames, deleteGames, createGame, updateGame} = require(`./controller`)


app.get(`/api/video-games`, getGames);


app.delete(`/api/video-games`, deleteGames);

app.get(`/api/video-games`, createGame);

app.get(`/api/video-games`, updateGame);






app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});


app.get(`/api/fortune`, (req, res) => {
  const fortunes = [`A pleasant surprise is waiting for you.`,
            `Believe it can be done.`,
            `Your mind is your greatest asset.`,
            `The greatest achievement in life is to stand up again after falling.`,
            `Go take a rest; you deserve it.`
]

let randomIndexTwo = Math.floor(Math.random() * fortunes.length)
let randomFortune = fortunes[randomIndexTwo]

res.status(200).send(randomFortune)

});


app.listen(4000, () => console.log("Server running on 4000"));


// compliments, fortunes,