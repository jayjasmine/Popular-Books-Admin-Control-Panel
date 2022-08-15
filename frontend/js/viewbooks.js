//populate view books table with all books
fetch("api/books")
    .then(res => res.json())
    .then(books => {
        //access table body
        let book_list = document.getElementById("my-book-list-tbody")
        //for store each book in 'book' variable and populate iwth data
        for (let book of books) {
            book_list.innerHTML += `
            <tr>
            <td>${book.bookID}</td>
            <td><img src="${book.cover_img_path}" alt="book cover" width="75"></td>
            <td>${book.title}</td>
            <td>${book.publication_year}</td>
            <td>${book.author}</td>
            <td>${book.copies_sold}</td>
            <td>${book.created_date.substr(0,10)}</td>
            <td>${book.last_updated.substr(0,10)}</td>
            <td>${book.last_updated_by}</td>
            <td><a href="editbooks.html?id=${book.bookID}"> Edit</a> <a href="deletebook.html?id=${book.bookID}"> Delete</a></td>
            </tr>
            `
        }

    })