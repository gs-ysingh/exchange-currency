import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import updateExchangeRates from '../actions/updateExchangeRates';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { addCurrencyProperties } from '../utils/conversionHelper';
import './home.scss';

const Background = require('../images/background.png');

interface Props {
	balance: Array<{currencyCode: string, amount: number}>,
	updateExchangeRates: () => void
}

class Home extends React.Component<Props, {}> {
	componentDidMount() {
		setInterval(() => {
			this.props.updateExchangeRates();
		}, 10000);
	}

	render() {
		const { balance } = this.props;
		return (
			<div className='container'>
				<Carousel
					showStatus={false}
					showThumbs={false}
				>
					{
						balance && balance.map((bal, index) => {
							const currencyProps: { alias: string, fullName: string, currencyCode: string } 
								= addCurrencyProperties(bal.currencyCode);
							return (
								<div key={index	}>
									<img src={Background} />
									<div className="legend">
										<div className="amount-row">
											<span>{currencyProps.alias}</span>
											<span>{bal.amount}</span>
										</div>
										<div className="props-row">{currencyProps.currencyCode} - {currencyProps.fullName}</div>
									</div>
								</div>
							);
						})
					}
				</Carousel>
				<div className="nav-bar">
					<Link to="/exchange" className="exchange">Exchange</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    balance: state.balance,
  };
}

const mapDispatchToProps = (
  dispatch,
) => ({
	updateExchangeRates: () => dispatch(updateExchangeRates())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);