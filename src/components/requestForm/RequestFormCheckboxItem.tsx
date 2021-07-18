import React from 'react';
import { RequestFormItemModel } from "../../models/RequestForm";

interface RequestFormItemProps {
  item: RequestFormItemModel;
  selectedOptionIds: Set<number>
  onChange(selectedOptionIds: Set<number>): void;
}

const RequestFormCheckboxItem = ({ item, selectedOptionIds, onChange }: RequestFormItemProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('RequestFormCheckboxItem@handleChange', event);
    const value: number = Number(event.target.value);
    if (event.target.checked) {
      selectedOptionIds.add(value)
    } else {
      selectedOptionIds.delete(value);
    }
    console.log(selectedOptionIds)
    onChange(selectedOptionIds);
  };

  console.log('passed selectedOptionIds', selectedOptionIds)
  
  return (
    <div>
      <p>{item.title}</p>
      {item.options.map(option => (
        <label key={option.id}>
          <input
            type="checkbox"
            value={option.id}
            onChange={handleChange}
            checked={selectedOptionIds.has(option.id)}
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