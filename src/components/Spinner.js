import React from 'react';
import loading from './spinner.gif';

// function based component 
const Spinner = () => {
  return (
    <div className='text-center my-3'>
      <img src={loading} alt="loading" width={30} height={30} />
    </div>
  )
}

// Class based component 

// export class Spinner extends Component {
//   render() {
//     return (
//       <div className='text-center my-3'>
//         <img src={loading} alt="loading" width={30} height={30} />
//       </div>
//     )
//   }
// }

export default Spinner