export const createElement = (tagName, styleClass, text, img) => {
    if(!tagName) return null;

    const tag = document.createElement(tagName);

    if(styleClass) tag.classList = styleClass;
    if(text) tag.innerText = text;
    if(img) tag.src = img;

    return tag;
}