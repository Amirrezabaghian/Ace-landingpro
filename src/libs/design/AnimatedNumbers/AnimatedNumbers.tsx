// 'use client';

// import React from 'react';
// import ReactAnimatedNumbers from 'react-animated-numbers';

// const AnimatedNumbers = ({ numbers = 331231 }: { numbers: number }) => {
//   const [num, setNum] = React.useState(numbers);
//   return (
//     <div className="container">
//       <ReactAnimatedNumbers
//         // className={styles.container}
//         animateToNumber={num}
//         fontStyle={{
//           fontSize: 40,
//           color: 'red',
//         }}
//         includeComma
//         transitions={index => ({
//           type: 'tween',
//           duration: 0.6,
//         })}
//       />
//       <div className="flex justify-center gap-4">
//         <button onClick={() => setNum(state => state + 300)}>+</button>
//         <button onClick={() => setNum(state => state - 500)}>-</button>
//       </div>
//     </div>
//   );
// };

// export default AnimatedNumbers;
