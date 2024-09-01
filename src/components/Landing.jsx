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

    this.timeRunning = 3000;
    this.timeAutoNext = 7000;
  }

  componentDidMount() {
    // DOM Elements
    const nextDom = this.nextRef.current;
    const prevDom = this.prevRef.current;
    const carouselDom = this.carouselRef.current;
    const sliderDom = this.sliderRef.current;
    const thumbnailBorderDom = this.thumbnailBorderRef.current;
    const timeDom = this.timeRef.current;

    // Append first thumbnail item to the end
    const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

    // Auto-next functionality
    let runTimeOut;
    let runNextAuto = setTimeout(() => {
      nextDom.click();
    }, this.timeAutoNext);

    const showSlider = (type) => {
      const sliderItemsDom = sliderDom.querySelectorAll('.item');
      const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

      if (type === 'next') {
        sliderDom.appendChild(sliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
      } else {
        sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
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
            {['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'].map((img, index) => (
              <div className="item" key={index}>
                <img src={`/src/components/image/${img}`} alt={`Slide ${index + 1}`}></img>
                <div className="content">
                  <div className="author">MEDIKIT</div>
                  <div className="title">TITLE {index + 1}</div>
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
            {['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'].map((img, index) => (
              <div className="item" key={index}>
                <img src={`/src/components/image/${img}`} alt={`Thumbnail ${index + 1}`} />
                <div className="content">
                  <div className="title">TITLE {index + 1}</div>
                  <div className="description">Description</div>
                </div>
              </div>
            ))}
          </div>

          <div className="arrows">
            <button id="prev" ref={this.prevRef}><i class="fa-solid fa-angle-left"></i></button>
            <button id="next" ref={this.nextRef}><i class="fa-solid fa-angle-right"></i></button>
          </div>

          <div className="time" ref={this.timeRef}></div>
        </div>
      </>
    );
  }
}

export default Landing;
