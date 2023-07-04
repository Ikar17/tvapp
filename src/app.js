class TvApp {
    constructor(){
        this.viewElems = {};
        this.showNameButtons = {};
        this.selectedName = "Dark";
        this.initializeApp();
        this.setupListeners();
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
    }
    
}

document.addEventListener('DOMContentLoaded', new TvApp());