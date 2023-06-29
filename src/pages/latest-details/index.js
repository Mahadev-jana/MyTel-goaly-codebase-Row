import React, { Component } from 'react';
import Iframe from 'react-iframe';
import { Link, withRouter } from 'react-router-dom';
import { post } from '../../api';
class LatestDetails extends React.Component {
          constructor(props) {
              super(props);
              this.state = {
                  newsLink:'',
                  content: ''
              }
          }
          componentDidMount() {
              this.getLatestDetails()
          }
          getLatestDetails = () => {
              const payload = new FormData();
              payload.append('id', this.props.match.params.id);
              post('getnewsbyid', payload)
                  .then(res => {
                      this.setState({newsLink: res.data.link, content: res.data.content});
                  })
                  .catch(err => console.log(err));
          }
        render() {
            const { newsLink, content } = this.state;
            return(
                <div className="page-content mt-10">
                    {/* <div dangerouslySetInnerHTML={{ __html: content }} style={{pointerEvents: 'none'}}></div> */}
                    {newsLink !== '' && <Iframe url={newsLink}
                        position="relative"
                        id="myId"
                        className="myClassname"
                        styles={{height: "-webkit-fill-available", width: "100vw"}}
                        allowFullScreen
                        readonly Document contentDocument
                    />}
                </div>
            );
        }
    };
    export default withRouter(LatestDetails);