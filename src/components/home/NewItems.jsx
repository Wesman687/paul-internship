import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const options = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    850: {
      items: 3,
    },
    1050: {
      items: 4,
    },
  },
};
const NewItems = () => {
  const [loading, setLoading] = useState(false);
  const [nftApi, setNftApi] = useState([]);
  const [time, setTime] = useState(new Date());


  async function fetchApi() {
    setLoading(true);
    const data = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    const response = data.data;
    setNftApi(response);
    setLoading(false);
  }

  
  useEffect(() => {
    fetchApi();    
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
  return () => clearInterval(interval);
  }, []);
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
            className="owl-theme owl-dot-off owl-loaded "          
            {...options}
            key={loading ? "loading" : "loaded"} >            
            {loading ? (
              new Array(4).fill(0).map((array, index) => (
                <div className="nft_item_wrap skele-wrappper" key={index}>
                  <div className="nft__item">
                    <div className="nft__item_wrap">
                      <a href="/">
                        <Skeleton width="100%" height="200px" />
                      </a>
                    </div>
                    <div className="nft_coll_pp">
                      <a href="/">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </a>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info skele_center">
                      <a href="/" className="">
                        <Skeleton width="100px" height="20px" />
                      </a>
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
                nftApi.map((array, index) => (
                  <div className="nft_coll new_container" key={index}>
                    <div className="nft__item new_item">
                      <div className="author_list_pp new_author">
                        <Link
                          to={`/author/${array.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy lazy-img"
                            src={array.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {(array.expiryDate - time) > 0 &&
                      <div className="de_countdown">                        
                      <span>{(Math.floor(((((array.expiryDate - time) / 1000))/60)/60))}</span><span>h </span>
                      <span>{(Math.floor(((((array.expiryDate - time) / 1000))/60)%60))}</span><span>m </span>
                      <span>{(Math.floor(((array.expiryDate - time) / 1000))%60)}</span><span>s</span>                      
                      </div>}
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${array.nftId}`}>
                          <img
                            src={array.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${array.nftId}`}>
                          <h4>Pinky Ocean</h4>
                        </Link>
                        <div className="nft__item_price">{array.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{array.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </OwlCarousel>          
          <div className="navbar-left"></div><div className="navbar-right"></div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
