import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  articles = [];
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general',
    // apiKey: '1387f1eff2414e709feacba16df5304e'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    // apiKey:PropTypes.string
  }
  capitlizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    // console.log("this is a constructor from News Component");
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsMonkey - ${this.capitlizeFirstLetter(this.props.category)}`
  }

  async updateNews() { // making next click 1 digit back
    console.log('updateNews'); // lifecycle method
    this.props.setProgress(10);
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1387f1eff2414e709feacba16df5304e&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    // this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(50);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);


    // window.scrollTo(0, 0);
    console.log(url);
    console.log(data);
    console.log(parsedData);
  }
  async componentDidMount() { // lifecycle method
    // console.log('componentDidMount'); 
    this.updateNews();
  }

  // handlePrevoiusClick = async () => {
  //   console.log("previous");
  //   await this.setState({ page: this.state.page - 1 }); // added await in ordr to make next previos work fine
  //   this.updateNews();
  // }

  // handleNextClick = async () => {
  //   console.log("Next");
  //   await this.setState({ page: this.state.page + 1 }); // adding await made it work else next button making &page=1 on next click 
  //   this.updateNews();
  // }

  fetchMoreData = async () => {

    this.setState({ page: this.state.page + 1 });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      // articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });


    console.log(url);
    console.log(data);
    console.log(parsedData);


  };


  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className='my-4 mb-4 text-center' >NewsMonkey - Top {this.capitlizeFirstLetter(this.props.category)} Headlines</h1>

          {/* {this.state.loading && <Spinner />} */}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            // hasMore={this.state.articles.length !== this.state.totalResults}
            hasMore={this.state.articles.length <= this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element, index) => { // not setting state will make run default local json or no json
                  return <div className="col-md-4 mb-4" key={index}>
                    <NewsItem 
                    
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imgUrl={element.urlToImage ? element.urlToImage : "https://www.hindustantimes.com/ht-img/img/2023/11/25/1600x900/steven-ungermann-xsWOJGv_2eI-unsplash_1700899737647_1700899755233.jpg"}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name} />
                  </div>
                })}
              </div>
            </div>


          </InfiniteScroll>


          {/* <div className="container d-flex justify-content-between mb-4">
            <button type="button" className="btn btn-dark" onClick={this.handlePrevoiusClick} disabled={this.state.page <= 1}> &larr; Prevoius</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}>Next &rarr;	</button>
          </div> */}
        </div>
      </div>
    )
  }
}

export default News