export function generateMaze(rows, cols) {
  // Создаем пустой массив для представления лабиринта
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  // Устанавливаем начальную позицию
  const startRow = 1;
  const startCol = 1;
  maze[startRow][startCol] = 0;

  // Вызываем функцию для рекурсивного построения лабиринта
  recursiveBacktracker(maze, startRow, startCol);

  for(let row = 0; row < rows; row++ ){
    

    for(let i = 0; i < 1; i++) {
      const randomCol = Math.floor(Math.random() * cols);
      if(maze[row][randomCol] === 1
        && maze[row][randomCol - 1] === 0 
        && maze[row][randomCol + 1] === 0 ) {
          maze[row][randomCol] = 0;
        }
    }
    
  }
  for (let col = 0; col < cols; col++) {
  
    for(let i = 0; i < 10; i++) {
      const randomRow = Math.floor(Math.random() * rows);
  
      // Проверяем, что randomRow находится в пределах массива
      if (randomRow > 0 && randomRow < rows - 1) {
        if (
          maze[randomRow][col] === 1 &&
          maze[randomRow - 1][col] === 0 &&
          maze[randomRow + 1][col] === 0
        ) {
          maze[randomRow][col] = 0;
        }
      }
    }
    
  }

  return maze.flat();
}

function recursiveBacktracker(maze, row, col) {
  const directions = [[0, 2], [2, 0], [0, -2], [-2, 0]]; // Возможные направления: вниз, вправо, вверх, влево
  shuffleArray(directions); // Перемешиваем массив направлений

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (newRow >= 0 && newRow < maze.length && newCol >= 0 && newCol < maze[0].length) {
      if (maze[newRow][newCol] === 1) {
        // Если соседняя ячейка еще не посещена
        maze[newRow][newCol] = 0; // Отмечаем проход
        maze[row + dr / 2][col + dc / 2] = 0; // Отмечаем стену между текущей и следующей ячейками
        recursiveBacktracker(maze, newRow, newCol); // Рекурсивно вызываем для следующей ячейки
      }
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
