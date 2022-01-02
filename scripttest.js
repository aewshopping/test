function test() {
  window.alert("Hi");
}

function myToggleLarge(id) {
//  window.alert("Hello")
  var allimg = document.getElementsByTagName('img');
  var mybtn = document.getElementById(id);
  
    for (let i=0;i<allimg.length;i++) {

      if (allimg[i].hasAttribute("data-altimg")) {
        var imgchange = allimg[i].dataset.altimg;
        var parentdiv = allimg[i].parentElement;
        
        if (parentdiv.classList.contains("gr_grid_book_container_highlight")) {
          parentdiv.classList.toggle("gr_grid_book_container_large_highlight");
          parentdiv.classList.toggle("gr_grid_book_container_highlight");

        } else {
            if (parentdiv.classList.contains("gr_grid_book_container_large_highlight")) {
            parentdiv.classList.toggle("gr_grid_book_container_large_highlight");
            parentdiv.classList.toggle("gr_grid_book_container_highlight");
          }
        }
        
        if (parentdiv.classList.contains("gr_grid_book_container")) {
          parentdiv.classList.toggle("gr_grid_book_container_large");
          parentdiv.classList.toggle("gr_grid_book_container");
        } else {
            if (parentdiv.classList.contains("gr_grid_book_container_large")) {
            parentdiv.classList.toggle("gr_grid_book_container_large");
            parentdiv.classList.toggle("gr_grid_book_container");
          }
        }   
        
        allimg[i].dataset.altimg= allimg[i].src;
        allimg[i].src= imgchange;
      }
    }  
  
      if (mybtn.innerText === "Larger covers") {
        mybtn.innerText = "Smaller covers";
      } else {
        mybtn.innerText = "Larger covers";
      }
  
  }


function myShowFilterLabel(id) {
//  window.alert("Show this text");
  var xbtn = document.createElement("button");
  var location = document.getElementById("myFilterGroup");
  var btnText = document.getElementById(id).value;
  
  xbtn.type = "button";
  xbtn.id = id + "f"
  xbtn.innerHTML = btnText + "<span class='my-close'>&nbsp&times;</span>";
  xbtn.classList.add('btn', 'my-btn-cancel', 'btn-sm', 'btn-rounded');
  location.appendChild(xbtn);
  xbtn.onclick = function () {
    myFilterAnd(id);
    xbtn.remove();
  };
}


function myFilterAnd(id) {
  //select the button element clicked
  var myEL = document.getElementById(id);
  myEL.classList.toggle("btn-primary");
//  myEL.classList.toggle("btn"); 
  myEL.classList.toggle("onState");
  
  myDoFilter()
  
  if (myEL.classList.contains("onState")) {
    myShowFilterLabel(id)
  } else {
    document.getElementById(id + "f").remove();
  }
}
 

function myDoFilter() {

  //get the collection of all books divs
  var allbooks = document.querySelector("main").children;
  //get the collection of all filtering buttons (ie with class filterbutton)
  var allbuttons = document.querySelectorAll("button.onState");

  //cycle through all the books
  for(let i=0;i<allbooks.length;i++) {
  var x=0, y=0; //set up some counters
    
    LoopBooks:
    //cycle through all the filter buttons
    for(let p=0;p<allbuttons.length;p++) {

      var btn_id = allbuttons[p].id;
      if (allbuttons[p].classList.contains("onState")) {      
        x++; //count the onbuttons
              
        if (allbooks[i].classList.contains(btn_id)) {
            y++; //count the filter matches 
            if (x>y){
              break LoopBooks;
            } //if we already have a button with no match can exit the loop
        }
      }
    }
    
 //   window.alert(x + " filters applied, " + y + " matches");
    //now we have cycled through a complete set of buttons for a book...
    if (x==y) { //if you have as many matches as there are on buttons...
      allbooks[i].style.display = "block";    
    } else {
      allbooks[i].style.display = "none";
    }       
  }
}

