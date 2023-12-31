import { form, regSubscription } from "./modules/subscribe.mjs";
// import { validInputFields } from "./modules/validationInput.mjs";

// TODO Сделать валидацию формы
// // Валидация формы
// const inputFields = document.querySelectorAll('input');

// Оформление подписки
form.addEventListener("submit", regSubscription);

// Закрытие модального окна
document.querySelector(".close-btn").addEventListener("click", () => {
	document.getElementById("modal-message").classList.remove("show");
});

// Каталог
const catalog = document.querySelector("#Catalog");

// Информация о каталоге
const catalogInfo = {
	Giroskooter: {
		name: "Giroskooter",
		text: [
			'Гироскутер Smart Balance 10 Красный',
			'Гироскутер Smart Balance Premium 10 Цветные Молнии',
			'Гироскутер Smart Balance SUV Черная Молния 10.5" Premium PRO'
		],
		price: [6500, 10990, 8590],
	},
	Electroskooter: {
		name: "Electroskooter",
		text: [
			'Xiaomi Mijia Electric Scooter m187 Black (Черный)',
			'Электросамокат KUGOO S4 (8800mAh)',
			'Электросамокат SUBOR D9'
		],
		price: [20480, 13480, 11790]
	},
	Sigway: {
		name: "Sigway",
		text: [
			'Сигвей Xiaomi Ninebot mini Pro Black (Черный)',
			'Сигвей Xiaomi Ninebot mini Pro White (Белый)',
			'Сигвей Xiaomi Ninebot mini White (Белый)'
		],
		price: [31480, 31480, 14790]
	}
}

// Массив кнопок фильтра
const filterBtn = document.querySelectorAll(".filter__button");
let filterBtnSelected = filterBtn[0];
filterBtn.forEach((item) => {
	item.addEventListener("click", () => {
		if(item == filterBtnSelected) return;
		item.classList.add("selected");
		filterBtnSelected.classList.remove("selected");
		filterBtnSelected = item;

		loadCatalog(item.getAttribute("value"));
	});
});


window.addEventListener("load", () => {
	// Загрузка все товары
	loadCatalog("All");
});
window.addEventListener("click", (e) => {
	// Закрытие бургер-меню
	// const burgerList = document.querySelector(".burger-list");
	// if(e.target !== burgerList && burgerList.classList.contains("show"))
	// 	document.querySelector(".burger-list").classList.remove("show");
});

// Подгрузка нужных карточек товара в каталог
function loadCatalog(catalogName) {
	catalog.innerHTML = "";

	switch (catalogName) {
		case "Giroskooters":
			loadCards(catalog, "Giroskooter", "Гироскутер");
			break;
		case "Electroskooters":
			loadCards(catalog, "Electroskooter", "Электросамокат");
			break;
		case "Sigways":
			loadCards(catalog, "Sigway", "Сигвей");
			break;
		case "All":
			loadCards(catalog, "Giroskooter", "Гироскутер");
			loadCards(catalog, "Electroskooter", "Электросамокат");
			loadCards(catalog, "Sigway", "Сигвей");
			break;
		default:
			console.error("Неизвестный каталог: " + catalogName);
			break;
	}
}

// Подгрузка нужных карточек товара
function loadCards(catalog, catalogName, catalogNameTrans) {
	for(let i = 1; i <= 3; i++) {
		let card = /*html*/ `
			<li class="card-container card-list__item">
				<div class="card">
					<div class="card__type">${catalogNameTrans}ы</div>
					<div class="img-container"><img src="./img/Catalog/${catalogName}s/${catalogName}${i}.jpg"
							alt="${catalogName}${i}" class="card__img"/></div>
					<h6 class="card__title">${catalogInfo[catalogName].text[i-1]}</h6>
					<span class="card__price">${formatAsPrice(catalogInfo[catalogName].price[i-1])}</span>
				</div>
			</li>
		`;
		catalog.insertAdjacentHTML("beforeend", card);
	}
}

// Форматирование цены под единый стиль. Пример: "12 345"
function formatAsPrice(string) {
	return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Открытие бургер-меню
document.querySelector(".burger").addEventListener("click", openBurgerMenu);
function openBurgerMenu(e) {
	if(e.target.classList.contains("burger")) {
		document.querySelector(".burger-list").classList.add("show");
	} else {
		document.querySelector(".burger-list").classList.remove("show");
	}
}