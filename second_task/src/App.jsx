import './App.css';
import BalanceSection from './components/BalanceSection/BalanceSection';

const App = () => {
  return (
    <>
      <div className='header'>React + ERC20 + Metamask task</div>
      <div className="container">
        <BalanceSection />
      </div>
    </>
  );
}

export default App;
