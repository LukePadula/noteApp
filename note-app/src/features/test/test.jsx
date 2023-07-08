// import { useDispatch } from "react-redux";
// import "../TextEditor/TextEditor.css";
// import { useEffect } from "react";

// Get records

//Sort them

// occasions = [];

// occasions.sort((a,b) => {
//     if (a[date] < b[date]) {
//         return -1;

//     }
//     if (a[date] > b[date]) {
//         return 1;
//     }
// })

const Test = (props) => {
  return (
    <>
      <div className="occassion-container">
        <div className="occasion-record">
          <div className="ocassion-title">
            <h1>This is an occasion</h1>
          </div>
          <div className="countdown">
            <small>1 day 10 mins 20 seconds</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
