import Phaser from 'phaser'
import { Colors, Scenes, Fonts, audio } from '.././constants'

export default class Game extends Phaser.Scene {
  init() {
    this.aiPaddleVelocity = new Phaser.Math.Vector2(0, 0)
    this.playerScore = 0
    this.aiScore = 0
    this.finished = false
  }

  preload() {
  }

  create() {
    this.scene.run(Scenes.background)
    this.scene.sendToBack(Scenes.background)

    this.physics.world.setBounds(-100, 0, 1000, 500)
    this.ball = this._createBall()
    this.time.delayedCall(300, () => {
      this._resetBall()
    })
    this.playerPaddle = this._createplayerPaddle()
    this.aiPaddle = this._createAIPaddle()

    const scoreStyle = {
      fontSize: 48,
      fontFamily: Fonts.pressStart2P
    }
    this.playerScoreLabel = this.add.text(300, 125, '0', scoreStyle).setOrigin(0.5, 0.5)
    this.aiScoreLabel = this.add.text(500, 375, '0', scoreStyle).setOrigin(0.5, 0.5)
    this.cursors = this.input.keyboard.createCursorKeys()
    this._addColliders()
    this.ball.body.onWorldBounds = true
    this.physics.world.on('worldbounds', this.handleWorldBallCollision, this)
  }

  update() {
   if(this.finished) {
     return
   }
   this._handleKeyBoardInput()
   this._moveAiPaddle()
   this._handleBallMovement()
  }

  _createBall() {
    const ball = this.add.circle(400, 250, 10, Colors.white, 1)
    this.physics.add.existing(ball)
  
    ball.body.setBounce(1, 1)
    ball.body.setCircle(10)
    ball.body.setCollideWorldBounds(true, 1, 1)
    ball.body.setMaxSpeed(400)

    return ball
  }

  _createplayerPaddle() {
    const playerPaddle = this.add.rectangle(50, 250, 30, 100, Colors.white, 1)
    this.physics.add.existing(playerPaddle, true)
    return playerPaddle
  } 
  
  _createAIPaddle () {
    const AIPaddle = this.add.rectangle(750, 250, 30, 100, Colors.white)
    this.physics.add.existing(AIPaddle, true)
    return AIPaddle
  }

  handleWorldBallCollision(body, up, down, left, right) {
    if (left || right) {
      return
    }
    this.sound.play(audio.pongPlop)
  }

  _addColliders() {
    this.physics.add.collider(this.playerPaddle, this.ball, this._ballCollideCallback, undefined, this)
    this.physics.add.collider(this.aiPaddle, this.ball, this._ballCollideCallback, undefined, this)
  }

  _ballCollideCallback() {
    this.sound.play(audio.pongBeep)
    const vel = this.ball.body.velocity
    vel.x *= 1.05
    vel.y *= 1.05
    this.ball.body.setVelocity(vel.x, vel.y)
  }

  _handleKeyBoardInput() {
    /** @type {Phaser.Physics.Arcade.StaticBody} */
    const playerPaddleBody = this.playerPaddle.body
 
    if (this.cursors.up.isDown) {
      this.playerPaddle.y -= 10
      playerPaddleBody.updateFromGameObject()
    }
    else if (this.cursors.down.isDown) { 
      this.playerPaddle.y += 10
      playerPaddleBody.updateFromGameObject()
    }
  }

  _moveAiPaddle() {
    const diff = this.ball.y - this.aiPaddle.y
    const aiSpeed = 3;
    if(Math.abs(diff) < 10) {
      return
    }
    if (diff < 0) {
      // ball is above the paddle
      this.aiPaddleVelocity.y = -aiSpeed
      if(this.aiPaddleVelocity.y < -10) {
        this.aiPaddleVelocity.y = -10
      }
    } else if (diff > 0) {
      // ball is below the paddle
      this.aiPaddleVelocity.y = aiSpeed
      if(this.aiPaddleVelocity.y < 10) {
        this.aiPaddleVelocity.y = 10
      }
    }
    this.aiPaddle.y += this.aiPaddleVelocity.y
    this.aiPaddle.body.updateFromGameObject() 
  }

  _handleBallMovement() {
    const leftBounds = -30
    const rightBounds = 830
    if(this.ball.x >= leftBounds && this.ball.x <= rightBounds) {
      return
    }

    if(this.ball.x < leftBounds) {
      this._aiScored()
    } else if (this.ball.x > rightBounds) {
      this._playerScored()
    }
    const maxScore = 1
    if(this.playerScore >= maxScore) {
      this.finished = true
    } else if(this.aiScore >= maxScore) {
      this.finished = true
    }
    if(!this.finished) {
      this._resetBall()
    } else {
      this.ball.active = false
      this.physics.world.remove(this.ball.body)
      this.scene.stop(Scenes.background)
      this.scene.start(Scenes.gameOver, {
        playerScore: this.playerScore,
        aiScore: this.aiScore
      })
    }
  }

  _resetBall() {
    this.ball.setPosition(400, 250)
    const angle = Phaser.Math.Between(0, 360)
    const vec = this.physics.velocityFromAngle(angle, 500)
    this.ball.body.setVelocity(vec.x, vec.y)
  }

  _playerScored() {
    this.playerScore += 1
    this.playerScoreLabel.text = this.playerScore
  }

  _aiScored() {
    this.aiScore += 1
    this.aiScoreLabel.text = this.aiScore
  }
}


