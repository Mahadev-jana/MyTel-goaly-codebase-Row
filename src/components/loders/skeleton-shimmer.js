import React from 'react';
import Skeleton from 'react-loading-skeleton';
class Blogpost extends Component {
    render() {
      return (
        <div style={{ fontSize: 20, lineHeight: 2 }}>
          <h1><Skeleton />}</h1>
          {<Skeleton count={10} />}
        </div>
      );
    }
  }
  export default Blogpost;