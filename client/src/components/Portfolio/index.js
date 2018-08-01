import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';

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
    console.log(this.props.match.params.id);
    let id = this.props.match.params.id;
    axios.get(`/api/portfolio/notes/${id}`).then(res => {
      const portfolioWithReview = res.data;
      this.setState({ portfolioWithReview });
    });

    axios.post(`/api/review/${id}`).then(res => {
      // todo
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

  handleInput = (event) => {
    this.setState({
      review_post: event.target.value
    });
  };

  render() {
    console.log('state', this.state);
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
            <div className="rl_container article">
              <form onSubmit={this.submitForm}>
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

// function mapStateToProps(state) {
//   console.log('state', state);
//   return {
//     portfolios: state.portfolios
//   };
// }

export default PortfolioView;
