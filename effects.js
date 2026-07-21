// XLito effects.js — v20 (abducción completa con ícono de Excel + vuelo de nave)
console.log('XLito effects.js v20 cargado correctamente');
document.addEventListener('DOMContentLoaded', function(){
  var revealSelectors = '.card, .level-card, .teaser, .step, .faq-item, .value-chip, .req-item, .promo-box, .price-table, .lead-box, .testi-empty, .about-grid, .mvv-grid .card';
  var targets = document.querySelectorAll(revealSelectors);

  if('IntersectionObserver' in window){
    targets.forEach(function(el, i){
      el.classList.add('reveal-init');
      el.style.transitionDelay = (i % 4) * 60 + 'ms';
    });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('reveal-in');
          entry.target.classList.remove('reveal-out');
        } else {
          entry.target.classList.remove('reveal-in');
          entry.target.classList.add('reveal-out');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function(el){ io.observe(el); });
  }

  // h2 section headings: bounce in from the right, repeats each time visible
  var h2s = document.querySelectorAll('section h2, .section-head h2');
  if('IntersectionObserver' in window){
    h2s.forEach(function(h){ h.classList.add('heading-anim-h2'); });
    var h2io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.remove('heading-in');
          void entry.target.offsetWidth;
          entry.target.classList.add('heading-in');
        } else {
          entry.target.classList.remove('heading-in');
        }
      });
    }, { threshold: 0.4 });
    h2s.forEach(function(h){ h2io.observe(h); });
  }

  // h1 hero heading: bounce in from the top, on page load
  var heroUnit = document.getElementById('hero-logo-title');
  var heroH1 = heroUnit || document.querySelector('.hero h1, .page-hero h1');
  if(heroH1){
    heroH1.classList.add('heading-anim-h1');
    setTimeout(function(){ heroH1.classList.add('heading-in'); }, 200);
  }

  var hero = document.querySelector('.hero');
  if(hero){ hero.classList.add('hero-in'); }

  // Every social/contact icon link gets its own staggered repeatable reveal
  var socialLinks = document.querySelectorAll('.social-link');
  if(socialLinks.length && 'IntersectionObserver' in window){
    socialLinks.forEach(function(el, i){
      el.classList.add('reveal-init');
      el.style.transitionDelay = (i * 150) + 'ms';
    });
    var sio = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('reveal-in');
          entry.target.classList.remove('reveal-out');
        } else {
          entry.target.classList.remove('reveal-in');
          entry.target.classList.add('reveal-out');
        }
      });
    }, { threshold: 0.3 });
    socialLinks.forEach(function(el){ sio.observe(el); });
  }

  // Occasional random wiggle/jump wink on each social icon, once settled
  if(socialLinks.length && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    function scheduleWink(el){
      var delay = 3000 + Math.random() * 5000;
      setTimeout(function(){
        if(el.classList.contains('reveal-in')){
          var effect = Math.random() < 0.5 ? 'idle-wiggle' : 'idle-jump';
          el.classList.add(effect);
          setTimeout(function(){ el.classList.remove(effect); }, 650);
        }
        scheduleWink(el);
      }, delay);
    }
    socialLinks.forEach(function(el){ scheduleWink(el); });
  }

  // Brand logo antics: random repertoire of playful, unhurried animations for the footer logo
  var brandLogos = document.querySelectorAll('.footer-logo');
  if(brandLogos.length && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    var repertoire = ['antics', 'blink', 'stretch-jump', 'flip360', 'wake-up', 'trail-move', 'tilt-land', 'freeze', 'sink', 'collide', 'invasion', 'abduct'];
    var durations = { antics:4200, blink:900, 'stretch-jump':1600, flip360:1000, 'wake-up':2400, 'trail-move':2000, 'tilt-land':2600, freeze:7500, sink:6500, collide:5500, invasion:17000, abduct:20000 };
    var ERRORS = ['#REF!', '#VALOR!', '#DIV/0!', '#N/A', '#NOMBRE?', '#NULO!', '#¡NUM!', '#¡BLANCO!'];

    function spawnInvasion(el){
      var count = 6 + Math.floor(Math.random() * 3); // 6-8
      var picks = ERRORS.slice().sort(function(){ return Math.random()-0.5; }).slice(0, count);
      var badges = [];

      var rect = el.getBoundingClientRect();
      var spaceLeft = rect.left - 20;
      var spaceRight = window.innerWidth - rect.right - 20;
      var maxSpread = Math.max(80, Math.min(spaceLeft, spaceRight, 260));

      picks.forEach(function(text, i){
        var badge = document.createElement('div');
        badge.className = 'error-badge';
        badge.textContent = text;
        // fan out left-to-right across the real available width, staggering height so they don't stack
        var t = count === 1 ? 0.5 : i / (count - 1);
        var x = (t - 0.5) * 2 * maxSpread;
        var y = -28 - (i % 3) * 16 - Math.random()*8;
        badge.style.left = 'calc(50% + ' + x + 'px)';
        badge.style.top = 'calc(50% + ' + y + 'px)';
        badge.style.animationDelay = (0.16 * i) + 's';
        el.appendChild(badge);
        badges.push({el:badge, x:x, y:y});
      });

      var zapStart = 5800;   // ~34% of 17s, right after the guard reaction
      var zapWindow = 8600;  // spread zaps across a relaxed window
      var stagger = zapWindow / Math.max(count, 1);

      setTimeout(function(){
        badges.forEach(function(b, i){
          setTimeout(function(){
            var beam = document.createElement('div');
            beam.className = 'zap-beam';
            var dist = Math.sqrt(b.x*b.x + b.y*b.y);
            var ang = Math.atan2(b.y, b.x) * 180/Math.PI;
            beam.style.left = '50%';
            beam.style.top = '50%';
            beam.style.width = dist + 'px';
            beam.style.transform = 'rotate(' + ang + 'deg)';
            el.appendChild(beam);
            b.el.classList.add('zapped');
            for(var s=0; s<5; s++){
              var spark = document.createElement('div');
              spark.className = 'spark';
              spark.style.left = 'calc(50% + ' + b.x + 'px)';
              spark.style.top = 'calc(50% + ' + b.y + 'px)';
              var sAngle = Math.random()*360;
              var sDist = 10 + Math.random()*14;
              spark.style.setProperty('--sx', (Math.cos(sAngle*Math.PI/180)*sDist) + 'px');
              spark.style.setProperty('--sy', (Math.sin(sAngle*Math.PI/180)*sDist) + 'px');
              spark.style.animationDelay = (0.08) + 's';
              el.appendChild(spark);
              setTimeout(function(sp){ return function(){ sp.remove(); }; }(spark), 700);
            }
            setTimeout(function(){ beam.remove(); }, 400);
            setTimeout(function(){ b.el.remove(); }, 500);
          }, i * stagger);
        });
      }, zapStart);

      setTimeout(function(){
        el.querySelectorAll('.error-badge, .zap-beam, .spark').forEach(function(n){ n.remove(); });
      }, 17000);
    }

    function spawnAbduction(el){
      console.log('[abduccion] INICIO — nave aparece');
      var ufo = document.createElement('div');
      ufo.className = 'ufo';
      ufo.innerHTML = '<div class="ufo-beam"></div><div class="ufo-body"></div><div class="ufo-dome"></div>'
        + '<div class="ufo-light" style="left:10px;"></div><div class="ufo-light" style="left:28px;"></div><div class="ufo-light" style="left:46px;"></div>';
      el.appendChild(ufo);
      var beamEl = ufo.querySelector('.ufo-beam');
      function pulseBeam(delay, dur, label){
        setTimeout(function(){
          console.log('[abduccion] haz activo:', label);
          beamEl.style.transition = 'opacity .3s ease';
          beamEl.style.opacity = '1';
          setTimeout(function(){ beamEl.style.opacity = '0'; }, dur);
        }, delay);
      }
      // beam pulses when the logo is taken (~16-26%) and when the excel icon is taken on re-entry (~60-68%)
      pulseBeam(20000*0.16, 20000*0.10, 'recogiendo logo');
      pulseBeam(20000*0.60, 20000*0.09, 'recogiendo icono excel');

      var excelIcon = document.createElement('div');
      excelIcon.className = 'swap-excelicon';
      el.appendChild(excelIcon);
      console.log('[abduccion] icono de Excel creado y agregado al DOM', excelIcon);

      setTimeout(function(){ console.log('[abduccion] 30% — logo debería estar oculto, icono apareciendo'); }, 20000*0.30);
      setTimeout(function(){ console.log('[abduccion] 44% — nave debería volar a la derecha'); }, 20000*0.44);
      setTimeout(function(){ console.log('[abduccion] 58% — nave debería reaparecer por la izquierda'); }, 20000*0.58);
      setTimeout(function(){ console.log('[abduccion] 95% — logo debería regresar y aterrizar'); }, 20000*0.95);

      setTimeout(function(){
        console.log('[abduccion] FIN — limpieza (20s)');
        ufo.remove();
        excelIcon.remove();
        el.classList.remove('abduct');
      }, 20000);
    }

    function spawnSnow(el){
      var fx = document.createElement('div');
      fx.className = 'frost-fx';
      for(var i=0; i<9; i++){
        var flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.style.left = (10 + Math.random()*70) + '%';
        flake.style.setProperty('--drift', (Math.random()*16-8) + 'px');
        flake.style.animationDuration = (1.6 + Math.random()*1.2) + 's';
        flake.style.animationDelay = (0.6 + i*0.28) + 's';
        fx.appendChild(flake);
      }
      var gust = document.createElement('div');
      gust.className = 'gust-sweep';
      gust.style.animationDelay = '1.4s';
      fx.appendChild(gust);
      var cup = document.createElement('div');
      cup.className = 'coffee-cup';
      cup.textContent = '☕';
      cup.style.animationDelay = '4s';
      fx.appendChild(cup);
      var steam = document.createElement('div');
      steam.className = 'steam-wisp';
      steam.textContent = '〜';
      steam.style.animationDelay = '4.1s';
      fx.appendChild(steam);
      el.appendChild(fx);
      setTimeout(function(){ fx.remove(); }, 7600);
    }

    function spawnGround(el){
      var clip = document.createElement('div');
      clip.className = 'sink-clip';
      var inner = document.createElement('div');
      inner.className = 'sink-inner';
      var kids = Array.prototype.slice.call(el.childNodes);
      kids.forEach(function(node){ inner.appendChild(node); });
      clip.appendChild(inner);
      el.appendChild(clip);

      var ground = document.createElement('div');
      ground.className = 'quicksand-ground';
      el.appendChild(ground);
      setTimeout(function(){
        for(var i=0; i<6; i++){
          var grain = document.createElement('div');
          grain.className = 'sand-grain';
          grain.style.left = (35 + Math.random()*30) + '%';
          grain.style.setProperty('--kx', (Math.random()*30-15) + 'px');
          grain.style.setProperty('--ky', (-(14+Math.random()*18)) + 'px');
          ground.appendChild(grain);
          setTimeout(function(g){ return function(){ g.remove(); }; }(grain), 750);
        }
      }, 2700);

      setTimeout(function(){
        ground.remove();
        var innerKids = Array.prototype.slice.call(inner.childNodes);
        innerKids.forEach(function(node){ el.insertBefore(node, clip); });
        clip.remove();
      }, 6600);
    }

    function spawnImpact(el){
      setTimeout(function(){
        var flash = document.createElement('div');
        flash.className = 'impact-flash';
        el.appendChild(flash);
        for(var i=0; i<5; i++){
          var shard = document.createElement('div');
          shard.className = 'shard';
          shard.style.left = '50%';
          shard.style.top = '50%';
          shard.style.backgroundImage = "url('assets/logo-icon.png')";
          var angle = (i / 5) * 360 + Math.random()*30;
          var dist = 22 + Math.random()*14;
          shard.style.setProperty('--sx', (Math.cos(angle*Math.PI/180)*dist) + 'px');
          shard.style.setProperty('--sy', (Math.sin(angle*Math.PI/180)*dist) + 'px');
          shard.style.setProperty('--sr', (Math.random()*360) + 'deg');
          el.appendChild(shard);
          setTimeout(function(s){ return function(){ s.remove(); }; }(shard), 1200);
        }
        setTimeout(function(){ flash.remove(); }, 900);
      }, 2000);

      var img = el.querySelector('img');
      var span = el.querySelector('span');
      if(img && span){
        var fromLeft = -(img.getBoundingClientRect().left + 200);
        var fromRight = window.innerWidth - span.getBoundingClientRect().right + 200;
        img.style.setProperty('--edge-x', fromLeft + 'px');
        span.style.setProperty('--edge-x', fromRight + 'px');
      }
    }

    function playAntics(el){
      repertoire.forEach(function(cls){ el.classList.remove(cls); });
      el.querySelectorAll('.frost-fx, .quicksand-ground, .impact-flash, .shard, .error-badge, .zap-beam, .spark, .ufo, .swap-excelicon').forEach(function(n){ n.remove(); });
      void el.offsetWidth;
      var pick = repertoire[Math.floor(Math.random() * repertoire.length)];
      console.log('[footer-logo] animación elegida:', pick, '— duración:', durations[pick] + 'ms');
      el.classList.add(pick);
      if(pick === 'freeze') spawnSnow(el);
      if(pick === 'sink') spawnGround(el);
      if(pick === 'collide') spawnImpact(el);
      if(pick === 'invasion') spawnInvasion(el);
      if(pick === 'abduct') spawnAbduction(el);
      return durations[pick];
    }
    function scheduleAntics(el){
      var gap = 3500 + Math.random() * 4000;
      setTimeout(function(){
        var rect = el.getBoundingClientRect();
        var dur = 0;
        if(rect.top < window.innerHeight && rect.bottom > 0){
          dur = playAntics(el);
        }
        setTimeout(function(){ scheduleAntics(el); }, dur);
      }, gap);
    }
    brandLogos.forEach(function(el, i){
      setTimeout(function(){ el.classList.add('antics'); }, 1000 + i * 400);
      scheduleAntics(el);
    });
  }
});
