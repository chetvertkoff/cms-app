import React from 'react';

const PageLoadPreloader = () => {
  return (
    <div className="pageLoadPreloader">
      <div className="overlay preloader">
        <div className="m-loader mr-4">
            <svg className="m-circular" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="10" fill="none" strokeWidth="2" strokeMiterlimit="10"></circle>
            </svg>
          </div>    
        </div>
    </div>
  );
}

export default PageLoadPreloader
