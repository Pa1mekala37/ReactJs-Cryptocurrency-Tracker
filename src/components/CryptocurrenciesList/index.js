import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrencyItem from '../CryptocurrencyItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class CryptocurrenciesList extends Component {
  state = {cryptocurrenciesList: [], isLoading: true}

  componentDidMount() {
    this.getCryptocurrenciesList()
  }

  getCryptocurrenciesList = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const responseData = await response.json()
    const formattedResponseData = responseData.map(eachItem => ({
      currencyName: eachItem.currency_name,
      usdValue: eachItem.usd_value,
      euroValue: eachItem.euro_value,
      id: eachItem.id,
      currencyLogo: eachItem.currency_logo,
    }))
    this.setState({
      cryptocurrenciesList: formattedResponseData,
      isLoading: false,
    })
  }

  renderCurrenciesListData = () => {
    const {cryptocurrenciesList} = this.state
    return (
      <ul className="fetched-data-list-container">
        {cryptocurrenciesList.map(eachItem => (
          <CryptocurrencyItem currencyDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="crypto-currency-list-items">
        <h1 className="main-heading-cryptocurrency-tracker">
          Cryptocurrency Tracker
        </h1>
        <img
          className="page-logo"
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
        />
        <div className="cryptocurrency-table-container">
          <div className="table-column-headings-container">
            <p className="coin-type-column-heading">Coin Type</p>
            <p className="USD-column-heading">USD</p>
            <p className="EURO-column-heading">EURO</p>
          </div>
          {isLoading ? (
            <div>
              <Loader type="Rings" color="#ffffff" height={80} width={80} />
            </div>
          ) : (
            this.renderCurrenciesListData()
          )}
        </div>
      </div>
    )
  }
}

export default CryptocurrenciesList
