import React from 'react';
import { FormSelect } from './components/FormSelect';
import { FormTextBox } from './components/FormTextBox';
import { IoMdSwap } from 'react-icons/io';
import { SelectAdapter_Currency, getData } from './currency';
import T from './commont';

export class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { from: 0, currency: {}, currencyFrom: {}, to: 1, currencyTo: {}, rate: 0, nameFrom: '', nameTo: '', sourceMoney: null, targetMoney: null };
    }

    componentDidMount() {
        const { from, to } = this.state;
        getData()
            .then(data => {
                if (data) {
                    this.setState({ currency: data.currency, time: data.time }, () => {
                        this.setState({ rate: data.currency[to].rate / data.currency[from].rate }, () => {
                            const currencyFrom = SelectAdapter_Currency.find(item => item.value === from);
                            const currencyTo = SelectAdapter_Currency.find(item => item.value === to);
                            const nameFrom = data.currency[from].value;
                            const nameTo = data.currency[to].value;
                            this.setState({ currencyFrom, currencyTo, nameFrom, nameTo });
                        });
                    });
                }
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.rate === this.state.rate) {
            if (prevState.targetMoney !== this.state.targetMoney) {
                this.targetMoney.value(this.state.targetMoney);
            } else if (prevState.sourceMoney !== this.state.sourceMoney) {
                this.sourceMoney.value(this.state.sourceMoney);
            }
        } else {
            this.targetMoney.value(this.state.targetMoney);
            this.sourceMoney.value(this.state.sourceMoney);
        }
    }

    selectCurrency = (e, type) => {
        const { from, to, currency } = this.state;
        if (type === 0) {
            this.setState({ from: e.value }, () => {
                const rate = currency[to].rate / currency[e.value].rate;
                this.setState({ rate }, () => {
                    const currencyFrom = SelectAdapter_Currency.find(item => item.value === e.value);
                    const nameFrom = currency.find(item => item.id === e.value).value;
                    this.setState({ currencyFrom, nameFrom }, () => {
                        if (this.state.sourceMoney) {
                            let targetMoney = Number(this.state.sourceMoney) * rate;
                            targetMoney = Number(targetMoney.toFixed(3));
                            this.setState({ targetMoney });
                        }
                    });
                });
            });
        } else {
            this.setState({ to: e.value }, () => {
                const rate = currency[e.value].rate / currency[from].rate;
                this.setState({ rate }, () => {
                    const currencyTo = SelectAdapter_Currency.find(item => item.value === e.value);
                    const nameTo = currency.find(item => item.id === e.value).value;
                    this.setState({ currencyTo, nameTo }, () => {
                        if (this.state.targetMoney) {
                            let sourceMoney = Number(this.state.targetMoney) * (1 / rate);
                            sourceMoney = Number(sourceMoney.toFixed(3));
                            this.setState({ sourceMoney });
                        }
                    });
                });
            });
        }
    }

    handleOnInput = (e, type) => {
        e.preventDefault();
        let copyState = { ...this.state };
        copyState[type] = Number(e.target.value);
        this.setState({ ...copyState }, () => {
            if (type === 'sourceMoney') {
                const { rate, sourceMoney } = this.state;
                let targetMoney = Number(sourceMoney) * rate;
                targetMoney = Number(targetMoney.toFixed(3));
                this.setState({ targetMoney });
            } else {
                const { rate, targetMoney } = this.state;
                let sourceMoney = Number(targetMoney) * (1 / rate);
                sourceMoney = Number(sourceMoney.toFixed(3));
                this.setState({ sourceMoney });
            }
        });
    }

    onSwap = e => {
        e.preventDefault();
        const { from, to, rate, currencyFrom, currencyTo, nameFrom, nameTo, sourceMoney } = this.state;
        this.setState({ from: to, to: from, rate: 1 / rate, currencyFrom: currencyTo, currencyTo: currencyFrom, nameFrom: nameTo, nameTo: nameFrom }, () => {
            const targetMoney = Number(sourceMoney) * (1 / rate);
            this.setState({ targetMoney });
        });
    }

    render() {
        const { currencyFrom, currencyTo, nameFrom, nameTo, sourceMoney, targetMoney, time } = this.state;

        return <React.Fragment>
            <div className='app'>
                <header className='header'>
                    <div className='header-content'>
                        <div className='left-content' />
                        <div className='right-content'>CURRENCY CONVERTER TOOL<br /> Real times</div>
                    </div>
                </header>
                <div className='content'>
                    <div className='top-content'>Convert {nameFrom} to {nameTo} based on the actual exchange rate. </div>
                    <div className='bottom-content'>
                        <div className='tile'>
                            <div className='tile-send'>
                                <FormSelect value={currencyFrom} onChange={e => this.selectCurrency(e, 0)} label='Select source currency' options={SelectAdapter_Currency} />
                                <FormTextBox ref={e => this.sourceMoney = e} value={this.state.sourceMoney || ''} type='number' placeholder='0.000' onChange={e => this.handleOnInput(e, 'sourceMoney')} />
                            </div>
                            <div className='tile-center'>
                                <span className='icon-swap' onClick={e => this.onSwap(e)}>
                                    <IoMdSwap />
                                </span>
                            </div>
                            <div className='tile-receive'>
                                <FormSelect value={currencyTo} onChange={e => this.selectCurrency(e, 1)} label='Select target currency' options={SelectAdapter_Currency} />
                                <FormTextBox ref={e => this.targetMoney = e} value={this.state.targetMoney || ''} type='number' placeholder='0.000' onChange={e => this.handleOnInput(e, 'targetMoney')} />
                            </div>
                        </div>
                        <div className='result-content'>
                            <span>{T.numberDisplay(sourceMoney ? Number(sourceMoney.toFixed(3)) : 0) + ' ' + nameFrom + ' = ' + T.numberDisplay(targetMoney ? Number(targetMoney.toFixed(3)) : 0) + ' ' + nameTo}</span>
                        </div>
                        <div className='time-update'>
                            <span style={{ fontWeight: 'bold' }}>Last updated:&nbsp;</span><span style={{ fontStyle: 'italic' }}>{time}</span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>;
    }
}