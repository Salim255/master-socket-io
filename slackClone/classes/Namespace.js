class Namespace {
    constructor(id, name, image, endpoint){
        this.id = id;
        this.name = name;
        this.image = image;
        this.endpoint = endpoint;
        this.rooms = []
    }

    addRoom(roomOb){
        this.rooms.push(roomOb);
    }
}

module.exports = Namespace;