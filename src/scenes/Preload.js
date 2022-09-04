import Phaser from 'phaser'
import WebFontFile from '../WebFontFile'
import { audio, Scenes } from '../constants'

export default class Preload extends Phaser.Scene {
  preload() {
    const fonts = new WebFontFile(this.load, 'Press Start 2P')
    this.load.addFile(fonts)
    this.load.audio(audio.pongBeep, 'assets/ping_pong_8bit_beeep.wav')
    this.load.audio(audio.pongPlop, 'assets/ping_pong_8bit_plop.wav')
  }

  create() {
    this.scene.start(Scenes.title)
  }
}