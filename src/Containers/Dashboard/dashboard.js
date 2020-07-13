import React from "react";
import "./styles.scss";
import axios from "axios";
import SearchBarView from "../../Components/SearchBarView/searchbarview";
import Card from "../../Components/Card/card";
import { debounce } from "../../Helper/searchbar-method";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      error: false,
      loading: false,
      searchText: "",
      pageToken: ""
    }
  }

  getVideos = (searchText) => {
    const API_KEY = "AIzaSyBA1kw3ZSFsK9NAaHFxqF4cJ5bsF4pIiq4"
    // eslint-disable-next-line no-template-curly-in-string
    const URL = `https://www.googleapis.com/youtube/v3/search`

    const options = {
      url: URL,
      method: "GET",
      params: {
        q: searchText,
        type: "video",
        key: API_KEY,
        part: "snippet"
      }
    }
    // eslint-disable-next-line no-unused-expressions
    this.state.pageToken.length ? options.params["pageToken"] = this.state.pageToken : ""
    axios(options)
      .then(
        result => {
          this.setState({
            loading: false,
            videos: [...this.state.videos, ...result.data.items],
            pageToken: result.data.nextPageToken
          })
        }
      )
      .catch(error => {
        this.setState({
          error: true,
          loading: false
        })
      })
  }

  searchValDebounce = debounce((value) => {
    this.setState({
      loading: value.length ? true : false,
      searchText: value,
      error: false
    }, () => {
      this.getVideos(this.state.searchText)
    })
  }, 500);

  onChange = (e) => {
    e.preventDefault();
    const searchText = e.target.value;
    if (searchText.length > 0) {
      this.searchValDebounce(searchText)
    } else {
      this.setState({
        videos: []
      })
    }
  }

  onBlur = () => {
    const { searchText } = this.state;
    searchText.trim()
    this.setState({
      searchText
    })
  }

  loadMore = () => {
    const { searchText } = this.state;
    this.searchValDebounce(searchText)
  }

  render() {
    const { loading, error, videos } = this.state;
    const { onChange, onBlur } = this;
    return (
      <React.Fragment>
        <header>
          <SearchBarView
            onChange={onChange}
            onBlur={onBlur}
          />
        </header>
        {loading ? (
          <div className="loader-display">
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="error">Error while fetching data...</div>
        ) : (
              <>
                {videos.length ?
                  <>
                    <div className="card-wrapper">
                      {
                        videos.map((item, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <Card key={index} data={item} />
                        ))
                      }
                    </div>
                    <div className="button-wrap">
                      <button
                        id="load-more-btn"
                        type="button"
                        className="btn btn-dark"
                        onClick={() => this.loadMore()}>Load more</button>
                    </div>
                  </>
                  : <div className="no-items">{"Please search for videos"}</div>}
              </>
            )}
      </React.Fragment>
    )
  }
}


export default Dashboard;

