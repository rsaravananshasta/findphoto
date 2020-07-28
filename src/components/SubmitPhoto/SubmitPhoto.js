import React, {Component} from 'react';
import { Button,Col,Form} from 'react-bootstrap';
import  './SubmitPhoto.css';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Alert from 'react-s-alert';
// import { reduxForm, Field } from 'redux-form';

class SubmitPhoto extends Component {

    constructor(props){
        super(props);
        this.state = {
            childphoto: null,
            currentphoto: null
          }

        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // eslint-disable-next-line
        const { match: { params } } = this.props;
       
    }
    

   
    handleChange(event, id) {
        if(id === 'child'){
            this.setState({
                childphoto: URL.createObjectURL(event.target.files[0])
              })
        }else{
            this.setState({
                currentphoto: URL.createObjectURL(event.target.files[0])
              })
        }
        
    }

    validateImage(event){
        let allowedFileTypes = ['image/png','image/jpeg'];
        let fileType = event.target.files[0].type;
        let fileSize = event.target.files[0].size / 1024 / 1024; // in MB
        if (fileSize > 2) {
            alert('File size exceeds 2 MB');
            event.target.classList.add('is-invalid');
        }else if(allowedFileTypes.indexOf(fileType) === -1){
            alert('Invalid File Type');
            event.target.classList.add('is-invalid');
        }else{
            event.target.classList.remove('is-invalid');
        }


    }

    

