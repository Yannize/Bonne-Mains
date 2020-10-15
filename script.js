const acceuil = document.getElementById('acceuil')
const createUserBtn = document.getElementById('createUserBtn')
const userContainer = document.getElementById('userContainer')

const form = document.getElementById('form')
const formAnnuler = document.getElementById('formAnnuler')
const formValider = document.getElementById('formValider')

let pourboire = document.getElementById('pourboire')
const menuCalcul = document.getElementById('menuCalcul')
const  menuCalc = document.getElementById('menuCalc')
const menuAnnuler = document.getElementById('menuAnnuler')
let menuAppliquer = document.getElementById('menuAppliquer')

let userSuppr = document.querySelectorAll('.userSuppr')

let l = 1
let enterPressed = 1





// Passe au formulaire pour créer un utilisateur
let transitionEndAcceuil = () => {
    acceuil.style.zIndex = 0
    acceuil.classList.add('disable')
    form.classList.remove('disable')
    form.classList.add('fade')
    form.offsetWidth
    form.classList.add('in')
    form.style.zIndex = 1
    prenom.focus()
    acceuil.removeEventListener('transitionend', transitionEndAcceuil)
}
createUserBtn.addEventListener('click', () => {
    prenom.value = ''
    nom.value = ''
    acceuil.classList.remove('in')
    acceuil.addEventListener('transitionend', transitionEndAcceuil)
})


// Passe à l'acceuil si on annule le formulaire
let transitionEndForm  = () => {
    form.style.zIndex = 0
    form.classList.add('disable')
    acceuil.classList.remove('disable')
    acceuil.offsetWidth
    acceuil.classList.add('in')
    acceuil.style.zIndex = 1
    form.removeEventListener('transitionend', transitionEndForm)
    afficherUserContainer()
}
formAnnuler.addEventListener('click', (e) => {
    e.preventDefault()
    form.classList.remove('in')
    form.addEventListener('transitionend', transitionEndForm)
    afficherUserContainer()
})

//verifie que les inputs prenom, nom, sont bien remplis
function checkUserInputForm () {  
    let check = false
    if(prenom.value === '') {
        check = false
        prenom.style.fontSize = '1rem'
        prenom.style.color = 'red'
        prenom.value = 'champ requis'
    }
    if (nom.value === '') {
        check = false
        nom.style.fontSize = '1rem'
        nom.style.color = 'red'
        nom.value = 'champ requis'
    }
    prenom.addEventListener('click', () => {
        if (prenom.value !== 'champ requis' && prenom.value !== '') {
            return 
        }
            prenom.value = ''
            prenom.style.fontSize = '2rem'
            prenom.style.color = 'rgb(0, 156, 130)'
    })
    nom.addEventListener('click', () => {
        if (nom.value !== 'champ requis') {
            return
        }
            nom.value = ''
            nom.style.fontSize = '2rem'
            nom.style.color = 'rgb(0, 156, 130)'
    })
    if((prenom.value !== '') && (nom.value !== '') && (prenom.value !== 'champ requis') && (nom.value !=='champ requis')) {
        check = true
    } 
    if(check === true) {return true}
    if(check === false) {return false}
}

// crée une Div
function createDiv(className) {
    let div = document.createElement('div')
    div.setAttribute('class', className)
    return div
}

