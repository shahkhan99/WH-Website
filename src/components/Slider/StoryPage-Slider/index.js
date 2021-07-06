import React, { Component } from 'react'
import Slider from 'react-slick'
import './assets/styles/story_page_slider.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { MDBLink, MDBCollapse } from 'mdbreact'

export var NextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <img
      src={require('./assets/images/right.png')}
      onClick={onClick}
      style={{ width: '50px', height: 50 }}
    />
  )
}

export var PrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <img
      src={require('./assets/images/left.png')}
      onClick={onClick}
      style={{ width: '50px', height: 50 }}
    />
  )
}

export class StorySlider extends Component {
  constructor() {
    super()
    this.state = {}
  }

  onMouseOver = (text) => {
    document.getElementById(`sp-slide-mousein`).style.display = 'flex'
  }

  onMouseOut = (divNumber) => {
    document.getElementById(`sp-slide-mousein`).style.display = 'none'
  }

  renderCardContent = (title, subtitle, content,image) => {
    return (
      <div className="sp-slider-box-border-wrap">
        <div
          className="sp-slide"
          onMouseOver={(e) => {
              if(document.getElementById("sp-slide-mousein")){
                document.getElementById("sp-slide-mousein").remove();
              }
              if(!document.querySelector("sp-slide-mousein")){
                let p = document.createElement("p");
                p.setAttribute("class","sp-slide-mousein");
                p.setAttribute("id","sp-slide-mousein");  
                p.innerHTML = content;
                e.currentTarget.appendChild(p);
              } 
          }}
          onMouseOut={(e) => {
            e.currentTarget.removeChild(document.getElementById("sp-slide-mousein"))
          }}
        >
          <div className={'sp-slide-mouseout'} id={'sp-slide-mouseout'}>
            <img src={image} />
            <p>{title}</p>
            <p>{subtitle}</p>
          </div>
         
        </div>
      </div>
    )
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: window.innerWidth >= 425 ? 3 : 1,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: <NextArrow props={{ className: 'arrow-next' }} />,
      prevArrow: <PrevArrow props={{ className: 'arrow-prev' }} />,
      className: 'sp-slider',
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },

        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
    const { index, ...props } = this.props
    return (
      <Slider {...settings}>
        {this.renderCardContent(
          'Heart',
          'Work Hall hymns to ‘follow your heart’ and this sets the',
          `foundation for the work we do. We believe that only by looking
        deep inside our hearts can we find the real meaning in what we do.`,
        require('./assets/images/heart.png')
        )}

        {this.renderCardContent(
          `Progress`,
          `We strive to be innovative and push our limits to achieve what we`,
          `think is excellent work—progress matters when we all grow
          together. We strive to be innovative and push our limits to
          achieve greatness. Progress matters, and it is much more fun when
          you have a community to grow together with.`,
          require('./assets/images/progress.png')
        )}

        {this.renderCardContent(
          'Community',
          'Community is our heart and soul. We believe it can never be',
          `forced; it forms and flows naturally. At Work Hall, we try our
          best to uplift our members' spirits and amplify what they're doing
          by creating a positive environment where members and their work is
          understood and revered.`,
          require('./assets/images/community.png')
        )}

        {this.renderCardContent(
          `Faith`,
          `We believe that the best you can ever do for yourself is to`,
          `believe in yourself and what you want from life and then stick by
           it. It gets dirty, but there's always our community to lift you.
           `,
           require('./assets/images/heart.png')
        )}

        {this.renderCardContent(
          `Authenticity`,
          `We want to stay real and indigenous. We stay true to who we are`,
          `.
        and do not try to be someone we're not. We are beautifully
              imperfect in this imperfect world. We are not perfect. We accept
               our mistakes, even failure, and stand with unwavering conviction.
              We intend to stay real and indigenous. We stay true to who we are
              and do not try to be someone we are not.
        `,
        require('./assets/images/authenticity.png')
        )}

        {this.renderCardContent(
          `Humility`,
          `We keep our heads down but our guards up. We have empathy. We
          look`,
          ` out for each other because we know we're all human, and we can't
           do it alone. We pick each other up and keep moving forward as a 
           team.`,
          require('./assets/images/humility.png')
        )}

        {this.renderCardContent(
          `Hospitality`,
          ` Hospitality is embedded in the way we do things at Work Hall.
          For`,
          ` us, it is a way of showing love, care, and gratitude as one would 
          reciprocate in their homes. It is not the wooden desk inside your office 
          space, but the emotion that comes with it. That's what keeps us going.`,
          require('./assets/images/hospitality.png')
        )}

        {this.renderCardContent(
          `Belong`,
          `At Work Hall, there is something different and unique about all
          of`,
          `us, and the one thing that unites us is the universal human desire
           to connect, to be understood, and to belong. And that's precisely
          what it feels like. 
          `,
          require('./assets/images/BELONG-01.png')
        )}
      </Slider>
    )
  }
}
