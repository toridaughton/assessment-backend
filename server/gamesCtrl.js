
//obtaining the games' info from the database created
const  games = require(`./database.json`);

// Allowing for adjustment in index for added & deleted games:
let gamesID = games[games.length - 1] +1;

module.exports = {
    getGames: (req, res) => {
        res.status(200).send(games)
    }, 

    deleteGame: (req, res) => {
        // finding the index of the desired game (to delete):
        let index = games.findIndex(element => element.id === +req.params.id)
        //updaing the games array with splice method. Splice takes two params: first is at the index for the correct game, second how many we are deleting(1)
        games.splice(index, 1)
        // sending the response with the status of "okay" along with updated games info
        res.status(200).send(games)
    },

    createGame: (req, res) => {
        const {system, title, rating, imageURL} = req.body;
        let newGame = {
            id: gamesID,
            system,
            title,
            rating,
            imageURL
        }
        games.push(newGame);
        res.status(200).send(games)
        gamesID++;
    },

    updateGame: (req, res) => {
        const {id} = req.params;
        const {type} = req.body;
        let index = games.findIndex(element => element.id === +req.params.id)

        if(type === `minus` && games[index].rating > 1){
            games[index].rating -= 1;
            res.status(200).send(games)
        }else if(type === `plus` && games[index].rating < 5){
            games[index].rating += 1;
            res.status(200).send(games)
        }else{
           res.status(400).send(`Uh-oh, an error occurred`)
        }
      }
   }