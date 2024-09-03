import React, { Component, createRef } from 'react';
import './landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.nextRef = createRef();
    this.prevRef = createRef();
    this.carouselRef = createRef();
    this.sliderRef = createRef();
    this.thumbnailBorderRef = createRef();
    this.timeRef = createRef();

    this.timeRunning = 2000;
    this.timeAutoNext = 7000;

    // Titles and images array
    this.items = [
      { title: "OPD's", img: 'opd.jpg' },
      { title: "Blood", img: 'blood2.jpg' },
      { title: "Ambulance", img: 'ambulance.jpg' },
      { title: "Bed", img: 'bed.png' }
    ];
  }

  componentDidMount() {
    // DOM Elements
    const nextDom = this.nextRef.current;
    const prevDom = this.prevRef.current;
    const carouselDom = this.carouselRef.current;
    const sliderDom = this.sliderRef.current;
    const thumbnailBorderDom = this.thumbnailBorderRef.current;

    // Auto-next functionality
    let runTimeOut;
    let runNextAuto = setTimeout(() => {
      nextDom.click();
    }, this.timeAutoNext);

    const showSlider = (type) => {
      const sliderItemsDom = sliderDom.querySelectorAll('.item');
      const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

      // Move both slider and thumbnail items together
      if (type === 'next') {
        sliderDom.appendChild(sliderItemsDom[0]); // Move first to last in slider
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]); // Move first to last in thumbnails
        carouselDom.classList.add('next');
      } else {
        sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]); // Move last to first in slider
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]); // Move last to first in thumbnails
        carouselDom.classList.add('prev');
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
      }, this.timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextDom.click();
      }, this.timeAutoNext);
    };

    // Event listeners
    nextDom.onclick = () => {
      showSlider('next');
    };

    prevDom.onclick = () => {
      showSlider('prev');
    };
  }

  render() {
    return (
      <>
        <div className="carousel" ref={this.carouselRef}>
          <div className="list" ref={this.sliderRef}>
            {/* Carousel items */}
            {this.items.map((item, index) => (
              <div className="item" key={index}>
                <img src={`/image/${item.img}`} alt={`Slide ${index + 1}`}></img>
                <div className="content">
                  <div className="author">MEDIKIT</div>
                  <div className="title">{item.title}</div>
                  <div className="topic">SERVICES</div>
                  <div className="des">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat in omnis sit facilis nobis a iusto maiores, rem sunt, quisquam molestiae!
                  </div>
                  <div className="buttons">
                    <button>EXPLORE</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="thumbnail" ref={this.thumbnailBorderRef}>
            {/* Thumbnail items */}
            {this.items.map((item, index) => (
              <div className="item" key={index}>
                <img src={`/image/${item.img}`} alt={`Thumbnail ${index + 1}`} />
                <div className="content">
                  <div className="title">{item.title}</div>
                  <div className="description">Description</div>
                </div>
              </div>
            ))}
          </div>

          <div className="arrows">
            <button id="prev" ref={this.prevRef}><i className="fa-solid fa-angle-left"></i></button>
            <button id="next" ref={this.nextRef}><i className="fa-solid fa-angle-right"></i></button>
          </div>

          <div className="time" ref={this.timeRef}></div>
        </div>
      </>
    );
  }
}

export default Landing;
