import React from 'react'
import './Homefeature.css'

function Homefeature() {
  return (
    <div id="onlineregistration">
            <div className="container">
                <h1 className="title">Features of Online Registration System</h1>
                <p className="description">
                    <span id="company"> MEDIKIT</span> is a framework to link various hospitals across the country for <span
                        className="option">online OPD</span>,<span className="option"> bed availability</span>,<span className="option">
                        blood requirement</span>,<span className="option"> blood donation</span>,<span className="option"> live tracking
                        ambulances</span> system for better and relief approachable hospital resources where counter based
                    registration and appointment system through Hospital Management Information System (HMIS) has been
                    digitalized easily. Portal facilitates online appointments with various departments of different Hospitals
                    and was initiated with <span id="sih">Smart India Hackathon (SIH)</span>.
                </p>

                <div className="features">
                    {/* Feature 1: Simple Appointment Process */}
                    <div className="feature-card">
                        <h3>Simple Appointment Process</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, assumenda. Quam, maxime assumenda pariatur sequi molestiae aliquam explicabo atque libero quibusdam, ducimus adipisci odit necessitatibus asperiores ullam voluptatibus quis eaque? Iure consectetur ipsam reprehenderit distinctio tenetur alias ipsum et, incidunt dolorum laboriosam corporis consequuntur modi!
                        </p>
                    </div>

                    {/* Feature 2: Hospital On Boarding */}
                    <div className="feature-card">
                        <h3>Hospital Bed Availability</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam repellat praesentium sunt aut minus dicta eius ab cum aspernatur ducimus. Sequi nisi vero, quo tempore iste ab consequatur dolor iure accusantium fugit illo ea eligendi aperiam ut reprehenderit fuga corrupti odit inventore dolorem, ipsa eos.
                        </p>
                    </div>

                    {/* Feature 3: Dashboard Reports */}
                    <div className="feature-card">
                        <h3>Patient Reports</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium fugiat aperiam quidem ipsum facilis eum, eligendi, blanditiis doloremque molestias laboriosam adipisci nam animi eaque. Laborum, facilis ipsum, ut doloribus necessitatibus, reiciendis illum dolorum ipsa est minima tenetur atque accusamus molestias officia quia ea dolorem cupiditate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homefeature