//permet de créer un bouton utilisateur
function creerUserBtn () {
    let CHECK = checkUserInputForm()
    if (CHECK === false) {
        return false
    }
    
        let btnUser = document.createElement('button')

        let bc = createDiv('bc')
        let userSuppr = createDiv('userSuppr')
        let userPrenom = createDiv('userPrenom')
        let userNom = createDiv('userNom')
        let userPourboire = createDiv('userPourboire')
        btnUser.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 60% , 70%)`
        bc.innerText = btnUser.style.backgroundColor


        userSuppr.innerText = 'x'
        userPrenom.innerText = prenom.value
        userNom.innerText = nom.value
        userPourboire.innerText = '0'
        btnUser.appendChild(userSuppr)
        btnUser.appendChild(userPrenom)
        btnUser.appendChild(userNom)
        btnUser.appendChild(userPourboire)

        btnUser.appendChild(bc)
        bc.style.display = 'none'
        
        btnUser.setAttribute('title', 'click droit pour changer de couleur')
        btnUser.classList.add('btnUser')
        btnUser.classList.add('hover')
        userContainer.appendChild(btnUser)
        form.classList.remove('in')
        form.addEventListener('transitionend', transitionEndForm)
}

// valider le formulaire crée un boutton utilisateur avec son prenom, nom, pourboire
formValider.addEventListener('click', (e) => {
    e.preventDefault()
    let prenom = document.getElementById('prenom')
    let nom = document.getElementById('nom')
    let CBTN = creerUserBtn()
    if(CBTN === false) {
        return
    }
    afficherUserContainer()
})


// S'il y'a min. 1 utilisateur, l'afficher
function afficherUserContainer() {
    const messageUser = document.getElementById('messageUser')
    prenom.value = ''
    nom.value = ''
    if (!userContainer.querySelector('button')) {
        return
    }


    userContainer.classList.remove('disable')
    messageUser.innerText = "Sélectionner les Artésiens présents aujourd'hui !"
    messageUser.style.margin = '10vh 0 0 0'
    acceuil.style.justifyContent = 'space-around'
}


// click droit sur bouton user choisir une nouvelle couleur pour le bouton utilisateur
userContainer.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    let x = e.target
    let colorPickerDiv = createDiv('colorPickerDiv')
    let colorPicker = document.createElement('input')
    colorPicker.setAttribute('type', 'color')
    colorPicker.setAttribute('value', '#ffffff')
    colorPickerDiv.appendChild(colorPicker)
    if(x && x.className === 'userSuppr'){
        return
    }
    if ((x && x.className === 'userPrenom') || (x && x.className === 'userNom') || (x && x.className === 'userPourboire')) {
        x.parentNode.appendChild(colorPickerDiv)
    }

    colorPickerDiv.addEventListener('mouseout', () => {
        x.parentNode.removeChild(colorPickerDiv)
    })

    colorPicker.addEventListener('change', () => {
        x.parentNode.style.backgroundColor = colorPicker.value
        x.parentNode.querySelector('.bc').innerText = colorPicker.value
    })
})


// si "x" cliqué demande confirmation pour supprimer l'utilisateur
userContainer.addEventListener('click', (e) => {
    e.stopPropagation()
    let x = e.target
    // supprime l'utilisateur en cliquant sur la croix
    if (x && x.className === 'userSuppr') {
        let c = confirm('voulez-vous vraiment supprimer cette utilisateur ?')
        if (c === false) {
            return
        }
        userContainer.removeChild(x.parentNode)        
    }
})
    
    
//selectionne l'utilisateur et l'ajouter dans le menu de calcul
userContainer.addEventListener('click', (e) => {
    if (l < 2){
        pourboire.value = "0"
    }
    let x = e.target
    if ((x && x.className === 'userPrenom') || (x && x.className === 'userNom') || (x && x.className === 'userPourboire') || (x && x.className === 'btnUser')) {
        let createCloneBtn = () => {

            //Clonage
            let cloneBtnUser = document.createElement('button')
           
            let clonedPrenom = createDiv('clonedPrenom')
            let clonedNom = createDiv('clonedNom')
            let clonedPourboire = createDiv('clonedPourboire')
            let clonedBC = createDiv('clonedBC')

            clonedPrenom.id = clonePrenom
            clonedNom.id = cloneNom
            clonedPrenom.innerText = clonePrenom
            clonedNom.innerText = cloneNom
            clonedPourboire.innerText = clonePourboire
            clonedBC.innerText = cloneBC

            cloneBtnUser.appendChild(clonedPrenom)
            cloneBtnUser.appendChild(clonedNom)
            cloneBtnUser.appendChild(clonedPourboire)

            cloneBtnUser.appendChild(clonedBC)
            clonedBC.style.display = 'none'
        
            cloneBtnUser.style.backgroundColor = clonedBC.innerText
            cloneBtnUser.classList.add('clone')
            cloneBtnUser.classList.add(`link${l}`)

            //AJOUT DU CLONE
            userSelected.appendChild(cloneBtnUser)
            x.classList.add('cloned')
            /* menuCalc.click() */
            //Clonage terminé et recalcul des pourboires si > 1



            //si utilisateur sélectionné, ouvrir le menu Calcul
            if (userSelected.querySelectorAll('.clone').length > 0) {
                function transitionEndMenu() {
                    menuCalcul.removeEventListener('transitionend', transitionEndMenu)
                }
                if(menuCalcul.classList.contains('moveUP')){
                    menuCalcul.classList.remove('moveUp')
                }
                menuCalcul.classList.add('moveDown')
                menuCalcul.addEventListener('transitionend', transitionEndMenu)  
                // empeche de pouvoir supprimer un utilsateur lors de la phase de calcul
                // en supprimant 'x'
                let supprBtns = userContainer.querySelectorAll('.userSuppr')
                supprBtns.forEach(supprBtn => {
                    supprBtn.style.display = 'none'
                })
                pourboire.focus()
                pourboire.select()
            }
        }
        if (x.className === 'userPrenom' || x.className === 'userNom' || x.className === 'userPourboire') {
            x = e.target.parentNode
        } else if (x.className === 'btnUser') {
            x = e.target
        }
        let clonePrenom = x.children[1].innerText
        let cloneNom = x.children[2].innerText
        let clonePourboire = '0'
        let cloneBC = x.children[4].innerText

        if (x.classList.contains('cloned')) {
            return
        }
        x.classList.add(`link${l}`)
        x.style.backgroundColor = 'rgba(0, 0, 0, 0.431)'
        x.style.border = '1px solid #000'
        x.style.color = '#fff'
        x.style.boxShadow = '0px 0px 15px rgb(161, 24, 138)'
        x.style.borderRadius = '10px'
        x.classList.remove('hover')
        if (userSelected.querySelector(`#${clonePrenom}`) && userSelected.querySelector(`#${cloneNom}`)) {
            return
        }
        if (!x.style.color === '#fff') {return}
        createCloneBtn()   
        l++
    }
})



