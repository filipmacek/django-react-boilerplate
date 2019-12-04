import React from 'react';
import axios from 'axios';

const host=window.location.host.split(':')[0];
export const ROOT_URL="http://api."+host+"/api/users/?format=json";

function App() {
    console.log('host '+host);
    console.log('ROOT_URL '+ROOT_URL);
  axios.get(ROOT_URL)
      .then(response => {
          console.log(response.data)
      }).catch(error=>{
          console.log(error)

  });
  return (
    <div className="App">
      <p>Testing</p>
    </div>
  );
}

export default App;
