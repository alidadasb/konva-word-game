import React, {useState, useEffect} from 'react'

export const useField = function (props) {
  let defaultValue = props.defaultValue || props.value || ''
  delete props.defaultValue
  const [value, setField] = useState(defaultValue);

  useEffect(
    () => {
      if (value !== defaultValue) {
        setField(defaultValue);
      }
    },
    [defaultValue]
  );

  const input = <input value={value}
                       {...props}
                       onChange={(e) => {
                         let val = e.target.value || e.target.innerText;
                         setField(val);
                         props.callback && props.callback(val);
                       }}/>;
  return [value, input]
};

export const useTextarea = function ({rows = 10, cols = 10, defaultValue}) {
  const [value, setField] = useState(defaultValue || '');

  useEffect(
    () => {
      if (value !== defaultValue) {
        setField(defaultValue);
      }
    },
    [defaultValue]
  );

  const input = <textarea value={value}
                          name={'name'}
                          rows={rows}
                          cols={cols}
                          onChange={(e) => {
                            setField(e.target.value || e.target.innerText)
                          }}/>;
  return [value, input]
};
