import React from 'react';
import uniq from  'lodash/uniq';
import './App.css';
import words from './1g-words';

const initialState = {
  score: 0,
  step: 1,
  word: undefined,
  choices: [],
  ans: '',
};

const getWord = () => {
  const idx = Math.floor(Math.random() * words.length);
  return words[idx];
}
const AZ = 'abcdefghijklmnopqrstuvqxyz'.split('');

const scoreBoard = score => <div className="score">Score: {score}</div>;

const read = (state, next) => {
  const { score, word } = state;
  return (
    <React.Fragment>
      {scoreBoard(score)}
      <div className="read">
        <div>{word}</div>
        <button onClick={next}>Spell It!</button>
      </div>
    </React.Fragment>
  );
};

const spell = (state, print, remove, giveUp) => {
  const { score, choices, ans } = state;
  return (
    <React.Fragment>
    {scoreBoard(score)}
    <div className="spell">
      <div>&nbsp;{ans}&nbsp;</div>
      <div>
        {choices.sort().map(letter => (
          <button key={letter} onClick={() => print(letter)}>{letter}</button>
        ))}
      </div>
      <div>
        <button className="remove" onClick={remove}> &lt; </button>
        <button className="give-up" onClick={giveUp}> ? </button>
      </div>
    </div>
    </React.Fragment>
  );
};

const yes = (state) => {
  const { score, ans } = state;
  return (
    <React.Fragment>
    {scoreBoard(score)}
    <div className="yes">
      <div>&nbsp;{ans}&nbsp;</div>
    </div>
    </React.Fragment>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  next(step) {
    const { word } = this.state;
    const choices = uniq(word.split(''));
    while (choices.length < 12) {
      const idx = Math.floor(Math.random() * 26);
      const letter = AZ[idx];
      if (!choices.includes(letter)) {
        choices.push(letter);
      }
    }

    this.setState(prevState => ({
      ...this.state,
      choices,
      step: prevState.step + 1,
    }));
  }

  print(char) {
    const guess = this.state.ans.concat(char);
    const step = guess === this.state.word ? 3 : 2;

    this.setState({
      ...this.state,
      ans: guess,
      step,
    });

    if (step === 3) {
      setTimeout(() => this.setState({
        ...this.state,
        score: this.state.score + 1,
        step: 1,
        word: getWord(),
        ans: ''
      }), 2000);
    }
  }

  remove() {
    this.setState({
      ...this.state,
      ans: this.state.ans.replace(/.$/, ''),
    });
  }

  giveUp() {
    this.setState({
      ...initialState,
      word: getWord(),
    });
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      word: getWord(),
    });
  }

  render() {
    switch(this.state.step) {
      case 1: return read(this.state, this.next.bind(this));
      case 2: return spell(this.state, this.print.bind(this), this.remove.bind(this), this.giveUp.bind(this));
      case 3: return yes(this.state);
    }
  }
}

export default App;
