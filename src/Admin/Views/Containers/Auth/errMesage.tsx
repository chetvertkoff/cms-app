import React from 'react';

const ErrMesage = (props) => {
  return (
    <div className="authErr bg-danger">
      {props.message}
    </div>
  );
}

export default ErrMesage;
