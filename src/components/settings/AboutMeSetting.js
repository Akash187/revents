import React, {useState} from 'react';
import {Card, Form, Button, Message, Divider} from "semantic-ui-react";
import { withFormik } from 'formik';
import {object, string, array} from 'yup';
import PlacesAutocomplete from "react-places-autocomplete";

const AboutMeSetting = ({values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting}) => {

  const [birthPlace, setBirthPlace] = useState(values.birthPlace);

  const options = [
    {text: 'Culture', value: 'culture'},
    {text: 'Drinks', value: 'drinks'},
    {text: 'Film', value: 'film'},
    {text: 'Food', value: 'food'},
    {text: 'Music', value: 'music'},
    {text: 'Travel', value: 'travel'},
  ];

  const handleChangeBirthPlace = birthPlace => {
    setBirthPlace(birthPlace);
    setFieldValue('birthPlace', birthPlace);
  };

  const handleSelectBirthPlace = birthPlace => {
    setBirthPlace(birthPlace);
    setFieldValue('birthPlace', birthPlace);
  };

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
          <Form.Select value={values.interests} options={options} multiple placeholder='What is your event about' onChange={(e, {value}) => setFieldValue('interests', value)}/>
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
          <div style={{ marginBottom: '1rem'}}>
            <PlacesAutocomplete
              value={birthPlace}
              onChange={handleChangeBirthPlace}
              onSelect={handleSelectBirthPlace}
              googleCallbackName="initOne"
            >
              {({ getInputProps, suggestions, getSuggestionItemProps}) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Home City',
                      className: 'location-search-input',
                    })}
                  />

                  <div className={suggestions.length > 0 ? "autocomplete-dropdown-container" : "notaclass"}>
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer', padding: 8}
                        : { backgroundColor: '#ffffff', cursor: 'pointer' , padding: 8};
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            {errors.birthPlace && touched.birthPlace && <Message
              size='mini'
              negative
              header={errors.birthPlace}/>}
          </div>
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
