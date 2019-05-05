 

class DefaultPart {

    getRandomPartNbr = () => Math.floor(Math.random() * 89999 + 10000).toString();
    getNewPart = () => {
        return {
            partNbr: this.getRandomPartNbr(),
            partName: "",
            description: "",
            manufactureName: "",
        };
    }
}



export default DefaultPart;