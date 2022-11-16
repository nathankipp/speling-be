import React from 'react';
import Spelling from './Spelling';
import Mathing from './Mathing';
import './App.css';

const SPELLING = 'spelling';
const MATH = 'math';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null
    }
  }

  setGame = (game) => {
    this.setState({ game });
  }

  render() {
    return this.state.game === null
      ? <div className="app games">
          <button onClick={() => this.setGame(SPELLING)}>
            I<br />&#128155;<br />Spelling
          </button>
          <button onClick={() => this.setGame(MATH)}>
            I<br />&#128155;<br />Math
          </button>
        </div>
      : this.state.game === SPELLING
      ? <Spelling quit={() => this.setGame(null)} />
      : <Mathing quit={() => this.setGame(null)} />;
  }
}

export default App;
