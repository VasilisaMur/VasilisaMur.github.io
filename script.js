// Back to top button

const goToTopButton = document.createElement('button')
goToTopButton.ariaLabel = goToTopButton.title = 'Наверх'
goToTopButton.classList.add('back-to-top')

const goToTopButtonDisplayClass = 'back-to-top__display'

function trackScroll() {
  const scrolled = window.scrollY;
  goToTopButton.classList.toggle(goToTopButtonDisplayClass, scrolled > 20);
}

function backToTop() {
  if (window.scrollY > 0) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}

window.addEventListener('scroll', trackScroll);
goToTopButton.addEventListener('click', backToTop);
document.body.appendChild(goToTopButton);

// Table of contents

function addAnchor(node, id, elem) {
  node.id = id
  const heading = node.querySelector('.heading')
  heading.innerHTML = `<a class="anchor" href="#${node.id}"></a>${heading.innerHTML}`
  const a = document.createElement('a')
  a.innerText = heading.innerText
  a.href = '#' + node.id
  elem.appendChild(a)
}

function createAndAppend(tagName, parent) {
  const elem = document.createElement(tagName)
  parent.appendChild(elem)
  return elem
}

const table = document.querySelector('.table-contents');
if (table) {
  const list = createAndAppend('ul', table)
  const allPoems = document.querySelector('.poems');
  const baseID = `${allPoems.id}`;
  for (const author of allPoems.querySelectorAll('.author')) {
    const authorListItem = createAndAppend('li', list)
    addAnchor(author, `${baseID}-${list.childElementCount}`, authorListItem)
    const poemsList = createAndAppend('ul', authorListItem)

    for (const poem of author.querySelectorAll('.poem')) {
      const poemListItem = createAndAppend('li', poemsList)
      addAnchor(poem, `${author.id}-${poemsList.childElementCount}`, poemListItem)
    }
  }
}


// Misc
const path = location.origin + location.pathname
for (const a of document.querySelectorAll('a')) {
  const href = a.href.startsWith(path) ? a.href.slice(path.length) : a.href;
  if (!href || href === '#') {
    console.log(a);
    a.ariaDisabled = 'true';
    a.ariaCurrent = 'true'
    a.removeAttribute('href')
  }
}
