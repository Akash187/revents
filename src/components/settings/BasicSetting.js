import React, {useEffect, useState} from 'react';
import {Card, Form, Button, Message, Divider} from "semantic-ui-react";
import { withFormik } from 'formik';
import {object, string, date} from 'yup';
import DatePicker from "react-datepicker";
import moment from 'moment';
import PlacesAutoComplete from "../layout/PlacesAutocomplete";
import {connect} from "react-redux";
import { basicProfile } from "../../store/actions/profileActions";

const appId = process.env.REACT_APP_HERE_MAPS_APP_ID;
const appCode = process.env.REACT_APP_HERE_MAPS_APP_CODE;

const BasicSetting = ({values, handleChange, handleSubmit, setFieldValue, errors, touched, submitting}) => {

  const [cityOptions, setCityOptions] = useState([]);
  const [city, setCity] = useState(values.address);
  const [timeOut, setTimeOut] = useState(0);

  const autoCompleteCity = query => {
    if(timeOut) clearTimeout(timeOut);
    setCity(query);
    if(query.length > 2) {
      setTimeOut(setTimeout(() => {
        fetch(`https://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=${query}&app_id=${appId}&app_code=${appCode}`)
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

  return (
    <Card fluid>
      <Card.Header as='h1' className='setting-header'>Basics</Card.Header>
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <input placeholder='Name' name='name' type='text' value={values.name} onChange={handleChange}/>
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
          <DatePicker
            selected={values.birthDate}
            maxDate={new Date(moment().subtract(18, 'y').format())}
            onChange={(date) => setFieldValue('birthDate', date)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Date of Birth"
            dateFormat="d, MMMM yyyy"
          />
          <PlacesAutoComplete items={cityOptions} placeholder={'Address'} value={values.address} onChange={autoCompleteCity} onSelect={selectCity}/>
          {errors.address && touched.address && <Message
            size='mini'
            negative
            header={errors.address}/>}
          <Divider />
          <Button positive type='submit' loading={submitting}>Update Profile</Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = ({firebase: { profile }, form: {submitting}}) => {
  return{
    profile,
    submitting
  }
};

const mapDispatchToProps = dispatch => {
  return{
    basicProfile: (values) => dispatch(basicProfile(values))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
  mapPropsToValues({ profile }){
    if(profile.isLoaded){
      return{
        name: profile.name || '',
        gender: profile.gender || '',
        birthDate: profile.birthDate ? new Date(profile.birthDate.seconds * 1000) : '',
        address: profile.address ? profile.address : ''
      }
    }
  },
  enableReinitialize: true,
  validationSchema: object().shape({
    name: string().min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    gender: string().required('Required'),
    birthDate: date(),
    address: string().min(5, 'Too Short!')
    .max(100, 'Too Long!')
  }),
  handleSubmit(values, {props: {profile, basicProfile}}){
    console.log(values.birthDate);
    console.log(profile.birthDate);
    if(values.name === profile.name && values.gender === profile.gender && values.address === profile.address){
      console.log('Not Submitting Form!');
    }else{
      basicProfile(values);
    }
  }
})(BasicSetting));
