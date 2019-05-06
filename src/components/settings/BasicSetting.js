import React, {useState} from 'react';
import {Card, Form, Button, Message, Divider} from "semantic-ui-react";
import { withFormik } from 'formik';
import {object, string, date} from 'yup';
import DatePicker from "react-datepicker";
import moment from 'moment';
import PlacesAutocomplete from "react-places-autocomplete";

const BasicSetting = ({values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting}) => {

  const [birthDate, setDate] = useState(values.birthDate);
  const [address, setAddress] = useState(values.address);

  const handleChangeAddress = address => {
    setAddress(address);
    setFieldValue('address', address);
  };

  const handleSelectAddress = address => {
    setAddress(address);
    setFieldValue('address', address);
  };

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
          <div style={{ marginBottom: '1rem'}}>
            <PlacesAutocomplete
              value={address}
              onChange={handleChangeAddress}
              onSelect={handleSelectAddress}
              googleCallbackName="initOne"
            >
              {({ getInputProps, suggestions, getSuggestionItemProps}) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Address',
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
          {errors.address && touched.address && <Message
            size='mini'
            negative
            header={errors.address}/>}
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
