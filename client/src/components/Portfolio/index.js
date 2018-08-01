import React, { Component } from 'react';
import axios from 'axios';

class PortfolioView extends Component {
  state = {
    portfolioWithReview: ''
  };
  componentDidMount() {
    console.log(this.props.match.params.id);
    let id = this.props.match.params.id;
    axios.get(`/api/portfolio/notes/${id}`).then(res => {
      const portfolioWithReview = res.data;
      this.setState({ portfolioWithReview });
    });
  }
  showfolioReviews = folioInfo =>
    folioInfo.review
      ? folioInfo.review.map(item => (
          <li key={item._id} className="list-group-item">
            <p>Comment: {item.review_post}</p>
            <p>Overall Rating: {item.overall_rating}</p>
            <p>Content Rating: {item.content_rating} </p>
            <p>Design Rating: {item.design_rating} </p>
            <p>Responsiveness: {item.responsiveness_rating}</p>
          </li>
        ))
      : null;

  render() {
    console.log('portfolioWithReview', this.state.portfolioWithReview.review);
    const folioInfo = this.state.portfolioWithReview;
    return (
      <div className="user_container">
        <div className="nfo">
          <div>
            <span>Title:</span> {folioInfo.title}
          </div>
          <div className="avatar">
            <img alt="folio_image" src={folioInfo.imgUrl} />
          </div>
          <div>
            <span>Reviews:</span>
          </div>
          <ul className="list-group">{this.showfolioReviews(folioInfo)}</ul>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   console.log('state', state);
//   return {
//     portfolios: state.portfolios
//   };
// }

export default PortfolioView;
