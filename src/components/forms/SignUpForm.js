import React, { Component } from 'react'
import {Button, Form, Grid, Header,Segment,Message} from 'semantic-ui-react'
import {createUser,updateUser, errorClear} from '../../store/actions/authAction'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios'
import firebase from 'firebase/app'
import swal from 'sweetalert';
class SignUpForm extends Component {
    state={
        data:{
            email:"",
            password:""
        },
        apidata:{},
        errors:{},
        agree:false
    }
    componentDidMount = () => {
        this.props.errorClear()
        const {auth}=this.props
        if (auth.uid) {
          
          this.setState({data:{...this.state.data,email:auth.email}})
        }
        
        
    }
    componentDidUpdate(prevProps){
      if(prevProps.auth.uid !== this.props.auth.uid){
        this.props.history.push('/acount')
      }
   }
    handleChange=(e)=>{
        const {value,name}=e.target
        name==="agree" ? this.setState({agree:!this.state.agree}) :
        this.setState({data:{...this.state.data,[name]:value}})
        
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        if (this.props.auth.uid) {
            this.props.updateUser(this.state.data)
        }
        else
        {
          if (this.state.agree) {
            this.props.createUser(this.state.data)
          } 
          else {
            swal('','You must to agree the terms','error')
          }
          
           
          
        }
       
   }
   handleInvalid=(e)=>{
    const {value,name}=e.target
    if (value==='') {
      e.target.setCustomValidity(name+' is required')
    } else {
      e.target.setCustomValidity('Wrong pattern')
    }
    
  }
   
  
  render() {
    const {data}=this.state
    const {auth,authError}=this.props
    
    var pagename=auth.uid?'Update':'Signup'
    return (
      <div style={{maxWidth: 450}}>
        
        <Header textAlign='center'>{pagename}</Header>
        <Segment>
    <Grid textAlign='center' >
      <Grid.Column>
       
        <Form onSubmit={this.handleSubmit}>
         
            <Form.Input 
                type="email"
                id="email"
                name="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
                onInvalid ={this.handleInvalid}
                onInput={(e)=>{e.target.setCustomValidity('')}}
                required
                fluid icon='at' 
                iconPosition='left' 
                placeholder='Email'
                value={data.email}
                disabled={auth.uid? true : false}
                onChange={this.handleChange}>
            </Form.Input>
            <Form.Input 
                type='password'
                id="password"
                name="password"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                onInvalid ={this.handleInvalid}
                onInput={(e)=>{e.target.setCustomValidity('')}}
                required
                disabled={auth.providerData[0].providerId!=='password'?true:false}
                fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                value={data.password}
                onChange={this.handleChange}>
            </Form.Input>
            
            <Form.Checkbox
                style={{display:auth.uid?'none':'inline-block'}}
                id="agree"
                name="agree"
                required
                label="I agree to the Terms and Conditions"
                checked={this.state.agree}
                onChange={this.handleChange}>>
            </Form.Checkbox>
            {authError?<Message color='red'>{authError}</Message>:null}
            <Button 
              color='linkedin'
              disabled={auth.providerData[0].providerId!=='password'?true:false} >
                {auth.uid? 'Update' : 'Sign Up'}
            </Button>
            
            
          <Button icon='google' style={{display:auth.uid?'none':''}} color='google plus' onClick={(e)=>{
            e.preventDefault()
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
              var user = result.user;
              Axios.post('http://proj.ruppin.ac.il/bgroup71/prod/api/Customer','='+user.email)
              
            }).catch(function(error) {
              var errorMessage = error.message;
              alert(errorMessage)
            });
          }}></Button>
          <Button icon='facebook' style={{display:auth.uid?'none':''}} color='facebook' onClick={(e)=>{
            e.preventDefault()
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
              var user = result.user;
              Axios.post('http://proj.ruppin.ac.il/bgroup71/prod/api/Customer','='+user.email)
            }).catch(function(error) {
              var errorMessage = error.message;
              alert(errorMessage)
            });
          }}></Button>
          <Button color='grey' onClick={(e)=>{e.preventDefault(); this.props.history.goBack()}}>
              Cancel
            </Button>
        </Form>
        
      </Grid.Column>
    </Grid>

    </Segment>
  </div>
      
    )
  }
}
const mapStateToProps = (state) => {
  
  return{
        authError:state.auth.authError,
        auth:state.firebase.auth,
        profile:state.firebase.profile,
        signup:state.firebase.signup
    }
    
  }

const mapDispatchToProps = (dispatch) =>{
  return{
      createUser:(user)=>dispatch(createUser(user)),
      updateUser:(data)=>dispatch(updateUser(data)),
      errorClear:()=>dispatch(errorClear())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignUpForm))

