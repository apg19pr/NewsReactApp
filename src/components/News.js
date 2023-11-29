import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export class News extends Component {
  articles = [];
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    // console.log("this is a constructor from News Component");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    }
  }

  // async updateNews() {
  //   console.log('updateNews'); // lifecycle method
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1387f1eff2414e709feacba16df5304e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(url);
  //   console.log(data);
  //   console.log(parsedData);
  //   this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });

  // }
  async componentDidMount() {
    console.log('componentDidMount'); // lifecycle method
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1387f1eff2414e709feacba16df5304e&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(url);
    console.log(data);
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
  }

  handlePrevoiusClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1387f1eff2414e709feacba16df5304e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(url);
    console.log(data);
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
    // this.setState({ page: this.state.page - 1 });
    // this.updateNews();
  }


  handleNextClick = async () => {
    console.log("Next");
    let abc = this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize);
    console.log(this.state.page + 1 + " " + "this.state.page + 1 ");
    console.log(Math.ceil(this.state.totalResults / this.props.pageSize));
    console.log(abc);
    console.log(this.props.pageSize);

    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1387f1eff2414e709feacba16df5304e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(data);
      console.log(url);
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
    // this.setState({ page: this.state.page + 1 });
    // this.updateNews();


  }
  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className='mb-4 text-center' >NewsMonkey - Top HeadLines</h1>

          {this.state.loading && <Spinner />}

          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => { // not setting state will make run default local json or no json
              return <div className="col-md-4 mb-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://www.hindustantimes.com/ht-img/img/2023/11/25/1600x900/steven-ungermann-xsWOJGv_2eI-unsplash_1700899737647_1700899755233.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>

          <div className="container d-flex justify-content-between mb-4">
            <button type="button" className="btn btn-dark" onClick={this.handlePrevoiusClick} disabled={this.state.page <= 1}> &larr; Prevoius</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}>Next &rarr;	</button>
          </div>
        </div>
      </div>
    )
  }
}

export default News