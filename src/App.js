import React from 'react';
import uniq from  'lodash/uniq';
import difference from 'lodash/difference';
import './App.css';
import words from './1g-words';

const AZ = 'abcdefghijklmnopqrstuvwxyz'.split('');

const STORAGE_KEYS = {
  high: 'speling-be',
  spelled: 'spelled',
};

const INITIAL_STATE = {
  step: 0,
  score: 0,
  word: undefined,
  choices: [],
  ans: '',
  high: 0,
  spelled: [],
};

const reset = () => {
  if (window.confirm("Reset words and high score?")) {
    window.localStorage.setItem(STORAGE_KEYS.high, 0);
    window.localStorage.setItem(STORAGE_KEYS.spelled, '[]');
    window.location.reload();
  }
};

const getWord = (spelled = []) => {
  const unspelled = difference(words, spelled);
  const idx = Math.floor(Math.random() * unspelled.length);
  return unspelled[idx];
}

const scoreBoard = (score, high) => (
  <div className="score">
    <div>Score: {score}</div>
    <div>High: {high}</div>
  </div>
);

const getViews = (state) => ({
  start: (start) => {
    const { score, high, spelled } = state;
    return (
      <div className="app go">
        {scoreBoard(score, high)}
        <div>
          <div>Get ready to spell!</div>
          <div className="status">
            {difference(words, spelled).length} of {words.length} words left to solve
          </div>
          <button className="reset" onClick={() => reset()}>Reset</button>
        </div>
        <div><button className="go" onClick={start}>Go</button></div>
      </div>
    );
  },
  read: () => {
    const { score, high, word, countdown } = state;
    return (
      <div className="app read">
        {scoreBoard(score, high)}
        <div>{word}</div>
        <div>{countdown}</div>
      </div>
    );
  },
  spell: (print, remove, giveUp) => {
    const { score, high, choices, ans } = state;
    return (
      <div className="app spell">
        {scoreBoard(score, high)}
        <div>&nbsp;{ans}&nbsp;</div>
        <div>
          {choices.sort().map(letter => (
            <button key={letter} onClick={() => print(letter)}>{letter}</button>
          ))}
          <button className="remove" onClick={remove}> &lt; </button>
          <button className="give-up" onClick={giveUp}> ? </button>
        </div>
      </div>
    );
  },
  yes: () => {
    const { score, high, ans } = state;
    return (
      <div className="app yes">
        {scoreBoard(score, high)}
        <div>{ans}</div>
        <div>Yes!!!</div>
      </div>
    )
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  update(newState, cb = () => {}) {
    this.setState(prevState => ({
      ...prevState,
      ...newState,
    }), cb);
  }

  componentDidMount() {
    const high = window.localStorage?.getItem(STORAGE_KEYS.high) || 0;
    if (high === null) {
      window.localStorage.setItem(STORAGE_KEYS.high, 0);
    }

    let spelled = window.localStorage?.getItem(STORAGE_KEYS.spelled);
    try {
      spelled = JSON.parse(spelled).map(x => x);
    } catch(e) {
      spelled = [];
    }

    this.update({ high, spelled });
  }

  spell = () => {
    const { word } = this.state;
    const choices = uniq(word.split(''));
    while (choices.length < 15) {
      const idx = Math.floor(Math.random() * 26);
      const letter = AZ[idx];
      if (!choices.includes(letter)) {
        choices.push(letter);
      }
    }

    this.update({ step: 2, choices });
  }

  print = (char) => {
    let { ans, word, score, high, spelled } = this.state;
    const guess = ans.concat(char);
    const step = guess === word ? 3 : 2;

    if (step === 3) {
      score = score + 1;
      high = score > high ? score : high;
      spelled = [...spelled, word];
      window.localStorage.setItem(STORAGE_KEYS.high, high);
      window.localStorage.setItem(STORAGE_KEYS.spelled, JSON.stringify(spelled));
      const update = () => this.update(
        { score, high, spelled },
        () => this.start()
      );
      setTimeout(update, 2000);
    }

    this.update({ ans: guess, step });
  }

  remove = () => {
    const { ans } = this.state;
    this.update({ ans: ans.replace(/.$/, '') });
  }

  giveUp = () => {
    const { high, spelled } = this.state;
    this.update({ ...INITIAL_STATE, score: 0, high, spelled });
  }

  start = () => {
    const { spelled } = this.state;
    this.update({
      step: 1,
      word: getWord(spelled),
      ans: '',
      countdown: 3
    });
    setTimeout(() => this.update({ countdown: 2 }), 1000);
    setTimeout(() => this.update({ countdown: 1 }), 2000);
    setTimeout(() => this.spell(), 3000);
  }

  render() {
    const { start, read, spell, yes } = getViews(this.state);
    switch(this.state.step) {
      case 0: return start(this.start);
      case 1: return read();
      case 2: return spell(this.print, this.remove, this.giveUp);
      case 3: return yes();
    }
  }
}

export default App;
