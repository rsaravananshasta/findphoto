import React, {Component} from 'react';
import { Button,Container,Card,Col,Form} from 'react-bootstrap';
import  './SubmitPhoto.css';
// import Alert from 'react-s-alert';
// import { reduxForm, Field } from 'redux-form';

class SubmitPhoto extends Component {

    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { match: { params } } = this.props;
       
    }
    

   
    handleChange(event) {
        this.setState({value: event.target.value});
        }
    
    handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    }

    render(){
    
        return(
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>Please submit your details to join</p>
                        
                    </div>
                    <div className="col-md-9 register-right">
                        <Form>
                            <div  id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Submit your Entries</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Childhood Photo</label>
                                            <input type="file" className="form-control" placeholder="First Name *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label>Current Photo</label>
                                            <input type="file" className="form-control" placeholder="First Name *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" className="form-control" placeholder="Name *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label>Job Title</label>
                                            <input type="text" className="form-control"  placeholder="Job Title *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label>DOB</label>
                                            <input type="date" className="form-control" placeholder="DOB *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <div className="maxl">
                                                <label className="radio inline"> 
                                                    <input type="radio" name="gender" value="male" checked />
                                                    <span> Male </span> 
                                                </label>

                                                <label className="radio inline"> 
                                                    <input type="radio" name="gender" value="female" />
                                                    <span>Female </span> 
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input type="text" className="form-control" placeholder="Department *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label>Lowes email id</label>
                                            <input type="email" className="form-control" placeholder="Lowes email id *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label>Team Name</label>
                                            <input type="text" className="form-control" placeholder="Team Name *" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label>Job Location</label>
                                            <select className="form-control">
                                                <option className="hidden"  selected disabled>Select</option>
                                                <option>India</option>
                                                <option>United States</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>DOJ</label>
                                            <input type="date"  className="form-control" placeholder="" value="" />
                                        </div>
                                        <input type="submit" className="btnRegister"  value="Submit"/>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>

            </div>
            
        )
    }


    render_(){
    
        return(
            <Card>
                    <Container className="p-3">
                    <Form>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Childhood photo</Form.Label>
                            <Form.Control type="file" placeholder="Childhood photo" />
                        </Form.Group>
                    
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Current photo</Form.Label>
                            <Form.Control type="file" placeholder="Current photo" />
                        </Form.Group>
                        </Form.Row>
                
                
                        <Form.Row>
                        <Form.Group  as={Col}   controlId="formGridAddress1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Name" />
                        </Form.Group>
                        <Form.Group as={Col}  controlId="formGridAddress2">
                        <Form.Label>Job title</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                        </Form.Group>
                    
                        </Form.Row>
                        <Form.Row>
                    
                        <Form.Group  as={Col}   controlId="formGridAddress2">
                        <Form.Label>Department</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                        </Form.Group>
                        <Form.Group    as={Col}    controlId="formGridCity">
                            <Form.Label>Team Name</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    
                        </Form.Row>
                    
                    
                        <Form.Row>
                            <Form.Group controlId="formGridAddress2">
                            <Form.Label>Lowes email id</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor" />
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Group  controlId="formGridState">
                                <Form.Label>Job location</Form.Label>
                                <Form.Control as="select" defaultValue="Choose...">
                                <option>India</option>
                                <option>US</option>
                                </Form.Control>
                            </Form.Group> 
                        </Form.Row>

                        <Form.Row>
                            <Form.Group  controlId="formGridState">
                                <Form.Label>DOB</Form.Label>
                                <Form.Control />
                            </Form.Group> 
                        </Form.Row>

                        <Form.Row>
                            <Form.Group  controlId="formGridState">
                                <Form.Label>DOJ</Form.Label>
                                <Form.Control />
                            </Form.Group> 
                        </Form.Row>

                        <Form.Row>
                            <Form.Group  controlId="formGridState">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control as="select" defaultValue="Choose...">
                                <option>Male</option>
                                <option>Female</option>
                                </Form.Control>
                            </Form.Group> 
                        </Form.Row>
                    

                        <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                
                        <Button variant="primary" type="submit">
                        Submit
                        </Button>
                    </Form>
                </Container>
        </Card>
            
        )
    }

}

export default SubmitPhoto;