    render(){
       
        const FILE_SIZE = 2097152;
        const SUPPORTED_FORMATS = ["image/jpg","image/jpeg", "image/png"];
        // Schema for yup
        const validationSchema = Yup.object().shape({
            ChildPhoto: Yup.mixed()
            .required("*ChildPhoto is required")
            .test(
                "fileSize",
                "Exceeded maximum uploaded file size",
                value => {                    
                    return value && value.size <= FILE_SIZE 
                }
            )
            .test(
            "fileFormat",
            "Only jpg, jpeg, png format allowed",
            value => value && SUPPORTED_FORMATS.includes(value.type)
            )
            // .test(
            //     "fileSize",
            //     "Exceeded maximum uploaded file size",
            //     value => { 
                   
            //         var reader = new FileReader();
            //         //Read the contents of Image File.
            //         reader.readAsDataURL(value);
            //         reader.onload = function (e) {
            //             //Initiate the JavaScript Image object.
            //             var image = new Image();

            //             //Set the Base64 string return from FileReader as source.
            //             image.src = e.target.result;

            //             //Validate the File Height and Width.
            //             image.onload = function () {
            //                 let  height = this.height;
            //                 let  width = this.width;
            //                 console.log("height"+height+",..."+width)
            //             }
            //         }
                    
            //         return value && value.size <= FILE_SIZE 
            //     }
            // )
            ,
            CurrentPhoto: Yup.mixed()
            .required("*CurrentPhoto is required")
            .test(
                "fileSize",
                "Exceeded maximum uploaded file size",
                value => value && value.size <= FILE_SIZE
            )
            .test(
                "fileFormat",
                "Only jpg, jpeg, png format allowed",
                value => value && SUPPORTED_FORMATS.includes(value.type)
            ),
            DOB: Yup.string(),
            DOJ: Yup.string(),
            Department: Yup.string()
            .min(2, "*Department must have at least 2 characters")
            .max(100, "*Department can't be longer than 100 characters")
            .required("*Department is required"),
            Email: Yup.string()
            .email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters")
            .required("*Email is required"),
            Gender: Yup.string(),
            JobLocation: Yup.string()
            .required("*JobLocation is required"),
            JobTitle: Yup.string()
            .min(2, "*JobTitle must have at least 2 characters")
            .max(100, "*JobTitle can't be longer than 100 characters")
            .required("*JobTitle is required"),
            Name: Yup.string()
            .min(2, "*Name must have at least 2 characters")
            .max(100, "*Name can't be longer than 100 characters")
            .required("*Name is required"),
            TeamName: Yup.string()
            .min(2, "*TeamName must have at least 2 characters")
            .max(100, "*TeamName can't be longer than 100 characters")
            .required("*TeamName is required")
        });
    
        return(
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://www.lowes.com/images/logos/2016_lowes_logo/lowes_logo_rgb/LLowesLogo2016_Vertical_RGB.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>Please submit your details to join</p>
                        
                    </div>
                    <div className="col-md-9 register-right">
                    <Formik 
                    initialValues={{ ChildPhoto:"", CurrentPhoto:"", Name:"ss", JobTitle:"ss", DOB:"", Gender:"male", Department:"ss", Email:"sss@lowees.com", TeamName:"ss",JobLocation:"India",DOJ:""}}
                    //initialValues={{ ChildPhoto:"", CurrentPhoto:"", Name:"", JobTitle:"", DOB:"", Gender:"", Department:"", Email:"", TeamName:"",JobLocation:"",DOJ:""}}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm, setFieldValue}) => {
                        // When button submits form and form is in the process of submitting, submit button is disabled
                        setSubmitting(true);
                        
                        setTimeout(() => {
                            console.log(values);

                            const formData = new FormData();        
                            formData.append('childphoto', values.ChildPhoto);
                            formData.append('currentphoto', values.CurrentPhoto);
                            formData.append('user', JSON.stringify(values));

                            axios.post('http://localhost:5001/api/userphoto', 
                            formData,
                            {headers: {"Content-type": "multipart/form-data"}}
                            ).then(function(res){
                                Alert.success(res.data.message, {
                                    effect: 'slide'
                                });
                                console.log('SUCCESS!!');
                            })
                            .catch(function(){
                                console.log('FAILURE!!');
                                Alert.error('You have already submitted. Please contact administrator', {
                                    effect: 'slide'
                                });
                            });
                            
                            resetForm();
                            document.getElementById('formGridChildPhoto').value = null;
                            document.getElementById('formGridCurrentPhoto').value = null;
                            
                            setSubmitting(false);
                         }, 500);
                         
                    }}
                    >
                        { /* Callback function containing Formik state and helpers that handle common form actions */}
                        {( {values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                            isSubmitting}
                             ) => (
                        <Form onSubmit={handleSubmit}>
                           
                            <div  id="home">
                                <h3 className="register-heading">Submit your Entries</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <Form.Group controlId="formGridChildPhoto">
                                            <Form.Label>Childhood Photo *</Form.Label>
                                            <Form.Control  
                                            className={touched.ChildPhoto && errors.ChildPhoto ? "form-control error" : "form-control"} 
                                            name="ChildPhoto" 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={(event)=>{setFieldValue('ChildPhoto',event.target.files[0]); this.handleChange(event,'child')}}
                                            onBlur={handleBlur}
                                           />
                                            <Form.Text className="text-muted">
                                                Max file size 2 MB, Dimension 200 X 200
                                            </Form.Text>
                                            {this.state.childphoto != null?<img height="50" className="img-rounded" alt="childphoto" src={this.state.childphoto}/>:null}
                                            {touched.ChildPhoto && errors.ChildPhoto ? (
                                            <div className="error-message">{errors.ChildPhoto}</div>
                                            ): null}
                                        </Form.Group>
                                        <Form.Group controlId="formGridCurrentPhoto">
                                            <Form.Label>Current Photo *</Form.Label>
                                            <Form.Control 
                                            className={touched.CurrentPhoto && errors.CurrentPhoto ? "form-control error" : "form-control"} 
                                            type="file" 
                                            accept="image/*" 
                                            name="CurrentPhoto"
                                            //onChange={handleChange}
                                            onChange={(event)=>{setFieldValue('CurrentPhoto',event.target.files[0]);this.handleChange(event,'current')}}
                                            onBlur={handleBlur}
                                             />
                                            <Form.Text className="text-muted">
                                                Max file size 2 MB, Dimension 200 X 200
                                            </Form.Text>
                                            {this.state.currentphoto != null?<img height="50" className="img-rounded" alt="currentphoto" src={this.state.currentphoto}/>:null}
                                            {touched.CurrentPhoto && errors.CurrentPhoto ? (
                                            <div className="error-message">{errors.CurrentPhoto}</div>
                                            ): null}
                                        </Form.Group>
                                        <Form.Group controlId="formGridName">
                                            <Form.Label>Name *</Form.Label>
                                            <Form.Control  
                                            className={touched.Name && errors.Name ? "error" : null}
                                            placeholder="Name *" 
                                            name="Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Name} />
                                            {touched.Name && errors.Name ? (
                                            <div className="error-message">{errors.Name}</div>
                                            ): null}
                                        </Form.Group>
                                        <Form.Group controlId="formGridJobTitle">
                                            <Form.Label>Job Title *</Form.Label>
                                            <Form.Control  
                                            className={touched.JobTitle && errors.JobTitle ? "error" : null}  
                                            placeholder="Job Title *"  
                                            name="JobTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.JobTitle}  />
                                             {touched.JobTitle && errors.JobTitle ? (
                                            <div className="error-message">{errors.JobTitle}</div>
                                            ): null}
                                        </Form.Group>
                                        <Form.Group controlId="formGridDOB">
                                            <Form.Label>DOB</Form.Label>
                                            <Form.Control  
                                            type="date" 
                                            className="form-control " 
                                            placeholder="DOB *"  
                                            name="DOB"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.DOB}  />
                                        </Form.Group>
                                        <Form.Group controlId="formGridGender">
                                            <Form.Label>Gender</Form.Label>
                                            <Col sm={10}>
                                                <Form.Check inline
                                                type="radio"
                                                checked
                                                label="Male"
                                                name="Gender"
                                                id="formHorizontalRadios1"
                                                value="male"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <Form.Check inline
                                                type="radio"
                                                label="Female"
                                                name="Gender"
                                                value="female"
                                                id="formHorizontalRadios2"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                            </Col>
                                           
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group controlId="formGridDepartment">
                                            <Form.Label>Department *</Form.Label>
                                            <Form.Control  
                                            className={touched.Department && errors.Department ? "error" : null} 
                                            placeholder="Department *" 
                                            name="Department"  
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Department}  />
                                            {touched.Department && errors.Department ? (
                                            <div className="error-message">{errors.Department}</div>
                                            ): null}
                                            <Form.Text className="text-muted">
                                                &nbsp;
                                            </Form.Text>
                                            
