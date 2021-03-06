const $popoverLinks = document.querySelectorAll("[data-menupop]"),
      $popovers     = document.querySelectorAll(".menu");

var i;

for (i = 0; i < $popoverLinks.length; i++) $popoverLinks[i].addEventListener('click', openPopover);

document.addEventListener('click', closePopover);

// Close Popover
function closePopover (event) {
	for (i = 0; i < $popovers.length; i++) $popovers[i].classList.remove('open');
}

// Open Popover
function openPopover (event) {
	event.preventDefault();
    if (this.getAttribute('href') == '#') {
        closePopover();
        event.stopImmediatePropagation();
        return;
    }
	if (document.querySelector(this.getAttribute('href')).classList.contains('open')) {
		document.querySelector(this.getAttribute('href')).classList.remove('open');
	} else {
		closePopover();
		document.querySelector(this.getAttribute('href')).classList.add('open');
	}
	event.stopImmediatePropagation();
}
