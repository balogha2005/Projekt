document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const resetButton = document.getElementById('resetButton');
  const difficultySelect = document.getElementById('difficulty');
  const timeDisplay = document.getElementById('time');
  const recordDisplay = document.getElementById('record');
  let currentShape, gameInterval, startTime, recordTime = Infinity;

  startButton.addEventListener('click', startGame);
  stopButton.addEventListener('click', stopGame);
  resetButton.addEventListener('click', resetGame);

  function startGame() {
      resetGame();
      let speed = getSpeed();
      gameInterval = setInterval(spawnShape, speed);
      startTime = Date.now();
  }

  function stopGame() {
      clearInterval(gameInterval);
      if (currentShape) {
          currentShape.remove();
          currentShape = null;
      }
  }

  function resetGame() {
      stopGame();
      timeDisplay.textContent = '0';
      recordDisplay.textContent = recordTime === Infinity ? '0' : recordTime.toFixed(2);
  }

  function spawnShape() {
      if (currentShape) {
          currentShape.remove();
      }

      currentShape = document.createElement('div');
      currentShape.classList.add('shape');
      currentShape.style.top = `${Math.random() * 450}px`;
      currentShape.style.left = `${Math.random() * (document.getElementById('gameArea').clientWidth - 50)}px`;
      currentShape.addEventListener('click', shapeClicked);
      document.getElementById('gameArea').appendChild(currentShape);
  }

  function shapeClicked() {
      let currentTime = (Date.now() - startTime) / 1000;
      timeDisplay.textContent = currentTime.toFixed(2);
      if (currentTime < recordTime) {
          recordTime = currentTime;
      }
      spawnShape();
      startTime = Date.now();
  }

  function getSpeed() {
      switch (difficultySelect.value) {
          case 'easy': return 1500;
          case 'normal': return 1000;
          case 'hard': return 500;
      }
  }
});
