import React, {Component} from 'react';
import { Button,Container,Card,Col,Form} from 'react-bootstrap';
import  './SubmitPhoto.css';
import PropTypes from 'prop-types';
// import Alert from 'react-s-alert';
// import { reduxForm, Field } from 'redux-form';

class SubmitPhoto extends Component {

    constructor(props){
        super(props);
        this.state = {validated: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { match: { params } } = this.props;
       
    }
    

   
    handleChange(event) {
        console.log(event.target);  
    }

    validateImage(event){
        let allowedFileTypes = ['image/png','image/jpeg'];
        let fileType = event.target.files[0].type;
        let fileSize = event.target.files[0].size / 1024 / 1024; // in MB
        if (fileSize > 2) {
            alert('File size exceeds 2 MB');
            event.target.classList.add('is-invalid');
        }else if(allowedFileTypes.indexOf(fileType) == -1){
            alert('Invalid File Type');
            event.target.classList.add('is-invalid');
        }else{
            event.target.classList.remove('is-invalid');
        }


    }
    
    handleSubmit(event) {
        
        const form = event.currentTarget;
        //form.bootstrapValidator('enableFieldValidators', 'formGridDOB',false)
        if (form.checkValidity() === false) {
            console.log("inside");
            event.target.className += " was-validated";
            event.preventDefault();
            event.stopPropagation();
            return false;
            
        }

        let postdata = {};
        let data =  event.target;
        postdata.childPhoto = data.formGridChildPhoto.files[0];
        postdata.currentPhoto = data.formGridCurrentPhoto.files[0];
        postdata.name = data.formGridName.value;
        postdata.jobTitle = data.formGridJobTitle.value;
        postdata.department = data.formGridDepartment.value;
        postdata.email = data.formGridEmail.value;
        postdata.jobLocation = data.formGridJobLocation.value;
        postdata.gender = data.formGridGender.value;
        postdata.teamName = data.formGridTeamName.value;
        postdata.dob = data.formGridDOB.value;
        postdata.doj = data.formGridDOJ.value;
        console.log(postdata);
        
 
      
        //const data = event.target.form.elements.formGridName.value;
        // data.name = form.elements.formGridName.value
        // data.jobtitle = form.elements.formGridJobTitle.value
        alert('Form submitted: ' + postdata.toString());
        event.preventDefault();
       // event.target.reset();
    }

    render(){
    
        return(
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://www.lowes.com/images/logos/2016_lowes_logo/lowes_logo_rgb/LLowesLogo2016_Vertical_RGB.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>Please submit your details to join</p>
                        
                    </div>
                    <div className="col-md-9 register-right">
                        <Form noValidate  onSubmit={this.handleSubmit}>
                            <div  id="home">
                                <h3 className="register-heading">Submit your Entries</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <Form.Group controlId="formGridChildPhoto">
                                            <Form.Label>Childhood Photo *</Form.Label>
                                            <Form.Control required  className="form-control"  type="file" accept="image/*" onChange={this.validateImage}/>
                                            <Form.Text className="text-muted">
                                                Max file size 2 MB, Dimension 200 X 200
                                            </Form.Text>
                                            {/* <Form.Control.Feedback type="invalid">
                                                Maximum allowed file size exceeded.
                                            </Form.Control.Feedback> */}
                                        </Form.Group>
                                        <Form.Group controlId="formGridCurrentPhoto">
                                            <Form.Label>Current Photo *</Form.Label>
                                            <Form.Control required className="form-control"  type="file" className="form-control" accept="image/*" onChange={this.validateImage} />
                                            <Form.Text className="text-muted">
                                                Max file size 2 MB, Dimension 200 X 200
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formGridName">
                                            <Form.Label>Name *</Form.Label>
                                            <Form.Control required  className="form-control" placeholder="Name *" onchange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Group controlId="formGridJobTitle">
                                            <Form.Label>Job Title *</Form.Label>
                                            <Form.Control required  className="form-control"  placeholder="Job Title *"  onchange={this.handleChange}  />
                                        </Form.Group>
                                        <Form.Group controlId="formGridDOB">
                                            <Form.Label>DOB</Form.Label>
                                            <Form.Control  type="date" className="form-control " placeholder="DOB *"  onchange={this.handleChange}   />
                                        </Form.Group>
                                        <Form.Group controlId="formGridGender">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Row  as={Col} >
                                                <Form.Check inline type="radio" checked value="male" label="Male" name="formGridGender"  onchange={this.handleChange}  />
                                                <Form.Check inline type="radio" value="female" label="Female" name="formGridGender"  onchange={this.handleChange} />
                                            </Form.Row>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group controlId="formGridDepartment">
                                            <Form.Label>Department *</Form.Label>
                                            <Form.Control required  className="form-control" placeholder="Department *" onchange={this.handleChange}  />
                                            <Form.Text className="text-muted">
                                                &nbsp;
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formGridEmail">
                                            <Form.Label>Lowes Email id *</Form.Label>
                                            <Form.Control required  type="email" className="form-control" placeholder="Lowes Email id *" onchange={this.handleChange}/>
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formGridTeamName">
                                            <Form.Label>Team Name *</Form.Label>
                                            <Form.Control required  className="form-control" placeholder="Team Name *"  onchange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Group controlId="formGridJobLocation">
                                            <Form.Label>Job Location *</Form.Label>
                                            <Form.Control required  as="select"   defaultValue="Choose..." className="form-control"  onchange={this.handleChange}>
                                                <option>India</option>
                                                <option>United States</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group required="false" controlId="formGridDOJ">
                                            <Form.Label>DOJ</Form.Label>
                                            <Form.Control type="date"   className="form-control" placeholder=""  onchange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Group required="false" controlId="formGridDOJ">
                                        <Button type="submit" required="false" className="btnRegister"  label="Submit">Submit</Button>
                                        </Form.Group>
                                        
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>

            </div>
            
        )
    }

}

export default SubmitPhoto;