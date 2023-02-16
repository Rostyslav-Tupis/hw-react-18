import React , {useState, useEffect} from "react";
// import { Transition , CSSTransition } from "react-transition-group"; невдавала спроба зробити анімацію

import './style.css'

function Timer({step , timerTime, autoStart}){
    const [time , setTime] = useState(timerTime)
    const [isRunning , setStatusBtn] = useState(autoStart)

    function formatTime(seconds) { //ділим на 60 щоб получити хв , тоді добавляємо спереді 0 та slice останні два елемента
        return `${("0" + Math.floor(seconds / 60)).slice(-2)} : ${("0" + seconds % 60).slice(-2)}`
    }

    useEffect(()=>{
        let interval;
        if(isRunning && time > 0 ){

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
    },[isRunning , time])


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
    },[isRunning])

    function handleReset(){
        setTime(0)
    }

    return(
        <div>
            <div className="controls">
                <p className="showTime">{formatTime(time)}</p>
                <div className="btns">
                    <button onClick={handleStatus}>
                        {isRunning ? "Stop" : "Start"}
                    </button>
                    <button onClick={handleReset}>Reset to 0</button>
                </div>
            </div>
            {/* <div className="wrapper">
                <CSSTransition
                    in={!isRunning}
                    timeout={30}
                    classNames="timeLine"
                >
                    <div className="timeLine"></div>
                </CSSTransition>
            </div> */}
        </div>
    )
}

export default Timer;