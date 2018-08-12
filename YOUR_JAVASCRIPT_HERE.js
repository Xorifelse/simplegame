// Write your JS here
var hero = {
    name: '',
    heroic: true,
    inventory: [],
    health: 10,
    maxHealth: 20,
    weapon: {
        type: 'sword',
        damage: 2,
        img: './img/sword.jpg'
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
    let health = document.getElementById('hero_health')
    health.setAttribute('value', hero.health)
    health.setAttribute('max', hero.maxHealth)

    let name = document.getElementById('hero_name')
    if(hero.name.length == 0){
        name.innerHTML = `<input type="button" onclick="hero.name = window.prompt('Enter your hero name', 'Johan')" value="Set hero Name">`
    } else {
        name.innerHTML = hero.name
    }
}

// update every second
setInterval(() => {
    displayStats()
}, 1000)