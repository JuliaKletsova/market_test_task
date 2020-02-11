var isClicked = false;
var tr = document.getElementsByTagName('tr');

tr.onfocus = function() {
  if (isClicked) {
    tr.classList = '';
isClicked = false;
  } else {
    tr.classList.add('clicked');
    isClicked = true;
  }
};