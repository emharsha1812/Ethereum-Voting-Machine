import { useWeb3 } from '@3rdweb/hooks'
import React from 'react'

function Login() {
  const { address, connectWallet } = useWeb3()
  return (<>
    <div
      data-theme="dark"
      className="flex  h-screen w-screen flex-col content-center items-center justify-center p-4"
    >
    
      <button
        className="btn btn-primary"
        onClick={() => connectWallet('injected')}
      >
        Authentication using Metamask
      </button>

      {/* Collapse thingy */}
      <div
        tabIndex="0"
        className="collapse collapse-arrow rounded-box mt-4 w-96 border border-base-300"
      >
        <div className="collapse-title text-xl font-medium">
          Important Instructions
        </div>
        <div className="collapse-content">
          <p>Authentication is required before proceding towards vote</p>
        </div>
      </div>
    </div></>
  )
}

export default Login
