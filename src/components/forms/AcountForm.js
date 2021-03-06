
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Button,Grid,Header,Icon,Segment,Card} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'


class HomePageForm extends Component{
   state={
       pagename:'Acount'
   }
   
   
   handleClick=(value)=>{
  
      this.props.history.push(value)
  
   }
   
    render(){
      const {auth}=this.props
      if (auth.isEmpty) {return <Redirect to='/login'/>}
       return(
           <>
            
            
            <Header textAlign='center'>{this.state.pagename}</Header>
            <Segment textAlign='center'>
                <Grid verticalAlign='top' centered columns='equal'>
                <Grid.Row >
                  
                  <Grid.Column >
                    <Card onClick={()=>{this.handleClick('/orders')}}>
                    <Icon name='clipboard list' size='huge' color='grey' fitted></Icon>
                    <Card.Header textAlign='center'>My Orders</Card.Header>
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                  <Card onClick={()=>{this.handleClick('/signup')}}>
                    <Icon name='user' size='huge' color='grey' fitted></Icon>
                    <Card.Header textAlign='center'>Profile</Card.Header>
                    </Card>
                  </Grid.Column>
                  
                </Grid.Row>
                <Grid.Row >
                
                  <Grid.Column>
                  <Card onClick={()=>{this.handleClick('/items')}}>
                    <Icon name='barcode' size='huge' color='grey' fitted></Icon>
                    <Card.Header textAlign='center'>My Items</Card.Header>
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                  <Card onClick={()=>{this.handleClick('/shipping')}}>
                    <Icon name='shipping' size='huge' color='grey' fitted></Icon>
                    <Card.Header textAlign='center'>Shipping</Card.Header>
                    </Card>
                  </Grid.Column>
                  
                </Grid.Row>
                
              </Grid>
              <br/>
              
                <Button
                  onClick={()=>{this.props.history.push('/createorder/0')}}
                  color='blue'
                  compact
                  size='small'
                  content='Create New Order'
                  >
                </Button>
                
                <Button
                  onClick={()=>{this.props.history.push('/builditem')}}
                  color='blue'
                  compact
                  size='small'
                  content='Build New Item'
                  >
                </Button>
                
            </Segment>
    
    </>
       )
   }
  
}
const mapStateToProps = (state) => {
  
  return{
      auth:state.firebase.auth
      
  }
  
}

export default withRouter(connect(mapStateToProps)(HomePageForm))