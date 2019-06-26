import React from 'react';
import { Grid, Card, Form, Header, Button, Message } from 'semantic-ui-react';
import EventFormLocation from './EventFormLocation';
import EventDatePicker from "./EventDatePicker";
import { Link } from 'react-router-dom';

const EventForm = ({values, handleChange, handleSubmit, setFieldValue, errors, touched, submitting }) => {

  const options = [
    {text: 'Culture', value: 'culture'},
    {text: 'Drinks', value: 'drinks'},
    {text: 'Film', value: 'film'},
    {text: 'Food', value: 'food'},
    {text: 'Music', value: 'music'},
    {text: 'Travel', value: 'travel'},
  ];

  return (
    <Grid columns={1}>
      <Grid.Column mobile={16} tablet={14} computer={12}>
        <Card fluid>
          <Card.Content>
            <Form onSubmit={handleSubmit}>
              <Header style={{marginTop: 0}} color='teal' size='medium' content='EVENT DETAILS'/>
              <Form.Field>
                <input placeholder='Give your event a name' name='name' value={values.name} onChange={handleChange}/>
              </Form.Field>
              {errors.name && touched.name && <Message
                size='mini'
                negative
                header={errors.name}/>}
              <Form.Select value={values.about} options={options} placeholder='What is your event about' onChange={(e, {value}) => setFieldValue('about', value)}/>
              {errors.about && touched.about && <Message
                size='mini'
                negative
                header={errors.about}/>}
              <Form.TextArea value={values.detail} options={options} onChange={(e, {value}) => setFieldValue('detail', value)} placeholder='Tell us about the event'/>
              {errors.detail && touched.detail && <Message
                size='mini'
                negative
                header={errors.detail}/>}
              <Header color='teal' size='medium' content='EVENT LOCATION DETAILS'/>
              <EventFormLocation values={values} touched={touched} errors={errors} setFieldValue={setFieldValue}/>
              <EventDatePicker touched={touched} values={values} errors={errors} setFieldValue={setFieldValue}/>
              <Button type='submit' positive loading={submitting}>Submit</Button>
              <Link to='/dashboard'><Button>Cancel</Button></Link>
            </Form>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
};

export default EventForm;
