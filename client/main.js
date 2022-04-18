const gamesContainer = document.getElementById(`games-container`)
const form = document.querySelector(`form`)

// const baseURL = `http://localhost:4000/api`

const gamesCallback = ({data: games}) => displayGames(games)
const errCallback = err => console.log(err.response.data)

const getAllGames = () => {
    axios.get(`http://localhost:4000/api/games/`)
    .then(gamesCallback)
    .catch(errCallback)
}

const deleteGame = (id) => {
    axios.delete(`http://localhost:4000/api/games/${id}`)
    .then(gamesCallback)
    .catch(errCallback)
}


const createGame = (body) => {
    axios.post(`http://localhost:4000/api/games/`, body)
    .then(gamesCallback)
    .catch(errCallback)
}


const updateGame = (id, type) => {
    axios.put(`http://localhost:4000/api/games/${id}`, {type})
    .then(gamesCallback)
    .catch(errCallback)
}

const submitHandler = (event) => {
    event.preventDefault()

    let title = document.getElementById(`title`)
    let rating = document.querySelector(`input[name="ratings"]:checked`)
    let imageURL = document.getElementById(`image`)

    let bodyObj = {
        title: title.value,
        rating: rating.value,
        imageURL: imageURL.value
    }

    createGame(bodyObj)

    title.value = ``
    rating.checked = false
    imageURL.value = ``
} 


const createGameCard = (game) => {
    const gameCard = document.createElement('div')
    gameCard.classList.add(`game-card`)


    gameCard.innerHTML = `<img alt='game cover' src=${game.imageURL} class='game-cover'/>
    <p class ='game-title'>${game.title}</p>
    <p class='game-system'>${game.system}</p>
    <div class="btns-container">
        <button id="minus-button" onclick="updateGame(${game.id}, 'minus')"> - </button>
        <p class="game-rating">${game.rating} stars </p>
        <button id="plus-button" onclick="updateGame(${game.id}, 'plus')"> + </button>
    </div>
    <button id="delete-button" onclick="deleteGame(${game.id})"> delete </button>`

    gamesContainer.appendChild(gameCard)

} 


const displayGames = arr => {
    gamesContainer.innerHTML = ``
    for(let i = 0; i < arr.length; i++){
        createGameCard(arr[i])
    }
}



form.addEventListener(`submit`, submitHandler)

getAllGames()




document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
    .then(function (response) {
        const data = response.data;
        alert(data);
    });
};


document.getElementById('fortuneButton').onclick = function () {
    axios.get(`http://localhost:4000/api/fortune/`)
    .then((res) => {
        const fortune = res.data;
        alert(fortune);
    })
}



//   fortuneButton.addEventListener(`click`, fortuneTeller)