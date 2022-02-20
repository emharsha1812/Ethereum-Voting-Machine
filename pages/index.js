import React, { Component } from 'react'
import Head from 'next/head'
import { useWeb3 } from '@3rdweb/hooks'
import Login from '../components/Login'
import Election from '../components/Election'

// export default function Home() {
//   const { address, connectWallet } = useWeb3()

//   return <div>{address ? <Election address={address} /> : <Login />}</div>
// }
export default function Home() {
  return <div><Election/></div>
}