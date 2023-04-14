import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

function Train({ data }) {
  return (
    <div className={styles.trainCard}>
      <div>Train Name: {data.trainName}</div>
      <div>Train Numer: {data.trainNumber}</div>
      <div>
        Departure Time:
        {` ${data.departureTime.Hours} Hours ${data.departureTime.Minutes} Minutes`}
      </div>
      <div>
        Delayed By:
        {` ${data.delayedBy} Minutes`}
      </div>
      <div className={styles.ticketInfoContainer}>
        <div className={styles.ticketInfo}>
          <div className={styles.ticketPrice}>
            Ticket Price {data.price.sleeper}
          </div>
          <div className={styles.ticketAvail}>
            Seats Available {data.seatsAvailable.sleeper}
          </div>
        </div>
        <div className={styles.ticketInfo}>
          <div className={styles.ticketPrice}>Ticket Price {data.price.AC}</div>
          <div className={styles.ticketAvail}>
            Seats Available {data.seatsAvailable.AC}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [trainData, setTrainData] = useState([]);

  const getTrainData = async () => {
    let res = await fetch("/api/trains");
    let data = await res.json();
    console.log(data);
    setTrainData(data);
  };
  useEffect(() => {
    getTrainData();
  }, []);

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.heading}>Trains available</h1>
        <div className={styles.trainContainer}>
          {trainData.map((el, ind) => {
            return (
              <div key={el.trainNumber}>
                <Train data={el} />
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
