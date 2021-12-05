import React from "react";

const COUNTDOWN_MSG = "Presale Count down";
// const LIVE_MSG = "Presale is live";
// const END_MSG = "Presale has ended";

export default function PresaleCountdown() {
  // const [message, setMessage] = useState(COUNTDOWN_MSG);
  // const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [mins, setMins] = useState(0);
  // const [secs, setSecs] = useState(0);

  const message = COUNTDOWN_MSG;
  const days = 0;
  const hours = 0;
  const mins = 0;
  const secs = 0;

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
