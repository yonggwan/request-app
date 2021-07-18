import React from 'react';
import { RequestFormItemParam } from '../../models/RequestForm';
import RequestFormCheckboxItem from './RequestFormCheckboxItem';
import RequestFormSelectItem from './RequestFormSelectItem';

interface RequestFormItemProps {
  item: RequestFormItemParam;
  selectedOptionIds: number[];
  onChange(itemOptionIds: number[]): void;
}

const RequestFormStep = ({ item, selectedOptionIds }: RequestFormItemProps) => {
  const handleCheckboxChange = () => {};
  const handleSelectChange = () => {};
  
  return (
    <fieldset key={item.itemId}>
      <legend>{item.title}</legend>
      {item.formType === 'checkbox' ? (
        <RequestFormCheckboxItem item={item} onChange={handleCheckboxChange} selectedOptionIds={selectedOptionIds} />
      ) : item.formType === 'select' ? 
        <RequestFormSelectItem item={item} onChange={handleSelectChange} selectedOptionIds={selectedOptionIds}/> 
        : null}
    </fieldset>
  )
}

export default RequestFormStep;