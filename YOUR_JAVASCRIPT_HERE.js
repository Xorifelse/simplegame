// Write your JS here
var hero = {
    name: '',
    heroic: true,
    inventory: [],
    health: 10,
    weapon: {
        type: 'sword',
        damage: 2
    }
}

const rest = (obj) => {
    obj.health = 10
    return obj
}

const pickUpItem = (h, item) => {
    h.inventory.push(item)
}

const equipWeapon = (h) => {
    if(h.inventory.length > 0){
        h.weapon = h.inventory[0]
    }
}

const displayStats = () => {
    
}