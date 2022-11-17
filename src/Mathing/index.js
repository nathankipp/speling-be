import React from 'react';

const STORAGE_KEYS = {
  high: 'math-be',
};

const INITIAL_STATE = {
  step: 0,
  score: 0,
  equation: '',
  solution: '',
  countdown: 10,
  tick: 10,
  intervalId: null,
  ans: '',
  high: 0,
};

const getNum = (max = 9) => {
  return Math.floor(Math.random() * (max + 1));
}

const scoreBoard = (score, high, countdown = 0, tick = 0) => (
  <div>
    <div className="score">
      <div>Score: {score}</div>
      <div>High: {high}</div>
    </div>
    {countdown > 0 && (
      <div
        className="progress"
        style={{ width: `${(tick * 100 / countdown)}%`}}
      >
      &nbsp;</div>
    )}
  </div>
);

const getViews = (state, props) => {
  const { score, high, equation, ans, countdown, tick} = state;
  return {
    start: (start, reset) => (
      <div className="app go">
        {scoreBoard(score, high)}
        <div>
          <div>Let's do math!</div>
          <div>&nbsp;</div>
          <button className="reset" onClick={reset}>Reset</button>
          <button className="quit" onClick={props.quit}>Quit</button>
        </div>
        <div>
          <button className="go" onClick={start}>Go</button>
        </div>
      </div>
    ),
    compute: (print, remove, giveUp) => (
      <div className="app spell">
        {scoreBoard(score, high, countdown, tick)}
        <div>{equation}</div>
        <div>&nbsp;{ans}&nbsp;</div>
        <div className="keyboard">
          {[1,2,3,4,5,6,7,8,9,0].map(number => (
            <button key={number} onClick={() => print(number)}>{number}</button>
          ))}
          <button className="remove" onClick={remove}> &larr; </button>
          <button className="give-up" onClick={() => {
            if (window.confirm("Give up?")) { giveUp(); }
          }}> &#128534; </button>
        </div>
      </div>
    ),
    yes: () => (
      <div className="app yes">
        {scoreBoard(score, high, 1, 1)}
        <div>{equation}</div>
        <div>{ans}</div>
        <div>Yes!!!</div>
      </div>
    ),
    done: (reset) => (
      <div className="app winner">
        {scoreBoard(score, high)}
        <div>&#129321;</div>
        <div>Game over!</div>
        <button className="reset" onClick={reset}>Play again</button>
      </div>
    )
  };
};

class Mathing extends React.Component {
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

    this.update({ high });
  }

  componentDidUpdate() {
    if (this.state.tick === 0) {
      clearInterval(this.state.intervalId);
      this.giveUp();
    }
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalId)
  }

  print = (char) => {
    let { ans, solution, intervalId, score, high } = this.state;
    const guess = ans.concat(char);
    const step = guess === solution ? 2 : 1;

    if (step === 2) {
      clearInterval(intervalId);
      score = score + 1;
      high = score > high ? score : high;
      window.localStorage.setItem(STORAGE_KEYS.high, high);

      const update = () => this.update(
        { score, high, ans: '' },
        () => this.start(false)
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
    const { score, high, intervalId } = this.state;
    this.update({ ...INITIAL_STATE, score, high, intervalId });
  }

  start = (resetScore = true) => {
    const a = getNum();
    const b = getNum();

    const tick = () => this.setState(prevState => ({
      ...prevState,
      tick: prevState.tick - 1,
    }));
    clearInterval(this.state.intervalId);
    const intervalId = setInterval(tick, 1000 - (20 * this.state.score));

    const newState = {
      step: 1,
      equation: `${a} + ${b} =`,
      solution: `${(a + b)}`,
      countdown: 10,
      tick: 10,
      intervalId,
    }
    if (resetScore) {
      newState.score = 0;
    }

    this.update(newState);
  }

  reset = () => {
    if (window.confirm("Reset words and high score?")) {
      window.localStorage.setItem(STORAGE_KEYS.high, 0);
      this.update({ high: 0 });
    }
  };

  render() {
    const { start, compute, yes, done } = getViews(this.state, this.props);
    switch(this.state.step) {
      case 0: return start(this.start, this.reset);
      case 1: return compute(this.print, this.remove, this.giveUp);
      case 2: return yes();
      case 3: return done(this.reset);
    }
  }
}

export default Mathing;
