import React, {useEffect, useState} from 'react';
import {Card, Form, Button, Message, Divider} from "semantic-ui-react";
import { withFormik } from 'formik';
import {object, string, array} from 'yup';
import PlacesAutoComplete from "../layout/PlacesAutocomplete";

const appId = process.env.REACT_APP_HERE_MAPS_APP_ID;
const appCode = process.env.REACT_APP_HERE_MAPS_APP_CODE;

const AboutMeSetting = ({values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting}) => {

  const options = [
    {text: 'Culture', value: 'culture'},
    {text: 'Drinks', value: 'drinks'},
    {text: 'Film', value: 'film'},
    {text: 'Food', value: 'food'},
    {text: 'Music', value: 'music'},
    {text: 'Travel', value: 'travel'},
  ];

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
    setFieldValue('birthPlace', city);
  },[city]);

  return (
    <Card fluid>
      <Card.Header as='h1' className='setting-header'>About Me</Card.Header>
      <Card.Content>
        <Card.Header as='h5'>Complete your profile to get the most out of this site</Card.Header>
        <Form onSubmit={handleSubmit}>
          <Form.Group inline>
            <label>Tell us your status:</label>
            <Form.Radio
              label='Single'
              value='single'
              checked={values.status === 'single'}
              onChange={() => setFieldValue('status', 'single')}
            />
            <Form.Radio
              label='Relationship'
              value='relationship'
              checked={values.status === 'relationship'}
              onChange={() => setFieldValue('status', 'relationship')}
            />
            <Form.Radio
              label='Married'
              value='married'
              checked={values.status === 'married'}
              onChange={() => setFieldValue('status', 'married')}
            />
          </Form.Group>
          {errors.status && touched.status && <Message
            size='mini'
            negative
            header={errors.status}/>}
          <Form.TextArea label='Tell us about yourself' placeholder='Tell us more about you...' name={'bio'} value={values.bio} onChange={handleChange}/>
          {errors.bio && touched.bio && <Message
            size='mini'
            negative
            header={errors.bio}/>}
          <Form.Select value={values.interests} options={options} multiple placeholder='What is your interest about' onChange={(e, {value}) => setFieldValue('interests', value)}/>
          {errors.interests && touched.interests && <Message
            size='mini'
            negative
            header={errors.interests}/>}
          <Form.Field>
            <input placeholder='Profession' name='profession' value={values.profession} onChange={handleChange}/>
          </Form.Field>
          {errors.profession && touched.profession && <Message
            size='mini'
            negative
            header={errors.profession}/>}
          <PlacesAutoComplete items={cityOptions} placeholder={'BirthPlace'} value={values.birthPlace} onChange={autoCompleteCity} onSelect={selectCity}/>
          {errors.birthPlace && touched.birthPlace && <Message
            size='mini'
            negative
            header={errors.birthPlace}/>}
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
      status: '',
      bio: '',
      interests: [],
      profession: '',
      birthPlace: ''
    }
  },
  validationSchema: object().shape({
    status: string().required('Required'),
    bio: string().min(3, 'Too Short!').max(200, 'Too Long').required('Required'),
    interests: array().required('Required'),
    profession: string().min(2, 'Too Short!').max(100, 'Too Long').required('Required'),
    birthPlace: string().min(2, 'Too Short!').max(200, 'Too Long')
  }),
  handleSubmit(values, { setSubmitting }){
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 3000);
  }
})(AboutMeSetting);
