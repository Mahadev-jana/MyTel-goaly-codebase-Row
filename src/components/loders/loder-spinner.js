import React from 'react';
import Loader from 'react-loader-spinner';
class LoaderSpinner extends React.Component {
  //other logic
    render() {
     return(
         <div style={{padding: '105px',background: 'white'}}>

         
      <Loader
         type="Puff"
         color="#00BFFF"
         height={70}
         width={100}
        //  timeout={3000} //3 secs
 
      />
      </div>
     );
    }
 }
 export default LoaderSpinner;