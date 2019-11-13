import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import exchangeCurrency from '../actions/exchangeCurrency';
import updateExchangeRates from '../actions/updateExchangeRates';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { addCurrencyProperties } from '../utils/conversionHelper';
import './exchange.scss';

const Background = require('../images/background.png');

interface Props {
	balance: Array<{currencyCode: string, amount: number}>,
	rates: {
		base: string,
		rates: any
	},
	exchangeCurrency: ({}) => {}
	updateExchangeRates: () => void
}

interface State {
	sourceSelectedItem: number,
	sourceCurrencyCode: string,
	sourceAmount: string,
	destinationCurrencyCode: string,
	destinationAmount: string,
	destinationSelectedItem: number
}

class Exchange extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			sourceCurrencyCode: 'USD',
			sourceAmount: '',
			sourceSelectedItem: 0,
			destinationCurrencyCode: 'USD',
			destinationAmount: '',
			destinationSelectedItem: 0
		}
	}

	getRates = (value: number, source: string, target: string, sign: string): string => {
		const { rates } = this.props.rates;
		const reverseSign = sign === '+' ? '-' : '+';
		return reverseSign + Math.round(Math.abs(value) * (rates[target] / rates[source]) * 100) / 100;
	}

	exchangeCurrency = () => {
		if(this.state.sourceSelectedItem !== this.state.destinationSelectedItem) {
			this.props.exchangeCurrency({
				currencyCode: this.state.sourceCurrencyCode,
				amount: this.state.sourceAmount,
			});

			this.props.exchangeCurrency({
				currencyCode: this.state.destinationCurrencyCode,
				amount: this.state.destinationAmount,
			});
		}
	}

	onSourceInputChange = (e) => {
		const re = /^(?:-|\+)?(0|[1-9]\d*)?(\.[0-9]?[0-9])?$/;
		if (e.target.value === ''
			|| (e.target.value && e.target.value[e.target.value.length - 1] === '.')
			|| re.test(e.target.value)) {
			if (e.target.value === '' || e.target.value === '+' || e.target.value === '-') {
				this.setState({
					sourceAmount: e.target.value,
					destinationAmount: ''
				});
			}
			else {
				this.setState({
					sourceAmount: e.target.value,
					destinationAmount: this.getRates(
						+e.target.value,
						this.state.sourceCurrencyCode,
						this.state.destinationCurrencyCode,
						+e.target.value > 0 ? '+' : '-'
					)
				});
			}
		}
	}

	onDestInputChange = (e) => {
		const re = /^(?:-|\+)?(0|[1-9]\d*)?(\.[0-9]?[0-9])?$/;
		if (e.target.value === ''
			|| (e.target.value && e.target.value[e.target.value.length - 1] === '.')
			|| re.test(e.target.value)) {
			if (e.target.value === '' || e.target.value === '+' || e.target.value === '-') {
				this.setState({
					sourceAmount: '',
					destinationAmount: e.target.value
				});
			}
			else {
				this.setState({
					destinationAmount: e.target.value,
					sourceAmount: this.getRates(
						+e.target.value,
						this.state.destinationCurrencyCode,
						this.state.sourceCurrencyCode,
						+e.target.value > 0 ? '+' : '-'
					)
				});
			}
		}
	}

	onSourceCarouselChange = (index) => {
		this.setState({
			sourceAmount: '',
			sourceCurrencyCode: this.props.balance[index].currencyCode,
			sourceSelectedItem: index,
			destinationAmount: ''
		});
	}

	onDestinationCarouselChange = (index) => {
		this.setState({
			sourceAmount: '',
			destinationCurrencyCode: this.props.balance[index].currencyCode,
			destinationSelectedItem: index,
			destinationAmount: ''
		});
	}

	componentDidMount() {
		setInterval(() => {
			this.props.updateExchangeRates();
		}, 10000);
	}
	
	render() {
		const { balance } = this.props;
		return (
			<div className="exchange-container">
				<div className="header">
					<Link to="/">Cancel</Link>
					<Link onClick={this.exchangeCurrency} to="/">Exchange</Link>
				</div>
				<div className="source">
					<Carousel
						showStatus={false}
						showThumbs={false}
						onChange={this.onSourceCarouselChange}
						selectedItem={this.state.sourceSelectedItem}
					>
						{
							balance && balance.map((bal, index) => {
								const currencyProps: { alias: string, fullName: string, currencyCode: string } 
									= addCurrencyProperties(bal.currencyCode);
								return (
									<div key={index}>
										<img src={Background} />
										<div className="legend">
											<div>
												<div className="amount-row">
													<span>{currencyProps.currencyCode}</span>
												</div>
												<div className="props-row">You have {currencyProps.alias} {bal.amount}</div>
											</div>
											<div className="inputDiv">
												<input
													value={this.state.sourceAmount}
													onChange={this.onSourceInputChange}
													type="text"
												/>
											</div>
										</div>
									</div>
								);
							})
						}
					</Carousel>
				</div>
				<div className="destination">
					<Carousel
						showStatus={false}
						showThumbs={false}
						onChange={this.onDestinationCarouselChange}
						selectedItem={this.state.destinationSelectedItem}
					>
						{
							this.props.balance && this.props.balance.map((bal, index) => {
								const currencyProps: { alias: string, fullName: string, currencyCode: string } 
									= addCurrencyProperties(bal.currencyCode);
								return (
									<div key={index}>
										<img src={Background} />
										<div className="legend">
											<div>
												<div className="amount-row">
													<span>{currencyProps.currencyCode}</span>
												</div>
												<div className="props-row">You have {currencyProps.alias} {bal.amount}</div>
											</div>
											<div className="inputDiv">
												<input
													value={this.state.destinationAmount}
													onChange={this.onDestInputChange}
													type="text"
												/>
											</div>
										</div>
									</div>
								);
							})
						}
					</Carousel>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		balance: state.balance,
		rates: state.rates
  };
}

const mapDispatchToProps = (
  dispatch,
) => ({
	exchangeCurrency: (obj) => dispatch(exchangeCurrency(obj)),
	updateExchangeRates: () => dispatch(updateExchangeRates())
});

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);