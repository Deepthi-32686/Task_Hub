// function
  function greet(callback) {
    callback();
        console.log('Hi' );
        
  }
  // callback function
  function callMe() {
        console.log('I am callback function');
  }
  // passing function as an argument
  greet(callMe);