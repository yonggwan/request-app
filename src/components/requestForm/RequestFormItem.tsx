import React from 'react';
import { RequestFormItemParam } from "../../models/RequestForm";

interface RequestFormItemProps {
  item: RequestFormItemParam;
}

const RequestFormItem = ({ item }: RequestFormItemProps) => {
  return (
    <div>
      <p>{item.title}</p><div>
        {item.formType === 'select' ? (
        <select name={item.title}>
          {item.options.map(option => (
            <option key={option.id} value={option.id}>{option.text}</option>
          ))}
        </select>
      ) : (
        <React.Fragment>
          {item.options.map(option => (
            <label key={option.id}>
              <input type='checkbox' name={option.text} value={option.id} />
              <span>{option.text}</span>
            </label>
          ))}
        </React.Fragment>
      )}
    </div>
  </div>
  )
}

export default RequestFormItem;