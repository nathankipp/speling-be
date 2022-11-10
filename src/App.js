import React from 'react';
import uniq from  'lodash/uniq';
import './App.css';
import words from './1g-words';

const initialState = {
  step: 0,
  score: 0,
  word: undefined,
  choices: [],
  ans: '',
  high: null,
};

const getWord = () => {
  const idx = Math.floor(Math.random() * words.length);
  return words[idx];
}
const AZ = 'abcdefghijklmnopqrstuvqxyz'.split('');

const scoreBoard = (score, high) => (
  <div className="score">
    <div>Score: {score}</div>
    {high > 0 ? <div>High: {high}</div> : null}
  </div>
);

const start = (state, start) => (
  <div className="app go">
    {scoreBoard(state.score, state.high)}
    <div>Get ready to spell!</div>
    <div><button className="go" onClick={start}>Go</button></div>
  </div>
);

const read = (state) => {
  const { score, high, word, countdown } = state;
  return (
    <div className="app read">
      {scoreBoard(score, high)}
      <div>{word}</div>
      <div>{countdown}</div>
    </div>
  );
};

const spell = (state, print, remove, giveUp) => {
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
};

const yes = (state) => {
  const { score, high, ans } = state;
  return (
    <div className="app yes">
      {scoreBoard(score, high)}
      <div>{ans}</div>
      <div>Yes!!!</div>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const high = window.localStorage?.getItem('speling-be') || 0;
    if (high === null) {
      window.localStorage.setItem('speling-be', 0);
    }
    this.setState(prevState => ({
      ...prevState,
      high,
    }));
  }

  spell() {
    const { word } = this.state;
    const choices = uniq(word.split(''));
    while (choices.length < 15) {
      const idx = Math.floor(Math.random() * 26);
      const letter = AZ[idx];
      if (!choices.includes(letter)) {
        choices.push(letter);
      }
    }

    this.setState(prevState => ({
      ...this.state,
      step: 2,
      choices,
    }));
  }

  print(char) {
    const guess = this.state.ans.concat(char);
    const step = guess === this.state.word ? 3 : 2;

    if (step === 3) {
      setTimeout(() => {
        this.setState(
          prevState => {
            const score = prevState.score + 1;
            const high = score > prevState.high ? score : prevState.high;
            window.localStorage.setItem('speling-be', high);
            return {
              ...prevState,
              score,
              high,
            };
          },
          () => this.start());
      }, 2000);
    }

    this.setState(prevState => ({
      ...prevState,
      ans: guess,
      step,
    }));
  }

  remove() {
    this.setState(prevState => ({
      ...prevState,
      ans: this.state.ans.replace(/.$/, ''),
    }));
  }

  giveUp() {
    this.setState(prevState => ({
      ...initialState,
      score: 0,
      high: prevState.high
    }));
  }

  start() {
    this.setState(prevState => ({
      ...prevState,
      step: 1,
      word: getWord(),
      ans: '',
      countdown: 3
    }));
    setTimeout(() => this.setState(prevState => ({ ...prevState, countdown: 2 })), 1000);
    setTimeout(() => this.setState(prevState => ({ ...prevState, countdown: 1 })), 2000);
    setTimeout(() => this.spell(), 3000);
  }

  render() {
    switch(this.state.step) {
      case 0: return start(this.state, this.start.bind(this));
      case 1: return read(this.state);
      case 2: return spell(this.state, this.print.bind(this), this.remove.bind(this), this.giveUp.bind(this));
      case 3: return yes(this.state);
    }
  }
}

export default App;
