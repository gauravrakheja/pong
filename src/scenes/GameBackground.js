import Phaser from 'phaser'
import { Colors } from '../constants'

export default class GameBackground extends Phaser.Scene {
  preload() {

  }

  create() {
    this.add.line(400, 250, 0, 0, 10, 500, 0xffffff, 1).setLineWidth(2.5, 2)
    this.add.circle(400, 250, 50).setStrokeStyle(5, Colors.white)
  }
}