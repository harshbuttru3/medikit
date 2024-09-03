import React from 'react'
import './Highlights.css'
import FontAwesomeIcon from 'react-fontawesome'

function Highlights() {
  return (
    <div id='Highlights'>
        <div className="Highlightsbg">
            <h1><span>HIGHLIGHTS</span></h1>
            <div className="Highlightscontent">
                <div className="dash">
                    Number of Regsiter on our site <br />: 999+
                </div>
                <div className="dash">
                <FontAwesomeIcon icon="fa-solid fa-droplet" style={{color: "#e01b24",}} />Blood availability<br />: 999+
                </div>
                <div className="dash">
                    Online appointment booked today<br />: 999+
                </div>
                <div className="dash">
                    Total appointment till now<br />: 999+
                </div>
            </div>
        </div>
    </div>
  )
}

export default Highlights