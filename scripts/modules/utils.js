export const getRandom = (num) => Math.ceil(Math.random()*num);

export const getCurrentTime = () => {
    const date = new Date();
    // const getYear = date.getFullYear();
    // const getMonth = ('0' + (date.getMonth()+1)).slice(-2);
    // const getDay = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${hours}:${minutes}`;
}

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}
