import '../styles/globals.css'
import './App.css'
// import "./Home.css"
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

const supportedChainIds = [1337]
const connectors = {
  injected: {},
}

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  )
}

export default MyApp
