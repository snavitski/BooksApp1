{
  ('use strict');
  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      bookImage: '.book_image',
    },
  };
  const template = {
    book: Handlebars.compile(
      document.querySelector(select.templateOf.books).innerHTML
    ),
  };
  function render() {
    for (let book of dataSource.books) {
      const generatedHTML = template.book(book);
      const bookElement = utils.createDOMFromHTML(generatedHTML);
      const bookList = document.querySelector(select.containerOf.booksList);
      bookList.appendChild(bookElement);
    }
  }
  const favoriteBooks = [];
  function InitAction() {
    const allImages = document.querySelectorAll(select.containerOf.bookImage);
    for (let image of allImages) {
      image.addEventListner('click', function (event) {
        event.preventDefault();
        const idBook = image.getAttribute('data-id');
        if (favoriteBooks.includes(idBook)) {
          image.classList.remove('favorite');
          const indexOfRemoveBook = favoriteBooks.indexOf(idBook);
          favoriteBooks.splice(indexOfRemoveBook, 1);
          image.classList.add('favorite');
          const idBook = image.getAttribute('data-id');
          favoriteBooks.push(idBook);
        }
        console.log(favoriteBooks);
      });
    }
  }
  render();
  InitAction();
}
