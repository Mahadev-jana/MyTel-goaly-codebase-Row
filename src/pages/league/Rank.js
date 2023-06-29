import React from 'react';
import Face1 from '../../assetsStaging/img/face.png';
import Face2 from '../../assetsStaging/img/face2.png';
import Face3 from '../../assetsStaging/img/face3.png';

const Rank = () => {
    return (
        <div className="tab-content">

            <div className="tag bg-dark d-flex text-white">
                <span style={{ width: "8%" }}>No.</span>
                <span>Goal Keepers</span>
                <span className="ml-auto bg-grey" style={{marginTop: 0}}>More</span>
            </div>
            <div className="league-player-rank block">
                <ul>
                    <li>
                        <span>1.</span>
                        <div className="desc">
                            <div className="cover-img"><img className="img-fluid" src={Face1} alt="" /></div>
                            <div>
                                <h5 className="m-0"><b>Player Name</b></h5>
                                <span>Chelsea</span>
                            </div>
                        </div>
                        <span>55</span>
                    </li>
                    <li>
                        <span>2.</span>
                        <div className="desc">
                            <div className="cover-img"><img className="img-fluid" src={Face2} alt="" /></div>
                            <div>
                                <h5 className="m-0"><b>Player Name</b></h5>
                                <span>Chelsea</span>
                            </div>
                        </div>
                        <span>13</span>
                    </li>
                    <li>
                        <span>3.</span>
                        <div className="desc">
                            <div className="cover-img"><img className="img-fluid" src={Face3} alt="" /></div>
                            <div>
                                <h5 className="m-0"><b>Player Name</b></h5>
                                <span>Chelsea</span>
                            </div>
                        </div>
                        <span>4</span>
                    </li>
                    <li>
                        <span>4.</span>
                        <div className="desc">
                            <div className="cover-img"><img className="img-fluid" src={Face1} alt="" /></div>
                            <div>
                                <h5 className="m-0"><b>Player Name</b></h5>
                                <span>Chelsea</span>
                            </div>
                        </div>
                        <span>23</span>
                    </li>
                </ul>
            </div>
            <div className="tag bg-dark d-flex text-white">
                <span style={{ width: "8%" }}>No.</span>
                <span>Defenders</span>
                <span className="ml-auto bg-grey"  style={{marginTop: 0}}>More</span>
            </div>
            <div className="league-player-rank block">
                <ul>
                    <li>
                        <span>1.</span>
                        <div className="desc">
                            <div className="cover-img"><img className="img-fluid" src={Face3} alt=""/></div>
                            <div>
                                <h5 className="m-0"><b>Player Name</b></h5>
                                <span>Chelsea</span>
                            </div>
                        </div>
                        <span>55</span>
                    </li>
                    <li>
                        <span>2.</span>
                        <div className="desc">
                            <div className="cover-img"><img className="img-fluid" src={Face2} alt=""/></div>
                            <div>
                                <h5 className="m-0"><b>Player Name</b></h5>
                                <span>Chelsea</span>
                            </div>
                        </div>
                        <span>13</span>
                    </li>
                    <li>
                        <span>3.</span>
                        <div className="desc">
                            <div className="cover-img"><img className="img-fluid" src={Face1} alt=""/></div>
                            <div>
                                <h5 className="m-0"><b>Player Name</b></h5>
                                <span>Chelsea</span>
                            </div>
                        </div>
                        <span>4</span>
                    </li>
                    <li>
                        <span>4.</span>
                        <div className="desc">
                            <div className="cover-img"><img className="img-fluid" src={Face3} alt=""/></div>
                            <div>
                                <h5 className="m-0"><b>Player Name</b></h5>
                                <span>Chelsea</span>
                            </div>
                        </div>
                        <span>23</span>
                    </li>
                    </ul>
                    </div>

        </div>
    )
}
export default Rank;