function closePopover(e){for(i=0;i<$popovers.length;i++)$popovers[i].classList.remove("open")}function openPopover(e){if(e.preventDefault(),"#"==this.getAttribute("href"))return closePopover(),void e.stopImmediatePropagation();document.querySelector(this.getAttribute("href")).classList.contains("open")?document.querySelector(this.getAttribute("href")).classList.remove("open"):(closePopover(),document.querySelector(this.getAttribute("href")).classList.add("open")),e.stopImmediatePropagation()}const $popoverLinks=document.querySelectorAll("[data-menupop]"),$popovers=document.querySelectorAll(".menu");var i;for(i=0;i<$popoverLinks.length;i++)$popoverLinks[i].addEventListener("click",openPopover);document.addEventListener("click",closePopover);