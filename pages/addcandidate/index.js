import React from 'react'
import Navbaradmin from '../../components/Navbaradmin'

import Navbarvoter from '../../components/Navbarvoter'
import getWeb3 from '../../getWeb3'
import Election from '../../client/src/contracts/Election.json'

import AdminOnly from '../../components/Adminonly'

// import { useEffect } from 'react'
export default class AddCandidate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ElectionInstance: undefined,
      web3: null,
      accounts: null,
      isAdmin: false,
      header: '',
      slogan: '',
      candidates: [],
      candidateCount: undefined,
    }
  }

  componentDidMount = async () => {
    // refreshing page only once
    if (!window.location.hash) {
      window.location = window.location + '#loaded'
      window.location.reload()
    }

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = Election.networks[networkId]
      const instance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address
      )
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3: web3,
        ElectionInstance: instance,
        account: accounts[0],
      })

      // Total number of candidates
      const candidateCount = await this.state.ElectionInstance.methods
        .getTotalCandidate()
        .call()
      this.setState({ candidateCount: candidateCount })

      const admin = await this.state.ElectionInstance.methods.getAdmin().call()
      if (this.state.account === admin) {
        this.setState({ isAdmin: true })
      }

      // Loading Candidates details
      for (let i = 0; i < this.state.candidateCount; i++) {
        const candidate = await this.state.ElectionInstance.methods
          .candidateDetails(i)
          .call()
        this.state.candidates.push({
          id: candidate.candidateId,
          header: candidate.header,
          slogan: candidate.slogan,
        })
      }

      this.setState({ candidates: this.state.candidates })
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error)
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
    }
  }
  updateHeader = (event) => {
    this.setState({ header: event.target.value })
  }
  updateSlogan = (event) => {
    this.setState({ slogan: event.target.value })
  }

  addCandidate = async () => {
    await this.state.ElectionInstance.methods
      .addCandidate(this.state.header, this.state.slogan)
      .send({ from: this.state.account, gas: 1000000 })
    window.location.reload()
  }

  render() {
    if (!this.state.web3) {
      return (
        <>
          {this.state.isAdmin ? <Navbaradmin /> : <Navbarvoter />}
          <center>Loading Web3, accounts, and contract...</center>
        </>
      )
    }
    if (!this.state.isAdmin) {
      return (
        <>
          <Navbarvoter />
          <AdminOnly page="Add Candidate Page." />
        </>
      )
    }
    return (
      <>
        <Navbaradmin />
        <div className="">
          <h1 className="text-xl text-gray-100">Add a new candidate</h1>
          <h3 className="mx-auto">
            Total candidates:{' '}
            <span className="text-green-400">{this.state.candidateCount}</span>
          </h3>
          <div className="">
            <form className="form">
              <label className="">
                Header
                <input
                  className="border-1 m-2 my-4 h-8 rounded-md border border-gray-200 px-4 text-black outline-blue-400"
                  type="text"
                  placeholder="eg. Marcus"
                  value={this.state.header}
                  onChange={this.updateHeader}
                />
              </label>
              <label className={'label-ac'}>
                Slogan
                <input
                  className="border-1 m-2 my-4 h-8 rounded-md border border-gray-200 px-4 text-black outline-blue-400"
                  type="text"
                  placeholder="eg. It is what it is"
                  value={this.state.slogan}
                  onChange={this.updateSlogan}
                />
              </label>
              {/* <button
                className="btn-add"
                disabled={
                  this.state.header.length < 3 || this.state.header.length > 21
                }
                onClick={this.addCandidate}
              >
                Add
              </button> */}
              <button
                className="ml-4"
                class="btn btn-success"
                disabled={
                  this.state.header.length < 3 || this.state.header.length > 21
                }
                onClick={this.addCandidate}
              >
                Add Candidate
              </button>
            </form>
          </div>
        </div>
        {loadAdded(this.state.candidates)}
      </>
    )
  }
}
export function loadAdded(candidates) {
  const renderAdded = (candidate) => {
    return (
      <>
        <div className="">
          <div
            style={{
              maxHeight: '21px',
              overflow: 'auto',
            }}
          >
            {candidate.id}. <strong>{candidate.header}</strong>:{' '}
            {candidate.slogan}
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="container-main" style={{ borderTop: '1px solid' }}>
      <div className="text-lg">
        <center>Candidates List</center>
      </div>
      {candidates.length < 1 ? (
        <div className="">
          <center>No candidates added.</center>
        </div>
      ) : (
        <div
          className="container-item"
          style={{
            display: 'block',
            backgroundColor: 'gray',
          }}
        >
          {candidates.map(renderAdded)}
        </div>
      )}
    </div>
  )
}
