import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      results: []
    };
  }
  fetchResults = searchT => {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchT}`;
    console.log(endpoint);
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data.query.search });
      })
      .catch(() => console.log("An error occurred"));
  };
  handleChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      results: []
    });

    this.fetchResults(this.state.searchTerm);
  };

  render() {
    const articles = this.state.results.map(function(article, id) {
      return (
        <div className="article-wrap" key={id}>
          <h3>
            <a href={`https://en.wikipedia.org/wiki/${article.title}`}>
              {article.title}
            </a>
          </h3>
          <p
            className="snippet"
            dangerouslySetInnerHTML={{ __html: `${article.snippet}...` }}
          />
          <br />
          <a
            href={`https://en.wikipedia.org/wiki/${article.title}`}
            className="resultItem-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {`https://en.wikipedia.org/wiki/${article.title}`}
          </a>
        </div>
      );
    });
    return (
      <div className="App">
        <form className="form-wrap" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="Search"
            placeholder="Search"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
          <button className="btn">Search</button>
        </form>
        <div className="wrap">{articles}</div>
      </div>
    );
  }
}

export default App;
