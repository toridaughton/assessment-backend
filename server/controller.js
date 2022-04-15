const  games = require(`./database.json`);
let gamesID = 10;

module.exports = {
    getGames: (req, res) => {
        res.status(200).send(games)
    }, 

    deleteGames: (req, res) => {
        let index = games.findIndex(element => element.id === +req.params.id)
        games.splice(index, 1)
        res.status(200).send(games)
    },

    createGame: (req, res) => {
        const {system, title, rating, imageURL} =req.body;
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
        if(type === `minus` && games[index].rating > 0){
            games[index].rating -= 1;
            res.status(200).send(games)
        }else if(type === `plus` && games[index].rating < 5){
            games[index].rating += 1;
            res.status(200).send
        }else{
           res.status(400).send(`Uh-oh, an error occurred`)
        }
    }




}