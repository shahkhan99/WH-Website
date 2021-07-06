import React, { Component } from 'react'
import './assets/styles/academy_header.css'
import {Helmet} from "react-helmet";
import anime from 'animejs/lib/anime.es.js';
import {Link,animateScroll as scroll } from 'react-scroll';

export class AcademyHeader extends Component {
  constructor() {
    super()
    this.state = {
 
    }
  }


  componentDidMount() {
    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
        
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 200;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 700;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap {  font-weight: 900 !important; font-size: 30px; margin-left:0px}";
        document.body.appendChild(css);
    };

  }

  render() {
    return (
      <div className="academy-page-header">
        <section className="hero module ac-hero">
            {/* SLIDE 1 */}
            {/*  HERO SECTION - LEFT  */}
            <div className="wrapper ac-wrapper">
              <div className="left left-img">
                
                  
                
                <div className="a-header-img">
          <img className="ac-head-image" src={require('./assets/images/Capture.PNG')}  />
          </div>
                
              </div>
              {/*  HERO SECTION - RIGHT  */}
              <div className="right">
              <div className="a-header-details">
              <div>
              <h1 className="a-header-heading">
              Digital Learning for the
                Creative Economy
              </h1>
              </div>
              <div className="a-header-text">
              <p>
              We train today’s generation with the skills needed to
              work on mainstream technologies, softwares and
              programs with blended learning techniques taught
              through micro-courses and bootcamps.
              </p>
              </div>
              <div className="discover-course-btn" >
            <Link
             activeClass='active'
             to="ac-slider"
             spy={true}
             smooth={true}
             offset={0}
             duration={500}>
             Discover our courses

             </Link>
              <img src={require('./assets/images/nextarrow.png')} height='10px' width='8px' style={{marginLeft:'20px'}}/>
              </div>
              <div className="a-header-animated-text">
              <h2>Learn how to <span id="textme" className="a-header-animated-changed-text typewrite wrap" 
              data-type='["code your way up.",
                "build programming skills.",
                "design professional websites.",
                "develop apps and games.",
                "become a programmer.",
                "run an online store.",
                "speak in public.",
                "present professionally.",
                "start your own blog.",
                "become a content creator" ]'></span> </h2>
             
              </div>
          </div>
              </div>
            </div>
        </section>
      </div>
    )
  }
}



