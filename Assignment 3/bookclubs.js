function myFunction(){
  var x = document.getElementById("container");
  if(x.style.display=="none"){
    x.style.display="block";
  }
  else{
    x.style.display="none";
  }
}
function getBooks() {

  var author = document.getElementById("author").value;
  author = author.trim();
  author = author.replace(" ","+");

  var title = document.getElementById("title").value;
	title = title.trim();
	title = title.replace(" ","+");

	var isbn = document.getElementById("isbn").value;
	isbn = isbn.trim();
	isbn = isbn.replace("-","");

	var query = ["",title,author,isbn].reduce(fancyJoin);

	if (query != "") {

		// remove old script
		var oldScript = document.getElementById("jsonpCall");
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = "https://www.googleapis.com/books/v1/volumes?q="
		var callback = "&callback=handleResponse"

		script.src = beginning+query+callback
		script.id = "jsonpCall";

		// put new script into DOM at bottom of body
		document.body.appendChild(script);
		}

}
/* Used above, for joining possibly empty strings with pluses */
function fancyJoin(a,b) {
    if (a == "") { return b; }
    else if (b == "") { return a; }
    else { return a+"+"+b; }
}
// Contains the function Callback Calls
function handleResponse(bookListObj) {
	var bookList = bookListObj.items;
// Getting the necessary Elements
		var book = bookList[0];
		var title = book.volumeInfo.title;
    var author = book.volumeInfo.authors;
    var image = book.volumeInfo.imageLinks.thumbnail;
    var description = book.volumeInfo.description;
    //  console.log(description)
    // Displaying them into separate tiles
	var div = document.createElement('div');
    div.classList.add("tiles");
    var close = div.appendChild(document.createElement('span'));
    close.textContent= 'x';
    close.classList.add("closediv");
    div.appendChild(close);
    var img = div.appendChild(document.createElement('img'));
    src = image + '.png';
    img.src = src;
    div.appendChild(img);
    var bookDisplay = document.getElementById("displayBook");
    var tile_title = div.appendChild(document.createElement('h2'));
    tile_title.textContent = title;
    div.appendChild(tile_title);
    var tile_author = div.appendChild(document.createElement('h3'));
    tile_author.textContent = 'By '+ author;
    div.appendChild(tile_author);
    var tile_description = div.appendChild(document.createElement('p'));
    tile_description.textContent = description;
    div.appendChild(tile_description);
    bookDisplay.appendChild(div);

  // Modal Elements
  var modal = document.getElementById('myModal');
  var modalImg = document.getElementById("img01");
  close.onclick= function removeDiv(){
    var elem = document.getElementsByClassName("close")[0];
    tiles.style.display="none";
  }
    img.onclick = function showSlides(){
      modal.style.display = "block";
      modalImg.src = this.src + '.png';
      }
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
     }
  }
