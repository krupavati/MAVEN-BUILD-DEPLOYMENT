var firstname = "krupavti k"

var lastname = "nagur"
var firstname = "krupavati k"
document.getElementById('demo').innerHTML = `Hey i am ${firstname} ${lastname}, My name coming from Javascript`

var a = NaN;

if (a === NaN) {  // Noncompliant; always false
  console.log("a is not a number");  // this is dead code
}
