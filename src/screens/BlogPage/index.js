import React, { Component } from "react";
import "./assets/blog-Details.css";
import { GetOneBlog } from "../../Services/Admin-Service";
import {
  FacebookShareCount,
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { Link } from "react-router-dom";

// Loader
import Loader from "react-loader-spinner";

import BookATourModal from "../../components/BookATourModal/index";
//Footer
import Footer from "../../components/Footer/index";
// Side Drawer
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/BackDrop/BackDrop";
//Nav
import Nav from "../../components/Nav/index";
import { lazyload } from "react-lazyload";

lazyload({
  height: 200,

  offset: 100,
});

export default class BlogPage extends Component {
  state = {
    blog: [],
    bookATour: false,
    sideDrawerOpen: false,
    loader: true,
    text: "",
  };
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }
  academyLinkPara = (para) => {
    const academyKeywords = [
      "online courses in pakistan",
      "online courses websites",
      "online courses with certificates",
      "how can i learn online",
      "online education system",
      "best certified courses in pakistan",
      "institutes in pakistan for online courses",
      "online training for",
      "Online course providers",
      "online academy",
      "online institute",
      "learn wordpress",
      "learn coding",
      "learn graphic designing online",
      "learn python online",
      "learn swift online",
      "learn html and css",
      "learn react native online live online courses",
      "learn illustrator",
      "learn photoshop",
      " live online classes",
      "online classes on zoom",
      "online education",
      " online course viewer",
      "online course syllabus",
      "online learning accessible",
      " online course creation",
      "online learning platform",
      "online learning price",
      "stay home and learn",
      "online course list",
      "online courses",
      "education gets easy",
      "learning on your fingertips",
      "online certified courses",
      "online courses with certificates",
      "online learning karachi",
      "online academy pakistan",
      "online courses",
      "online courses pakistan",
      "online course catalogue",
      "online learning tips",
      "online learning vs class learning",
      "online learning covid",
      "learn online during pandemic",
      "learn web development online",
      "online web development course",
      "online public speaking course",
      "online design courses",
      "online web designing courses",
      "online learning benefits",
      "learn design in 8 weeks",
      "learn public speaking in 3 weeks",
      "online learning initiative",
      "online learning vs pandemic",
      "Elearning",
      "Work Hall",
      "co-working spaces",
      "co-space",
      "shared office spaces",
      "shared office space",
      "shared work space",
      "coworking spaces",
      "Coworking Spaces",
      "Coworking spaces",
    ];
    const final = academyKeywords.reduce(
      (prev, word) => {
        const newWords = [];
        const reg = new RegExp(this.escapeRegExp(word), "gi");
        let index;

        prev.forEach((e) => {
          // Only match for element which is string, if it is not string,
          // it's already processed(like span or something)
          if (typeof e === "string") {
            const wordLength = word.length;
            let matched = false;

            do {
              const { index } = reg.exec(e) || {};

              // Keep matching till no more matches found
              if (index !== undefined) {
                newWords.push(e.substr(0, index));

                // You can also directly use span here instead of React.createElement
                const h = e.split(":");
                if (h.length > 1) {
                  newWords.push(
                    <h1>{e.split(":")[0].substr(index + wordLength)}</h1>
                  );
                }
                if (
                  e.substr(index, wordLength) == "Work Hall" ||
                  e.substr(index, wordLength) == "co-working spaces" ||
                  e.substr(index, wordLength) == "co-space" ||
                  e.substr(index, wordLength) == "shared office spaces" ||
                  e.substr(index, wordLength) == "shared office space" ||
                  e.substr(index, wordLength) == "shared work space" ||
                  e.substr(index, wordLength) == "coworking spaces"
                  ||
                  e.substr(index, wordLength) == "Coworking spaces"||
                  e.substr(index, wordLength) == "Coworking Spaces"
                ) {
                  newWords.push(
                    <a href="https://www.workhall.co">
                      {e.substr(index, wordLength)}
                    </a>
                  );
                } else {
                  newWords.push(
                    <a href="https://www.workhall.co/academy">
                      {e.substr(index, wordLength)}
                    </a>
                  );
                }
                newWords.push(e.substr(index + wordLength));

                matched = true;
              }
            } while (index);
            if (!matched) {
              newWords.push(e);
            }
          } else {
            newWords.push(e);
          }
        });
        return newWords;
      },
      [para]
    );
    console.log(final);

    return final;
  };
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  componentDidMount() {
    this.FetchOneBlog();
  }
  FetchOneBlog() {
    let a = [];
    const { id } = this.props.match.params;
    GetOneBlog({ id }).then((data) => {
      a.push(data);
      this.setState({ blog: a, loader: false });
    });
  }
  render() {
    let { text } = this.state;
    let sideDrawer;
    let backdrop;
    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        {
          <BookATourModal
            open={this.state.bookATour}
            close={() => {
              this.setState({ bookATour: false });
            }}
          />
        }
        <Nav
          activeScreen=" "
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        {this.state.loader ? (
          <div className="revealer-wrapper-load">
            <Loader
              type="BallTriangle"
              secondaryColor="green"
              color="#ca312b"
              height={100}
              width={100}
              // timeout={3000}
            />
          </div>
        ) : (
          <div class="blog-container">
            {this.state.blog.map((data, index) => {
              return (
                <div className="blogs-page">
                  <div class="blog-head">
                    <h1 class="blog-heading">{data.heading}</h1>
                  </div>
                  <div class="Blog-img-div">
                    <img class="blog-img" src={data.images[0]}></img>
                  </div>
                  {/* Bloger Info */}
                  <div class="Blog-blogger-box">
                    <div>
                      <img class="Blogger-img" src={data.images[1]}></img>
                    </div>
                    <div class="blogger-detail">
                      <p>Written By</p>
                      <p>{data.writtenBy}</p>
                    </div>
                  </div>
                  {/* Bloger Info */}
                  {/* Blog Para */}
                  <div class="blog-paras">
                    {data.blog.map((para, i) => {
                      const pa = this.academyLinkPara(para);
                      return <p>{pa}</p>;
                    })}
                  </div>
                  <div class="b-colors-div">
                    <div class="b-blue">
                      <p class="b-tags">{data.bestFor[0]}</p>
                    </div>
                    <div class="b-green">
                      <p class="b-tags">{data.bestFor[1]}</p>
                    </div>
                    <div class="b-red">
                      <p class="b-tags">{data.bestFor[2]}</p>
                    </div>
                    <div class="b-yellow">
                      <p class="b-tags">{data.bestFor[3]}</p>
                    </div>
                    <div class="b-purple">
                      <p class="b-tags">{data.bestFor[4]}</p>
                    </div>
                  </div>
                  <div class="share-div">
                    <div class="share">
                      <h3 class="share-text"> Share To: </h3>
                      <div>
                        <FacebookShareButton
                          url={`https://workhall.co/blogs/${this.props.match.params}`}
                          title="Share On Facebook"
                          class="b-social-btn"
                        >
                          <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                      </div>
                      <div>
                        <LinkedinShareButton
                          url={`https://workhall.co/blogs/${this.props.match.params}`}
                          title="Share On Linkedin"
                          class="b-social-btn"
                        >
                          <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton>
                      </div>
                      <div>
                        <TwitterShareButton
                          url={`https://workhall.co/blogs/${this.props.match.params}`}
                          title="Share On Twitter"
                          class="b-social-btn"
                        >
                          <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <section className="module">
          <div className="want-to-know-more">
            <div className="want-to-know-more-content">
              <h3>Want to know more?</h3>
              <a
                className="button primary lg"
                onClick={() => {
                  this.setState({ bookATour: !this.state.bookATour });
                }}
              >
                BOOK A TOUR
              </a>
            </div>
          </div>
        </section>
        {/*  RAINBOW DIVIDER  */}
        <div className="rainbow-divider module"></div>
        {/* FOOTER SECTION */}
        <Footer />
      </div>
    );
  }
}
