class SmartCalculator {

  constructor(initialValue) {
    this.initialValue = initialValue;
    this.operation = [];
  }

  add(number) {
    this.operation.push({
      name: 'add',
      impl: (a, b) => {return a + b;},
      order:  30,
      num: number
    });
    return this;
  }
  
  subtract(number) {
    this.operation.push({
      name: 'subtract',
      impl: (a, b) => {return a - b;},
      order: 30,
      num: number
    });
    return this;
  }

  multiply(number) {
    this.operation.push({
      name: 'multiply',
      impl: (a, b) => {return a * b;},
      order: 20,
      num: number
    });
    return this;
  }

  devide(number) {
    this.operation.push({
      name: 'devide',
      impl: (a, b) => {return a / b;},
      order: 20,
      num: number
    });
    return this;
  }

  pow(number) {
    this.operation.push({
      name: 'pow',
      impl: (a, b) => {return Math.pow(a, b);},
      order: 10,
      num: number
    });
    return this;
  }

  get calcResult() {   
    let revNotation = [this.initialValue];
    let revOperation = [];
    
    this.operation.forEach(item => {     
      if(item.name !== 'pow') {
        while (revOperation.length &&
            (revOperation[revOperation.length - 1].order <= item.order)) {
          revNotation.push(revOperation.pop().impl); 
        }
      }
      revOperation.push(item);
      revNotation.push(item.num);
    });

    while (revOperation.length) {
      revNotation.push(revOperation.pop().impl);
    }
    
    let result = [];
    let valueB;
    revNotation.forEach(item => {
      if (typeof(item) === 'number') {
        result.push(item);
      } else {
        valueB = result.pop();
        result.push(item(result.pop(), valueB));
      }
    });
    
    return result.pop();
  }
  
  valueOf() {
    return this.calcResult;
  }
}

module.exports = SmartCalculator;
