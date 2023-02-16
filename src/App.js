import Timer from './timer component/timer'

function App() {
  
  return (
    <Timer step={1000} timerTime={30} autoStart={true}/>
  );
}

export default App;
