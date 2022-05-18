const templates = {
	bookTemplate: Handlebars.compile(
		document.getElementById("template-book").innerHTML
	),
};
class BooksList {
	constructor() {
		const thisBook = this;
		thisBook.render();
		thisBook.initActions();
	}

	render() {
		const thisBook = this;
		for (let book of dataSource.books) {
			const ratingWidth = book.rating * 10;
			const ratingBgc = thisBook.determineRatingBgc(book.rating);
			console.log(ratingBgc);

			let element = {
				id: book.id,
				name: book.name,
				price: book.price,
				image: book.image,
				rating: book.rating,
				ratingWidth: ratingWidth,
				ratingBgc: ratingBgc,
			};
			const generatedHTML = templates.bookTemplate(element);
			// console.log(generatedHTML);
			const generatedDOM = utils.createDOMFromHTML(generatedHTML);
			// console.log(generatedDOM);
			const listClass = document.querySelector(".books-list");
			// console.log(listClass);
			listClass.appendChild(generatedDOM);
		}
	}

	initActions() {
		const thisBook = this;

		thisBook.favoriteBooks = [];
		thisBook.filters = [];

		const form = document.querySelector(".filters");
		console.log(form);
		form.addEventListener("click", function (event) {
			const clickedElem = event.target;
			if (clickedElem.name === "filter" && clickedElem.type === "checkbox") {
				if (clickedElem.checked) {
					thisBook.filters.push(clickedElem.value);
				} else {
					const valueIndexof = thisBook.filters.indexOf(clickedElem.value);
					thisBook.filters.splice(valueIndexof);
				}
			}
			// console.log(filters);
			thisBook.filterBooks();
		});

		const bookList = document.querySelectorAll(".book__image");
		// console.log(bookList);
		for (let bookImg of bookList) {
			bookImg.addEventListener("dblclick", function (event) {
				event.preventDefault();
				const image = event.target.offsetParent;
				bookImg.classList.toggle("favorite");
				const dataId = image.getAttribute("data-id");
				thisBook.favoriteBooks.push(dataId);
			});
		}
	}

	filterBooks() {
		const thisBook = this;
		for (let bookFilt of dataSource.books) {
			let shouldBeHidden = false;
			for (const filter of thisBook.filters) {
				if (!bookFilt.details[filter]) {
					shouldBeHidden = true;
					break;
				}
			}
			if (shouldBeHidden) {
				document
					.querySelector(`.book__image[data-id="${bookFilt.id}"]`)
					.classList.add("hidden");
			} else {
				document
					.querySelector(`.book__image[data-id="${bookFilt.id}"]`)
					.classList.remove("hidden");
			}
		}
	}

	determineRatingBgc(rating) {
		let background = " ";

		if (rating < 6) {
			background = "linear-gradient(tyo bottom,  #fefcea 0%, #f1da36 100%)";
		} else if (rating > 6 && rating <= 8) {
			background = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
		} else if (rating > 8 && rating <= 9) {
			background = "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
		} else if (rating > 9) {
			background = "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";

			return background;
		}
	}
}
const app = new BooksList();
app;
