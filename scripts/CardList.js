class CardList {
    // Метод constructor этого класса должен принимать два аргумента:
    // DOM-элемент — контейнер, куда нужно складывать карточки;
    // массив карточек, которые будут на странице при загрузке.
    constructor(container, createCard) {
        this.createCard = createCard;
        this.container = container;
    }

    //addCard для добавления карточки в список, принимает на вход экземпляр карточки;
    addCard = (element) => {
        this.container.append(element);
    }

    //render для отрисовки карточек при загрузке страницы.
    render = (arr, myId) => {
        arr.forEach(item => {
            this.addCard(this.createCard(item, myId).create())
        });
    }
}

//Это класс для хранения и отрисовки карточек.