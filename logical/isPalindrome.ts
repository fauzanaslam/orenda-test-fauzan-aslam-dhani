const isPalindrome = (x) => {
  let reversed = x.toString().split("").reverse().join("");
  return x == reversed;
};
console.log(isPalindrome(121));
