import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useGetTravellingData} from '../GetDataHook';
import { formatDateTime, getSupportedCurrencies, handleError } from '../utils';
import * as api from '../api';
import styles from '../pension.module.css';
import {
  mockDoctors,
  mockExchangeRates,
  mockExchangeRateTime,
} from '../__mock';

// TODO: need major refactoring
function PensionDetail() {
 
  const travellingData = useGetTravellingData();
  const [personalDetail, setPersonalDetail] = useState({
    name: "",
    age: "",
    amount: "",
    isSmoker: false,
    isDrinker: false,
    isTerminallyIll: false
  });
  const [errors, setErrors] = useState({
    name: false,
    age: false,
    amount: false,
    isSmoker: false,
    isDrinker: false,
    isTerminallyIll: false
  })

  const resetForm = (el) => {
    const form = el.closest("form");
    form.reset();
  }

  const submitRequest = () => {
    try {
      console.log("submit detail", personalDetail);
      return api.submitRequest(personalDetail)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw new Error(error);
      });
      
    } catch (e) {
      console.log("handle error")
      handleError(e);
    }
  };

  const setPersonalDetailState = (key, value) => {

    setPersonalDetail(prevState => ({
        ...prevState,
        [key]: value
    }))
  };

  const validation = () => {
    // TODO: Browser page should not refresh/reload when the button is clicked

    // TODO: Fix the Validations
    let hasError = false;
    if (personalDetail.name === '') {
      setErrors(prevState => ({
          ...prevState,
          name: 'Empty name'
      }))
      //addError('name', 'Empty name');
      hasError = true;
    }else{
      setErrors(prevState => ({
        ...prevState,
        name: false
    }))
    }
    if (personalDetail.amount === '') {
      setErrors(prevState => ({
        ...prevState,
        amount: 'Empty amount'
    }))
      //addError('amount', 'Empty amount');
      hasError = true;
    }else{
      if(!/^\d+$/.test(personalDetail.amount)){
        setErrors(prevState => ({
            ...prevState,
            amount: 'Only Numbers are allowed'
        }))
        //addError('amount', 'Only Numbers are allowed');
        hasError = true;
      }else{
          setErrors(prevState => ({
            ...prevState,
            amount: false
          }))
      }
    }
   
    
    if (personalDetail.age === '') {
      setErrors(prevState => ({
        ...prevState,
        age: 'Empty age'
    }))
      // addError('age', 'Empty age');
      hasError = true;
    }else{
        setErrors(prevState => ({
          ...prevState,
          age: false
      }))
    }
    return hasError;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!validation()){
      // TODO: success notice shows before submission completes
      try {
        submitRequest().then(() => {
          alert("submission ok");
          //resetForm(event.target);
        })
        .catch((e) => {
          alert(e);
        });
      
      } catch (e) {
        // TODO: not returning correct error message, if any
        alert(e);
      }
    }
    
  }
  
    return (
      <Container>
        <div>
          <h2>Pension detail</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="name" className={styles.formGroup} controlId="nameInput">
            <Form.Label>Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              isInvalid={!!errors.name}
              onChange={(e) => {
                console.log("name changed")
                const name = e.target.value;
                setPersonalDetailState('name', name);
              }}
            />
            <Form.Control.Feedback className={styles.formError} type="invalid" tooltip>
            {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group id="amount" className={styles.formGroup} controlId="amountInput">
            <Form.Label>Insured Amount*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter amount"
              isInvalid={!!errors.amount}
              onChange={(e) => {
                console.log("amount changed")
                const amount = e.target.value;
                setPersonalDetailState('amount', amount);
              }}
            />
            <Form.Control.Feedback className={styles.formError} type="invalid" tooltip>
              {errors.amount}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group id="age" className={styles.formGroup} controlId="ageInput">
            <Form.Label>Age*</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              isInvalid={!!errors.age}
              onChange={(e) => {
                const age = e.target.value;
                setPersonalDetailState('age', age);
              }}
            >
              <option>Choose...</option>
              <option value="21-40">Between 21 - 40</option>
              <option value="41-60">Between 41 - 60</option>
              <option value="61-">Above 60</option>
            </Form.Control>
            <Form.Control.Feedback className={styles.formError} type="invalid" tooltip>
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            id="smokerCheck"
            controlId="smokerInput"
            className={styles.checklist}
          >
            <Form.Check
              type="checkbox"
              label="Are you a smoker?"
              checked={personalDetail.isSmoker}
              onChange={(e) => {
                const isSmoker = e.target.checked;
                setPersonalDetailState('isSmoker', isSmoker)
              }}
            />
          </Form.Group>
          <Form.Group
            id="alcoholCheck"
            name="alcoholCheck"
            controlId="alcoholInput"
            className={styles.checklist}
          >
            <Form.Check
              type="checkbox"
              label="Do you have history of issue with alcohol?"
              checked={personalDetail.isDrinker}
              onChange={(e) => {
                const isDrinker = e.target.checked;
                setPersonalDetailState('isDrinker', isDrinker);
              }}
            />
          </Form.Group>
          <Form.Group
            id="terminalIllnessCheck"
            name="terminalIllnessCheck"
            controlId="terminalIllnessInput"
            className={styles.checklist}
          >
            <Form.Check
              type="checkbox"
              label="Do you have terminal illness (eg. final stage of cancer)?"
              checked={personalDetail.isTerminallyIll}
              onChange={(e) => {
                const isTerminallyIll = e.target.checked;
                setPersonalDetailState('isTerminallyIll', isTerminallyIll);
                
              }}
            />
          </Form.Group>

          <div className="mb-2">
            <Button
              id="submit"
              type="submit"
              variant="primary"
             
            >
              Submit
            </Button>{' '}
            <Button
              variant="secondary"
              onClick={(e) => {
                resetForm(e.target);
                // TODO: clear form when clicked
              }}
            >
              Clear
            </Button>
          </div>
        </Form>

        <br />

        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Thinking of travelling?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {/* TODO: Use Bootstrap to allow responsive look-and-feel */}
                {/* A row to display 6 doctors on large, 3 on medium, 1 on small screen */}
                <Card className={styles.wFull}>
                  <Card.Body>
                    <Card.Title>
                      <p>International doctors</p>
                    </Card.Title>
                    <Card.Body>
                      <Row>
                        {(travellingData.doctors || []).map((doctor, index) => (
                          <Col xs="12" md="4" lg="2"
                            key={index}
                          >
                            <Card>
                              <Card.Img
                                variant="top"
                                src={doctor.picture.large}
                              />
                              <Card.Body>
                                  <Card.Link
                                    href={`mailto: {doctor.email}`}
                                  >{`${doctor.name.title} ${doctor.name.first} ${doctor.name.last} (${doctor.nat})`}
                                  </Card.Link>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card.Body>
                </Card>

                {/* TODO: Use Bootstrap to allow responsive look-and-feel */}
                {/* A row to display 3 rates on large, 1 on small screen */}
                <Card className={styles.wFull}>
                  <Card.Body>
                    <Card.Title>Exchange rates</Card.Title>
                    <Card.Body>
                      <Row>
                        {(travellingData.exchangeRates || []).map((exchangeRate, index) => (
                            <Col xs="12" lg="4"
                              key={index}
                            >
                              <Card>
                                <p>{exchangeRate.name}</p>
                                <p>{exchangeRate.type}</p>
                                <p>{exchangeRate.unit}</p>
                                <p>{exchangeRate.value}</p>
                              </Card>
                              
                            </Col>
                          )
                        )}
                      </Row>
                      <div className={styles.block}>
                        Last updated: {travellingData.exchangeRateTime}
                      </div>
                      </Card.Body>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  
}

export default PensionDetail;
