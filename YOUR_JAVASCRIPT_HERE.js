// Simple array filter proto from SO.
Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
};

// simple proto get random elemenet from array
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getElm(id){
    return document.getElementById(id)
}

// Write your JS here
var hero = {
    name: '',
    heroic: true,
    inventory: [],
    health: 10,
    maxHealth: 10,
    gold: 0,
    level: 1,
    xp: 86,
    weapon: {
        type: 'sword',
        damage: 2,
        img: './img/sword.png'
    }
}

var enemy = {
}

var items = [
    {type: 'Wooden Sword', damage: 1, img: './img/sword.png'},
    {type: 'Broken Iron Sword', damage: 1, img: './img/sword.png'},
    {type: 'Iron Sword', damage: 4, img: './img/sword.png'},
    {type: 'Steel Sword', damage: 7, img: './img/sword.png'},
    {type: 'Bow', damage: 7, img: './img/bow.jpg'},
    {type: 'Gold Sword', damage: 8, img: './img/sword.png'},
    {type: 'Omega Sword', damage: 20, img: './img/sword.png'},
]

var monsters = [
    // Name of the enemy
    // hit points of enemy
    // Minimal Damage
    // Max damage
    // Reward, value between 0 and 10 (higher reward more xp and item chance)
    // occurance
    { name: 'imp', hp: 6, mindmg: 1, maxdmg: 2, reward: 3 },
    { name: 'ghoul', hp: 7, mindmg: 2, maxdmg: 4, reward: 3 },
    { name: 'dragon', hp: 20, mindmg: 5, maxdmg: 10, reward: 8 },
    { name: 'thief', hp: 3, mindmg: 1, maxdmg: 2, reward: 2 },
    { name: 'orgre', hp: 30, mindmg: 0, maxdmg: 7, reward: 7 }
]

const rest = (obj) => {
    if(!inBattle){
        obj.health = obj.maxHealth
        if(typeof obj =='undefined'){ // workaround on mocha dependancy
            hero.health = hero.maxHealth
        }
        write(`You've restored your HP to ${hero.maxHealth}`)
    } else {
        write('cant rest while in battle!')
    }

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
    let e = getElm('inventory')
    if(e.style.display == 'block'){
        e.style.display = 'none'
        getElm('inventorytext').innerHTML = 'Inventory'
    } else {
        e.style.display = 'block'
        getElm('inventorytext').innerHTML = 'Inventory (open)'
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

const getHeroLevel = () => {
    return Math.floor(Math.log(hero.xp/50+1,2))
}

const displayStats = () => {
    let health = getElm('hero_health')
    health.setAttribute('value', hero.health)
    health.setAttribute('max', hero.maxHealth)

    /*
        Update hero stats
    */

    // hero name
    let name = getElm('hero_name')
    if(hero.name.length == 0){
        name.innerHTML = `<input type="button" onclick="hero.name = window.prompt('Enter your hero name', 'Johan'); displayStats()" value="Set hero Name">`
    } else {
        name.innerHTML = hero.name
    }

    // hero weapon
    let wn = getElm('hero_weapon_name').innerHTML = hero.weapon.type
    let wd = getElm('hero_weapon_damage').innerHTML = `+${hero.weapon.damage} + ${hero.level}`

    // hero level
    getElm('hero_level').innerHTML = getHeroLevel()

    /*
        Update inventory
    */

    // update list of intenvory
    // Feeling lazy, not the properway to do it.
    var tmp = ''
    let inv = getElm('inventory')
    for(let item of hero.inventory){
        tmp += `<li><img src="${item.img}" alt="${item.type}" data-damage="${item.damage}" onclick="equipWeaponInventory({type: '${item.type}', damage: ${item.damage}, img: '${item.img}'})"></li>`
    }
    inv.innerHTML = tmp
    
}

const write = (text) => {
    // new dialog text appear up top instead of appending
    getElm('dialog').innerHTML = text + '\n' + getElm('dialog').innerHTML
}


var inBattle = false

const newEncounter = () => {
    if(!inBattle){
        inBattle = true
        enemy = monsters.random()
        write(`You encountered a ${enemy.name}! What will you do?`)
    } else {
        write(`You walked away and the enemy attacked you!`)

        let i = getRandomInt(enemy.mindmg, enemy.maxdmg)
        write(`You took ${i} damage`)
        hero.health -= i 
    }
}

const counterAttack = () => {
    let i = getRandomInt(enemy.mindmg, enemy.maxdmg)
    write(`The ${enemy.name} attacked and you took ${i} damage`)
    hero.health -= i 
}

const attack = () => {
    if(!inBattle){
        write(`Nothing to attack!`)
    } else {
        let i = getRandomInt(getHeroLevel() + 0, getHeroLevel() + hero.weapon.damage)
        enemy.hp -= i

        if(enemy.hp > 0){
            write(`You struck the enemy and it cost him ${i}hp, he has ${enemy.hp} left!`)
            counterAttack()
        } else {
            write(`You killed the ${enemy.name}!`)
            inBattle = false
            // reward kill
            hero.xp += enemy.reward * 10
            hero.maxHealth = getHeroLevel() + 10
            if(getRandomInt(0, 10) >= enemy.reward){
                let e = getElm('pickup')
                let itm = item.random()
                e.innerHTML += `<li><img src="${itm.img}" alt="${itm.type}" data-damage="${itm.damage}" onclick="pickUpItem({type: '${itm.type}', damage: ${itm.damage}, img: '${itm.img}'})"></li>`
            } else {
                if(getRandomInt(0, 1)){
                    hero.gold += getRandomInt(0, enemy.reward * 2)
                } else {
                    hero.gold += getRandomInt(0, enemy.reward)
                    // found gold
                }
            }
        }
        
    }
}

const run = () => {
    if(!inBattle){
        write(`Running for no reason`)
    } else {
        if(getRandomInt(0,5) < 2){
            write('You were not fast enough and and the enemy attacked you!')
            hero.health -= getRandomInt(enemy.mindmg, enemy.maxdmg)
        } else {
            write('You got away safely')
            inBattle = false
            getElm('pickup').innerHTML = ''
        }
    }
}


const startGame = () => {

    // check every 250ms until the hero is dead
    var mainloop = () => {
        if(hero.health > 0){
            // nothing to do
        } else {
            // Game over
            clearInterval(timer)
            write('You died....')
            setInterval(() => {
                document.getElementsByTagName('body')[0].innerHTML = '<a href="./index.html"><img id="gameover" src="./img/gameover.jpg""></a>'
            }, 1000)
            
        }
    }

    var timer = setInterval(mainloop, 1000)

}

// update every second
setInterval(() => {
    displayStats()
}, 250)

displayStats()
startGame()