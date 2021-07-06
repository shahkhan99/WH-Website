import React, { Component } from 'react'
import './assets/blog.css'
import { GetAllBlog } from '../../Services/Admin-Service'
import Loader from 'react-loader-spinner'
export default class Blog extends Component {
  state = {
    blogs: [],
    loader: true,
  }
  componentDidMount() {
    this.FetchBlogs()
  }
  FetchBlogs = () => {
    GetAllBlog('all').then((docs) => {
      this.setState({ blogs: docs, loader: false })
    })
  }
  render() {
    return (
      <div>
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
          <div className="c-blog-div">
            {this.state.blogs.map((cont, index) => {
              return (
                <div
                  class={index % 2 == 0 ? 'c-content-div' : 'c-content-div1'}
                >
                  <div class={`c-content-blue c-blog${index % 4}`}>
                    <div>
                      <h1 class="c-blog-heading">
                        {cont.heading.substring(0, 60)} ...
                      </h1>
                    </div>
                    <div>
                      <p class="blog-para">
                        {' '}
                        {cont.blog[0].substring(0, 100)}...
                      </p>
                    </div>
                    <div
                      class="c-blog-read"
                      onClick={() => window.open(`/blogs/${cont.id}`, '_self')}
                    >
                      Read More
                    </div>
                  </div>
                  <div class="abc">
                    <div class="c-blog-img">
                      <img src={cont.images[0]} class="c-blog-imgs" />
                    </div>
                    <div
                      class={
                        index % 2 == 0
                          ? 'c-blog-img1 c-blog-img-odd'
                          : 'c-blog-img1 c-blog-img-even'
                      }
                    ></div>
                    <div></div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}
