const toggle = document.querySelector(".toggle")
const menu = document.querySelector(".header-list")
const activeClass = "is-show"

toggle.addEventListener("click", function() {
  menu.classList.add(activeClass);
});
window.addEventListener("click", function(e) {
  if (!menu.contains(e.target) && !e.target.matches(".toggle")) {
    menu.classList.remove(activeClass)
  }
})