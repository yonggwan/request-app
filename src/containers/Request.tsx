import React from 'react';
import { createUseStyles } from 'react-jss';
import { RequestFormModel } from '../models/RequestForm';
import RequestFormItem from '../components/requestForm/RequestFormItem';
import SoomgoService from '../services/soomgoService';

const useStyles = createUseStyles({
  container: {
    margin: '0 auto',
    maxWidth: '640px',
    border: '1px solid #f0f0f0'
  },
  pageTitle: {}
})

const Reqeust = () => {
  const classes = useStyles();
  const [reqeustForm, setReqeustForm] = React.useState<RequestFormModel>();
  const [selectedRequestFormItemIds, setSelectedRequestFormItemsIds] = React.useState(new Set());
  
  const getRequestForm = () => {
    (async () => {
      const response = await SoomgoService.getRequestForm('input_clean');
      console.log('[getRequestForm@response]', response)
      setReqeustForm(new RequestFormModel(response));
    })();
    return () => {};
  };

  React.useEffect(getRequestForm, []);
  
  return (
    <div className={classes.container}>
      <section>
        <h2 className={classes.pageTitle}>전문가에게 의뢰하기</h2>
        {!reqeustForm ? 'loading..' : (
          <form action="/" method="post">
            <h3>{reqeustForm.title}</h3>
            {reqeustForm.items.map(item => (
              <fieldset key={item.itemId}>
                <legend>{item.title}</legend>
                <RequestFormItem key={item.itemId} item={item} />
              </fieldset>
            ))}
            <button type="submit">제출하기</button>
            {/* <output hidden id="val" name="val" htmlFor="a b"></output> */}
          </form>
        )}
      </section>
    </div>
  );
}

export default Reqeust;