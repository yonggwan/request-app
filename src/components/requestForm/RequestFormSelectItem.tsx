import React from 'react';
import { RequestFormItemParam } from "../../models/RequestForm";

interface RequestFormItemProps {
  item: RequestFormItemParam;
  selectedOptionIds: Set<number>
  onChange(itemOptionIds: Set<number>): void;
}

const RequestFormSelectItem = ({ item }: RequestFormItemProps) => {
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('RequestFormSelectItem@handleChange', event);
    const value: number = Number(event.target.value);
    // onChange(event.target.checked ? selectedOptionIds.add(value): selectedOptionIds.add(value));
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