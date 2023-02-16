import Timer from './timer component/timer'


function App() {
  
  return (
    <Timer step={1000} timerTime={30} autoStart={false}/>
  );
}

export default App;
