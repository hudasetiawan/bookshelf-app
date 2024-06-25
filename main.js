document.addEventListener('DOMContentLoaded', function() {
  const bookForm = document.getElementById('bookForm');
  const bookFormTitle = document.getElementById('bookFormTitle');
  const bookFormAuthor = document.getElementById('bookFormAuthor');
  const bookFormYear = document.getElementById('bookFormYear');
  const bookFormIsComplete = document.getElementById('bookFormIsComplete');
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  // Function to generate unique ID (timestamp)
  function generateId() {
    return new Date().getTime();
  }

  // Function to get books data from localStorage
  function getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
  }

  // Function to save books data to localStorage
  function saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  // Function to render books in respective shelf
  function renderBooks() {
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    const books = getBooks();

    books.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book-item');
      bookItem.setAttribute('data-bookid', book.id);

      const title = document.createElement('h3');
      title.textContent = book.title;
      title.setAttribute('data-testid', 'bookItemTitle');

      const author = document.createElement('p');
      author.textContent = `Penulis: ${book.author}`;
      author.setAttribute('data-testid', 'bookItemAuthor');

      const year = document.createElement('p');
      year.textContent = `Tahun: ${book.year}`;
      year.setAttribute('data-testid', 'bookItemYear');

      const actionContainer = document.createElement('div');

      const completeButton = document.createElement('button');
      completeButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
      completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
      completeButton.addEventListener('click', function() {
        toggleBookCompleteStatus(book.id);
        renderBooks();
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Hapus Buku';
      deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
      deleteButton.addEventListener('click', function() {
        deleteBook(book.id);
        renderBooks();
      });

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit Buku';
      editButton.setAttribute('data-testid', 'bookItemEditButton');
      editButton.addEventListener('click', function() {
        // Implement edit book functionality if needed
      });

      actionContainer.appendChild(completeButton);
      actionContainer.appendChild(deleteButton);
      actionContainer.appendChild(editButton);

      bookItem.appendChild(title);
      bookItem.appendChild(author);
      bookItem.appendChild(year);
      bookItem.appendChild(actionContainer);

      if (book.isComplete) {
        completeBookList.appendChild(bookItem);
      } else {
        incompleteBookList.appendChild(bookItem);
      }
    });
  }

  // Function to add new book
  function addBook(title, author, year, isComplete) {
    const newBook = {
      id: generateId(),
      title,
      author,
      year,
      isComplete,
    };

    const books = getBooks();
    books.push(newBook);
    saveBooks(books);
  }

  // Function to delete book
  function deleteBook(id) {
    let books = getBooks();
    books = books.filter(book => book.id !== id);
    saveBooks(books);
  }

  // Function to toggle book complete status
  function toggleBookCompleteStatus(id) {
    let books = getBooks();
    books = books.map(book => {
      if (book.id === id) {
        book.isComplete = !book.isComplete;
      }
      return book;
    });
    saveBooks(books);
  }

  // Event listener for form submission
  bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = bookFormTitle.value.trim();
    const author = bookFormAuthor.value.trim();
    const year = parseInt(bookFormYear.value.trim(), 10);
    const isComplete = bookFormIsComplete.checked;

    if (title && author && year) {
      addBook(title, author, year, isComplete);
      bookForm.reset();
      renderBooks();
    } else {
      alert('Mohon lengkapi formulir buku!');
    }
  });

  // Initial rendering of books
  renderBooks();
});
