function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeScreen = document.querySelector('#welcome')

function closeWindow(element) {
  element.style.display = 'none'
}

var welcomeScreenClose = document.querySelector('#welcomeclose')

welcomeScreenClose.addEventListener('click', function () {
  closeWindow(welcomeScreen)
})

var topBar = document.querySelector('#top')

function openWindow(element) {
  element.style.display = 'flex'
  biggestIndex++ // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex
  topBar.style.zIndex = biggestIndex + 1
}

var welcomeScreenOpen = document.querySelector('#welcomeopen')

welcomeScreenOpen.addEventListener('click', function () {
  openWindow(welcomeScreen)
})

var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add('selected')
  selectedIcon = element
}

function deselectIcon(element) {
  element.classList.remove('selected')
  selectedIcon = undefined
}

function handleIconTap(element, window) {
  if (element.classList.contains('selected')) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}

var biggestIndex = 1

function addWindowTapHandling(element) {
  element.addEventListener('mousedown', () => handleWindowTap(element))
}

function handleWindowTap(element) {
  biggestIndex++ // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex
  topBar.style.zIndex = biggestIndex + 1
  deselectIcon(selectedIcon)
}

function makeClosable(elementName) {
  var screen = document.querySelector('#' + elementName)
  var closeButton = document.querySelector('#' + elementName + 'close')
  closeButton.addEventListener('click', () => closeWindow(screen))
}

function initializeIcon(name) {
  var icon = document.querySelector('#' + name + 'Icon')
  var screen = document.querySelector('#' + name)
  icon.addEventListener('click', () => handleIconTap(icon, screen))
}

function initializeWindow(elementName) {
  var screen = document.querySelector('#' + elementName)
  addWindowTapHandling(screen)
  makeClosable(elementName)
  dragElement(screen)
  if (elementName != 'welcome') {
    initializeIcon(elementName)
  }
}

initializeWindow('welcome')
initializeWindow('notes')
initializeWindow('photo')
initializeWindow('blinky')
initializeWindow('dev')

var content = [
  {
    title: 'Welcome',
    date: '17/6/2026',
    content: `
              <p contenteditable="True">
          <span contenteditable="true">Welcome to my notes!
            </br>
            <img src=""
              style="width: 96px; border-radius: 16px" />
            </br>
            </br>

            Here you can find a bunch of info about me, such as my CV, my recent projects, and more!

        </p>
      `
  },
  {
    title: 'CV',
    date: '06/28/2023',
    content: `
              <p contenteditable="True">
          <span contenteditable="true">CV
            </br>
            <img src=""
              style="width: 96px; border-radius: 16px" />
            </br>
            </br>

            

        </p>
        
      `
  },
]

function setNotesContent(index) {
  var notesContent = document.querySelector('#notesContent')

  notesContent.innerHTML = content[index].content
}

setNotesContent(0)

function addToSideBar(index) {
  var sidebar = document.querySelector('#sidebar')

  var note = content[index]

  var newDiv = document.createElement('div')

  newDiv.innerHTML = `
    <p style="margin: 0px;">
      ${note.title}
    </p>
    <p style="font-size: 12px; margin: 0px;">
      ${note.date}
    </p>
  `

  newDiv.addEventListener('click', function () {
    setNotesContent(index)
  })

  sidebar.appendChild(newDiv)
}

for (let i = 0; i < content.length; i++) {
  addToSideBar(i)
}