export const RandomNumberGenerator = (min, max) => 
    Math.floor(Math.random() * (max - min) ) + min;

export default RandomNumberGenerator;