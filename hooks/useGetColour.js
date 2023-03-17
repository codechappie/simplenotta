import colors from "../constants/colors";

const getRandomColour = () => {

    const lng = colors.length;


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    console.log(getRandomInt(lng))
    let color = colors[getRandomInt(lng)];

    return color;
}

export default getRandomColour;