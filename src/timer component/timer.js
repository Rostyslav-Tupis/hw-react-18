import React , {useState, useEffect } from "react";

import './style.css'

function Timer({step , timerTime, autoStart}){
    let originalWidthOfLine = 100
    let [lineWidth , setWidth] = useState(originalWidthOfLine)
    const [time , setTime] = useState(timerTime)
    const [isRunning , setStatusBtn] = useState(autoStart)

    function formatTime(seconds) { //ділим на 60 щоб получити хв , тоді добавляємо спереді 0 та slice останні два елемента
        return `${("0" + Math.floor(seconds / 60)).slice(-2)} : ${("0" + seconds % 60).slice(-2)}`
    }
    let oneSecPercent = lineWidth / time //скільки одна секунда займає відсотків !!

    useEffect(()=>{
        let interval;
        if(isRunning && time > 0 ){
            setWidth(lineWidth - oneSecPercent)
            console.log(`${formatTime(time)} Часу залишилося`);

            interval = setInterval(()=>{
                setTime((prev)=> {
                    return prev - 1 
                    }    
                )
            },step)
        }
        else{
            clearInterval(interval)
        }
        if(time === 0){
            setStatusBtn(false)
        }
        return() => clearInterval(interval)
        // eslint-disable-next-line
    },[isRunning , time, step])

    function handleStatus(){
        setStatusBtn(!isRunning)
    }

    useEffect(()=>{
        if(isRunning && time > 0){
            console.log("Таймер запущено");
        }else if (time === 0){
            console.log("Час вийшов");
        }else{
            console.log("Таймер на паузі");
        }
        // eslint-disable-next-line
    },[isRunning])

    function handleReset(){
        setTime(timerTime)
        setWidth(originalWidthOfLine)
    }

    return(
        <div>
            <div className="controls">
                <p className="showTime">{formatTime(time)}</p>
                <div className="btns">
                    <button onClick={handleStatus}>
                        {isRunning ? "Stop" : "Start"}
                    </button>
                    <button onClick={handleReset}>Reset</button>
                </div>
                <div className="wrapper">
                    <div className="timeLine" style={{width: lineWidth + "%"}}></div>
                </div>
            </div>
        </div>
    )
}

export default Timer;

//анімація через бібліотеку 
// const [key, setKey] = useState(0);

    //import { CountdownCircleTimer } from 'react-countdown-circle-timer'
    // setKey((prevKey) => prevKey + 1)
    // <CountdownCircleTimer
    // key={key}
    // isPlaying={isRunning}
    // duration={timerTime}
    // colors="#A30000"
    // >
    // {renderTime}
    // </CountdownCircleTimer>
    // const renderTime = ({ remainingTime }) => {
    //     if (remainingTime === 0) {
    //       return <div className="timer">Час вийшов !</div>;
    //     }
    //     return (
    //       <div className="container-timer">
    //         <div className="text">Залишилося</div>
    //         <p className="showTime">{formatTime(time)}</p>
    //         <div className="text">часу</div>
    //       </div>
    //     );
    //   };

