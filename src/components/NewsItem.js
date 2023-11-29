import React, { Component } from 'react'

export class NewsItem extends Component {



  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className='mb-2'>
          <div className="card" style={{ width: '100%', position:'relative' }}>
            <img src={imgUrl ? imgUrl : "https://cdn.24.co.za/files/Cms/General/d/8506/57b497a6eddb47808c3ecf83f50a069a.jpeg"} className="card-img-top" alt="..." />
            <div className="card-body" style={{ width: '100%', position:'relative' }}>
              <h5 className="card-title">{title ? title : ""}
                <span className="position-absolute top-0 translate-middle badge rounded-pill badge rounded-pill bg-light text-dark " style={{left:'50%', fontWeight:"400"}}>
                  <small>
                  {source}
                  </small>
                  <span className="visually-hidden">Source From</span>
                </span>
              </h5>
              <p className="card-text">{description ? description : ""}</p>
              <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {date ? new Date(date).toGMTString() : ""}</small></p>
              <a href={newsUrl} target='_blank' className="btn btn-primary btn-sm">Read more</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem