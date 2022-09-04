import Phaser from 'phaser'
import { Fonts, Scenes } from '../constants'

export default class GameOver extends Phaser.Scene {
  /**
   * 
   * @param {{ playerScore: number, aiScore: number}} data 
   */
  create({ playerScore, aiScore }) {
    let titleText = 'Game Over'
    if (playerScore > aiScore) {
      titleText = 'You Won!'
    }
    this.add.text(400, 200, titleText, {
      fontFamily: Fonts.pressStart2P,
      fontSize: 38
    }).setOrigin(0.5, 0.5)

    this.add.text(400, 300, 'Press Space to Continue', {
      fontFamily: Fonts.pressStart2P,
    }).setOrigin(0.5, 0.5)

    this.input.keyboard.once(`keydown-SPACE`, () => {
      this.scene.start(Scenes.title)
    })
  }
}