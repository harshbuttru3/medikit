import React from 'react';
import './Social.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub} from '@fortawesome/free-brands-svg-icons'
function Social() {
    return (
        <div id='Social'>
            <div id="link">
                <a href="https://www.instagram.com/script.ext/?utm_source=qr&igsh=MTA3MXZobGtwbGF3dg%3D%3D" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className='social-icon insta' />

                </a>
                <a href="https://www.facebook.com/people/Aman-Kumar/pfbid02bsZQu17EvNB6ppF5vKGRZmV4M1L8iGUF8PQ3czJGGNFxeXXo7tepVnbaxpBHGXNel/?mibextid=kFxxJD" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} className='social-icon facebook' />

                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} className='social-icon linkedin' />

                </a>
                <a href="https://github.com/amannu113114" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} className='social-icon github' />

                </a>

            </div>
        </div>
    )
}

export default Social