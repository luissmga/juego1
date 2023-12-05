let palabras = ['cambios', 'pordentro', 'bonita', 'flores', 'gracias', 'diamantes', 'ocean', 'mentiroso', 'llevatelo', 'cocteles', 'escribeme', 'rumores', 'joder', 'dinero', 'delito', 'shillin', 'botellita', 'buscandonos', 'placebo', 'soledad', 'tsunami', 'loveloveu', 'miamia', 'lanoche', 'lacarta', 'fuelindo', 'ojoxojo', 'teodio', 'alamitad', 'pluton', 'goodboy', 'toketeo', 'tusi', 'energia', 'ella', 'lainvitacion', 'lossantos'];


let juego = null

let finalizado = false

let $html = {
    personaje: document.getElementById('arlequin-juego'),
    adivinado: document.querySelector('.contenedor-acertadas'),
    errado: document.querySelector('.contenedor-erradas')
}

function dibujar(juego) {

    let $elemento
    $elemento = $html.personaje
    let estado = juego.estado

    if (estado === 8) {
        estado = juego.previo
    }

    $elemento.src = './image/partes-kOS/0' + estado + '.png'


    let palabra = juego.palabra
    let adivinado = juego.adivinado
    $elemento = $html.adivinado


    $elemento.innerHTML = ''

    for (let letra of palabra) {
        let $span = document.createElement('span')
        let $texto = document.createTextNode('')

        if (adivinado.indexOf(letra) >= 0) {
            $texto.nodeValue = letra
        }

        $span.setAttribute('class', 'span-acertado')
        $span.appendChild($texto)
        $elemento.appendChild($span)
    }


    let errado = juego.errado
    $elemento = $html.errado

 
    $elemento.innerHTML = ''

    for (let letra of errado) {
        let $span = document.createElement('span')
        let $texto = document.createTextNode(letra)

        $span.setAttribute('class', 'span-errado')
        $span.appendChild($texto)
        $elemento.appendChild($span)
    }
}

function adivinar(juego, letra) {
    let estado = juego.estado


   

    let adivinado = juego.adivinado
    let errado = juego.errado


    if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0) {
        return
    }

    var palabra = juego.palabra


    if (palabra.indexOf(letra) >= 0) {
        let ganado = true


        for (let l of palabra) {
            if (adivinado.indexOf(l) < 0 && l != letra) {
                ganado = false
                juego.previo = juego.estado
                break
            }
        }


        if (ganado) {
            juego.estado = 8
        }


        adivinado.push(letra)
    }


    else {
        juego.estado--
        
    }
}

window.onkeydown = function adivinarLetra(e) {
    let letra = e.key

    if (/[^a-zñ]/.test(letra)) {
        return
    }

    adivinar(juego, letra)
    let estado = juego.estado

    if (estado === 8 && !finalizado) {
        setTimeout(alerta_ganado, 500)
        finalizado = true
    }

    else if (estado === 1 && !finalizado) {
        let palabra = juego.palabra
        let fn = alerta_perdido.bind(undefined, palabra)
        setTimeout(fn, 500)
        finalizado = true
    }

    dibujar(juego)
}

window.nuevoJuego = function nuevoJuego() {
    let palabra = palabra_aleatoria()
    juego = {}
    juego.palabra = palabra
    juego.estado = 7
    juego.adivinado = []
    juego.errado = []
    finalizado = false
    dibujar(juego)
}

function palabra_aleatoria() {
    let index = ~~(Math.random() * palabras.length)
    return palabras[index]
}

function alerta_ganado() {
    Swal.fire({
        title: '¡Felicidades, ganaste!',
        width: 380,
        padding: '2rem',
        color: '#D9D9D9',
        background: '#f60652',
        imageUrl: './image/fel.jpg',
        imageHeight: 250,
        confirmButtonColor: '#192323',
        allowEnterKey: true,
        backdrop: `
            rgba(115,115,115,0.6)`
    })
}

function alerta_perdido(palabra) {
    Swal.fire({
        title: 'Perdiste',
        text: 'La palabra era: ' + palabra,
        width: 300,
        padding: '2rem',
        color: '#D9D9D9',
        background: '#070707',
        imageUrl: './image/perder.jpg',
        imageHeight: 250,
        confirmButtonColor: '#192323',
        allowEnterKey: true,
        backdrop: `
            rgba(115,115,115,0.6)`
    })
}

nuevoJuego()

