import React, { useState } from 'react';
import {Helmet} from 'react-helmet';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemPanel,
	AccordionItemButton
} from 'react-accessible-accordion';
import { isArray } from 'lodash';
import axios from '../../_config/axios';
import ContentLoader from '../../loader/content-loader';
import icon from '../../assets/img/logo-goaly.png';

const FrequentlyAskedQuestions = () => {
	const [faq, setFaq] = useState([]);
	const [isLoading, setLoading] = useState(false);

	React.useEffect(() => {
		getFaq();
	}, []);

	const getFaq = () => {
		setLoading(true);
		axios.post('api/getfaq').then(res => {
			if (res.data && res.data.success && res.data.success == 1) {
				if (res.data.faq && isArray(res.data.faq)) {
					setFaq(res.data.faq);
				}
			}
			setLoading(false);
		}).catch(err => {
			setLoading(false);
		});
	}

	return (
		<React.Fragment>
			{/* <Helmet>
                    <title> Goaly | FAQ </title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
		
		<Row className="mt-5">
			<Col xs={12} className="ct">
				<div className="mb-10">
					<div className="part ml15">
						<div className="series-title">FAQ</div>
					</div>
					<div className="pd-5">
						<Accordion allowZeroExpanded={true}>
							{faq.map((data, key) => (
								<AccordionItem key={key}>
									<AccordionItemHeading>
										<AccordionItemButton>{data.faq_question}</AccordionItemButton>
									</AccordionItemHeading>
									<AccordionItemPanel dangerouslySetInnerHTML={{ __html: data.faq_answer }} />
								</AccordionItem>
							))}
						</Accordion>
						{isLoading && <ContentLoader />}
						<div className="clearfix"></div>
					</div>
				</div>
			</Col>
		</Row>
		</React.Fragment>
	);
}

export default withRouter(FrequentlyAskedQuestions);