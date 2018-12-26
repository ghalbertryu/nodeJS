const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, 1500);
  });
  return promise;
};

// const fetchData = () => {
//   const promise = new Object(
//     name = 'aaa',
//     func = (resolve, reject) => {
//         setTimeout(() => {
//           resolve('Done!');
//         }, 1500);
//         reject();
//       }
//   );
//   return promise;
// };

setTimeout(() => {
  console.log('Timer is done!');
  fetchData()
    .then(text => {
      console.log(text);
      return fetchData();
    })
    .then(text2 => {
      console.log(text2);
    });
}, 2000);
console.log('Hello!');
console.log('Hi!');
