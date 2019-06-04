import React, {useEffect, useState} from 'react';
import {Card, Form, Button, Message, Divider} from "semantic-ui-react";
import { withFormik } from 'formik';
import {object, string, date} from 'yup';
import DatePicker from "react-datepicker";
import moment from 'moment';
import PlacesAutoComplete from "../layout/PlacesAutocomplete";

const appId = process.env.REACT_APP_HERE_MAPS_APP_ID;
const appCode = process.env.REACT_APP_HERE_MAPS_APP_CODE;

const BasicSetting = ({values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting}) => {

  const [birthDate, setDate] = useState(values.birthDate);
  const [cityOptions, setCityOptions] = useState([]);
  const [city, setCity] = useState('');
  const [timeOut, setTimeOut] = useState(0);

  const autoCompleteCity = query => {
    if(timeOut) clearTimeout(timeOut);
    setCity(query);
    if(query.length > 2) {
      setTimeOut(setTimeout(() => {
        fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=${query}&app_id=${appId}&app_code=${appCode}`)
          .then(res => res.json())
          .then(async res => {
            let suggestedCities = res.suggestions.map((suggestion, index) => (
              {id: `city${index}`, label: suggestion.label}
            ));
            setCityOptions(suggestedCities);
          });
      },500));
    }else{
      setTimeout(() => {
        setCityOptions([]);
      }, 1000);
    }
  };

  const selectCity = async (city) => {
    setCity(city);
  };

  useEffect(() => {
    setFieldValue('address', city);
  },[city]);

  const updateBirthDate = date => {
    setDate(date);
    setFieldValue('birthDate', date);
  };

  return (
    <Card fluid>
      <Card.Header as='h1' className='setting-header'>Basics</Card.Header>
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <input placeholder='Name' name='name' value={values.name} onChange={handleChange}/>
          </Form.Field>
          {errors.name && touched.name && <Message
            size='mini'
            negative
            header={errors.name}/>}
          <Form.Group inline>
            <label>Gender</label>
            <Form.Radio
              label='Male'
              value='male'
              checked={values.gender === 'male'}
              onChange={() => setFieldValue('gender', 'male')}
            />
            <Form.Radio
              label='Female'
              value='female'
              checked={values.gender === 'female'}
              onChange={() => setFieldValue('gender', 'female')}
            />
          </Form.Group>
          {errors.gender && touched.gender && <Message
            size='mini'
            negative
            header={errors.gender}/>}
          <div>
            <DatePicker
              selected={birthDate}
              maxDate={new Date(moment().subtract(18, 'y').format())}
              onChange={updateBirthDate}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="Date of Birth"
              dateFormat="d, MMMM yyyy"
            />
          </div>
          <PlacesAutoComplete items={cityOptions} placeholder={'Address'} value={values.address} onChange={autoCompleteCity} onSelect={selectCity}/>
          {errors.address && touched.address && <Message
            size='mini'
            negative
            header={errors.address}/>}
          <Divider />
          <Button positive type='submit' loading={isSubmitting}>Update Profile</Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default withFormik({
  mapPropsToValues(){
    return{
      name: '',
      gender: 'male',
      birthDate: new Date('Wed May 02 2001 00:00:00 GMT+0530 (India Standard Time)'),
      address: ''
    }
  },
  validationSchema: object().shape({
    name: string().min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    gender: string().required('Required'),
    birthDate: date(),
    address: string().min(5, 'Too Short!')
    .max(100, 'Too Long!')
  }),
  handleSubmit(values, { setSubmitting }){
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 3000);
  }
})(BasicSetting);
