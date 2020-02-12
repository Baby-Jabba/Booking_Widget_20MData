import React from 'react';

function CalendarRowItem(props) {
  // var whatColor;
  //   if(props.rowItem === 'RED') {
  //     'RED';
  //   } else if(props.rowItem === 'YELLOW') {
  //     'YELLOW';
  //   } else {
  //     return;
  //   };

  // if(props.item === 'RED') {
  //   return(<th style={{fontSize: 60, color: 'red', backgroundColor: 'blue', width: 60, height: 60}}>o</th>)
  // } else if(props.item === 'YELLOW') {
  //   return (<th style={{fontSize: 60, color: 'yellow', backgroundColor: 'blue', width: 60, height: 60}}>o</th>)
  // } else {
  //   return (<th style={{fontSize: 60, color: 'black', backgroundColor: 'blue', width: 60, height: 60}}>o</th>)
  // }

  return(<th onClick={(e)=>(props.handleCalendarRowItemClick(props.item, e))}>{props.days[props.item].dayOfMonth}</th>)


  //   console.log(whatColor)
  // return (if(props.item === 'RED') {
  //   <th style={{fontSize: 100, color: 'red', backgroundColor: 'blue', width: 100, height: 100}}>o</th>
  // } else if(props.item === 'YELLOW') {
  //   <th style={{fontSize: 100, color: 'yellow', backgroundColor: 'blue', width: 100, height: 100}}>o</th>
  // } else {
  //   <th style={{fontSize: 100, color: 'black', backgroundColor: 'blue', width: 100, height: 100}}>o</th>
  // }


    // <th style={{fontSize: 100, color: whatColor === 'RED' ? 'red' : whatColor === 'YELLOW' ? 'yellow' : 'black', backgroundColor: 'blue', width: 100, height: 100}}>o</th>
  // )
  // console.log('BoardRowItem Props', props)
  // return(
  //   <td style={{fontSize: 100, color: 'red', backgroundColor: 'blue', width: 100, height: 100}}>o</td>
  // )
}

export default CalendarRowItem;