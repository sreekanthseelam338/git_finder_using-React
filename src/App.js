import React, { Component, Fragment } from "react";
import SearchComponent from "./Components/SearchComponent";
import axios from "axios";
import DispalyGitUsers from "./Components/DispalyGitUsers";
class App extends Component {
  state = { term: "", reposData: "", loading: false };
  onTermSubmit = async term => {
    let client_id = "Iv1.068b6753c665bb04";
    let client_Secret = "2ca266c52f581ffaf049006478549613d539e439";
    let response = await axios.get(
      `https:api.github.com/users/${term}? client_id${client_id}&client_Secret${client_Secret}`
    );
    let repos = await axios.get(
      `https:api.github.com/users/${term}/repos?client_id${client_id}&client_Secret${client_Secret}`
    );

    this.setState({ term: response.data, reposData: repos, loading: true });
  };
  render() {
    return (
      <Fragment>
        <SearchComponent onTermSubmit={this.onTermSubmit} />
        <section className="container my-2">
          <hr className="hr" />
          <DispalyGitUsers
            users={this.state.term}
            repos={this.state.reposData}
            loading={this.state.loading}
          />
        </section>
      </Fragment>
    );
  }
}

export default App;
