import React, { Component } from 'react';
import '../css/App.css';
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import Token from '../abis/Token.json'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3((window as any).ethereum)
    const networkId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()
		const contractAddress = '0x335929f9EBe5F552e2e5cD17555914578Ad8841d'
    const token = new web3.eth.Contract(Token.abi as unknown as AbiItem[], contractAddress)
    const totalSupply = await token.methods.totalSupply().call()
    console.log("totalSupply", totalSupply)
  }

  render() {
    return (
      <div>
        <nav className="bg-red-500">
          <a className="" href="/#">Navbar</a>
          <button className="" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className=""></span>
          </button>
          <div className="flex">
            <ul className="">
              <li className="">
                <a className="" href="/#">Linkdsd 1</a>
              </li>
              <li className="">
                <a className="" href="/#">Link 2</a>
              </li>
              <li className="">
                <a className="" href="/#">Link 3</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="content">
          <div className="vertical-split">
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
          </div>
          <div className="vertical">
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
          </div>
          <div className="vertical-split">
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
          </div>
          <div className="vertical">
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
