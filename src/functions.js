export function randomArray (size){
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}