import React,{Component} from 'react';
import axios from '../../../_config/axios';

class News extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }

    componentDidMount(){
        const payload = new FormData();
        payload.append('comp_id', props.id);
        axios.post('/allLeagueNews', payload).then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log({ err });
        })
    }


    render(){
        return(
            <div>hello</div>
        )
    }
}
export default News;
