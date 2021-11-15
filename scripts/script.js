/* Screen Changes */

document.querySelector('.never-play-js').addEventListener('click', () =>
{
    document.querySelector('.enter-screen').style.display = 'none'
    document.querySelector('.welcome-screen').style.display = 'flex'
})

document.querySelector('.already-play-js').addEventListener('click', () =>
{
    document.querySelector('.enter-screen').style.display = 'none'
    document.querySelector('.game-screen').style.display = 'flex'
    setup()
})

document.querySelector('.welcome-button-js').addEventListener('click', () =>
{
    document.querySelector('.welcome-screen').style.display = 'none'
    document.querySelector('.game-screen').style.display = 'flex'
    document.querySelector('.welcome-button-js').style.display = 'none'
    setup()
})

document.querySelector('.restart-button-js').addEventListener('click', () =>
{
    document.querySelector('.end-screen').style.display = 'none'
    document.querySelector('.enter-screen').style.display = 'flex'
})

/* Welcome Timeout Functions */

setTimeout(() => {
    document.querySelector('.welcome1').style.display = 'none'
    document.querySelector('.welcome2').style.display = 'block'
    setTimeout(() => {
        document.querySelector('.welcome2').style.display = 'none'
        document.querySelector('.welcome3').style.display = 'block'
        setTimeout(() => {
            document.querySelector('.welcome3').style.display = 'none'
            document.querySelector('.welcome4').style.display = 'block'
            setTimeout(() => {
                document.querySelector('.welcome4').style.display = 'none'
                document.querySelector('.welcome-button-js').style.display = 'block'
            },3500)
        },3500)
    },2000)
}, 2000)


/* Snake Game */

  /* All Setup and drawing function */

const canvas = document.querySelector(".canvas")
const context = canvas.getContext("2d")
const scale = 10
const rows = canvas.height / scale
const columns = canvas.width / scale
let snake
let myLoop = null

function setup() {
  snake = new Snake()
  fruit = new Fruit()
  fruit.pickLocation()

  myLoop = window.setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    fruit.draw()
    snake.update()
    snake.draw()

    if (snake.eat(fruit)) {
      fruit.pickLocation()
    }

    snake.checkCollision()
    document.querySelector('.score').innerText = snake.total
    document.querySelector('.finalScore').innerText = snake.total

  }, 250)
}

window.addEventListener('keydown', ((event) => {
  const direction = event.key.replace('Arrow', '')
  snake.changeDirection(direction)
}))

function endGame (){
  document.querySelector('.game-screen').style.display = 'none'
  document.querySelector('.end-screen').style.display = 'flex'
  clearInterval(myLoop)
}

  /* Snake function */

function Snake() {
  this.x = 0
  this.y = 0
  this.xSpeed = scale * 1
  this.ySpeed = 0
  this.total = 0
  this.tail = []
  this.finalScore

  this.draw = () => {
    context.fillStyle = "#59982f"
    for (let i=0; i<this.tail.length; i++) {
      context.fillRect(this.tail[i].x,
      this.tail[i].y, scale, scale)
    }

    context.fillRect(this.x, this.y, scale, scale)
  }

  this.update = () => {
    for (let i=0; i<this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y }

    this.x += this.xSpeed
    this.y += this.ySpeed

    if (this.x > canvas.width) {
      this.x = 0
      endGame()
    }

    if (this.y > canvas.height) {
      this.y = 0
      endGame()
    }

    if (this.x < 0) {
      this.x = canvas.width
      endGame()
    }

    if (this.y < 0) {
      this.y = canvas.height
      endGame()
    }
  }

  this.changeDirection = (direction) => { 
    switch(direction){
      case 'Up':
        this.xSpeed = 0
        this.ySpeed = -scale * 1 
        break
      case 'Down':
        this.xSpeed = 0
        this.ySpeed = scale * 1
        break
      case 'Left':
        this.xSpeed = -scale * 1
        this.ySpeed = 0
        break
      case 'Right':
        this.xSpeed = scale * 1
        this.ySpeed = 0
        break
    }
  }

  this.eat = (fruit) => {
    if (this.x === fruit.x && this.y === fruit.y){
      this.total++
      return true
    }
    return false
  }

  this.checkCollision = () => {  
    for (let i=0; i<this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y){
        endGame()
      }
    }
  }
}

  /* Apple Fruit function */

function Fruit() {
  this.x
  this.y

  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale
    this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale
  }

  this.draw = function() {
    context.fillStyle = "#ff0800"
    context.fillRect(this.x, this.y, scale, scale)
  }
}

const screamer = document.querySelector('.screamer')

setTimeout(function(){
  screamer.style.display='block'
}, 35000)

