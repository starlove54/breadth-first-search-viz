let cols, rows
let grid
let start, end
let squareSize = 50
let isBFSRunning = false
let bfsQueue = []

function setup() {
  createCanvas(500, 500)
  frameRate(5) // Adjust the frame rate to control the speed
  cols = 10
  rows = 10
  grid = createGrid(cols, rows)

  // Set start and end points
  start = grid[0][0]
  end = grid[rows - rows / 2][cols - cols / 2]
}

function draw() {
  background(255)
  drawGrid()

  // If BFS is running, perform one step per frame
  if (isBFSRunning) {
    performBFSStep()
  }
}

function createGrid(cols, rows) {
  let newGrid = new Array(cols)
  for (let i = 0; i < cols; i++) {
    newGrid[i] = new Array(rows)
    for (let j = 0; j < rows; j++) {
      newGrid[i][j] = new Square(i * squareSize, j * squareSize, squareSize)
    }
  }
  return newGrid
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show()
    }
  }

  // Highlight start and end points
  fill(255, 0, 0)
  rect(start.x, start.y, squareSize, squareSize)
  fill(0, 0, 255)
  rect(end.x, end.y, squareSize, squareSize)
}

function runBFS() {
  // Reset grid colors
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].resetColor()
    }
  }

  // Initialize BFS
  isBFSRunning = true
  bfsQueue = []
  bfsQueue.push(start)
  start.visited = true
}

function performBFSStep() {
  // Perform one step of BFS
  if (bfsQueue.length > 0) {
    let current = bfsQueue.shift()

    // Check if the current node is the destination
    if (current === end) {
      isBFSRunning = false
      return
    }

    let neighbors = current.getNeighbors()
    for (let neighbor of neighbors) {
      if (!neighbor.visited) {
        neighbor.visited = true
        neighbor.setColor(color(255, 0, 0)) // Change color to indicate BFS visit
        bfsQueue.push(neighbor)
      }
    }
  } else {
    // BFS is complete
    isBFSRunning = false
  }
}

class Square {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.visited = false
    this.color = color(200)
  }

  show() {
    stroke(0)
    fill(this.color)
    rect(this.x, this.y, this.size, this.size)
    textAlign(CENTER, CENTER)
    textSize(10)
    fill(0)
    text('s', start.x + squareSize / 2, start.y + squareSize / 2)
    fill(255)
    text('b', end.x + squareSize / 2, end.y + squareSize / 2)
  }

  getNeighbors() {
    let neighbors = []

    // Check left neighbor
    if (this.x > 0) {
      let leftNeighbor =
        grid[(this.x - squareSize) / squareSize][this.y / squareSize]
      if (!leftNeighbor.visited) neighbors.push(leftNeighbor)
    }

    // Check right neighbor
    if (this.x < width - squareSize) {
      let rightNeighbor =
        grid[(this.x + squareSize) / squareSize][this.y / squareSize]
      if (!rightNeighbor.visited) neighbors.push(rightNeighbor)
    }

    // Check top neighbor
    if (this.y > 0) {
      let topNeighbor =
        grid[this.x / squareSize][(this.y - squareSize) / squareSize]
      if (!topNeighbor.visited) neighbors.push(topNeighbor)
    }

    // Check bottom neighbor
    if (this.y < height - squareSize) {
      let bottomNeighbor =
        grid[this.x / squareSize][(this.y + squareSize) / squareSize]
      if (!bottomNeighbor.visited) neighbors.push(bottomNeighbor)
    }

    return neighbors
  }

  setColor(newColor) {
    this.color = newColor
  }

  resetColor() {
    this.visited = false
    this.color = color(200)
  }
}

function resetGrid() {
  // Reset grid colors and visited status
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].resetColor()
    }
  }
  // Reset BFS-related variables
  isBFSRunning = false
  bfsQueue = []
}
