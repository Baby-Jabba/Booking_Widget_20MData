import React from 'react';


<div id="bookingWidget" style={{ "width": 395, "height": 500, "backgroundColor": "green", "textAlign": "center" }}>

  <div id="viewers">
    <div id="viewerMessage"></div>
  </div>

  <div id="userInputs">
    <div id="dates">
      <div id="checkIn"></div>
      <div id="checkout"></div>
    </div>
    <div id="visitors"></div>
  </div>

  <div id="hotelPromo">
    <div id="hotelDeal"></div>
  </div>

  <div id="bigQuotes">
    <div id="siteQuote"></div>
    <div id="siteQuote"></div>
    <div id="siteQuote"></div>
  </div>

  <div id="smallQuotes">
    <div id="siteQuotes"><div>
    </div>
      <div id="disclaimer">
        <div id="disclaimerText"></div>
      </div>
    </div>
  </div>
</div>




  <div style={{ "width": 395, "backgroundColor": "green", "textAlign": "center" }}>
    <div style={{ "display": "inline-block", "width": 361, "height": 44, "backgroundColor": "orange", "textAlign": "center" }}>
      <div>{this.state.viewers}</div>
    </div>
    <div style={{ "display": "inline-block", "width": 361, "height": 96, "backgroundColor": "blue", "textAlign": "center" }}>
      <div style={{ "display": "inline-block", "width": 361, "height": 44, "backgroundColor": "yellow", "textAlign": "center" }}>
        <div style={{ "display": "inline-block", "width": 166, "height": 42, "backgroundColor": "purple" }}>CHECKIN MODAL</div>
        <div style={{ "display": "inline-block", "width": 166, "height": 42, "backgroundColor": "pink" }}>CHECKOUT MODAL</div>
      </div>
      <div style={{ "display": "inline-block", "width": 359, "height": 42, "backgroundColor": "red", "textAlign": "center" }}>
        GUEST INFO MODAL</div>
    </div>
    <div style={{ "display": "inline-block", "width": 359, "height": 39.06, "backgroundColor": "gray", "textAlign": "center" }}>
      Hotel Direct Deal! {this.state.deal}</div>
    <div>
      DEAL
        </div>
  </div>