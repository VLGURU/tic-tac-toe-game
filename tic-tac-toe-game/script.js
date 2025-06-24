
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restart-btn');
    const xScoreElement = document.getElementById('x-score');
    const oScoreElement = document.getElementById('o-score');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scores = { X: 0, O: 0 };
    
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
        [0, 4, 8], [2, 4, 6]             // диагонали
    ];
    
    // Создаем игровое поле
    function initializeBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
    
    // Обработчик клика по клетке
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        // Если клетка уже занята или игра не активна, игнорируем клик
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Обновляем состояние игры и отображение
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
        
        // Проверяем на победу или ничью
        checkResult();
    }
    
    // Проверка результата игры
    function checkResult() {
        let roundWon = false;
        
        // Проверяем все выигрышные комбинации
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                
                // Подсвечиваем выигрышную комбинацию
                document.querySelectorAll(`.cell[data-index="${a}"], .cell[data-index="${b}"], .cell[data-index="${c}"]`)
                    .forEach(cell => cell.classList.add('winning-cell'));
                break;
            }
        }
        
        // Если есть победитель
        if (roundWon) {
            status.textContent = `Победили ${currentPlayer === 'X' ? 'крестики' : 'нолики'}!`;
            gameActive = false;
            
            // Обновляем счет
            scores[currentPlayer]++;
            updateScores();
            
            return;
        }
        
        // Проверяем на ничью
        if (!gameState.includes('')) {
            status.textContent = 'Ничья!';
            gameActive = false;
            return;
        }
        
        // Меняем игрока
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Ход ${currentPlayer === 'X' ? 'крестиков' : 'ноликов'}`;
    }
    
    // Обновление счета
    function updateScores() {
        xScoreElement.textContent = scores.X;
        oScoreElement.textContent = scores.O;
    }
    
    // Сброс игры
    function restartGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Ход ${currentPlayer === 'X' ? 'крестиков' : 'ноликов'}`;
        
        // Удаляем все классы с клеток
        document.querySelectorAll('.cell').forEach(cell => {
            cell.className = 'cell';
        });
    }
    
    // Инициализация игры
    initializeBoard();
    restartBtn.addEventListener('click', restartGame);
}); 