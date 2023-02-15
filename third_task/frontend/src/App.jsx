import './App.css';
import BalanceSection from './components/BalanceSection/BalanceSection';

const App = () => {
  return (
    <>
      <div className='header'>
        <span>CryptoSHOP</span>
        <span>React + ERC20 + Metamask task</span>
        </div>
      <div className="container">
        <BalanceSection />
      </div>
    </>
  );
}

export default App;
