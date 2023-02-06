import './App.css';
import BalanceSection from './components/BalanceSection/BalanceSection';
import TransferSection from './components/TransferSection/TransferSection';

const App = () => {
  return (
    <>
      <div className='header'>React + ERC20 + Metamask task</div>
      <div className="container">
        <BalanceSection />
        <TransferSection />
      </div>
    </>
  );
}

export default App;
