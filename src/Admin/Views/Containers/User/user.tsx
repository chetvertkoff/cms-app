import React from 'react';
import Title from './../common/title/title';

const User = (props) => {
  return (
    <div>
      <Title title={'Профиль'} classN={"fa-file-text"} {...props}/>
      <div className="row f">
        <div className="col-md-12">
          <div className="tile row">
          </div>
        </div>
      </div>
    </div>
  );
}

export default User
