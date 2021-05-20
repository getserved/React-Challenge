import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useGetTravellingData from '../GetDataHook';
import { formatDateTime, getSupportedCurrencies, handleError } from '../utils';
import * as api from '../api';
import styles from '../pension.module.css';
import {
  mockDoctors,
  mockExchangeRates,
  mockExchangeRateTime,
} from '../__mock';

// TODO: need major refactoring
class PensionCalculation extends React.Component {
  state = {
    personalDetail: {
      name: '',
      amount: '',
      age: '',
      isSmoker: false,
      isDrinker: false,
      isTerminallyIll: false,
    },
  };

  componentDidMount = () => {console.log("styles", styles)};

  componentDidUpdate(prevProps, prevState) {}

  submitRequest = () => {
    try {
      api.submitRequest(this.state);
      return 'submission ok';
    } catch (e) {
      handleError(e);
    }
  };

  setPersonalDetailState = (key, value) => {
    this.setState(prevState => ({
      personalDetail: {
        ...prevState.personalDetail,
        [key]: value
      }  
    }))
  }

  addError = (id, error) => {
    if (document.getElementById(id).children.length > 2) {
      const field = document.getElementById(id);
      field.removeChild(field.childNodes[2]);
    }

    document.getElementById(id).innerHTML +=
      '<p style="color: red;font-weight: bold;">' + error + '</p>';
  };

  render() {
    // TODO: use useGetTravellingData() to retrieve travelling data.
    // Below code is commented out, compilation error, use mock data for now.
    // const travellingData = useGetTravellingData();
    const travellingData = {
      doctors: mockDoctors.results,
      exchangeRates: getSupportedCurrencies(mockExchangeRates.rates),
      exchangeRateTime: formatDateTime(mockExchangeRateTime.epoch),
    };

    // TODO: returned markup is too long, can we do something about them?
    // Hint: Repeated checkboxes and styling, split markups into components
    return (
      <Container>
        <div>
          <h2>Pension detail</h2>
        </div>
        <Form>
          <Form.Group id="name" controlId="nameInput">
            <Form.Label>Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) => {
                const name = e.target.value;
                this.setPersonalDetailState('name', name);
              }}
            />
          </Form.Group>

          <Form.Group id="amount" controlId="amountInput">
            <Form.Label>Insured Amount*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter amount"
              onChange={(e) => {
                const amount = e.target.value;
                this.setPersonalDetailState('amount', amount);
              }}
            />
          </Form.Group>

          <Form.Group id="age" controlId="ageInput">
            <Form.Label>Age*</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              onChange={(e) => {
                const age = e.target.value;
                this.setPersonalDetailState('age', age);
              }}
            >
              <option>Choose...</option>
              <option value="21-40">Between 21 - 40</option>
              <option value="41-60">Between 41 - 60</option>
              <option value="61-">Above 60</option>
            </Form.Control>
          </Form.Group>

          <Form.Group
            id="smokerCheck"
            controlId="smokerInput"
            className={styles.checklist}
          >
            <Form.Check
              type="checkbox"
              label="Are you a smoker?"
              checked={this.state.personalDetail.isSmoker}
              onChange={(e) => {
                const isSmoker = e.target.checked;
                this.setPersonalDetailState('isSmoker', isSmoker)
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
              checked={this.state.personalDetail.isDrinker}
              onChange={(e) => {
                const isDrinker = e.target.checked;
                this.setPersonalDetailState('isDrinker', isDrinker);
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
              checked={this.state.personalDetail.isTerminallyIll}
              onChange={(e) => {
                const isTerminallyIll = e.target.checked;
                this.setPersonalDetailState('isTerminallyIll', isTerminallyIll);
                
              }}
            />
          </Form.Group>

          <div className="mb-2">
            <Button
              id="submit"
              type="submit"
              variant="primary"
              onClick={(e) => {
                // TODO: Browser page should not refresh/reload when the button is clicked

                // TODO: Fix the Validations
                let hasError = false;
                if (this.state.personalDetail.name === '') {
                  this.addError('name', 'Empty name');
                  hasError = true;
                }
                if (this.state.personalDetail.amount === '') {
                  this.addError('amount', 'Empty amount');
                  hasError = true;
                }
                if (this.state.personalDetail.age === '') {
                  this.addError('age', 'Empty age');
                  hasError = true;
                }

                if (hasError) {
                  return;
                }

                // TODO: success notice shows before submission completes
                try {
                  const res = this.submitRequest();
                  alert(res);
                } catch (e) {
                  // TODO: not returning correct error message, if any
                  alert(e);
                }
              }}
            >
              Submit
            </Button>{' '}
            <Button
              variant="secondary"
              onClick={(e) => {
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
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    <Card.Title>
                      <p>International doctors</p>
                    </Card.Title>
                    <Card.Text>
                      <div>
                        {(travellingData.doctors || []).map((doctor, index) => (
                          <div
                            key={index}
                            style={{ width: '20%', float: 'left' }}
                          >
                            <Card>
                              <Card.Img
                                variant="top"
                                src={doctor.picture.large}
                              />
                              <Card.Body>
                                <Card.Text>
                                  <a
                                    href={`mailto: {doctor.email}`}
                                  >{`${doctor.name.title} ${doctor.name.first} ${doctor.name.last} (${doctor.nat})`}</a>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>

                {/* TODO: Use Bootstrap to allow responsive look-and-feel */}
                {/* A row to display 3 rates on large, 1 on small screen */}
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    <Card.Title>Exchange rates</Card.Title>
                    <Card.Text>
                      <div style={{ display: 'block' }}>
                        {travellingData.exchangeRates.map(
                          (exchangeRate, index) => (
                            <div
                              key={index}
                              style={{ width: '20%', float: 'left' }}
                            >
                              <p>{exchangeRate.name}</p>
                              <p>{exchangeRate.value}</p>
                            </div>
                          )
                        )}
                      </div>
                      <div style={{ clear: 'both', display: 'block' }}>
                        Last updated: {travellingData.exchangeRateTime}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

export default PensionCalculation;
