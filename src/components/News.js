import React, { useEffect } from 'react';
import { useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitlizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  document.title = `NewsMonkey - ${capitlizeFirstLetter(props.category)}`;

  const updateNews = async (currentPage) => {
    props.setProgress(10); // loading bar
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${currentPage}&pageSize=${props.pageSize}`;

    // const updateNews = async () => { // making next click 1 digit back
    //   const updatePage = page + 1;
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${updatePage}&pageSize=${props.pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30); // laoding bar
    let parsedData = await data.json();
    props.setProgress(50); // loading bar
    setarticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
    console.log(url);
    // console.log(data);
    // console.log(parsedData);
    console.log("page: " + page, " page + 1 " + page + 1)
  }
  useEffect(() => {
    updateNews();
  }, [])

  const handlePrevoiusClick = async () => {
    console.log("previous");
    
    // await setPage(page - 1) // added await in ordr to make next previos work fine
    // console.log(page, page - 1)
    // updateNews();

    await setPage((prevPage) => prevPage - 1);
    const updatedPage = page - 1;

    console.log(page, updatedPage);
    updateNews(updatedPage);


  }
  // const handleNextClick = async () => {
  //   console.log("Next");
  //   // await setPage(page + 1) // added await in ordr to make next previos work fine
  //   await setPage((prevPage) => prevPage + 1)
  //   // const updatePage = page + 1;
  //   console.log(page, page + 1)
  //   updateNews();
  // }


  const handleNextClick = async () => {
    console.log("Next");

    await setPage((prevPage) => prevPage + 1);
    const updatedPage = page + 1;

    console.log(page, updatedPage);
    updateNews(updatedPage);
  };

  const fetchMoreData = async () => {
    // await setPage(page + 1);
    await setPage((prevPage) => prevPage + 1)
    const updatePage = page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${updatePage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    console.log(url);
    // console.log(data);
    // console.log(parsedData);
    console.log("page: " + page, " page + 1 " + page + 1)
  };
  return (
    <div>
      <div className="container my-3">
        <h1 className='my-4 mb-4 text-center'>NewsMonkey - Top {capitlizeFirstLetter(props.category)} Headlines</h1>

        <div className="container d-flex justify-content-between mb-4">
          <button type="button" className="btn btn-dark" onClick={handlePrevoiusClick} disabled={page <= 1}> &larr; Prevoius</button>
          <button type="button" className="btn btn-dark" onClick={handleNextClick} disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}>Next &rarr;	</button>
        </div>

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
    </div>
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


// APi page 1 loading twice, page 1 items from json loading twice even on next click and loading (fetchMoreData) > infinite loading only After 3rd click or on 3rd scroll it loaidng page 2 data from JSON

// let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1387f1eff2414e709feacba16df5304e&page=${page}&pageSize=${props.pageSize}`;