// retrieve dom elements
const target = document.querySelector('#target');
const playView = document.querySelector('.main');
const scoreboard = document.querySelector('.score');

const startModal = document.querySelector('.start-game');
const startButton = startModal.querySelector('.btn');
const scoreModal = startModal.querySelector('h3');

const timer = document.querySelector('.inner-timer')

// Global variables

let score = 0;
let timesClicked = 0;

let timeout;

// function to generate new target
function newTarget(){
    const newX = Math.floor(Math.random() * (playView.clientWidth - target.clientWidth));
    const newY = Math.floor(Math.random() * (playView.clientHeight - target.clientHeight));

    console.log(playView.clientWidth - target.clientWidth)

    // with the new coordinates, just move the item
    target.style.top = `${newY}px`;
    target.style.left = `${newX}px`;

    // set visible target
    target.style.opacity = '100%'; 
}

// target click handler, just hide target and increment score, reset countdown
function destroyTarget(e){
    target.style.opacity = '0%';

    timesClicked++;
    score += currentPoints();
    resetCountdown();
    scoreboard.innerHTML = `Score: ${score}`;
}

// add listener
target.addEventListener('click', destroyTarget);

// trying new things
target.addEventListener('transitionend', ()=> {
    if (target.style.opacity == 0){
        newTarget();
    }
})

// starting a new game

function newGame(){
    startModal.classList.add('closed');
    timer.style.width = '100%';
    score = 0;
    timesClicked = 0;
    newTarget()
}

startButton.addEventListener('click', newGame);

// game Over

function gameOver(){
    scoreModal.innerHTML = `Final score: ${score}`
    startModal.classList.remove('closed');
}

// auxiliar function to return values depending on timesClicked

function currentPoints(){
    const points = Math.floor(timesClicked / 10) + 1;
    return points;
}

function currentTimeout(){
    let time;
    if(timesClicked<10){
        time = 3000;
    }else if(timesClicked < 20){
        time = 2000;
    }else if(timesClicked < 50){
        time = 1000;
    }else{
        time = 500;
    }

    return time;
}

// Time functions

function resetCountdown(){
    // take out the transition and refill it
    timer.style.width = getComputedStyle(timer).width;
    timer.style.transition = '';
    timer.style.width = '100%';
    getComputedStyle(timer).width;  //Seems like I have to manually reload the height for it to change, maybe the sucesive width reevaluations were being ommited


    // set timeout
    window.clearTimeout(timeout);
    timeout = window.setTimeout(gameOver, currentTimeout());

    //set timer again
    timer.style.transition = `width ${currentTimeout()}ms`;
    timer.style.width=0;
}