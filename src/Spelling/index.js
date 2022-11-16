import React from 'react';
import uniq from  'lodash/uniq';
import difference from 'lodash/difference';
import words from './1g-words';

const AZ = 'abcdefghijklmnopqrstuvwxyz'.split('');

const STORAGE_KEYS = {
  high: 'speling-be',
  spelled: 'spelled',
  spoken: 'spoken',
};

const INITIAL_STATE = {
  step: 0,
  score: 0,
  word: undefined,
  choices: [],
  ans: '',
  high: 0,
  mode: STORAGE_KEYS.spelled,
  spelled: [],
  spoken: [],
};

const getWord = (completed = []) => {
  const remainingWords = difference(words, completed);
  if (remainingWords.length === 0) {
    return '';
  }
  const idx = Math.floor(Math.random() * remainingWords.length);
  return remainingWords[idx];
}

const scoreBoard = (score, high) => (
  <div className="score">
    <div>Score: {score}</div>
    <div>High: {high}</div>
  </div>
);

const playButton = (ref) => (
  <button className="play" onClick={() => {
    ref.current.currentTime = 0;
    ref.current.play();
  }}> &#128266; </button>
);

const getViews = (state, props) => ({
  start: (start, reset) => {
    const { score, high, spelled, spoken } = state;
    return (
      <div className="app go">
        {scoreBoard(score, high)}
        <div>
          <div>Get ready to spell!</div>
          <div className="status">There are {words.length} words</div>
          <div className="status">
            {difference(words, spelled).length} left to read & spell
          </div>
          <div className="status">
            {difference(words, spoken).length} left to hear & spell
          </div>
          <button className="reset" onClick={reset}>Reset</button>
          <button className="quit" onClick={props.quit}>Quit</button>
        </div>
        <div>
          <button className="go" onClick={start}>Go</button>
        </div>
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
  spell: (audioRef, print, remove, giveUp) => {
    const { word, mode, score, high, choices, ans } = state;
    return (
      <div className="app spell">
        <audio ref={audioRef} src={`${process.env.PUBLIC_URL}/audio/${word}.m4a`} autoPlay={mode === STORAGE_KEYS.spoken} />
        {scoreBoard(score, high)}
        <div>&nbsp;{ans || playButton(audioRef)}&nbsp;</div>
        <div className="keyboard">
          {choices.sort().map(letter => (
            <button key={letter} onClick={() => print(letter)}>{letter}</button>
          ))}
          <button className="remove" onClick={remove}> &larr; </button>
          {playButton(audioRef)}
          <button className="give-up" onClick={() => {
            if (window.confirm("Give up?")) { giveUp(); }
          }}> &#128534; </button>
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
  },
  done: (reset) => {
    const { score, high } = state;
    return (
      <div className="app winner">
        {scoreBoard(score, high)}
        <div>&#129321;</div>
        <div>All done!</div>
        <button className="reset" onClick={reset}>Play again</button>
      </div>
    );
  },
});

class Spelling extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.audioRef = React.createRef();
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

    let spoken = window.localStorage?.getItem(STORAGE_KEYS.spoken);
    try {
      spoken = JSON.parse(spelled).map(x => x);
    } catch(e) {
      spoken = [];
    }

    const step = difference(words, uniq([...spelled, ...spoken])).length === 0
      ? 4 // winner
      : INITIAL_STATE.step;

    this.update({ step, high, spelled, spoken });
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
    let { ans, word, score, high, mode, spelled, spoken } = this.state;
    const guess = ans.concat(char);
    const step = guess === word ? 3 : 2;

    if (step === 3) {
      score = score + 1;
      high = score > high ? score : high;
      window.localStorage.setItem(STORAGE_KEYS.high, high);

      if (mode === STORAGE_KEYS.spelled) {
        spelled = [...spelled, word];
        window.localStorage.setItem(STORAGE_KEYS.spelled, JSON.stringify(spelled));
      } else {
        spoken = [...spoken, word];
        window.localStorage.setItem(STORAGE_KEYS.spoken, JSON.stringify(spoken));
      }

      const update = () => this.update(
        { score, high, spelled, spoken },
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
    const { spelled, spoken } = this.state;

    const spell = getWord(spelled);
    const speak = getWord(spoken);
    const step = spell ? 1 : speak ? 2 : 4;
    const newState = {
      step,
      mode: spell ? STORAGE_KEYS.spelled : STORAGE_KEYS.spoken,
      word: spell || speak,
      ans: '',
      countdown: 3
    }

    const cb = spell
        ? () => {
          setTimeout(() => this.update({ countdown: 2 }), 1000);
          setTimeout(() => this.update({ countdown: 1 }), 2000);
          setTimeout(() => this.spell(), 3000);
        }
        : () => this.spell();
    this.update(newState, step < 4 ? cb : undefined);
  }

  reset = () => {
    if (window.confirm("Reset words and high score?")) {
      window.localStorage.setItem(STORAGE_KEYS.high, 0);
      window.localStorage.setItem(STORAGE_KEYS.spelled, '[]');
      window.localStorage.setItem(STORAGE_KEYS.spoken, '[]');
      this.update({ high: 0, spelled: [], spoken: [] });
    }
  };

  render() {
    const { start, read, spell, yes, done } = getViews(this.state, this.props);
    switch(this.state.step) {
      case 0: return start(this.start, this.reset);
      case 1: return read();
      case 2: return spell(this.audioRef, this.print, this.remove, this.giveUp);
      case 3: return yes();
      case 4: return done(this.reset);
    }
  }
}

export default Spelling;
