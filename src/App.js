import React, { useEffect, useState } from "react";
import Card from './card.js'
import Button from '@material-ui/core/Button';

export default function App() {
  const [data, setData] = useState([]);
  const [selected, setSelect] = useState([]);

  const subscribe = () => {
    fetch(`https://www.sbir.gov/api/solicitations.json?keyword=sbir`)
      .then(response => response.json())
      .then(json => {
        setData(json);
      });
  };

  useEffect(() => {
    subscribe();
  }, []);

  const onClick  = index => {
    const pos = selected.indexOf(index);
    if (pos < 0) setSelect(state => [...state, index]);
    else {
      setSelect(state => [
        ...state.slice(0, pos), ...state.slice(pos + 1)
      ])
    }
  }

  const onExport = () => {
    if (selected.length) {
      let objectData = selected.map(i => data[i]);
      let filename = "export.json";
      let contentType = "application/json;charset=utf-8;";
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        var a = document.createElement('a');
        a.download = filename;
        a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  }

  return (
    <>
      <h1 style={{textAlign: 'center', marginBottom: 10}}>Select Your favorite Items</h1>
      <div style={{display: 'flex', justifyContent: 'flex-end', top: -20, marginRight: 20}}>
        <Button variant="contained" size="small" style={{backgroundColor: '#ffff0040', marginBottom: 10 }} onClick={onExport}>Export To A Json</Button>
      </div>
      {
        (data && data.length) ?        
        data.map((item, index) => 
          <Card item={item} key={index} index={index} onClick={onClick}/>
        ) : null
      }
    </>
  );
}
