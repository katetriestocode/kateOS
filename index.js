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
initializeWindow('contacts')
initializeWindow('photo')
initializeWindow('blinky')
initializeWindow('dev')

var filesData = [
  {
    name: 'CV.pdf',
    icon: 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
    url: 'https://raw.githubusercontent.com/katetriestocode/kateOS/main/cv.pdf'
  },
  // add more PDFs here, same shape
  // { name: 'Project.pdf', icon: '...', url: '...' },
]

function renderFilesGrid() {
  var grid = document.querySelector('#filesGrid')
  grid.innerHTML = ''

  filesData.forEach(function (file) {
    var fileIcon = document.createElement('a')
    fileIcon.href = file.url
    fileIcon.target = '_blank'
    fileIcon.className = 'file-icon'

    fileIcon.innerHTML = `
      <img src="${file.icon}" alt="${file.name}">
      <p>${file.name}</p>
    `

    grid.appendChild(fileIcon)
  })
}

renderFilesGrid()







// contacts

var contactsData = [
  {
    name: 'Email',
    icon: 'https://upload.wikimedia.org/wikipedia/en/7/78/Apple_Mail.png',
    emailToCopy: 'caterina.camerlengo@icloud.com'
  },
  {
    name: 'GitHub',
    icon: 'https://www.applivery.com/wp-content/uploads/2024/07/GitHub-Desktop.png',
    link: 'https://github.com/katetriestocode', 
    content: ''
  },
  {
    name: 'Instagram',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
    link: 'https://www.instagram.com/kate.thepope/',
    content: ''
  },
];

function showContactsGrid() {
  var container = document.querySelector('#contactsMainContainer');
  var backBtn = document.querySelector('#contactsBackBtn');
  var title = document.querySelector('#contactsTitle');
  
  backBtn.style.display = 'none';
  title.textContent = 'Contact me:';
  

  container.innerHTML = `<div id="contactsGrid" style="display: grid; grid-template-columns: repeat(3, 76px); justify-content: center; gap: 12px; padding: 8px;"></div>`;
  var grid = document.querySelector('#contactsGrid');
  
  contactsData.forEach((contact, index) => {
    var iconLink = document.createElement('a');
    
    iconLink.className = 'nav-icon';
    iconLink.href = contact.link ? contact.link : 'javascript:void(0);';
    if (contact.link) {
      iconLink.target = '_blank';
    }
    
    
    iconLink.style.cssText = 'text-align: center; cursor: pointer; padding: 6px; border-radius: 12px; display: block; text-decoration: none; color: inherit; transition: background 0.15s ease-in-out;';
    
    
    iconLink.innerHTML = `
      <img src="${contact.icon}" alt="${contact.name}" style="width: 56px; height: 56px; object-fit: cover; border-radius: 14px; display: block; margin: 0 auto 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <p class="contact-label">${contact.name}</p>
    `;
    

    iconLink.addEventListener('mouseenter', () => iconLink.style.background = '#f2f2f2');
    iconLink.addEventListener('mouseleave', () => iconLink.style.background = 'transparent');
    
    if (contact.emailToCopy) {
      iconLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(contact.emailToCopy).then(function() {
          alert('Email copied to clipboard: ' + contact.emailToCopy);
        }).catch(function(error) {
          console.error('Failed to copy: ', error);
        });
      });
    } else if (!contact.link) {
      iconLink.addEventListener('click', (e) => {
        e.preventDefault();
        showContactProfile(index);
      });
    }
    
    grid.appendChild(iconLink);
  });
}




function showContactProfile(index) {
  var container = document.querySelector('#contactsMainContainer');
  var backBtn = document.querySelector('#contactsBackBtn');
  var title = document.querySelector('#contactsTitle');
  
  var contact = contactsData[index];
  title.textContent = contact.name;
  backBtn.style.display = 'flex';
  
  container.innerHTML = contact.content;
}

document.querySelector('#contactsBackBtn').addEventListener('click', showContactsGrid);
showContactsGrid();



function handleFileEmbed(event) {
  var file = event.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function (e) {
    var displayBlock = document.querySelector('#embeddedFileDisplay');
    if (displayBlock) {
      displayBlock.textContent = e.target.result;
      displayBlock.style.display = 'block';
    }
  };
  reader.readAsText(file);
}




initializeWindow('settings')

// Wallpaper switching
document.querySelectorAll('.wallpaper-option').forEach(function (img) {
  img.addEventListener('click', function () {
    document.body.style.backgroundImage = `url("${img.dataset.bg}")`
    document.querySelectorAll('.wallpaper-option').forEach(o => o.classList.remove('selectedWallpaper'))
    img.classList.add('selectedWallpaper')
  })
})

// Dark dock toggle
var darkDockToggle = document.querySelector('#darkDockToggle')
var dock = document.querySelector('#bottomDock')

darkDockToggle.addEventListener('change', function () {
  if (darkDockToggle.checked) {
    dock.classList.add('dock-dark')
  } else {
    dock.classList.remove('dock-dark')
  }
})





initializeWindow('messages')

var messageForm = document.querySelector('#messageForm')
var msgStatus = document.querySelector('#msgStatus')
var msgSubmitBtn = document.querySelector('#msgSubmitBtn')

var FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqevrbbn'

messageForm.addEventListener('submit', function (e) {
  e.preventDefault()

  var name = document.querySelector('#msgName').value
  var email = document.querySelector('#msgEmail').value
  var body = document.querySelector('#msgBody').value

  msgSubmitBtn.disabled = true
  msgStatus.textContent = 'Sending...'

  fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(messageForm.replaceNameEmailBody
      ? messageForm
      : (function () {
          var fd = new FormData()
          fd.append('name', name)
          fd.append('email', email)
          fd.append('message', body)
          return fd
        })())
  })
    .then(function (response) {
      if (response.ok) {
        msgStatus.textContent = 'Message sent! I\'ll get back to you soon.'
        messageForm.reset()
      } else {
        msgStatus.textContent = 'Something went wrong, please try again.'
      }
    })
    .catch(function () {
      msgStatus.textContent = 'Network error, please try again.'
    })
    .finally(function () {
      msgSubmitBtn.disabled = false
    })
})


initializeWindow('music')
