class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{
    addBookToList(book){
        const list = document.getElementById("book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    
        `
        list.appendChild(row)
    }
    clearFields(){
        document.getElementById("title").value = " ";
        document.getElementById("author").value = " ";
        document.getElementById("isbn").value = " ";
    
    }
    showAlert(message, className){
        const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(function(){
        document.querySelector(".alert").remove()
    }, 2000)
    }
    removeBook(target){
        if(target.classList.contains("delete")){
            target.parentElement.parentElement.remove();
        }
    }
}
//local storage part 

class Store{
static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books
}
static displayBooks(){
    const books = Store.getBooks();
    books.forEach(function(book) {
        const ui = new UI;
        ui.addBookToList(book);
    });


}
static addBooks(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));


}
static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book,index) {
        if(book.isbn === isbn){
            books.splice(index,1)

        }
    });
    localStorage.setItem("books", JSON.stringify(books));


   
}
}




document.addEventListener('DOMContentLoaded',Store.displayBooks());


document.getElementById("book-form").addEventListener("submit", 
    function(e){

        //Getting Form values
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;

        // console.log(`${title} for ${author} which has isbn ${isbn}`);

        //inistansiate a book 
        const book = new Book(title, author, isbn);
        // console.log(book);
        
        const ui = new UI();

        if(title === '' || author === '' || isbn === ''){
            ui.showAlert("please fill in all fields", "error")
        }
        else{
            ui.addBookToList(book);
            Store.addBooks(book)
            ui.clearFields();
            ui.showAlert("Book Added!","success")

        }

    
      
        e.preventDefault();
})


const bookList = document.getElementById("book-list")

bookList.addEventListener("click",
function(e){
    const ui = new UI();
    ui.removeBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    

    ui.showAlert("Book removed successfully", "success")
    e.preventDefault();
})

    