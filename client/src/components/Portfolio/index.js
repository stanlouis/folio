import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import { Route } from 'react-router-dom';

class PortfolioView extends Component {
  state = {
    portfolioWithReview: '',
    overall_rating: 0,
    content_rating: 0,
    design_rating: 0,
    responsiveness_rating: 0,
    review_post: ''
  };
  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`/api/portfolio/notes/${id}`).then(res => {
      const portfolioWithReview = res.data;
      this.setState({ portfolioWithReview });
    });
  }
  showFolioReviews = folioInfo =>
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

  onStarClick(nextValue, prevValue, name) {
    this.setState({
      overall_rating: nextValue
    });
  }

  onStarClickContent(nextValue, prevValue, name) {
    this.setState({
      content_rating: nextValue
    });
  }

  onStarClickDesign(nextValue, prevValue, name) {
    this.setState({
      design_rating: nextValue
    });
  }

  onStarClickResponsiveness(nextValue, prevValue, name) {
    this.setState({
      responsiveness_rating: nextValue
    });
  }

  handleInput = event => {
    this.setState({
      review_post: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let id = this.props.match.params.id;
    const review = {
      review_post: this.state.review_post,
      overall_rating: this.state.overall_rating,
      content_rating: this.state.content_rating,
      design_rating: this.state.design_rating,
      responsiveness_rating: this.state.responsiveness_rating,
      _portfolio_id: id
    };

    axios.post(`/api/review/${id}`, { ...review }).then(response => {
      return response => response.data;
    });
    window.location.reload();
  };

  render() {
    const folioInfo = this.state.portfolioWithReview;
    return (
      <div className="user_container">
        <div className="nfo">
          <div>
            <span>Title:</span> {folioInfo.title} <br/>
            {/* Need a fix */}
            <a href={`${folioInfo.url}`}>Portfolio Link</a>
  
          </div>
          <div className="avatar">
            <img alt="folio_image" src={folioInfo.imgUrl} />
          </div>
          <div>
            <div className="rl_container article">
              <form onSubmit={this.handleSubmit}>
                <h2>Submit Portfolio Review</h2>
                <span>
                  <h2>Overall Rating:</h2>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={this.state.overall_rating}
                    onStarClick={this.onStarClick.bind(this)}
                  />
                </span>
                <span>
                  <h2>Content Rating:</h2>
                  <StarRatingComponent
                    name="rate2"
                    starCount={5}
                    value={this.state.content_rating}
                    onStarClick={this.onStarClickContent.bind(this)}
                  />
                </span>
                <span>
                  <h2>Design Rating:</h2>
                  <StarRatingComponent
                    name="rate3"
                    starCount={5}
                    value={this.state.design_rating}
                    onStarClick={this.onStarClickDesign.bind(this)}
                  />
                </span>
                <span>
                  <h2>Responsiveness Rating:</h2>
                  <StarRatingComponent
                    name="rate4"
                    starCount={5}
                    value={this.state.responsiveness_rating}
                    onStarClick={this.onStarClickResponsiveness.bind(this)}
                  />
                </span>
                <hr />
                <textarea
                  value={this.state.review_post}
                  onChange={event => this.handleInput(event)}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
          <div>
            <span>Reviews:</span>
          </div>
          <ul className="list-group">{this.showFolioReviews(folioInfo)}</ul>
        </div>
      </div>
    );
  }
}

export default PortfolioView;
