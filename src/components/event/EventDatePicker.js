import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { Message } from 'semantic-ui-react';

const EventDatePicker = ({ setFieldValue, values, errors, touched }) => {

  const [startDate, setDate] = useState(values.dateTime);

  // useEffect(() => {
  //   console.log(moment('Sat May 05 2019 02:15:00 GMT+0530 (India Standard Time)').format('MMMM Do YYYY, h:mm:ss a'));
  // },[]);

  const updateDateTime = date => {
    setDate(date);
    let timeStamp = moment(date).valueOf();
    setFieldValue('dateTime', timeStamp);
    // console.log(unix);
    // let dateTime = moment(unix).format('MMMM Do YYYY, h:mm:ss a');
    // console.log(dateTime);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        excludeOutOfBoundsTimes
        onChange={updateDateTime}
        minDate={new Date()}
        placeholderText="Date and Time of Event"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="d, MMMM yyyy h:mm aa"
        timeCaption="Time"
      />
      {errors.dateTime && touched.dateTime && <Message style={{ marginBottom: '1rem', marginTop: '0'}}
        size='mini'
        negative
        header="Date Time Required"/>}
    </div>
  );
};

export default EventDatePicker;