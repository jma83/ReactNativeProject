import CharacterManager from '@application/managers/generic/CharacterManager';

const GameStatus = {
  PAUSED: 0,
  PLAYING: 1,
  ENDED: 2,
  ENDED_GAME: 3
};

export default class StartGameManager {
  constructor(maxRounds = 5) {
    this.status = GameStatus.PAUSED;
    this.round = 0;
    this.maxRounds = maxRounds;
    this.characterManager = new CharacterManager();

    this.points = 0;
    this.guessed = 0;
    this.options = [];
    this.correctAnswer = 0;
    this.nextRound();
  }

  async getCharacters() {
    const pages = this.characterManager.getPages();
    if (pages <= 0) {
      const info = await this.characterManager.getCharacterInfo();
      this.characterManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, this.characterManager.getPages());
    const results = await this.characterManager.getCharacters(page);
    return this.filterResults(results);
  }

  activeStartTimeout() {
    this.startTimeout = setTimeout(
      (function (self) {
        return function () {
          self.activeInGameTimeout();
        };
      })(this),
      3000
    );
  }

  activeInGameTimeout() {
    this.inGameTimeout = setTimeout(
      (function (self) {
        return function () {
          self.endRound();
        };
      })(this),
      10000
    );
  }

  endRound() {
    this.status = GameStatus.ENDED;
    clearInterval(this.startTimeout);
    clearInterval(this.inGameTimeout);
  }

  answer() {}

  async nextRound() {
    if (this.maxRounds <= this.round) {
      this.status = GameStatus.ENDED_GAME;
    }
    this.round++;
    this.status = GameStatus.PLAYING;
    this.activeStartTimeout();
    this.options = await this.getCharacters();
  }

  generateRandom(min = 0, max = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  filterResults(results = [], limit = 4) {
    const initIndex = this.generateRandom(0, results.length - limit);
    console.log('randomLimit', initIndex, limit + initIndex);
    return results.slice(initIndex, limit + initIndex);
  }
}
