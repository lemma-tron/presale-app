import React, { useState, useRef, useEffect } from "react";
import { usePresaleLemaPublic } from "../hooks/useContracts";
import { convertMillistoDHMS } from "../libs/formatDateTime";

const COUNTDOWN_MSG = "Private Sale Count Down";
const LIVE_MSG = "Private sale is live";
const END_MSG = "Private sale has ended";

export default function PresaleCountdown() {
  const Ref = useRef(null);

  const [message, setMessage] = useState(COUNTDOWN_MSG);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  const presaleContractPublic = usePresaleLemaPublic();

  const fetchContractData = async (timerStopped) => {
    if (presaleContractPublic) {
      if (timerStopped) {
        presaleContractPublic.methods.endTime().call(function (err, res) {
          const timeNow = new Date().getTime();
          if (timeNow > res * 1000) {
            setMessage(END_MSG);
          } else {
            setMessage(LIVE_MSG);
            clearTimer(res * 1000);
          }
        });
      } else {
        presaleContractPublic.methods.startTime().call(function (err, res) {
          clearTimer(res * 1000);
        });
      }
    }
  };

  const getTimeRemaining = (deadlineMillis) => {
    const total = deadlineMillis - new Date().getTime();
    return convertMillistoDHMS(total);
  };

  const startTimer = (deadlineMillis) => {
    let { millis, days, hours, minutes, seconds } =
      getTimeRemaining(deadlineMillis);
    if (millis >= 0) {
      setDays(days > 9 ? days : "0" + days);
      setHours(hours > 9 ? hours : "0" + hours);
      setMins(minutes > 9 ? minutes : "0" + minutes);
      setSecs(seconds > 9 ? seconds : "0" + seconds);
    } else {
      stopTimer();
    }
  };

  const stopTimer = () => {
    if (Ref.current) clearInterval(Ref.current);
    setDays("00");
    setHours("00");
    setMins("00");
    setSecs("00");
    fetchContractData(true);
  };

  const clearTimer = (deadlineMillis) => {
    setDays("00");
    setHours("00");
    setMins("00");
    setSecs("00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(deadlineMillis);
    }, 1000);
    Ref.current = id;
  };

  useEffect(() => {
    fetchContractData(false);
  }, []);

  return (
    <div className="presalecountdown">
      <div className="p-3" />
      <div>
        <h1 className="title text-center">{message}</h1>
      </div>
      <div className="countdown-row">
        <div className="countdown-card">
          <div className="value">{days}</div>
          <div className="type">Days</div>
        </div>
        <div className="countdown-card">
          <div className="value">{hours}</div>
          <div className="type">Hours</div>
        </div>
        <div className="countdown-card">
          <div className="value">{mins}</div>
          <div className="type">Minutes</div>
        </div>
        <div className="countdown-card">
          <div className="value">{secs}</div>
          <div className="type">Seconds</div>
        </div>
      </div>
    </div>
  );
}
