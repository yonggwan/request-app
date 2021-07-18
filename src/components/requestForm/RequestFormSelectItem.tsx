import React from 'react';
import { RequestFormItemParam } from "../../models/RequestForm";

interface RequestFormItemProps {
  item: RequestFormItemParam;
  selectedOptionIds: number[];
  onChange(itemOptionIds: number[]): void;
}

const RequestFormSelectItem = ({ item }: RequestFormItemProps) => {
  const handleChange = (event: any) => {
    console.log('RequestFormCheckboxItem@handleChange', event.target);
  };
  
  return (
    <div>
      <p>{item.title}</p>
      <select
        name={item.title}
        data-item-id={item.itemId}
        onChange={handleChange}>
        {item.options.map(option => (
          <option key={option.id} value={option.id}>{option.text}</option>
        ))}
      </select>
    </div>
  )
}

export default RequestFormSelectItem;