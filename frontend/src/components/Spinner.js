import React from 'react';
import LoadingIcons from 'react-loading-icons';

function Spinner() {

  return (
    <div className='loadingSpinnerContainer'>
        <LoadingIcons.ThreeDots fill="#000000" />
    </div>
  )
}

export default Spinner