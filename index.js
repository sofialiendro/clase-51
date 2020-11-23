const grillaHTML = document.querySelector("#grilla");
const nuevoButton = document.querySelector("#nuevo");
const reiniciarButton = document.querySelector("#reiniciar");
const buscarMatches = document.querySelector("#buscarMatch")

const FRUTAS = ['🍉', '🥥', '🍋', '🥝', '🍒', '🍑']

let grilla = []

const obtenerFrutaAlAzar = (frutas) => {
  return frutas[Math.floor(Math.random() * frutas.length)]
}

const generarGrilla = (tamanio) => {
  grilla = []
  for (let i = 0; i < tamanio; i++) {
    grilla[i] = []
    for (let j = 0; j < tamanio; j++) {
      grilla[i][j] = obtenerFrutaAlAzar(FRUTAS)
    }
  }
  return grilla
}

const buscarBloquesInicial = () => {
  for (let i = 0; i < grilla.length; i++) {
    for (let j = 0; j < grilla[i].length; j++) {
      if (grilla[i][j] === grilla[i][j+1] && grilla[i][j] === grilla[i][j+2]) {
        return true
      }
      if ((grilla[i+1] && grilla[i+2]) && grilla[i][j] === grilla[i+1][j] && grilla[i][j] === grilla[i+2][j]) {
        return true
      }
    }
  }
  return false
}

do {
  grilla = generarGrilla(10)
}
while (buscarBloquesInicial() === true)



const crearGrilla = (ancho) => {
  const anchoDeGrilla = 50 * ancho
  grillaHTML.style.width = `${anchoDeGrilla}px`
  const listaDeFrutas = grilla
  grillaHTML.innerHTML = ''
  for (let i = 0; i < listaDeFrutas.length; i++) {
    for (let j = 0; j < listaDeFrutas[i].length; j++) {
      grillaHTML.innerHTML += `<div data-x="${i}" data-y="${j}">${listaDeFrutas[i][j]}</div>`
    }
  }
}

crearGrilla(10)

const escucharClicks = () => {
  const todosLosCuadrados = document.querySelectorAll(".grilla > div")
  
  let primerCuadrado = ''
  let segundoCuadrado = ''

  for (let cuadrado of todosLosCuadrados) {
    cuadrado.onclick = (e) => {
      console.log("primer click")
      primerCuadrado = e.target
      for (let cuadrado2 of todosLosCuadrados) {
        cuadrado2.onclick = (event) => {
          console.log("segundo click")
          segundoCuadrado = event.target
          console.log(primerCuadrado, segundoCuadrado)

        }
      }
      
    }

  
  }


}

const buscarBloques = () => {
  let matchesHorizontales = [];
  let matchesVerticales = [];
  
  for (let i = 0; i < grilla.length; i++) {
    for (let j = 0; j < grilla[i].length; j++) {
      if (grilla[i][j] === grilla[i][j+1] && grilla[i][j] === grilla[i][j+2]) {
        matchesHorizontales.push([i, j])
        matchesHorizontales.push([i, j+1])
        matchesHorizontales.push([i, j+2])
      }
      if ((grilla[i+1] && grilla[i+2]) && grilla[i][j] === grilla[i+1][j] && grilla[i][j] === grilla[i+2][j]) {
        matchesVerticales.push([i, j])
        matchesVerticales.push([i+1, j])
        matchesVerticales.push([i+2, j])
      }
    }
  }
  const obtenerCuadrado = (arr) => {
    return document.querySelector(`div[data-x='${arr[0]}'][data-y='${arr[1]}']`)
  }

  const colorearCuadrado = (cuadrado, color) => {
    cuadrado.style.backgroundColor = color
  }

  for (let i = 0; i < matchesHorizontales.length; i++) {
    const cuadrado = obtenerCuadrado(matchesHorizontales[i]) 
    colorearCuadrado(cuadrado, "yellow")
  }
  for (let i = 0; i < matchesVerticales.length; i++) {
    const cuadrado = obtenerCuadrado(matchesVerticales[i]) 
    colorearCuadrado(cuadrado, "orange")
    
  }
  if (!matchesHorizontales.length && !matchesVerticales.length) {
    console.log("No hay matches :(")
  }
}



buscarMatches.onclick = () => {
  buscarBloques()
}