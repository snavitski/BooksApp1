{
	("use strict");
	const select = {
		templateOf: {
			books: "#template-book",
		},
		containerOf: {
			booksList: ".books-list",
			bookImage: ".books-list .book__image",
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

	function InitAction() {
		const favoriteBooks = [];
		const allImages = document.querySelectorAll(select.containerOf.bookImage);
		console.log("allImages", allImages);
		for (let image of allImages) {
			image.addEventListener("dblclick", function (event) {
				event.preventDefault();
				const idBook = image.getAttribute("data-id");
				console.log(idBook);
				if (favoriteBooks.includes(idBook)) {
					image.classList.remove("favorite");
					const indexOfRemoveBook = favoriteBooks.indexOf(idBook);
					favoriteBooks.splice(indexOfRemoveBook, 1);
				} else {
					image.classList.add("favorite");
					const idBook = image.getAttribute("data-id");
					favoriteBooks.push(idBook);
				}
				console.log(favoriteBooks);
			});
		}
	}
	render();
	InitAction();
}
