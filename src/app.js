import { createElement } from "./DOMInteractions.js";
import { getShowsByKey } from "./requests.js";

class TvApp {
    constructor(){
        this.viewElems = {};
        this.showNameButtons = {};
        this.selectedName = "Dark";
        this.initializeApp();
        this.setupListeners();
        this.fetchAndDisplayShows();
    }

    initializeApp = () => {
        const listofIds = Array.from(document.querySelectorAll('[id]'));
        const listOfShowName = Array.from(document.querySelectorAll('[data-show-name]'));

        for(const elem of listOfShowName){
            this.showNameButtons[elem.dataset.showName] = elem;
        }

        for(const elem of listofIds){
            this.viewElems[elem.id] = elem;
        }
    }

    setupListeners = () => {
        const keysList = Object.keys(this.showNameButtons);
        keysList.map((key) => {
            this.showNameButtons[key].addEventListener('click', this.setSelectedName);
        })
    }

    setSelectedName = () => {
        this.selectedName = event.target.dataset.showName;
        this.fetchAndDisplayShows();
    }

    fetchAndDisplayShows = () => {
        getShowsByKey(this.selectedName).then((response) => {
            this.viewElems['showsWrapper'].innerHTML = "";
            for(let { show } of response){
                console.log(show);
                this.renderCard(show);
            }
        });   
    }

    renderCard = (show) => {
        /*
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button class="btn btn-primary">Go somewhere</button>
            </div>
        </div>
        */

        let textWithTags = document.createElement('div');
        textWithTags.innerHTML = show.summary;

        let card = createElement('div', 'card');
        let img = createElement('img','card-img-top', null, show.image ? show.image.medium : "");
        let cardBody = createElement('div', 'card-body');
        let h5 = createElement('h5','card-title', show.name);
        let p = createElement('p', 'card-text', textWithTags.textContent);
        let button = createElement('button', 'btn btn-primary', 'Show details');

        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(button);

        this.viewElems['showsWrapper'].appendChild(card);
    }
    
}

document.addEventListener('DOMContentLoaded', new TvApp());