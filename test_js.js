function C() {
    alert("You clicked Button C")
}

function D() {
    var check = confirm("Do you like Button D?")
    console.log("Button D confirm result: " + check)
}

function E() {
    var input = prompt("Please enter something for Button E:", "default text")
    console.log("Button E prompt result: " + input)
}

function Console() {
    console.log("log")
    console.info("info")
    console.warn("warning")
    console.debug("debug")
    console.error("error")
    console.table({ a: 1, b: 2, c: 3 })
}

function G() {
    const place = document.getElementById("place")
    if (!place) {
        console.warn('Element with id "place" not found. DOM may not contain it.')
        return
    }

    // safe: set simple HTML/text content
    place.innerHTML = "text A"

    // don't use document.write after load — use append instead
    const textNode = document.createTextNode(' text B')
    place.appendChild(textNode)

    // set HTML content (allows tags)
    place.innerHTML = '<strong>HTML set with innerHTML</strong>'

    // set plain text (no HTML parsing)
    place.textContent = 'Plain text set with textContent'

    // append HTML without replacing existing content
    place.insertAdjacentHTML('beforeend', '<p>Appended paragraph</p>')

    // create an element, set its HTML and append it
    const newDiv = document.createElement('div')
    newDiv.innerHTML = '<em>Created and appended element</em>'
    document.body.appendChild(newDiv)

    // replace the whole element with new HTML (if desired)
    place.outerHTML = '<section id="place">Replaced element</section>'
}

// Wait until DOM is ready before touching elements
// document.addEventListener('DOMContentLoaded', G)

function draw() {
    // read size from range input (fallback to 10 if missing/invalid)
    const grid_size = 20
    const sizeInput = /** @type {HTMLInputElement|null} */ (document.getElementById('size'))
    const div_canvas = document.getElementById("c_div")
    var size = -1
    if (!sizeInput) {
        console.warn('Range input with id "size" not found. Using default size 20.')
        size = 20
    } else
        size = parseInt(sizeInput.value)
    if (!div_canvas) {
        console.warn('Element with id "c_div" not found. DOM may not contain it.')
        return
    }
    if (size > 100)
        size = 100
    else if (size <= 0)
        size = 10
    const canvas_size = size * grid_size
    div_canvas.innerHTML = '<canvas id="c" width="' + canvas_size + '" height="' + canvas_size + '"></canvas>'
    const canvas = document.getElementById('c')
    if (!(canvas instanceof HTMLCanvasElement)) {
        console.warn('Canvas element not found or is not a <canvas>.')
        return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
        console.warn('2D context not available.')
        return
    }
    ctx.fillStyle = 'rgba(127, 127, 127, 1)'
    ctx.fillRect(0, 0, canvas_size, canvas_size)
    for (let x = 0; x < canvas_size; x += grid_size) {
        for (let y = 0; y < canvas_size; y += grid_size) {
            if (f(x + grid_size / 2, y + grid_size / 2, canvas_size / 2, canvas_size / 2, canvas_size / 2))
                ctx.fillStyle = '#000000'
            else
                ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(x + 1, y + 1, grid_size - 2, grid_size - 2)
        }
    }
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} cx
 * @param {number} cy
 * @param {number} dist
 */
function f(x, y, cx, cy, dist) {
    const dx = (x - cx)
    const dy = (y - cy)
    return dx * dx + dy * dy < dist * dist
}

/**
 * @param {boolean} is_range
 */
function display_size(is_range) {
    var value = -1
    const display = /** @type {HTMLInputElement|null} */ (document.getElementById('size_display'))
    const sizeInput = /** @type {HTMLInputElement|null} */ (document.getElementById('size'))
    if (!display) {
        console.warn('Display input with id "size_display" not found.')
        return
    }
    if (!sizeInput) {
        console.warn('Range input with id "size" not found.')
        return
    }
    if (is_range) {
        value = parseInt(sizeInput.value, 10)
        display.value = Number.isNaN(value) ? '' : String(value)
    } else {
        value = parseInt(display.value, 10)
        sizeInput.value = Number.isNaN(value) ? '' : String(value)
    }
    const canvas = document.getElementById('c')
    if ((canvas instanceof HTMLCanvasElement))
        draw()
}
