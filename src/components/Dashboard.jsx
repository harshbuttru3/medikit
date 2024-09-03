import React from 'react'
import './Dashboard.css'
import FontAwesomeIcon from 'react-fontawesome'

function Dashboard() {
  return (
    <div id='dashboard'>
        <div className="dashboardbg">
            <h1><span>HIGHLIGHTS</span></h1>
            <div className="dashboardcontent">
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

export default Dashboard