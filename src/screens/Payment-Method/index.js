import React, { Component } from 'react'
import './index.css'
import Nav from '../../components/Nav/index'



export default class PaymentPage extends Component {
  constructor() {
    super()
    this.state = {
      accountsDetails:
      [

      ]
    }
  }


  componentDidMount () {
 
     window.safepay.Button.render({
       // Choose between "production" or "sandbox"
       env: 'sandbox',
       // The amount you wish you charge
       amount: 6999.00,
       // The currency of the purchase
       currency: "PKR",
       // Your API Keys
       client: {
         "sandbox": "sec_aeef1a13-1c58-4096-a5ce-9c0b3893302f"
         
       },
       payment: function (data, actions) {
         return actions.payment.create({
           transaction: {
             amount: 6999.00,
             currency: 'PKR'
           }
         })
       },
       onCheckout: function(data, actions) {
         console.log(data)
         console.log(actions)
         console.log("You completed the payment!");
       },
       onCancel: function (data, actions) {
         console.log(data)
         // The buyer cancelled the payment
         // Don't create an order in your system
       },
   }, '#safepay-button-container');
}

  render() {
 
    return (
      <div className='pay-container'>
     <Nav activeScreen="Academy" drawerClickHandler={this.drawerToggleClickHandler}/>
      <div className="pay-page-div">
          {/* <h1>Pay Your Course Fees Through Safepay</h1>
      <div id="safepay-button-container"></div> */}
      <h1 style={{marginBottom:'20px', fontWeight:'bold'}}>You can pay your fees through following methods</h1>
      <span style={{color:'#6B3590'}}>(Kindly share proof of your payment at academy@workhall.co with your full name)</span>
      <div className="cards">
  <div className="card-align">
   
    <div className="card ssize">
        {/* <h1>
        Bank Transfer
        </h1> */}
        <img src={require('./images/online-pay.png')} height='100px' width='100px' />
        <p>
        Work Hall (Pvt.) Limited<br/>
        5006 0069 0062 84013<br/>
        PK19BAHL5006006900628401<br/>
        Bank al Habib<br/>
        </p>
        
    </div>
    <div className="card ssize">
    <img src={require('./images/easypaisa.png')} height='100px' width='150px' />
        <p>
        Title: Ahmed Mehanti
        </p>
        <p>
        Account # 03332100584
        </p>
    </div>
    <div className="card ssize">
    <img src={require('./images/jazzcash.png')} height='70px' width='140px' />
        <p>
        Titile: Ahmed Mehanti
        </p>
        <p>
        Account # 03332100584
        </p>
    </div>
    
</div>
</div>

        <div></div>
        <button
                type="button"
                class="reg-btn"
                onClick={()=>window.open('/academy','_self')
                 
                }
              >
                Back To Courses
              </button>
      </div>
      </div>
    )
  }
}



