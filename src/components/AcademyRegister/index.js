import React, { Component } from 'react'
import ReactPixel from 'react-facebook-pixel'
import { withRouter } from 'react-router-dom'
// CSS
import './assets/styles/academy-register.css'
//Component of Method
// Database
import { registerForm } from '../../backend/logic'
import { GetOneProduct,GetAllProducts} from '../../Services/Admin-Service';





class AcademyRegister extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      course: '',
      email: '',
      phone: '',
      sheetLoaded: false,
      courses:[],

    }
  }

  _handleChange = (stateKey, value) => {
    this.setState({ [stateKey]: value })
  }
  clearForm = () => {
    this.setState({ name: '', email: '', course: '', phone: '' })
  }
  FetchCourse=()=>{
    let a=[];
 
    let {id}=this.props.match.params;
    if(!id){
      GetAllProducts('all').then(docs => {
        this.setState({ products:docs, courseNumber:docs[0].id});
    })
    }

    else{
    console.log(id);
    
    GetOneProduct({id}).then(data=>{
      console.log(data)
     a.push(data)
      console.log(a)
      this.setState({courses:[...a], course:a[0].short_name})
      console.log(this.state.courses)
    
  })}
 }
 
  
  componentDidMount() {

    this.FetchCourse();

    const advancedMatching = { em: 'academy@workhall.co' } // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
    const options = {
      autoConfig: true, // set pixel's autoConfig
      debug: false, // enable logs
    }
    ReactPixel.init('989986398154245', advancedMatching, options)
    ReactPixel.pageView(); // For tracking page view
   

  }

  fbPixelReg = () => {
    ReactPixel.fbq('track', 'CompleteRegistration', {
      value: 7000,
      currency: 'PKR',
    })
  }

  render() {
    let { name, course, email, phone,products } = this.state
    let { history } = this.props
    let {id}=this.props.match.params;
    return (
      <div className="course-register-form" id="register-form">
        <div className="reg-frame">
          <img
            className="reg-frame-img"
            src={require('./assets/images/Frame.png')}
          />
        </div>

        {/* Heading */}

        {/*Form */}
        <div className="c-register-heading">
          <div className="c-reg-text">
            <h1>Register Yourself</h1>
            <p>Register yourself for more info</p>
          </div>

          <form className="reg-form">
            <div class="">
              <input
                name="name"
                onChange={(name) => {
                  this._handleChange('name', name.target.value)
                }}
                type="text"
                placeholder="Full Name"
                className="r-input-box"
              />

                {
                  id?


                  
                  <input
                  name="course"
                  id="Locations"
                  className="r-input-box"
                  type='text'
                  value={this.state.course}
                  disabled
                />
              
                   
                      
                   
                  
                 
                :
              <select
                name="course"
                onChange={(course) => {
                  this._handleChange('course', course.target.value)
                }}
                id="Locations"
                className="r-input-box"
              >
                <option disabled selected hidden>
                  Select Course
                </option>
                {

                  products && products.map(course=>
                    {
                    return <option>{course.short_name}</option>
                    }
                    )
                }
              </select>
  }
            </div>

            <div class="">
              <input
                name="phone"
                onChange={(phone) => {
                  this._handleChange('phone', phone.target.value)
                }}
                type="text"
                placeholder="Phone"
                className="r-input-box"
              />
              <input
                name="email"
                onChange={(email) => {
                  this._handleChange('email', email.target.value)
                }}
                type="email"
                placeholder="Email"
                className="r-input-box"
              />
            </div>

            <div>
              <button
                type="button"
                class="reg-btn"
                onClick={()=>{
                  registerForm(name,course,email,phone,history);
                  this.fbPixelReg();
                 
                }
                 
                }
              >
                Register
              </button>
            </div>
          </form>
   
        </div>
      </div>
    )
  }
}
// export default ReactGoogleSheets.connect(DataComponent);
export default withRouter(AcademyRegister)
