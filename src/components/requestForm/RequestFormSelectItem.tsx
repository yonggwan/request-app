import React from 'react';
import { RequestFormItemModel } from '../../models/RequestForm';

interface RequestFormItemProps {
  item: RequestFormItemModel;
  selectedOptionIds: Array<number>
  onChange(selectedOptionIds: Array<number>): void;
}

const RequestFormSelectItem = ({ item, selectedOptionIds, onChange }: RequestFormItemProps) => {
  const selectedOptionId = selectedOptionIds.pop();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('RequestFormSelectItem@handleChange', event);
    const optionId: number = Number(event.target.value);
    onChange([optionId]);
  };
  
  return (
    <select
      name={item.title}
      data-item-id={item.itemId}
      value={selectedOptionId}
      defaultValue={-1}
      onChange={handleChange}>
      {/* <option key="default" defaultValue={-1} disabled>선택하세요.</option> */}
      {item.options.map(option => (
        <option key={option.id} value={option.id}>{option.text}</option>
      ))}
    </select>
  )
}

export default RequestFormSelectItem;