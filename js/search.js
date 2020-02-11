function search(e) {
  [...document.querySelectorAll("tr")].forEach(item => {
      let counter = 0;
      [...item.querySelectorAll("td")].forEach(it => {
        if (it.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
          counter++;
        }
      });
        if (counter > 0) {
        item.classList.remove('not_found');
      } else {
        item.classList.add("not_found");
      }
  });
}

$('#search-text').keyup(function (e) {
  search(e);
  console.log(e.target.value);
});

$('#search-text').keydown(function () {
  if(document.querySelectorAll("tr").length == document.querySelectorAll(".not_found").length) {
    document.querySelector('.message').style.visibility = 'visible';  
  } else  document.querySelector('.message').style.visibility = 'hidden'; 
});