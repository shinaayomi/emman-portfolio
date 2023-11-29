//Data & Logic Controller
let timeCount;

const logicCtrl = (function () {
  //Data Structure
  const data = {
    score : 0,
    levels : {
      'easy' : 5,
      'medium' : 3,
      'hard' : 1,
      'default' : 2
    },
    currentLevel : null,
    isPlaying : false
  };

  return {
    setDifficulty : function (difficulty) {
      switch (difficulty) {
        case 'easy':
          data.currentLevel = data.levels.easy;
          break;
        case 'medium':
          data.currentLevel = data.levels.medium;
          break;
        case 'hard':
          data.currentLevel = data.levels.hard;
          break;
        default:
          data.currentLevel = data.levels.default;
          break;
      }
    },
    setTime : function () {
      let time = data.currentLevel;
      return time;
    },
    getRandomWord : function () {
      let randomIndex;
      fetch('/resource/words.json')
        .then((res) => res.json())
        .then((words) => {
          randomIndex = Math.floor(Math.random() * words.length);
          UICtrl.showWord(words[randomIndex]);
        });
      
      // return words[randomIndex];
      //console.log(fetchWord());
      
    },
    matchWords : function () {
      if (UICtrl.getDOMElements().wordInput.value === UICtrl.getDOMElements().currentWord.innerHTML) {
        UICtrl.getDOMElements().message.innerHTML = 'Correct!!!';
        return true;
      } else {
        UICtrl.getDOMElements().message.innerHTML = '';
        return false;
      }
    },
    setIsPlaying : function (state) {
      data.isPlaying = state
    },
    increaseScore : function () {
      data.score++;
      return data.score;
    },
    getScore: function () {
      return data.score;
    },
    startTimer : function (time) {
      timeCount = setInterval(function () {
        if (time > 0) {
          time--
        } else if (time === 0) {
          logicCtrl.setIsPlaying(false);
          clearInterval(timeCount);
          logicCtrl.gameOver();
        }
        
        UICtrl.getDOMElements().timeDisplay.innerHTML = time;
      }, 1000);
    },
    gameOver : function () {
      UICtrl.getDOMElements().wordInput.disabled = true;
      UICtrl.getDOMElements().startGameBtn.style.display = 'block';
      UICtrl.getDOMElements().startGameBtn.innerHTML = 'Play Again';
      UICtrl.getDOMElements().difficulty.disabled = false;
      UICtrl.getDOMElements().message.innerHTML = 'You Lose!';

      if(storageCtrl.getScoreFromLS() < logicCtrl.getScore()) {
        storageCtrl.saveScore(logicCtrl.getScore());
      }

      UICtrl.showHighScore();
    }
  }
})();

//UI & UX Controller
const UICtrl = (function () {
  //DOM Elements
  const DOMElements = {
    game : document.querySelector('#game'),
    startGameBtn : document.querySelector('#start-game'),
    wordInput: document.querySelector('#word-input'),
    currentWord: document.querySelector('#current-word'),
    scoreDisplay: document.querySelector('#score'),
    timeDisplay: document.querySelector('#time'),
    message: document.querySelector('#message'),
    seconds: document.querySelector('#seconds'),
    difficulty: document.querySelector('#difficulty'),
    highScore: document.querySelector('#high-score')
  }

  return {
    getDOMElements : function () {
      return DOMElements;
    },
    displayGame : function () {
      DOMElements.game.style.display = 'block';
      DOMElements.startGameBtn.style.display = 'none'
    },
    showSeconds : function () {
      DOMElements.seconds.innerHTML = logicCtrl.setTime();
    },
    hideGame : function () {
      DOMElements.game.style.display = 'none';
      DOMElements.startGameBtn.style.display = 'block'
    },
    showWord : function (word) {
      //Output Word to the DOM
      DOMElements.currentWord.innerHTML = word;
    },
    displayScore : function () {
      const newScore = logicCtrl.increaseScore();
      DOMElements.scoreDisplay.innerHTML = newScore;
    },
    showHighScore : function () {
      DOMElements.highScore.innerHTML = storageCtrl.getScoreFromLS();
    },
    showTime : function () {
      logicCtrl.setDifficulty(DOMElements.difficulty.value);
      let time = logicCtrl.setTime();
      DOMElements.timeDisplay.innerHTML = time;
    }
  }
})();

const storageCtrl = (function () {
  return {

    getScoreFromLS : function () {
    let highScore;
    if (localStorage.getItem('highScore') === null) {
      highScore = 0;
    } else {
      highScore = JSON.parse(localStorage.getItem('highScore'));
    }

    return highScore;
  },

    saveScore: function (newScore) {
      let highScore;
      if (localStorage.getItem('highScore') === null) {
        highScore = 0;
      } else {
        highScore = JSON.parse(localStorage.getItem('highScore'));
      }
      highScore = newScore;

      localStorage.setItem('highScore', JSON.stringify(highScore));
    }

  }
})();

//App Controller
const appCtrl = (function (logicCtrl, UICtrl, storageController) {
  //Get DOM Elements From UI Controller
  const DOMElements = UICtrl.getDOMElements();

  const fireEventListeners = function () {
    DOMElements.startGameBtn.addEventListener('click', launch);
    DOMElements.wordInput.addEventListener('input', startMatch);
    DOMElements.difficulty.addEventListener('change', changeTime);
  };

  //Game Launch Function
  const launch = function () {
    UICtrl.showSeconds();
    //Clear Word Input
    DOMElements.wordInput.value = '';
    //Disable Difficulty Select
    DOMElements.difficulty.disabled = true;
    //Enable Word Input
    DOMElements.wordInput.disabled = false;
    //AutoFocus Input
    DOMElements.wordInput.setAttribute('autofocus', 'autofocus');
    //Hide Play Button
    DOMElements.startGameBtn.style.display = 'none';
    //Remove You Lose Message
    DOMElements.message.innerHTML = '';

    UICtrl.displayGame();
    //Set Difficulty
    logicCtrl.setDifficulty(DOMElements.difficulty.value);
    //Display Random Word
    logicCtrl.getRandomWord()
    //Start Time
    let time = logicCtrl.setTime();
    logicCtrl.startTimer(time);
  }

  const startMatch = function () {
    let time = logicCtrl.setTime();

    if (logicCtrl.matchWords()) {
      logicCtrl.setIsPlaying(true);
      //Display New Score
      UICtrl.displayScore();
      //Clear Input
      DOMElements.wordInput.value = '';
      //Show New Word
      logicCtrl.getRandomWord();
      //Reset Time
      clearInterval(timeCount);
      logicCtrl.startTimer(time);
    }
  }

  const changeTime = function () {
    UICtrl.showTime();
  }

  return {
    init: function init() {
      UICtrl.hideGame();
      
      UICtrl.showHighScore();

      fireEventListeners();
    }
  }
})(logicCtrl, UICtrl, storageCtrl);

window.addEventListener('load', appCtrl.init);

