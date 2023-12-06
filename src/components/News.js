import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitlizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews = async () => {
    props.setProgress(10);
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=12a7c8e4a55e4737a7e067e453144717&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);

    console.log('updateNews'); // lifecycle method
    console.log(url);
    console.log(data);
    console.log(parsedData);
  }

  useEffect(() => {
    document.title = `NewsMonkey - ${capitlizeFirstLetter(props.category)}`
    updateNews();
    // eslint-disable-next-line
  }, [])
  // const handlePrevoiusClick = async () => {
  //   console.log("previous");
  //   await setPage(page - 1); // added await in ordr to make next previos work fine
  //   await updateNews();
  // }
  // const handleNextClick = async () => {
  //   console.log("Next");
  //   await setPage(page + 1); // adding await made it work else next button making &page=1 on next click 
  //   await updateNews();
  // }
  const fetchMoreData = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=12a7c8e4a55e4737a7e067e453144717&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)

    console.log(url);
    console.log(data);
    console.log(parsedData);
  };
  return (
    <>
      <div className="container my-3">
        <h1 className='my-5 pt-5 text-center' >NewsMonkey - Top {capitlizeFirstLetter(props.category)} Headlines</h1>
        {/* <div className=" d-flex justify-content-between mb-4">
          <button type="button" className="btn btn-dark" onClick={handlePrevoiusClick} disabled={page <= 1}> &larr; Prevoius</button>
          <button type="button" className="btn btn-dark" onClick={handleNextClick} disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}>Next &rarr;	</button>
        </div> */}
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length <= totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element, index) => { // not setting state will make run default local json or no json
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
      </div>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News

// let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1387f1eff2414e709feacba16df5304e&page=${page}&pageSize=${props.pageSize}`;


// 12a7c8e4a55e4737a7e067e453144717 > api key 
