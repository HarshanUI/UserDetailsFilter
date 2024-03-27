import Pagination from 'react-bootstrap/Pagination';
import React from 'react';
const UIPagination = ({total, active=1, setActivePage}) =>  {

  let items = [];
  for (let number = 1; number <= total; number++) {
    items.push(
      <Pagination.Item active={number === active} onClick={()=>{
        setActivePage(number)
      }}>
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination class="flex-center">{items}</Pagination>
  );
}

export default UIPagination;