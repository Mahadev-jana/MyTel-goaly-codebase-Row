import React from 'react';
import { isArray, slice, size } from 'lodash';
import axios from '../../../_config/axios';
import PartTeam from './PartTeam';
import loader from '../../../assets/loader/loaderspinner.gif'

const Matches = React.memo((props) => {
	const [isLoading, setIsLoaading] = React.useState(true);
	const [matches, setMatches] = React.useState([]);
	const [limit, setLimit] = React.useState(10);
	// console.log(this.props.id )
	React.useEffect(() => {
		setMatches([]);
		setIsLoaading(true);
		const payload = new FormData();
		payload.append('comp_id', props.id);
		axios.post('match', payload).then(res => {
			if (res.data && res.data.success && res.data.success == 1) {
				if (res.data.matches && isArray(res.data.matches)) {
					setMatches(res.data.matches);
					setIsLoaading(false);
				}
			} else {
				setIsLoaading(false);
			}
		}).catch(err => {
			console.log({ err });
			setIsLoaading(false);
			
		})
	}, [props.id]);
	console.log(props.id)
	return (
		
		<div class="part">
			{isLoading && <> <div class="col-xs-4">
			</div>
				<div class="col-xs-4" style={{ minHeight: 200, textAlign: 'center', marginTop: 100 }}>
					<img src={loader} alt="" style={{ height: 60 }} />
				</div> </>
			}
			{!isLoading && matches.lenth == 0 &&
				<div class="col-xs-12 col-md-12" style={{ fontSize: 15, fontWeight: 600, marginTop: '50%', textAlign: 'center' }}>
					No match found
			</div>
			}
			{matches && slice(matches, 0, limit).map((match, key) => {
				{/* console.log(match) */}
				return <PartTeam key={key} {...match} userId={props.id}/>
			})}
			{limit < size(matches) - 1 && <div class="text-center">
				<a class="btn btn-who" onClick={() => setLimit(prevLimit => prevLimit + 10)}>Show More</a>
			</div>}
			<div class="clearfix"></div>
		</div>
	);
});

export default Matches;