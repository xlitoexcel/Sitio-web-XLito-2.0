document.addEventListener('DOMContentLoaded', function(){
  var navBtn = document.getElementById('nav-menu-btn');
  var navPanel = document.getElementById('nav-panel');
  if(!navBtn || !navPanel) return;
  navBtn.addEventListener('click', function(){
    var isOpen = navPanel.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.addEventListener('click', function(e){
    if(!navBtn.contains(e.target) && !navPanel.contains(e.target)){
      navPanel.classList.remove('open');
      navBtn.setAttribute('aria-expanded','false');
    }
  });
  navPanel.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navPanel.classList.remove('open');
      navBtn.setAttribute('aria-expanded','false');
    });
  });
});
