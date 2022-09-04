import Phaser from 'phaser'
import { Scenes, Fonts, audio } from '../constants'

export default class TitleScreen extends Phaser.Scene {
  preload() {
  
  }

  create() {
    this.add.text(400, 250, 'Old School Tennis', {
      fontSize: 38,
      fontFamily: Fonts.pressStart2P
    }).setOrigin(0.5, 0.5)
    this.add.text(400, 300, 'Press space to start', {
      fontFamily: Fonts.pressStart2P
    }).setOrigin(0.5)
    this.input.keyboard.once(`keydown-SPACE`, () => {
      this.sound.play(audio.pongBeep)
      this.scene.start(Scenes.game)
    })
  }
}