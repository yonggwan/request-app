import React from 'react';
import { RequestFormItemModel } from '../../models/RequestForm';

interface RequestFormItemProps {
  item: RequestFormItemModel;
  selectedOptionIds: Array<number>
  onChange(selectedOptionIds: Array<number>): void;
}

const RequestFormCheckboxItem = ({ item, selectedOptionIds, onChange }: RequestFormItemProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('RequestFormCheckboxItem@handleChange', event);
    const optionId: number = Number(event.target.value);
    const optionIds = [...selectedOptionIds];
    if (event.target.checked) 
      optionIds.push(optionId)
    else 
      optionIds.splice(selectedOptionIds.findIndex(id => id === optionId), 1)
    onChange(optionIds);
  };

  return (
    <React.Fragment>
      {item.options.map(option => (
        <label key={option.id}>
          <input
            type="checkbox"
            value={option.id}
            onChange={handleChange}
            checked={selectedOptionIds.includes(option.id)}
            data-item-id={item.itemId} 
            data-option-id={option.id} 
          />
          <span>{option.text}</span>
        </label>
      ))}
    </React.Fragment>
  )
}

export default RequestFormCheckboxItem;