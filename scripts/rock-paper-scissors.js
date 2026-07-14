const moves = ['✊', '🖐️', '✌️'];
const playerMove = {
  human: '',
  computer: ''
};
const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || {
  result_list: [],
  move_list: []
};


const score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  losses: 0,
  tie: 0
};

const history_tracker = JSON.parse(localStorage.getItem('historyTracker')) || {
  list_length: 0,
  tot_index: 0,
  cur_index: 0,
  len_index:0
};

let autoInterval;


function play(){
  playerMove.computer = pickComputerMove();
  let result = checkGameRules();
  showResult(result);
  addResultToList(result)
  setStaticValues();
  results();
  showIndex();
}

function pickComputerMove(){
  return moves[Math.floor(Math.random()*moves.length)];
}

function checkGameRules(){
  let result;
  if (playerMove.human === playerMove.computer){
    result = 'Tied';
    score.tie++;
  }
  else if ((playerMove.human === moves[0] && playerMove.computer === moves[2]) || (playerMove.human === moves[1] && playerMove.computer === moves[0]) || (playerMove.human === moves[2] && playerMove.computer === moves[1])){
    result = 'You won!!!';
    score.win++;
  }
  else{
    result = 'You Lost';
    score.losses++;
  }

  return result;
}

function addResultToList(result){
  gameHistory.result_list.push(result);
  gameHistory.move_list.push(`You ${playerMove.human} ${playerMove.computer} Computer`);
}

function showResult(value){
  document.getElementById("result").innerHTML = value;
  document.getElementById("moves").innerHTML = `You ${playerMove.human} ${playerMove.computer} Computer`;
}

function setStaticValues  (){
  localStorage.setItem('score', JSON.stringify(score));
  localStorage.setItem('historyTracker', JSON.stringify(history_tracker));
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  history_tracker.list_length = history_tracker.cur_index = history_tracker.tot_index = gameHistory.result_list.length;
}

function results(){
  document.getElementById("wins").innerHTML = score.win;
  document.getElementById("losses").innerHTML = score.losses;
  document.getElementById("ties").innerHTML = score.tie;
}

function showIndex(){
  document.getElementById("current_index").innerHTML = history_tracker.cur_index;
  document.getElementById("total_index").innerHTML = history_tracker.tot_index;
}

function reset(){
  score.win = score.losses = score.tie = 0;
  localStorage.removeItem('score');
  localStorage.removeItem('historyTracker');
  localStorage.removeItem('gameHistory');
  document.getElementById("result").innerHTML = '';
  document.getElementById("moves").innerHTML = '';
  history_tracker.cur_index = '';
  history_tracker.tot_index = '';
  gameHistory.result_list = [];
  gameHistory.move_list = [];
}

function back(){
  history_tracker.len_index = history_tracker.list_length-1;
  if (history_tracker.list_length-1 > 0){
    document.getElementById('result').innerHTML = gameHistory.result_list[history_tracker.len_index-1];
    document.getElementById("moves").innerHTML = gameHistory.move_list[history_tracker.len_index-1];
    history_tracker.list_length--;
    history_tracker.cur_index--
  }  
}

function next(){
  history_tracker.len_index = history_tracker.list_length-1;
  if (history_tracker.list_length < gameHistory.result_list.length){
    document.getElementById('result').innerHTML = gameHistory.result_list[history_tracker.len_index+1];
    document.getElementById("moves").innerHTML = gameHistory.move_list[history_tracker.len_index+1];
    history_tracker.list_length++;
    history_tracker.cur_index++
  }  
}

function autoPlay(){
  const autoPlayElement = document.getElementById('js-autoPlay-btn');
  if (autoPlayElement.innerText === 'Auto Play'){
    autoInterval = setInterval(() => {
    playerMove.human = pickComputerMove();
    play();
    }, 1500);
    autoPlayElement.innerText = 'Stop';
  }
  else{
    clearInterval(autoInterval);
    autoPlayElement.innerText = 'Auto Play';
  }
}
  