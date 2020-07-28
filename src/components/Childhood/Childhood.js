import React, {Component} from 'react';
import { Button,Container,Row,Col } from 'react-bootstrap';
import Alert from 'react-s-alert';
import './Childhood.css';


class Childhood extends Component {

    constructor(props){
        super(props);
        this.state = {
            question: null,
            selectedAnswer: null
        }
    }

    componentDidMount(){
        const { match: { params } } = this.props;
       
        
        // let jsonresponse = {
        //     "question_id":1,
        //     "imagepath":"childhood_1.jpg",
        //     "options":[
        //        {
        //           "name":"MS Dhoni",
        //           "id":"1",
        //           "imagepath":"dhoni.jpeg"
        //        },
        //        {
        //           "name":"Virat Kholi",
        //           "id":"2",
        //           "imagepath":"kholi.jpeg"
        //        },
        //        {
        //           "name":"Rahul Dravid",
        //           "id":"3",
        //           "imagepath":"dravid.jpeg"
        //        }
        //     ]
        //  };
        
        let jsonresponse;

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        
        fetch("http://localhost:5000/question/"+params.id, requestOptions)
            .then(async response => {
                jsonresponse = await response.json();
                console.log(jsonresponse);
                this.setState({question:jsonresponse})
            })
            .catch(error => {
                //this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
       
        

    }
    

    imgClickHandler =  ( id) => {
        console.log(id);
        this.setState({selectedAnswer: id})
        console.log(this.state)
    }

    submitHandler = () => {
        let answerjson = {
            fristname:'react',
            lastname:'react',
            email:'react@gmail.com',
            password:''
        }

        Alert.closeAll();
        if(this.state.selectedAnswer != null){
            if(this.state.selectedAnswer === '1'){
                Alert.success('Whoo...You have selected the correct answer', {
                    effect: 'slide'
                });
            }else{
                Alert.error('Oops.. you have selected wrong answer', {
                    effect: 'slide'
                });
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({input:answerjson})
            };
    
            fetch("http://localhost:5000/postanswer",requestOptions)
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
            })
            .catch(error => {
                //this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });

        }else{
            Alert.warning('Please select the answer', {
                effect: 'slide'
            });
        }   
       
    }

    render(){
       
        let options = null;
        let childhoodImage = null;
        let question = null;
        if(this.state.question != null){
            childhoodImage = this.state.question.imagepath;
            let members = this.state.question.options;
            question = <Col><img src={require(`../../images/childhood/${childhoodImage}`)} alt="childhood_image" className="rounded border2 img-thumbnail" /></Col>;
            options = 
                members.map(member => (
                    <Col  key={member.id}  >
                        <img 
                            src={require(`../../images/present/${member.imagepath}`)}
                            alt={member.name} 
                            className={member.id === this.state.selectedAnswer ? "rounded img-thumbnail  img-medium active" : "rounded img-thumbnail img-medium"}
                            id={member.id} 
                            onClick={(event)=>this.imgClickHandler(event.target.id)} />
                    </Col>
                ))        
        }


        return(
            <div>
                <Container>
                    <Row className="justify-content-md-center mart50">
                        {question}
                    </Row>
                    <Row className="justify-content-md-center mart50 marb50">
                        <Col>
                            <div className="question">
                                <span id="question"> Click your answers</span>
                            </div>
                        </Col>
                        
                    </Row>
                    <Row className="justify-content-md-center marb50">
                    { options }
                    </Row>
                </Container>
                <Button variant="primary" className="btn  btn-lg" onClick={this.submitHandler}>Submit</Button>
            </div>
        )
    }
}

export default Childhood;