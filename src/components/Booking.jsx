import React from 'react';
import months from '../months.js';
import days from '../days.js';
import { css, jsx } from '@emotion/core';
import Calendar from './calendar.jsx'

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: window.location.pathname.replace(/\//g, ''),
      deal: '',
      prices: [{ name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }],
      viewers: this.generateViewersMessage(),
      sessionCheckIn: 42,
      sessionCheckOut: 47,
      sessionLengthOfStay: 1,
      sessionRooms: 1,
      sessionChildren: 0,
      sessionAdults: 2,
      months: months,
      days: days,
      leftMonthIndex: 2,
      rightMonthIndex: 3,
      areCheckInCalendarsActive: false,
      areCheckOutCalendarsActive: false,
      isGuestInformationActive: false,
      isSmallQuotesDisplayActive: false,
      isDisclaimerActive: false
    }
  }

  componentDidMount() {
    fetch('/api/booking/' + this.state.id, {
      method: 'POST',
      body: JSON.stringify({ checkIn: this.state.sessionCheckIn, checkOut: this.state.sessionCheckOut, adults: this.state.sessionAdults, children: this.state.sessionChildren }),
      headers: { 'Content-type': 'application/json' }
    })
      .then((data) => {
        return data.json()
      })
      .then((dataJson) => {
        this.setState({
          deal: dataJson.deal,
          prices: dataJson.prices
        })
      });
  }

  generateViewersMessage() {
    let viewers = Math.floor(Math.random() * 10);
    if (viewers === 0) {
      return "Lowest prices for your stay";
    } else if (viewers === 1) {
      return `${viewers} person is viewing this hotel`;
    } else {
      return `${viewers} people are viewing this hotel`;
    }
  }

  handleCalendarToggleMonthLeft(e) {
    if (this.state.leftMonthIndex > 2) {
      let newLeftMonthIndex = this.state.leftMonthIndex -= 1;
      let newRightMonthIndex = this.state.rightMonthIndex -= 1;
      this.setState({
        leftMonthIndex: newLeftMonthIndex,
        rightMonthIndex: newRightMonthIndex
      })
    }
  }

  handleCalendarToggleMonthRight(e) {
    if (this.state.leftMonthIndex < 11) {
      let newLeftMonthIndex = this.state.leftMonthIndex += 1;
      let newRightMonthIndex = this.state.rightMonthIndex += 1;
      this.setState({
        leftMonthIndex: newLeftMonthIndex,
        rightMonthIndex: newRightMonthIndex
      })
    }
  }

  handleCalendarRowItemClick(dayIndex, e) {
    if (this.state.areCheckInCalendarsActive) {
      if (dayIndex >= this.state.sessionCheckOut) {
        let newSessionCheckOut = dayIndex + this.state.sessionCheckOut - this.state.sessionCheckIn;
        this.setState({
          sessionCheckIn: dayIndex,
          sessionCheckOut: newSessionCheckOut,
          areCheckInCalendarsActive: false,
          areCheckOutCalendarsActive: true,
        })
      } else {
        this.setState({
          sessionCheckIn: dayIndex,
          areCheckInCalendarsActive: false,
          areCheckOutCalendarsActive: true,
        })
      }
    } else {
      if(dayIndex <= this.state.sessionCheckIn) {
        let newSessionCheckIn = dayIndex - (this.state.sessionCheckOut - this.state.sessionCheckIn)
        this.setState({
          sessionCheckIn: newSessionCheckIn,
          sessionCheckOut: dayIndex,
          areCheckOutCalendarsActive: false,
          isGuestInformationActive:true
        })
      } else {
        this.setState({
          sessionCheckOut: dayIndex,
          areCheckOutCalendarsActive: false,
          isGuestInformationActive:true
        })
      }
    }
    fetch('/api/booking/' + this.state.id, {
      method: 'POST',
      body: JSON.stringify({ checkIn: this.state.sessionCheckIn, checkOut: this.state.sessionCheckOut, adults: this.state.sessionAdults, children: this.state.sessionChildren }),
      headers: { 'Content-type': 'application/json' }
    })
      .then((data) => {
        return data.json()
      })
      .then((dataJson) => {
        this.setState({
          deal: dataJson.deal,
          prices: dataJson.prices
        })
      });
  }


  handleGuestInfoClose(e) {
    this.setState({
      isGuestInformationActive: false
    })
  }

  handleGuestInfoClick(e) {
    let newValue = !this.state.isGuestInformationActive
    this.setState({
      isGuestInformationActive: newValue,
      areCheckInCalendarsActive: false,
      areCheckOutCalendarsActive: false
    });
  }

  handleCheckInClick(e) {
    let newValue = !this.state.areCheckInCalendarsActive
    this.setState({
      areCheckInCalendarsActive: newValue,
      isGuestInformationActive: false,
      areCheckOutCalendarsActive: false
    });
  }

  handleCheckOutClick(e) {
    let newValue = !this.state.areCheckOutCalendarsActive
    this.setState({
      areCheckOutCalendarsActive: newValue,
      isGuestInformationActive: false,
      areCheckInCalendarsActive: false
    });
  }


  handleToggleUpGuestInfoCategory(guestInfoCategory, e) {
    let newValue = this.state[guestInfoCategory]++;
    this.setState({
      guestInfoCategory: newValue
    })
  }

  handleToggleDownGuestInfoCategory(guestInfoCategory, e) {
    if (guestInfoCategory === 'sessionChildren') {
      if (this.state[guestInfoCategory] !== 0) {
        let newValue = this.state[guestInfoCategory]--;
        this.setState({
          guestInfoCategory: newValue
        })
      }
    } else {
      if (this.state[guestInfoCategory] !== 1) {
        let newValue = this.state[guestInfoCategory]--;
        this.setState({
          guestInfoCategory: newValue
        })
      }
    }
  }

  handleGuestInfoUpdateClick(e) {
    this.setState({
      isGuestInformationActive: false
    })
    fetch('/api/booking/' + this.state.id, {
      method: 'POST',
      body: JSON.stringify({ checkIn: this.state.sessionCheckIn, checkOut: this.state.sessionCheckOut, adults: this.state.sessionAdults, children: this.state.sessionChildren }),
      headers: { 'Content-type': 'application/json' }
    })
      .then((data) => {
        return data.json()
      })
      .then((dataJson) => {
        this.setState({
          deal: dataJson.deal,
          prices: dataJson.prices
        })
      });
  }

  render() {
    return (
      <div style={{ "display": "inline-block", backgroundColor: "#f2f2f2"}}>
        <div id="bookingWidget" style={{ "display": "inline-block", "width": 395, "height": 560, "backgroundColor": "white", "textAlign": "center", "borderRadius": 0, "boxShadow": "0 0 3px 0px rgba(0, 0, 0, 0.4)" }}>
          <div id="viewers" style={{ "height": "15px", "margin": "8px 0", "padding": "15px" }}>
            <div id="viewerMessage" style={{ "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#D91E18", "fontWeight": 700, "fontSize": "16px", "textAlign": "center" }}>
              <span style={{ "marginRight": 6 }}><i class="fas fa-user-friends"></i></span>
              <span>{this.state.viewers}</span>
            </div>
          </div>





          <div id="userInputs">
            <div id="dates" style={{ "marginBottom": 3 }}>
              <div id="checkInGreenBox" style={{ "display": "inline-block", "height": 44, "width": 176.5, "margin": "0 0 0 0px", "backgroundColor": "#00a680", "borderRadius": "3px", "border": "1px solid #d6d6d6", cursor: "pointer" }}>
                <div id="checkInBox" style={{ "height": 44, "width": 166, "backgroundColor": "white", "float": "right", cursor: "pointer" }} onClick={(e) => { this.handleCheckInClick(e) }}>
                  <div style={{ "display": "inline-block", "height": 25, "width": 25, "color": "#767676", "fontSize": 18, "float": "left", "marginTop": 13, "marginLeft": 5, "marginRight": 5 }}><i class="far fa-calendar-alt"></i></div>
                  <div style={{ "marginLeft": 30 }}>
                    <div style={{ "textAlign": "left", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "fontSize": 13, "color": "#4A4A4A", "marginBottom": 5, "marginTop": 5, "fontWeight": 300 }}>Check In</div>
                    <div style={{ "textAlign": "left", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "fontSize": 14, "color": "rgba(0, 0,. 0, 0.85)", "fontWeight": 600 }}>{this.state.days[this.state.sessionCheckIn].CheckInOutFormatted}</div>
                  </div>
                </div>
              </div>
              <div style={{ "width": 8, "display": "inline-block" }}></div>
              <div id="checkOutRedBox" style={{ "display": "inline-block", "textAlign": "left", "height": 44, "width": 176.5, "margin": "0 0 0 0px", "backgroundColor": "#D91E18", "borderRadius": "3px", "border": "1px solid #d6d6d6", cursor: "pointer" }}>
                <div id="checkOutBox" style={{ "height": 44, "width": 166, "backgroundColor": "white", "float": "right", cursor: "pointer" }} onClick={(e) => { this.handleCheckOutClick(e) }}>
                  <div style={{ "display": "inline-block", "height": 25, "width": 25, "color": "#767676", "fontSize": 18, "float": "left", "marginTop": 13, "marginLeft": 10, "marginRight": 3, }}><i class="far fa-calendar-alt"></i></div>
                  <div style={{ "marginLeft": 30 }}>
                    <div style={{ "textAlign": "left", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "fontSize": 13, "color": "#4A4A4A", "marginBottom": 5, "marginTop": 5, "fontWeight": 300 }}>Check Out</div>
                    <div style={{ "textAlign": "left", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "fontSize": 14, "color": "rgba(0, 0,. 0, 0.85)", "fontWeight": 600 }}>{this.state.days[this.state.sessionCheckOut].CheckInOutFormatted}</div>
                  </div>
                </div>
              </div>




            </div>
            <div id="tripDetails" style={{ "display": "inline-block", "height": 42, "width": 363, "backgroundColor": "white", "borderRadius": "3px", "border": "1px solid #d6d6d6", cursor: "pointer" }} onClick={(e) => { this.handleGuestInfoClick(e) }}>
              <div style={{ "display": "inline-block", "height": 25, "width": 25, "color": "#767676", "fontSize": 18, "float": "left", "marginTop": 13, "marginLeft": 8, "marginRight": 8 }}><i class="fas fa-user-friends"></i></div>
              <div style={{ "marginLeft": 30 }}>
                <div style={{ "textAlign": "left", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "fontSize": 13, "color": "#4A4A4A", "marginBottom": 5, "marginTop": 5, "fontWeight": 300 }}>Guests</div>
                <div style={{ "textAlign": "left", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "fontSize": 14, "color": "rgba(0, 0,. 0, 0.85)", "fontWeight": 600 }}>{this.state.sessionRooms} room, {this.state.sessionAdults} adults, {this.state.sessionChildren} children</div>
              </div>
            </div>
          </div>
          <div style={{ "height": 8 }}></div>
          <div id="hotelPromo" style={{ "display": "inline-block", "height": 42, "width": 363, "margin": " 0 0 0 0px", "backgroundColor": "white", "borderRadius": "5px", "border": "1px solid #D91E18" }}>
            <div id="hotelDeal">
              <div style={{ "margin": 10 }}>
                <span style={{ "color": "#D91E18", "marginRight": 8 }}><i class="fas fa-tag"></i></span>
                <span style={{ "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#D91E18", "fontWeight": 600, "fontSize": "15px", "textAlign": "center" }}>Hotel direct offer!</span>
                <span style={{ "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#767676", "fontWeight": 500, "fontSize": "15px", "textAlign": "center", "marginLeft": 8 }}>{this.state.deal}</span>
              </div>
            </div>
          </div>
          <div id="pricingSection">
            <div id="bigQuotes">
              <div id="siteQuote" style={{ "height": 88, "width": 363, "borderBottom": "1px solid #d6d6d6", "display": "inline-block", "align": "center" }}>
                <div style={{ "float": "left", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "width": 100, "height": 41, "color": "purple", "marginLeft": 15, "marginTop": 20, "fontSize": 30, "display": "inline-block" }}><i class="fas fa-skull"></i>.com</div>
                <button style={{ "float": "right", "display": "inline-block", "padding": "8px 16px", "height": 42, "width": 120, "fontWeight": 700, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "border": "1px solid transparent", "borderRadius": 2, "fontSize": 16, "textAlign": "center", "cursor": "pointer", "borderColor": "#fc0 #e4a000 #e4a000 #fc0", "backgroundColor": "rgb(255, 204, 0)", "color": "black", "marginTop": 20 }}>View Deal</button>
                <div style={{ "float": "right", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "width": 80, "height": 41, "color": "black", "marginLeft": 15, "marginTop": 25, "fontSize": 24, "display": "inline-block", "fontWeight": 600 }}>${this.state.prices[0].price}</div>
              </div>

              <div id="siteQuote" style={{ "height": 88, "width": 363, "borderBottom": "1px solid #d6d6d6", "display": "inline-block", "align": "center" }}>
                <div style={{ "float": "left", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "width": 100, "height": 41, "color": "orange", "marginLeft": 15, "marginTop": 20, "fontSize": 30, "display": "inline-block" }}><i class="fas fa-plane"></i>.com</div>
                <button style={{ "float": "right", "display": "inline-block", "padding": "8px 16px", "height": 42, "width": 120, "fontWeight": 700, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "border": "1px solid transparent", "borderRadius": 2, "fontSize": 16, "textAlign": "center", "cursor": "pointer", "borderColor": "#fc0 #e4a000 #e4a000 #fc0", "backgroundColor": "rgb(255, 204, 0)", "color": "black", "marginTop": 20 }}>View Deal</button>
                <div style={{ "float": "right", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "width": 80, "height": 41, "color": "black", "marginLeft": 15, "marginTop": 25, "fontSize": 24, "display": "inline-block", "fontWeight": 600 }}>${this.state.prices[1].price}</div>
              </div>

              <div id="siteQuote" style={{ "height": 88, "width": 363, "borderBottom": "1px solid #d6d6d6", "display": "inline-block", "align": "center" }}>
                <div style={{ "float": "left", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "width": 100, "height": 41, "color": "blue", "marginLeft": 15, "marginTop": 20, "fontSize": 30, "display": "inline-block" }}><i class="fas fa-space-shuttle"></i>.com</div>
                <button style={{ "float": "right", "display": "inline-block", "padding": "8px 16px", "height": 42, "width": 120, "fontWeight": 700, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "border": "1px solid transparent", "borderRadius": 2, "fontSize": 16, "textAlign": "center", "cursor": "pointer", "borderColor": "#fc0 #e4a000 #e4a000 #fc0", "backgroundColor": "rgb(255, 204, 0)", "color": "black", "marginTop": 20 }}>View Deal</button>
                <div style={{ "float": "right", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "width": 80, "height": 41, "color": "black", "marginLeft": 15, "marginTop": 25, "fontSize": 24, "display": "inline-block", "fontWeight": 600 }}>${this.state.prices[2].price}</div>
              </div>
            </div>



            <div id="smallQuotes" style={{ "marginTop": 3, "marginBottom": 15 }}>

              <div id="siteQuotes" style={{ "width": 375, "height": 500 }}>
                <div style={{ "marginBottom": 1 }}>
                  <div style={{ "display": "inline-block", "width": 168, "textAlign": "left", "fontSize": 13, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#4A4A4A", "marginLeft": 14, "marginRight": 20, "float": "left" }}>
                    <div style={{ "display": "inline-block", "float": "left", "width": 100 }}>{this.state.prices[3].name}</div>
                    <div style={{ "display": "inline-block", "fontSize": 11, "textAlign": "center", "width": 15 }}><i class="fas fa-external-link-alt"></i></div>
                    <div style={{ "display": "inline-block", "textOverflow": "ellipsis", "width": 20 }}><span>......</span></div>
                    <div style={{ "display": "inline-block", "float": "right", "fontWeight": 700, "width": 30 }}>${this.state.prices[3].price}</div>
                  </div>


                  <div style={{ "display": "inline-block", "width": 168, "textAlign": "left", "fontSize": 13, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#4A4A4A" }}>
                    <div style={{ "display": "inline-block", "float": "left", "width": 80 }}>{this.state.prices[4].name}</div>
                    <div style={{ "display": "inline-block", "fontSize": 11, "textAlign": "center", "width": 25 }}><i class="fas fa-external-link-alt"></i></div>
                    <div style={{ "display": "inline-block", "marginRight": 2, "textOverflow": "ellipsis" }}><span>.....</span></div>
                    <div style={{ "display": "inline-block", "float": "right", "fontWeight": 700, "width": 40 }}>${this.state.prices[4].price}</div>
                  </div>
                </div>


                <div style={{ "marginBottom": 15 }}>
                  <div style={{ "display": "inline-block", "width": 168, "textAlign": "left", "fontSize": 13, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#4A4A4A", "marginLeft": 14, "marginRight": 20, "float": "left" }}>
                    <div style={{ "display": "inline-block", "float": "left", "width": 100 }}>{this.state.prices[5].name}</div>
                    <div style={{ "display": "inline-block", "fontSize": 11, "textAlign": "center", "width": 15 }}><i class="fas fa-external-link-alt"></i></div>
                    <div style={{ "display": "inline-block", "textOverflow": "ellipsis", "width": 20 }}><span>......</span></div>
                    <div style={{ "display": "inline-block", "float": "right", "fontWeight": 700, "width": 30 }}>${this.state.prices[5].price}</div>
                  </div>



                  <div style={{ "display": "inline-block", "width": 168, "textAlign": "left", "fontSize": 13, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#4A4A4A", "float": "right" }}>
                    <div style={{ "display": "inline-block", "textAlign": "right", "fontWeight": 700 }}><span>View all 20 deals</span><i class="fas fa-caret-down"></i></div>
                  </div>
                </div>





                <div id="disclaimer" style={{ "marginTop": 8, "marginBottom": 12 }}>
                  <div id="disclaimerText" style={{ "float:": "bottom", "fontSize": 13, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#767676" }}>Prices are the average nightly price provided by our partner...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "inline-block", "width": 100 }}></div>


        {this.state.areCheckInCalendarsActive ?
          <div id="checkInCalendars" style={{ position: "absolute", left: 220,top: '10px', "display": "inline-block", "backgroundColor": "white", "height": 419, "width": 545, "zIndex": 1,"marginRight": 30, "boxShadow": "0 0 1px 0px rgba(0, 0, 0, 0.4)", borderRadius: 2}}>
            <div id="header" style={{ "display": "block", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#000a12", "fontWeight": 700, "fontSize": "16px", "textAlign": "center", "marginRight": "15px", "marginLeft": "15px", "borderBottom": "1px solid #e5e5e5", "paddingTop": 15, "paddingBottom": 0 }}>
              <div style={{ "color": "#000A12" }}>Select a date to continue</div>
              <div>
                <div style={{ "display": "inline-block", "height": 10, "width": 10, "borderRadius": 2, "backgroundColor": "#fc0", "marginRight": 4 }}></div>
                <div style={{ "display": "inline-block", "paddingTop": 4, paddingBottom: 4, "color": "#4A4A4A", "fontSize": 14 }}>Lowest priced dates</div>
              </div>
            </div>
            <div id="months">
              <div id="LeftMonth" style={{ "display": "inline-block", "width": 240, "height": 287, "marginTop": 12, "marginBottom": 12, "paddingRight": 16, "paddingLeft": 16, "whiteSpace": "nowrap", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#2c2c2c", borderRight: "1px solid #e5e5e5" }}>
                <div id="leftMonthHeaderAndNav" style={{ "display": "inline-block", "width": 240, "height": 38, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", 'textAlign': "center", "fontSize": 16, "fontWeight": 700, "paddingTop": 5, "paddingBottom": 5, "paddingRight": 7, "paddingLeft": 7 }}>
                  <div style={{ display: "inline-block" }}>{this.state.months[this.state.leftMonthIndex].month}</div>
                  <div style={{ display: "inline-block", float: "left" }} onClick={(e) => { this.handleCalendarToggleMonthLeft(e) }}><i class="fas fa-chevron-left"></i></div>
                </div>
                <Calendar rows={this.state.months[this.state.leftMonthIndex]} days={this.state.days} handleCalendarRowItemClick={this.handleCalendarRowItemClick.bind(this)} />
              </div>
              <div id="rightMonth" style={{ "display": "inline-block", "width": 240, "height": 287, "marginTop": 12, "marginBottom": 12, "paddingRight": 16, "paddingLeft": 16, "whiteSpace": "nowrap", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#2c2c2c" }}>
                <div id="rightMonthHeaderAndNav" style={{ "display": "inline-block", "width": 240, "height": 38, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", 'textAlign': "center", "fontSize": 16, "fontWeight": 700, "paddingTop": 5, "paddingBottom": 5, "paddingRight": 7, "paddingLeft": 7 }}>
                  <div style={{ display: "inline-block" }}>{this.state.months[this.state.rightMonthIndex].month}</div>
                  <div style={{ display: "inline-block", float: "right" }} onClick={(e) => { this.handleCalendarToggleMonthRight(e) }}><i class="fas fa-chevron-right"></i></div>
                </div>
                <Calendar rows={this.state.months[this.state.rightMonthIndex]} days={this.state.days} handleCalendarRowItemClick={this.handleCalendarRowItemClick.bind(this)} />
              </div>




            </div>
            {/* <div style={{ "borderBottom": "1px solid #e5e5e5", "width": 523,"paddingRight": 16, "paddingLeft": 16, "textAlign":"center"}}></div> */}
            <div id="averagePrices" style={{ "display": "block", "width": 510, "height": 20, "marginRight": 16, "marginLeft": 16, "paddingTop": 12, "paddingBottom": 15, "borderTop": "1px solid #e5e5e5" }}>
              <span style={{ "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#2c2c2c", "fontSize": 13 }}>Average daily rates: ${this.state.prices[0].price} - ${this.state.prices[19].price}</span>
            </div>
            <div id="triangle" style={{position:"absolute", left:-10, top: 73, transform:"rotate(45deg)", height: 18, width:18, backgroundColor:"white", borderBottom: "1px solid #e5e5e5", borderLeft:"1px solid #e5e5e5"}}>
            </div>
          </div> : ''}

        {this.state.areCheckOutCalendarsActive ?
          <div id="checkInCalendars" style={{ position: "absolute", left: 407,top: '10px', "display": "inline-block", "backgroundColor": "white", "height": 419, "width": 545, "zIndex": 1, "marginRight": 30, "boxShadow": "0 0 1px 0px rgba(0, 0, 0, 0.4)", borderRadius: 2}}>
            <div id="header" style={{ "display": "block", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#000a12", "fontWeight": 700, "fontSize": "16px", "textAlign": "center", "marginRight": "15px", "marginLeft": "15px", "borderBottom": "1px solid #e5e5e5", "paddingTop": 15, "paddingBottom": 0 }}>
              <div style={{ "color": "#000A12" }}>Select a date to continue</div>
              <div>
                <div style={{ "display": "inline-block", "height": 10, "width": 10, "borderRadius": 2, "backgroundColor": "#fc0", "marginRight": 4 }}></div>
                <div style={{ "display": "inline-block", "paddingTop": 4, paddingBottom: 4, "color": "#4A4A4A", "fontSize": 14 }}>Lowest priced dates</div>
              </div>
            </div>
            <div id="months">
              <div id="LeftMonth" style={{ "display": "inline-block", "width": 240, "height": 287, "marginTop": 12, "marginBottom": 12, "paddingRight": 16, "paddingLeft": 16, "whiteSpace": "nowrap", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#2c2c2c", borderRight: "1px solid #e5e5e5" }}>
                <div id="leftMonthHeaderAndNav" style={{ "display": "inline-block", "width": 240, "height": 38, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", 'textAlign': "center", "fontSize": 16, "fontWeight": 700, "paddingTop": 5, "paddingBottom": 5, "paddingRight": 7, "paddingLeft": 7 }}>
                  <div style={{ display: "inline-block" }}>{this.state.months[this.state.leftMonthIndex].month}</div>
                  <div style={{ display: "inline-block", float: "left" }} onClick={(e) => { this.handleCalendarToggleMonthLeft(e) }}><i class="fas fa-chevron-left"></i></div>
                </div>
                <Calendar rows={this.state.months[this.state.leftMonthIndex]} days={this.state.days} handleCalendarRowItemClick={this.handleCalendarRowItemClick.bind(this)} />
              </div>
              <div id="rightMonth" style={{ "display": "inline-block", "width": 240, "height": 287, "marginTop": 12, "marginBottom": 12, "paddingRight": 16, "paddingLeft": 16, "whiteSpace": "nowrap", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#2c2c2c" }}>
                <div id="rightMonthHeaderAndNav" style={{ "display": "inline-block", "width": 240, "height": 38, "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", 'textAlign': "center", "fontSize": 16, "fontWeight": 700, "paddingTop": 5, "paddingBottom": 5, "paddingRight": 7, "paddingLeft": 7 }}>
                  <div style={{ display: "inline-block" }}>{this.state.months[this.state.rightMonthIndex].month}</div>
                  <div style={{ display: "inline-block", float: "right" }} onClick={(e) => { this.handleCalendarToggleMonthRight(e) }}><i class="fas fa-chevron-right"></i></div>
                </div>
                <Calendar rows={this.state.months[this.state.rightMonthIndex]} days={this.state.days} handleCalendarRowItemClick={this.handleCalendarRowItemClick.bind(this)} />
              </div>




            </div>
            {/* <div style={{ "borderBottom": "1px solid #e5e5e5", "width": 523,"paddingRight": 16, "paddingLeft": 16, "textAlign":"center"}}></div> */}
            <div id="averagePrices" style={{ "display": "block", "width": 510, "height": 20, "marginRight": 16, "marginLeft": 16, "paddingTop": 12, "paddingBottom": 15, "borderTop": "1px solid #e5e5e5" }}>
              <span style={{ "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", "color": "#2c2c2c", "fontSize": 13 }}>Average daily rates: ${this.state.prices[0].price} - ${this.state.prices[19].price}</span>
            </div>
            <div id="triangle" style={{position:"absolute", left:-10, top: 73, transform:"rotate(45deg)", height: 18, width:18, backgroundColor:"white", borderBottom: "1px solid #e5e5e5", borderLeft:"1px solid #e5e5e5"}}>
            </div>
          </div> : ''}












        {this.state.isGuestInformationActive ? <div id="guestInfo" style={{ position: "absolute", zIndex: 1, left: 407, top: 40, "backgroundColor": "white", "height": 230, "width": 288, paddingTop: 16, paddingBottom: 16, paddingRight: 16, paddingLeft: 16, "boxShadow": "0 0 1px 0px rgba(0, 0, 0, 0.4)", borderRadius: 2}}>

          <div id="closeGuestInfo" style={{ float: "right", color: "#00a680", fontSize: 20, cursor: "pointer" }} onClick={(e) => { this.handleGuestInfoClose(e) }}>< i class="fas fa-times"></i></div>

          <div id="rooms" style={{ display: "inline-block", height: 36, width: 288, color: "#2C2C2C", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", fontWeight: 700, paddingTop: 16, fontSize: ".95em" }}>
            <div style={{ display: "inline-block", marginTop: 12 }}>
              <span><i class="fas fa-bed"></i></span><span style={{ "marginLeft": 5 }}>Rooms</span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", float: "right" }}>
              <div style={{ display: "flex", width: 36, height: 36, color: "#00A680", alignItems: "center", justifyContent: "center", border: "1px solid #e5e5e5", cursor: "pointer" }} onClick={(e) => { this.handleToggleDownGuestInfoCategory('sessionRooms', e) }}><i class="fas fa-minus"></i></div>
              <div style={{ display: "flex", width: 58, height: 36, color: "#2C2c2C", alignItems: "center", justifyContent: "center", border: "1px solid #e5e5e5", fontWeight: 400, boxShadow: "inset 0 3px 3px -3px rgba(0,0,0,.25)" }}>{this.state.sessionRooms}</div>
              <div style={{ display: "flex", width: 36, height: 36, color: "#00A680", alignItems: "center", justifyContent: "center", border: "1px solid #e5e5e5", cursor: "pointer" }} onClick={(e) => { this.handleToggleUpGuestInfoCategory('sessionRooms', e) }}><i class="fas fa-plus"></i></div>
            </div>
          </div>





          <div id="adults" style={{ display: "inline-block", height: 36, width: 288, color: "#2C2C2C", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", fontWeight: 700, paddingTop: 16, fontSize: ".95em" }}>
            <div style={{ display: "inline-block", marginTop: 12 }}>
              <span><i class="fas fa-bed"></i></span><span style={{ "marginLeft": 5 }}>Adults</span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", float: "right" }}>
              <div style={{ display: "flex", width: 36, height: 36, color: "#00A680", alignItems: "center", justifyContent: "center", border: "1px solid #e5e5e5", cursor: "pointer" }} onClick={(e) => { this.handleToggleDownGuestInfoCategory('sessionAdults', e) }}><i class="fas fa-minus"></i></div>
              <div style={{ display: "flex", width: 58, height: 36, color: "#2C2c2C", alignItems: "center", justifyContent: "center", border: "1px solid #e5e5e5", fontWeight: 400, boxShadow: "inset 0 3px 3px -3px rgba(0,0,0,.25)" }}>{this.state.sessionAdults}</div>
              <div style={{ display: "flex", width: 36, height: 36, color: "#00A680", alignItems: "center", justifyContent: "center", border: "1px solid #e5e5e5", cursor: "pointer" }} onClick={(e) => { this.handleToggleUpGuestInfoCategory('sessionAdults', e) }}><i class="fas fa-plus"></i></div>
            </div>
          </div>






          <div id="children" style={{ display: "inline-block", height: 36, width: 288, color: "#2C2C2C", "fontFamily": "Arial,Tahoma,Bitstream Vera Sans,sans-serif", fontWeight: 700, paddingTop: 16, fontSize: ".95em" }}>
            <div style={{ display: "inline-block", marginTop: 12 }}>
              <span><i class="fas fa-bed"></i></span><span style={{ "marginLeft": 5 }}>Children</span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", float: "right" }}>
              <div style={{ display: "flex", width: 36, height: 36, color: "#00A680", alignItems: "center", justifyContent: "center", border: "1px solid #e5e5e5", cursor: "pointer" }} onClick={(e) => { this.handleToggleDownGuestInfoCategory('sessionChildren', e) }}><i class="fas fa-minus"></i></div>
              <div style={{ display: "flex", width: 58, height: 36, color: "#2C2c2C", alignItems: "center", justifyContent: "center", border: "1px solid #e5e5e5", fontWeight: 400, boxShadow: "inset 0 3px 3px -3px rgba(0,0,0,.25)" }}>{this.state.sessionChildren}</div>
              <div style={{ display: "flex", width: 36, height: 36, color: "#00A680", alignItems: "center", justifyContent: "center", border: "1px solid #e5e5e5", cursor: "pointer" }} onClick={(e) => { this.handleToggleUpGuestInfoCategory('sessionChildren', e) }}><i class="fas fa-plus"></i></div>
            </div>
          </div>
          <div style={{ paddingTop: 16 }}>
            <button id="update" style={{ borderColor: "#078171", width: 288, height: 36, backgroundColor: "#078171", color: "#fff", fontFamily: "Arial,Tahoma,Bitstream Vera Sans,sans-serif", border: "1px solid transparent", borderRadius: 3, fontSize: ".95em", textAlign: "center", cursor: "pointer", fontWeight: 700 }} onClick={(e) => {this.handleGuestInfoUpdateClick(e)}}>Update</button>
          </div>
          <div id="triangle" style={{position:"fixed", left:-10, top: 95, transform:"rotate(45deg)", height: 18, width:18, backgroundColor:"white", borderBottom: "1px solid #e5e5e5", borderLeft:"1px solid #e5e5e5"}}>
            </div>
        </div> : ''}



      </div>
    )
  }
}

export default Booking;



