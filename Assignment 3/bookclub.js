function getBooks() {

  Author = document.getElementById("author").value;
  Author = Author.trim();
  Author = Author.replace(" ","+");

  Title = document.getElementById("title").value;
	Title = Title.trim();
	Title = Title.replace(" ","+");

	Isbn = document.getElementById("isbn").value;
	Isbn = Isbn.trim();
	Isbn = Isbn.replace("-","");

	var query = ["",Title,Author,Isbn].reduce(fancyJoin);

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
    var flag =1;

    var bookList = bookListObj.items;
    if (bookList == null){
      flag =0;
    }
// Getting the necessary Elements

    if(flag == 1){
    var books;
    var book = bookList[0];
		var title = book.volumeInfo.title;
    var author = book.volumeInfo.authors;
    var image = book.volumeInfo.imageLinks.thumbnail;
    var description = book.volumeInfo.description;
    /*if (title == null || author == null || description == null ){
      flag =0;
    }*/
    //  console.log(description)
    // Displaying them into separate tiles
    var div = document.createElement('div');
    div.classList.add("tiles");
    var bookDisplay = document.getElementById("displayBook");
    var tile_title = div.appendChild(document.createElement('tile_title'));
    tile_title.textContent = title;
    div.appendChild(tile_title);
    var tile_author = div.appendChild(document.createElement('tile_author'));
    tile_author.textContent = author;
    div.appendChild(tile_author);
    var img = div.appendChild(document.createElement('img'));
    src = image + '.png';
    img.src = src;
    div.appendChild(img);
    var tile_description = div.appendChild(document.createElement('p'));
    tile_description.textContent = description;
    div.appendChild(tile_description);
    bookDisplay.appendChild(div);
    // Modal Elements
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById("img01");
    img.onclick = function showSlides(){
    modal.style.display = "block";
    modalImg.src = this.src + '.png';
    }
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
    modal.style.display = "none";
    }
  }
  else{
  var overlay = document.createElement("div");
  overlay.classList.add("empty");
  overlay.textContent = "The Book"+Title + "By" + Author + "Could not be Found. Please Try Again";
  }
}
/*function truncateText(selector, maxLength) {
    var element = document.querySelector(selector),
        truncated = element.innerText;

    if (truncated.length > maxLength) {
        truncated = truncated.substr(0,maxLength) + '...';
    }
    return truncated;
}
document.querySelector('tile_description').innerText = truncateText('tile_description', 107);
*/
