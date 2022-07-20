import React from 'react';
// import playStore from "../../../images/playStore.png";
// import appStore from "../../../images/Appstore.png";
import "./footer.css"
const Footer = () => {
  return (
    <>
      <footer id='footer'>
          <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App from Android and ios mobile phones</p>
            {/* <img src ={playStore} alt="playstore"></img>
            <img src ={appStore} alt="appstore"></img> */}
            </div>

            <div className='midFooter'>
                <h1>Ecommerce</h1>
                <p>High Qaulity is our first priority</p>
            
                <p>Copyrights 2022 &copy; MaulikP712</p>
            </div>
        
            <div className='rightFooter'>
                <h4>Follow Us </h4>
                <a href="http://instagram.com/maulik">Instagram</a>
                <a href="https://www.linkedin.com/in/maulik-prajapati-4a23bb1a3/">LinkedIn</a>
                <a href="https://github.com/dragonStar712">Github</a>
            </div>
      </footer>
    </>
  )
}

export default Footer
