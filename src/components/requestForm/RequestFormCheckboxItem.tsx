import React from 'react';
import { RequestFormItemParam } from "../../models/RequestForm";

interface RequestFormItemProps {
  item: RequestFormItemParam;
  selectedOptionIds: number[];
  onChange(itemOptionIds: number[]): void;
}

const RequestFormCheckboxItem = ({ item, selectedOptionIds }: RequestFormItemProps) => {
  const handleChange = (event: any) => {
    console.log('RequestFormCheckboxItem@handleChange', event.target);
  };
  
  return (
    <div onChange={handleChange}>
      <p>{item.title}</p>
      {item.options.map(option => (
        <label key={option.id}>
          <input
            type="checkbox"
            value={option.id}
            checked={selectedOptionIds.includes(option.id)}
            data-item-id={item.itemId} 
            data-option-id={option.id} 
          />
          <span>{option.text}</span>
        </label>
      ))}
    </div>
  )
}

export default RequestFormCheckboxItem;