// à la dé-selection d'un utilisateur dans le menuCalcul, mettre l'utilisateur dans son état original
userSelected.addEventListener('click', (e) => {
    s = e.target
    if (s.className === 'clonedPrenom' || s.className === 'clonedNom' || s.className === 'clonedPourboire') {
        s = e.target.parentNode
        userSelected.removeChild(s)
        let n = s.className.split(' ')[1] //recherche de la classe LINKn°
        let x = userContainer.querySelector(`.${n}`) // x devient l'original
        x.classList.remove(`${n}`)
        x.classList.remove('cloned')
        x.style.backgroundColor = `${x.children[4].innerText}`
        x.style.color = '#000'
        x.style.border = 'none'
        x.style.boxShadow = 'none'
        x.classList.add('hover')
    } else if (s.classList.contains('clone')) {
        s = e.target
        userSelected.removeChild(s)
        let n = s.className.split(' ')[1] //recherche de la classe LINKn°
        let x = userContainer.querySelector(`.${n}`) // x devient l'original
        x.classList.remove(`${n}`)
        x.classList.remove('cloned')
        x.style.backgroundColor = `${x.children[4].innerText}`
        x.style.color = '#000'
        x.style.border = 'none'
        x.style.boxShadow = 'none'
        x.classList.add('hover')
    } if (s.id === 'userSelected') {
        return
    }
    /* menuCalc.click() */
    

    //si pas d'utilisateur selectionné fermer le menuCalcul
    if (userSelected.querySelectorAll('button').length === 0) {
        let supprBtns = userContainer.querySelectorAll('.userSuppr')
        supprBtns.forEach(supprBtn => {
            supprBtn.style.display = 'block'
        })
        function transitionEndMenu() {
            
            menuCalcul.classList.remove('moveUp')
            menuCalcul.removeEventListener('transitionend', transitionEndMenu)
        }
        if (menuCalcul.classList.contains('moveDown')){
            menuCalcul.classList.remove('moveDown')
        }
        menuCalcul.classList.add('moveUp')
        menuCalcul.addEventListener('transitionend', transitionEndMenu)
    }
})




