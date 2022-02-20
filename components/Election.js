import React from 'react'

// import Footer from './Footer'

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

// Components
import Navbar from './Navbarvoter'
import NavbarAdmin from './Navbaradmin'
import UserHome from './UserHome'
import StartEnd from './StartEnd'
import ElectionStatus from './ElectionStatus'
import Footer from '../components/Footer'

// Contract
import getWeb3 from '../getWeb3'
import Election from '../client/src/contracts/Election.json'

// const buttonRef = React.createRef();
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ElectionInstance: undefined,
      account: null,
      // account: undefined,
      web3: null,
      isAdmin: false,
      elStarted: false,
      elEnded: false,
      elDetails: {},
    }
  }

  // refreshing once
  componentDidMount = async () => {
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

      const admin = await this.state.ElectionInstance.methods.getAdmin().call()
      if (this.state.account === admin) {
        this.setState({ isAdmin: true })
      }

      // Get election start and end values
      const start = await this.state.ElectionInstance.methods.getStart().call()
      this.setState({ elStarted: start })
      const end = await this.state.ElectionInstance.methods.getEnd().call()
      this.setState({ elEnded: end })

      // Getting election details from the contract
      const adminName = await this.state.ElectionInstance.methods
        .getAdminName()
        .call()
      const adminEmail = await this.state.ElectionInstance.methods
        .getAdminEmail()
        .call()
      const adminTitle = await this.state.ElectionInstance.methods
        .getAdminTitle()
        .call()
      const electionTitle = await this.state.ElectionInstance.methods
        .getElectionTitle()
        .call()
      const organizationTitle = await this.state.ElectionInstance.methods
        .getOrganizationTitle()
        .call()

      this.setState({
        elDetails: {
          adminName: adminName,
          adminEmail: adminEmail,
          adminTitle: adminTitle,
          electionTitle: electionTitle,
          organizationTitle: organizationTitle,
        },
      })
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.error(error)
    }
  }
  // end election
  endElection = async () => {
    await this.state.ElectionInstance.methods
      .endElection()
      .send({ from: this.state.account, gas: 1000000 })
    window.location.reload()
  }
  // register and start election
  registerElection = async (data) => {
    await this.state.ElectionInstance.methods
      .setElectionDetails(
        data.adminFName?.toLowerCase() + ' ' + data.adminLName?.toLowerCase(),
        data.adminEmail?.toLowerCase(),
        data.adminTitle?.toLowerCase(),
        data.electionTitle?.toLowerCase(),
        data.organizationTitle?.toLowerCase()
      )
      // .send({ from: this.state.account, gas: 1000000 })

      .send({ from: this.state.account, gas: 1000000 })

    window.location.reload()
  }

  render() {
    if (!this.state.web3) {
      return (
        <>
          <Navbar />
          <center>Loading Web3, accounts, and contract...</center>
        </>
      )
    }
    return (
      <>
        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
        <div className="container-main">
          <div className=" align-center text-md m-auto mb-2 flex w-[977px] justify-center overflow-auto rounded-full bg-white p-[14px]">
            <div className=" text-black">
              Your Account: {this.state.account}
            </div>
          </div>
          {!this.state.elStarted & !this.state.elEnded ? (
            <div className="mt-4 text-gray-100">
              <center>
                <div class="bg-white-100 card w-96 shadow-xl outline-dotted outline-gray-100">
                  <div class="card-body">
                    <h2 class="card-title">Election status</h2>
                    <p>The Election has not yet started.</p>
                    {this.state.isAdmin ? (
                      <p>Set up the election.</p>
                    ) : (
                      <p>Please wait..</p>
                    )}
                    <div class="card-actions justify-end"></div>
                  </div>
                </div>
              </center>
            </div>
          ) : null}
        </div>
        {this.state.isAdmin ? (
          <>
            <this.renderAdminHome />
          </>
        ) : this.state.elStarted ? (
          <>
            <UserHome el={this.state.elDetails} />
          </>
        ) : !this.state.isElStarted && this.state.isElEnded ? (
          <>
            <div className="m-4 rounded-lg bg-teal-500 p-6 text-black">
              <center>
                <h3>The Election ended.</h3>
                <br />
                <Link
                  to="/Results"
                  style={{ color: 'black', textDecoration: 'underline' }}
                >
                  See results
                </Link>
              </center>
            </div>
          </>
        ) : null}
      </>
    )
  }

  renderAdminHome = () => {
    const EMsg = (props) => {
      return <span style={{ color: 'tomato' }}>{props.msg}</span>
    }

    const AdminHome = () => {
      // Contains of Home page for the Admin
      const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
        this.registerElection(data)
      }

      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!this.state.elStarted & !this.state.elEnded ? (
              <div className="container-main">
                {/* about-admin */}
                <div className="mockup-code">
                  <div className="m-2 w-fit rounded-full p-2  hover:underline">
                    <h2>About Admin</h2>
                  </div>
                  <div className="container-item center-items">
                    <div>
                      <div className="m-2 flex flex-col p-2">
                        <label className="label-home w-fit">
                          Full Name{' '}
                          {errors.adminFName && <EMsg msg="*required" />}
                          <input
                            className=" border-1 m-2 my-4 h-8 rounded-md border border-gray-200 px-4 text-black outline-blue-400"
                            type="text"
                            placeholder="First Name"
                            {...register('adminFName', {
                              required: true,
                            })}
                          />
                          <input
                            className="border-1 my-4 h-8 rounded-md border border-gray-200 px-4 text-black outline-blue-400"
                            type="text"
                            placeholder="Last Name"
                            {...register('adminLName')}
                          />
                        </label>

                        <label className="label-home">
                          Email{' '}
                          {errors.adminEmail && (
                            <EMsg msg={errors.adminEmail.message} />
                          )}
                          <input
                            className="border-1 m-2 my-4 ml-11 h-8 rounded-md border border-gray-200 px-4 text-black outline-blue-400"
                            placeholder="eg. you@example.com"
                            name="adminEmail"
                            {...register('adminEmail', {
                              required: '*Required',
                              pattern: {
                                value:
                                  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // email validation using RegExp
                                message: '*Invalid',
                              },
                            })}
                          />
                        </label>

                        <label className="label-home">
                          Job Title or Position{' '}
                          {errors.adminTitle && <EMsg msg="*required" />}
                          <input
                            className="border-1 m-2 my-4 h-8 rounded-md border border-gray-200 px-4 text-black outline-blue-400"
                            type="text"
                            placeholder="eg. HR Head "
                            {...register('adminTitle', {
                              required: true,
                            })}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="about-election">
                    <h2 className="p-4">About Election</h2>
                    <div className="container-item center-items">
                      <div>
                        <label className="label-home">
                          Election Title{' '}
                          {errors.electionTitle && <EMsg msg="*required" />}
                          <input
                            className="border-1 m-2 my-4 h-8 rounded-md border border-gray-200 px-4 text-black outline-blue-400"
                            type="text"
                            placeholder="eg. School Election"
                            {...register('electionTitle', {
                              required: true,
                            })}
                          />
                        </label>
                        <label className="label-home">
                          Organization Name{' '}
                          {errors.organizationName && <EMsg msg="*required" />}
                          <input
                            className="border-1 m-2 my-4 h-8 rounded-md border border-gray-200 px-4 text-black outline-blue-400"
                            type="text"
                            placeholder="eg. Lifeline Academy"
                            {...register('organizationTitle', {
                              required: true,
                            })}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* about-election */}
              </div>
            ) : this.state.elStarted ? (
              <UserHome el={this.state.elDetails} />
            ) : null}
            <StartEnd
              elStarted={this.state.elStarted}
              elEnded={this.state.elEnded}
              endElFn={this.endElection}
            />
            <ElectionStatus
              elStarted={this.state.elStarted}
              elEnded={this.state.elEnded}
            />
          </form>
          <Footer />
        </div>
      )
    }
    return <AdminHome />
  }
}
