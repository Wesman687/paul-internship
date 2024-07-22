import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState([]);
  const [followers, setFollowers] = useState("");
  const [follower, setFollower] = useState(false)
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    setLoading(true);
    const data = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    const result = data.data;
    
    setAuthor(result);
    setLoading(false);    
    setFollowers(author.followers)
  }
  function decrementFollower(){    
    setFollower(false)
    setFollowers(followers - 1)

  }
  function increaseFollower(){   
    setFollower(true) 
    setFollowers(followers + 1)
  }


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(AuthorBanner) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      {follower? <button onClick={()=>decrementFollower()} className="btn-main">
                        Un Follow
                      </button> :<button onClick={()=>increaseFollower()} className="btn-main">
                        Follow
                      </button>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author }/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
