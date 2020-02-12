import React from 'react';
import CalendarRow from "./calendarRow.jsx"
function Calendar(props) {
  return (
    <table style={{width: 240, height: 206}}>
      <thead style={{fontSize: 11, color: "#2c2c2c", fontFamily: "Arial,Tahoma,Bitstream Vera Sans,sans-serif", height:38, width:70}}>
        <th style={{fontWeight: 700}}>SUN</th>
        <th style={{fontWeight: 400}}>MON</th>
        <th style={{fontWeight: 400}}>TUE</th>
        <th style={{fontWeight: 400}}>WED</th>
        <th style={{fontWeight: 400}}>THU</th>
        <th style={{fontWeight: 400}}>FRI</th>
        <th style={{fontWeight: 700}}>SAT</th>
      </thead>
      <tbody>
      {props.rows.rows.map(row =>
        <CalendarRow row={row} days={props.days} handleCalendarRowItemClick={props.handleCalendarRowItemClick}/>)}
      </tbody>
    </table>
  )
}

{/* <table>
          <thead>
            <tr>
              {this.state.columnHeads.map(columnHead =>
                < ColumnHeadItem columnHead={columnHead} handleClick={this.handleClick.bind(this)} />
              )}
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map(row =>
              < BoardRow row={row} />
            )}
          </tbody>
        </table>
      </div> */}

export default Calendar;