                                        </Form.Group>
                                        <Form.Group controlId="formGridEmail">
                                            <Form.Label>Lowes Email id *</Form.Label>
                                            <Form.Control  
                                            type="email" 
                                            className={touched.Email && errors.Email ? "error" : null} 
                                            placeholder="Lowes Email id *" 
                                            name="Email"  
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Email}/>
                                            
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                            {touched.Email && errors.Email ? (
                                            <div className="error-message">{errors.Email}</div>
                                            ): null}
                                           
                                        </Form.Group>
                                        <Form.Group controlId="formGridTeamName">
                                            <Form.Label>Team Name *</Form.Label>
                                            <Form.Control  
                                            className={touched.TeamName && errors.TeamName ? "error" : null} 
                                            placeholder="Team Name *"  
                                            name="TeamName"  
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.TeamName} />
                                             {touched.TeamName && errors.TeamName ? (
                                            <div className="error-message">{errors.TeamName}</div>
                                            ): null}
                                        </Form.Group>
                                        <Form.Group controlId="formGridJobLocation">
                                            <Form.Label>Job Location *</Form.Label>
                                            <Form.Control  as="select"  
                                            className={touched.JobLocation && errors.JobLocation ? "error" : null}   
                                            name="JobLocation"  
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.JobLocation}>
                                                <option value="">Select</option>
                                                <option value="India">India</option>
                                                <option value="US">United States</option>
                                            </Form.Control>
                                            {touched.JobLocation && errors.JobLocation ? (
                                            <div className="error-message">{errors.JobLocation}</div>
                                            ): null}
                                        </Form.Group>
                                        <Form.Group  controlId="formGridDOJ">
                                            <Form.Label>DOJ</Form.Label>
                                            <Form.Control 
                                            type="date"   
                                            className="form-control" 
                                            placeholder=""  
                                            name="DOJ"  
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.DOJ}  />
                                        </Form.Group>
                                        <Form.Group  controlId="formGridDOJ">
                                        <Button type="submit"  className="btnRegister"  label="Submit" disabled={isSubmitting}>Submit</Button>
                                        </Form.Group>
                                       
                                    </div>
                                </div>
                            </div>
                        </Form>
                        )}
                        </Formik>
                    </div>
                </div>

            </div>
            
        )
    }

}

export default SubmitPhoto;