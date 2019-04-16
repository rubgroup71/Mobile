import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Button,Grid,Header,Segment,Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createAddress} from '../../store/actions/dataActions'
import Axios from 'axios';
import swal from 'sweetalert';

class NewShippingForm extends Component {
    state={
      citys:[],  
      pagename:'New Shipping Address',
        data:{
            FirstName:'',
            LastName:'',
            // Country:'',
            PhoneNumber:'',
            CompanyName:'',
            Adress:'',
            City:'',
            Email:this.props.auth.email
        }
    }
    componentDidMount = () => {
      Axios.get('http://127.0.0.1:8080/api/City')
      .then(res=>this.setState({citys:res.data}))
    }
    
  handleChange =(e,d)=>{
      
      const {name,value}=d
      this.setState({data:{...this.state.data,[name]:value}})
  } 
  handleSubmit=()=>{
    // this.props.createAddress(this.state.data)
    this.props.createAddress(this.state.data)
    
    
}
 
   render(){
    const {data}=this.state
    const {auth}=this.props
    if (!auth.uid) {return <Redirect to='/'/>}
    var citylist = this.state.citys.map(city=>{return{text:city.Name,value:city.Name}})
    return(
    <div style={{maxWidth: 450}}>
               
    <Segment>
    <Grid textAlign='center' >
      <Grid.Column>
       
        <Form>
        <Header textAlign='center'>{this.state.pagename}</Header>
          <Form.Input 
                type="text"
                id="FirstName"
                name="FirstName"
                
                fluid icon='user' 
                iconPosition='left' 
                placeholder='First Name'
                value={data.FirstName}
                onChange={this.handleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="LastName"
                name="LastName"
                
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Last Name'
                value={data.LastName}
                onChange={this.handleChange}>
            </Form.Input>
            <Form.Input 
                type="text"
                id="CompanyName"
                name="CompanyName"
                
                fluid icon='suitcase' 
                iconPosition='left' 
                placeholder='Company'
                value={data.CompanyName}
                onChange={this.handleChange}>
            </Form.Input>
          {/* <Form.Input 
                type="text"
                id="Country"
                name="Country"
                
                fluid icon='globe' 
                iconPosition='left' 
                placeholder='Country'
                value={data.Country}
                onChange={this.handleChange}>
            </Form.Input> */}
          <Form.Select 
            name='City'
            placeholder='Select your City' 
            options={citylist} 
            onChange={this.handleChange}
            value={data.City}
            />
          
          <Form.Input 
                type="text"
                id="Adress"
                name="Adress"
                
                fluid icon='envelope' 
                iconPosition='left' 
                placeholder='Address'
                value={data.Adress}
                onChange={this.handleChange}>
            </Form.Input>
          <Form.Input 
                type="text"
                id="PhoneNumber"
                name="PhoneNumber"
                
                fluid icon='phone' 
                iconPosition='left' 
                placeholder='Phone Number'
                value={data.PhoneNumber}
                onChange={this.handleChange}>
            </Form.Input>
            <Button 
                color='linkedin'
                content='Add'
                onClick={()=>{this.handleSubmit()}}
                >
            </Button>
            <Button 
                color='grey' 
                content='Cancel'
                onClick={()=>{this.props.history.goBack()}}>
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
        profile:state.firebase.profile
    }
    
  }

const mapDispatchToProps = (dispatch) =>{
    return{
        createAddress:(address)=>dispatch(createAddress(address)),
        
    }
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewShippingForm))
