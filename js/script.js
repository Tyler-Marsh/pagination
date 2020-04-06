/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
// add a global variable to access studentList in
// local scopes
const studentList = document.querySelectorAll('.student-item');


// items per page variable 
// set it to ten
// but the code is robust and will work for other numbers as well
let perPageShowing = 10;

// use this to append the links so that they appear after the list of students.
const endOfPage = document.querySelector('.page')

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
// make a showPage function
// this calculates the number of profiles to show

const showPage = (list, page) => {
   // set an upperLimit as to not go too far
   let upperLimit = (page*perPageShowing);
   // initialize a starting number
   let startNumber = (upperLimit-perPageShowing)
   // make sure that page 1 is on the right track 
   // because of 0 indexing language
	if (page === 1) {
		startNumber = 0
   }
   // loop through the lenght of the list we want to display
   for (let i = 0; i < list.length; i++) {
      // use logic to filter out what we want to display
     if (i >= startNumber &&  i < upperLimit) {
        // set display = block so it shows up and takes up the expected space
        list[i].style.display = "block";
     }
     else {
        // this hides results we do not want to see
        //  use display none bc display hidden still takes up page space
        list[i].style.display = "none";
     }
   }
   return
}
  




/*
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
*/

// create pagination links at the bottom of the page

const appendPageLinks = (perPageShowing) => {
   // calculate the number of links needed for pagination
   let numOfLinks = Math.ceil(studentList.length/perPageShowing);
   //  make a div element so that we have a space for the links
   paginationDiv = document.createElement('div')
   //  give it the classname needed in the specifications for styling purposes
   paginationDiv.className = 'pagination';
   // append the division element
   endOfPage.append(paginationDiv);
   // create an unordered list to put the links in
   paginationUl = document.createElement('ul');
   // add the unordered list to the division element
   paginationDiv.append(paginationUl);
   
   // loop through the number of links we need to create
   for (let i = 1; i <= numOfLinks; i++) {
      makeLi(i);
   }
}

// function to create the page <li>s with <a>s inside them
function makeLi(num) {
   // first create the list item
   let listItem = document.createElement('li');
   // then create the link that goes inside it
   let listATag = document.createElement('a')
   // specify the href to # to ensure users are sent to the top of the page
   // when they click
   listATag.href = "#";
   // append the child
   listItem.appendChild(listATag)
   // put the link number in link so users know what page to click
   listATag.innerText = num;
   // add event listener
   listItem.addEventListener("click", (event) => {
      // make the link show the new page
      showPage(studentList, num);
      // change class to active to give a visual cue to users
      event.target.className = "active";
      let Ul = event.target.parentNode.parentNode;
      let Lis = Ul.getElementsByTagName("a");
      for (let i = 0; i < Lis.length; i++) {
         // user logic to avoid looping twice to remove and add className
         if(Lis[i].textContent !== event.target.textContent) {
            Lis[i].className = ""
         }
      }
   });
   // add the pagination unordered list to the page
   paginationUl.append(listItem);
}

// add the links to the page
appendPageLinks(10);
// show the page to the students.
showPage(studentList, 1)