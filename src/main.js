import Phaser from 'phaser'
import TitleScreen from './scenes/TitleScreen'
import Game from './scenes/Game'
import GameBackground from './scenes/GameBackground'
import GameOver from './scenes/GameOver'
import Preload from './scenes/Preload'
import { Scenes } from './constants'

const config = {
  width: 800,
  height: 500,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  }
}

const game = new Phaser.Game(config)

game.scene.add(Scenes.title, TitleScreen)
game.scene.add(Scenes.preload, Preload)
game.scene.add(Scenes.game, Game)
game.scene.add(Scenes.background, GameBackground)
game.scene.add(Scenes.gameOver, GameOver)

game.scene.start(Scenes.preload)
