var ln = Math.log;

function log10(n) {
  return ln(n) / ln(10);
}

console.log(log10(100));

var out = document.getElementById('output');

//out.innerHTML = log10(100);

//out.innerHTML = '<p>Fuck you</p>';