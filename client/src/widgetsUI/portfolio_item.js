import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioItem = (item) => {
    return (
        <Link to={`/portfolios/${item._id}`} className="portfolio_item">
            <div className="portfolio_header">
                <h2>{item.title}</h2>
            </div>
            <div className="portfolio_items">
                <div className="portfolio_author">
                  <img src={item.imgUrl} alt="portfolio_image"/>
                </div>
               
                {/* <div className="portfolio_bubble">
                    <strong>Price</strong> $ {item.price}
                </div>

                <div className="portfolio_bubble">
                    <strong>Pages</strong>  {item.pages}
                </div>

                <div className="portfolio_bubble rating">
                    <strong>Rating</strong>  {item.rating}
                </div> */}

            </div>
        </Link>
    );
};

export default PortfolioItem;