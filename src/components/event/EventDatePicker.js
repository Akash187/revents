import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
// import moment from 'moment';
import { Message } from 'semantic-ui-react';

const EventDatePicker = ({ setFieldValue, values, errors, touched }) => {

  const updateDateTime = date => {
    setFieldValue('dateTime', date);
  };

  return (
    <div>
      <DatePicker
        selected={values.dateTime}
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