function calculDuPourboire () {
    let clonedPourboires = document.querySelectorAll('.clonedPourboire') 
    clonedPourboires.forEach(clndPourboire => {
        clndPourboire.innerText = Math.floor(pourboire.value / clonedPourboires.length)
    })
}

menuCalc.addEventListener('click', (e) => {
    e.preventDefault()
    calculDuPourboire()
})


menuAnnuler.addEventListener('click', (e) => {
    e.preventDefault()
    // récupère les links pour rétablir les propriétés des originaux
    for (let i = 1; i < l ; i++) {
        linkedEl = document.querySelectorAll(`.link${i}`)
        if (linkedEl[1] !== undefined) {        
            linkedEl[1].style.backgroundColor = linkedEl[0].style.backgroundColor
            linkedEl[1].classList.remove('cloned')
            linkedEl[1].classList.remove(`link${i}`)
            linkedEl[1].style.color = '#000'
            linkedEl[1].style.border = 'none'
            linkedEl[1].style.boxShadow = 'none'
            linkedEl[1].classList.add('hover')
        }
    }
    //reset des links
    l = 1
    //vide le menuCalcul
    userSelected.innerHTML = ''
    if (userSelected.querySelectorAll('button').length === 0) {
        function transitionEndMenu() {          
            menuCalcul.classList.remove('moveUp')
            menuCalcul.removeEventListener('transitionend', transitionEndMenu)
        }
        if(menuCalcul.classList.contains('moveDown')){
            menuCalcul.classList.remove('moveDown')
        }
        menuCalcul.classList.add('moveUp')
        menuCalcul.addEventListener('transitionend', transitionEndMenu)              
    }
    supprBtns = userContainer.querySelectorAll('.userSuppr')
        supprBtns.forEach(supprBtn => {
            supprBtn.style.display = 'block'
        })
})




menuAppliquer.addEventListener('click', (e) => {
    e.preventDefault()
    calculDuPourboire()
    for (let i = 1; i < l ; i++) {
        linkedEl = document.querySelectorAll(`.link${i}`)
        if (linkedEl[1] !== undefined) {        
            linkedEl[1].style.backgroundColor = linkedEl[0].style.backgroundColor
            linkedEl[1].classList.remove('cloned')
            linkedEl[1].classList.remove(`link${i}`)
            linkedEl[1].style.color = '#000'
            linkedEl[1].style.border = 'none'
            linkedEl[1].style.boxShadow = 'none'
            linkedEl[1].classList.add('hover')
            
            linkedEl[1].querySelector('.userPourboire').innerText = String(parseInt(linkedEl[0].querySelector('.clonedPourboire').innerText, 10) + parseInt(linkedEl[1].querySelector('.userPourboire').innerText, 10))

        }
    }
    //reset des links
    l = 1
    //vide le menuCalcul
    userSelected.innerHTML = ''
    if (userSelected.querySelectorAll('button').length === 0) {
        function transitionEndMenu() {          
            menuCalcul.classList.remove('moveUp')
            menuCalcul.removeEventListener('transitionend', transitionEndMenu)
        }
        if(menuCalcul.classList.contains('moveDown')){
            menuCalcul.classList.remove('moveDown')
        }
        menuCalcul.classList.add('moveUp')
        menuCalcul.addEventListener('transitionend', transitionEndMenu)              
    }
    supprBtns = userContainer.querySelectorAll('.userSuppr')
        supprBtns.forEach(supprBtn => {
            supprBtn.style.display = 'block'
        })
})



// si touche entrer : 1ère fois -> calc | 2ème fois -> appliquer
// puis enlève l'enventListener quand le menu se ferme
    function enterCount (e) {
        pourboire.select()
        pourboire.focus()
        if (e.keyCode === 13 && pourboire === document.activeElement) {
            e.preventDefault()
            if (enterPressed === 1) {
                menuCalc.click()
                enterPressed = 2              
            } else if (enterPressed === 2) {
                menuAppliquer.click()
                enterPressed = 1
                pourboire.blur()
                pourboire.removeEventListener('keyup', enterCount)
            }
        }
    }



pourboire.addEventListener('change', (e) => {
    e.preventDefault()
    // ajoute un event listener sur l'input du menu et écoute la touché entrer
    pourboire.addEventListener('keyup', enterCount) 
})
    