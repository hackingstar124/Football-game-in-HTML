// script.js
const striker = document.getElementById('striker');
const football = document.getElementById('football');
const goalpost = document.getElementById('goalpost');
const goalkeeper = document.getElementById('goalkeeper');
const goalMessage = document.getElementById('goal-message');

document.addEventListener('keydown', (event) => {
  const strikerPos = parseInt(getComputedStyle(striker).left);

  switch (event.key) {
    case 'a':
      moveStriker(-10);
      moveFootball(-10);
      break;
    case 'd':
      moveStriker(10);
      moveFootball(10);
      break;
    case 'l':
      shootBall();
      break;
  }
});

function moveStriker(distance) {
  const strikerPos = parseInt(getComputedStyle(striker).left);
  const newStrikerPos = Math.max(0, Math.min(window.innerWidth, strikerPos + distance));
  striker.style.left = newStrikerPos + 'px';
}

function moveFootball(distance) {
  const footballPos = parseInt(getComputedStyle(football).left);
  const newFootballPos = Math.max(0, Math.min(window.innerWidth, footballPos + distance));
  football.style.left = newFootballPos + 'px';
}

function shootBall() {
  football.style.animation = 'shoot 1s ease-out forwards';

  setTimeout(() => {
    football.style.animation = '';
    checkGoal();
    football.style.bottom = '60px';
  }, 1000);
}

function checkGoal() {
  const footballPos = parseInt(getComputedStyle(football).left);
  const goalpostPos = parseInt(getComputedStyle(goalpost).left);
  const goalpostWidth = goalpost.clientWidth;

  // Define the specific area for a goal (adjust as needed)
  const goalAreaStart = goalpostPos - goalpostWidth * 0.5;
  const goalAreaEnd = goalpostPos + goalpostWidth * 0.5;

  // Check if the football position is within the goal area
  const isGoal = footballPos >= goalAreaStart && footballPos <= goalAreaEnd;

  // Display the goal message based on the result
  displayGoalMessage(isGoal ? 'Goal!' : 'Missed!');
}

function displayGoalMessage(message) {
  goalMessage.textContent = message;
  setTimeout(() => {
    goalMessage.textContent = '';
  }, 2000);
}
setInterval(() => {
  const goalkeeperPos = parseInt(getComputedStyle(goalkeeper).left);
  const newGoalkeeperPos = Math.max(
    0,
    Math.min(
      window.innerWidth - goalkeeper.clientWidth,
      goalkeeperPos + (footballPos - goalkeeperPos) * 0.4
    )
  );
  goalkeeper.style.left = newGoalkeeperPos + 'px';
}, 25);
goalpost.style.bottom = '0';
