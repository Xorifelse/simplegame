// Simple array reorder
Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
};

// Write your JS here
var hero = {
    name: '',
    heroic: true,
    inventory: [],
    health: 10,
    maxHealth: 10,
    weapon: {
        type: 'sword',
        damage: 2,
        img: './img/sword.png'
    }
}

const rest = (obj) => {
    obj.health = obj.maxHealth
    alert('You restored your HP')
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

const toggleInventory = () => {
    let e = document.getElementById('inventory')
    if(e.style.display == 'block'){
        e.style.display = 'none'
    } else {
        e.style.display = 'block'
    }
}

const equipWeaponInventory = (item) => {

    // remove item from inventory
    for(let i in hero.inventory){
        if(hero.inventory[i].type == item.type){
            hero.inventory[i] = null
            hero.inventory.clean(undefined)
        }
    }

    // push current weapon to inventory and swap
    hero.inventory.push(hero.weapon)
    hero.weapon = item
}

const displayStats = () => {
    let health = document.getElementById('hero_health')
    health.setAttribute('value', hero.health)
    health.setAttribute('max', hero.maxHealth)

    /*
        Update hero stats
    */

    // hero name
    let name = document.getElementById('hero_name')
    if(hero.name.length == 0){
        name.innerHTML = `<input type="button" onclick="hero.name = window.prompt('Enter your hero name', 'Johan'); displayStats()" value="Set hero Name">`
    } else {
        name.innerHTML = hero.name
    }

    // hero weapon
    let wn = document.getElementById('hero_weapon_name')
    let wd = document.getElementById('hero_weapon_damage')
    wn.innerHTML = hero.weapon.type
    wd.innerHTML = `+${hero.weapon.damage}`

    /*
        Update inventory
    */

    // update list of intenvory
    var tmp = ''
    let inv = document.getElementById('inventory')
    for(let item of hero.inventory){
        if(item != null){
            tmp += `<li><img src="${item.img}" alt="${item.type}" data-damage="${item.damage}" onclick="equipWeaponInventory({type: '${item.type}', damage: ${item.damage}, img: '${item.img}'})"></li>`
        }
        
    }
    inv.innerHTML = tmp
    
}

// update every second
setInterval(() => {
    displayStats()
}, 500)