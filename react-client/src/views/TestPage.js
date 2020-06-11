import React, { Component } from 'react';

class TestPage extends Component {
  constructor() {
    super();
    this.state = {
      sampleData: {}
    };
  }

  componentDidMount() {
    fetch('/sample_data')
      .then(res => res.json())
      .then(sampleData => this.setState({ sampleData }))
      .catch(error => console.log(error));
  }

  renderSampleDataEntry() {
    return Object.keys(this.state.sampleData).map(key => (
      <tr key={key}>
        <td>{key}</td>
        <td>{this.state.sampleData[key]}</td>
      </tr>
    ));
  }

  renderSampleData() {
    return (
      <table className="sample-data-table">
        <thead>
          <tr>
            <th>Keys</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
        { this.renderSampleDataEntry() }
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div>
        <h1 className="App-title">Welcome to React</h1>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h3>Sample Data returned from Express: /sample_data endpoint</h3>
        <div className="sample-data-container">
          { this.renderSampleData() }
        </div>
      </div>
    );
  }
}

export default TestPage;