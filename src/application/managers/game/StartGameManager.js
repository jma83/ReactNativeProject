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

    this.guessed = 0;
    this.options = [];
    this.correctAnswer = {};

    this.timeBetweenRounds = 3;
    this.timeInRound = 12;
  }

  async getCharacters() {
    const pages = this.characterManager.getPages();
    if (pages <= 0) {
      const info = await this.characterManager.getCharacterInfo();
      this.characterManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, this.characterManager.getPages());
    const results = await this.characterManager.getCharacters(page);
    this.options = await this.filterResults(results);
    console.log(this.options);
    this.correctAnswer = this.options[this.generateRandom(0, this.options.length)];
  }

  endRound() {
    this.status = GameStatus.ENDED;
  }

  checkAnswer(option) {
    if (this.status === GameStatus.PLAYING) {
      console.log('checkAnswer', option.id, this.correctAnswer.id);
      if (option.id === this.correctAnswer.id) {
        this.guessed++;
        return true;
      }
    }
    return false;
  }

  getTimeBetweenRounds() {
    return this.timeBetweenRounds;
  }

  getTimeInRound() {
    return this.timeInRound;
  }

  async nextRound() {
    this.options = [];
    this.correctAnswer = {};
    if (this.maxRounds <= this.round) {
      this.status = GameStatus.ENDED_GAME;
      return;
    }
    this.round++;
    this.status = GameStatus.PLAYING;
    await this.getCharacters();
  }

  getOptions() {
    return this.options;
  }

  getRound() {
    return this.round;
  }

  getCorrectName() {
    let location = this.correctAnswer.origin.name || this.correctAnswer.location.name || '';
    if (location == null || location === '' || location === 'unknown') {
      return this.correctAnswer.name;
    }
    location = ` - ${location}`;
    return this.correctAnswer.name + location;
  }

  generateRandom(min = 0, max = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  filterResults(results = [], limit = 4) {
    let list = [];
    let cont = 0;
    let copy = [...results];
    while (cont < limit) {
      const index = this.generateRandom(0, copy.length);
      list = [...list, copy[index]];
      copy.splice(index, 1);
      cont++;
    }
    return list;
  }
}
