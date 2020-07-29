let questions = [
  {
    "question": "What is the planet we are living",
    "correct_answer": "Earth",
    "answers": [
      "Earth",
      "Mars",
      "Pluto",
      "Juniper"
    ]
  },
  {
    "question": "What is the tennis player in the world",
    "correct_answer": "Rafael Nadal",
    "answers": [
      "Roger Federer",
      "Rafael Nadal",
      "Novak Djokovic",
      "David Ferrer"
    ]
  },
  {
    "question": "What is the weather like today",
    "correct_answer": "Sunny",
    "answers": [
      "Rainy",
      "Cloudy",
      "Windy",
      "Sunny"
    ]
  },
  {
    "question": "Who invented the phone?",
    "correct_answer": "Graham Bell",
    "answers": [
      "Thomas Edison",
      "Graham Bell",
      "George Washington",
      "Richard Nixon"
    ]
  },
  {
    "question": "Which city is Statue of Liberty located?",
    "correct_answer": "New York",
    "answers": [
      "New York",
      "Paris",
      "Wakanda",
      "San Francisco"
    ]
  },
  {
    "question": "Whose citadel is Budapest?",
    "correct_answer": "Turkey",
    "answers": [
      "Hungary",
      "Turkey",
      "Romania",
      "Latvia"
    ]
  },
  {
    "question": "When is the United States of America established?",
    "correct_answer": "1776",
    "answers": [
      "1776",
      "1885",
      "1932",
      "1650"
    ]
  },
  {
    "question": "Which fruit has a lot of vitamin C?",
    "correct_answer": "Orange",
    "answers": [
      "Banana",
      "Melon",
      "Orange",
      "Watermelon",
    ]
  },
  {
    "question": "Is Tesla the most promising market stock in the world?",
    "correct_answer": "True",
    "answers": [
      "True",
      "False"
    ]
  },
  {
    "question": "How many fingers in a person's hand?",
    "correct_answer": "5",
    "answers": [
      "10",
      "20",
      "5",
      "15"
    ]
  }
]

let currentIndex = 0
let score = 0
let seconds = 60
let timer

const newQuestion = () => {

  document.getElementById('question').textContent = questions[currentIndex].question
  let answers = questions[currentIndex].answers

  document.getElementById('answers').innerHTML = ''
  for (let i = 0; i < answers.length; i++) {
    let answerElem = document.createElement('button')
    answerElem.className = 'answer btn btn-secondary btn-lg'
    answerElem.dataset.answer = answers[i]
    answerElem.textContent = answers[i]

    document.getElementById('answers').append(answerElem)
  }
}

const getAnswer = answer => {
  if (answer === questions[currentIndex].correct_answer) {
    score++
    document.getElementById('score').textContent = score
    let resultElem = document.createElement('div')
    resultElem.className = 'alert alert-success'
    resultElem.textContent = 'Correct Answer'
    document.getElementById('answers').append(resultElem)
  } else {
    let resultElem = document.createElement('div')
    resultElem.className = 'alert alert-danger'
    resultElem.textContent = 'Incorrect Answer'
    document.getElementById('answers').append(resultElem)
  }

  currentIndex++

  setTimeout(() => {
    if (currentIndex < questions.length) {
      newQuestion()
    } else {
      endGame()
    }
  }, 1000)
}

const endGame = () => {
  /
  document.getElementById('quiz').innerHTML = `
    <h1 class="display-2">Game Over!</h1>
  <p class="display-4">Your final score is: ${score}</p>
  <hr class="my-4">
  <p>Please enter a username for the leaderboard</p>
  <form>
    <div class="form-group">
      <label for="username">username</label>
      <input type="text" class="form-control" id="username"> // input the name of the user
      <button id="submitScore" class="btn btn-primary">Submit</button>
    </div>
  </form>
  `

}

const submitScore = submission => {
  console.log(submission)

  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []

  leaderboard.push(submission)

  localStorage.setItem('leaderboard', JSON.stringify(leaderboard))

  leaderboard.sort((a, b) => {
    return b.score - a.score
  })

  let tableElem = document.createElement('table')
  tableElem.className = 'table'
  tableElem.innerHTML = `
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">username</th>
        <th scope="col">score</th>
      </tr>
    </thead>
  `

  let bodyElem = document.createElement('tbody')

  for (let i = 0; i < leaderboard.length; i++) {
    let rowElem = document.createElement('tr')
    rowElem.innerHTML = `
      <th scope="row">${i + 1}</th>
      <td>${leaderboard[i].username}</td>
      <td>${leaderboard[i].score}</td>
    `
    bodyElem.append(rowElem)
  }

  tableElem.append(bodyElem)

  document.getElementById('quiz').append(tableElem)

}

document.getElementById('startQuiz').addEventListener('click', () => {

  timer = setInterval(() => {
    seconds--
    document.getElementById('time').textContent = seconds

    if (seconds <= 0) {
      clearInterval(timer)
      endGame()
    }
  }, 1000)

  newQuestion()
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('answer')) {
    getAnswer(event.target.dataset.answer)
  } else if (event.target.id === 'submitScore') {
    event.preventDefault()
    submitScore({
      username: document.getElementById('username').value,
      score: score
    })
  }
})