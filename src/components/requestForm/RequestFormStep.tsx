import React from 'react';
import { RequestFormItemModel, RequestFormTypeEnums } from '../../models/RequestForm';
import RequestFormCheckboxItem from './RequestFormCheckboxItem';
import RequestFormSelectItem from './RequestFormSelectItem';

interface RequestFormItemProps {
  item: RequestFormItemModel;
  selectedOptionIds: Set<number>;
  onChange(selectedOptionIds: Set<number>): void;
}

const RequestFormStep = ({ item, selectedOptionIds, onChange }: RequestFormItemProps) => {

  return (
    <fieldset>
      <legend>{item.title}</legend>
      {item.formType === RequestFormTypeEnums.checkbox ? (
        <RequestFormCheckboxItem item={item} onChange={onChange} selectedOptionIds={selectedOptionIds} />
      ) : item.formType === RequestFormTypeEnums.select ? 
        <RequestFormSelectItem item={item} onChange={onChange} selectedOptionIds={selectedOptionIds}/> 
        : null}
    </fieldset>
  )
}

export default RequestFormStep;