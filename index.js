const myButton = document.getElementById('getColors')
const colorPicker = document.getElementById('colorPicker');
const colorScheme = document.getElementById('colorScheme')
const colorSwatches = document.getElementById('color-swatches-container')
const colorCodes = document.getElementById('color-code-container')


myButton.addEventListener("click", function() {
  //remove the # symbol from the color value for the API string
  let color = colorPicker.value.slice(1)
  let scheme = colorScheme.value
  let url = "https://www.thecolorapi.com/scheme?hex=" + color + "&format=json&mode=" + scheme
  fetch(url)
  .then(res => res.json())
  .then(colorsArray => {
    let swatches = ""
    let hexValues = ""
    for (color of colorsArray.colors) {
      swatches += `
          <div id="myColor" style="background-color:${color.hex.value};"></div>
      `
      hexValues +=`
          <div id="myColorText">${color.hex.value}</div>
      `
    }
    colorSwatches.innerHTML = swatches
    colorCodes.innerHTML = hexValues

    const colorCode = document.querySelectorAll("#color-code-container div")
    for (let i = 0; i < colorsArray.colors.length; i++) {
      const color = colorsArray.colors[i].hex.value;
      colorCode[i].setAttribute("data-color", color);
    }
  })
})

colorCodes.addEventListener("click", function(e) {
  if (e.target.hasAttribute("data-color")) {
   const color = e.target.getAttribute("data-color")
   navigator.clipboard.writeText(color).then(() => {
     alert(`Copied ${color} to clipboard!`)
   })
 }
})
