(function () {
  var root = document.documentElement;

  // Colour theme: follows the system until the visitor picks one.
  var themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // Mobile menu
  var nav = document.querySelector('.nav'), menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); }
    });
  }

  // Toast
  var toast = document.createElement('div');
  toast.className = 'toast'; toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
  var timer;
  function say(msg) {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(timer); timer = setTimeout(function () { toast.classList.remove('show'); }, 1800);
  }

  // Copy buttons: data-copy-from="id of element whose text to copy"
  document.querySelectorAll('[data-copy-from]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = document.getElementById(b.dataset.copyFrom).textContent;
      navigator.clipboard.writeText(text).then(
        function () { say(b.dataset.done || 'Copied to clipboard'); },
        function () { say('Copy failed. Select the text and copy it manually.'); });
    });
  });

  // Show/hide panels: data-toggle="id"
  document.querySelectorAll('[data-toggle]').forEach(function (b) {
    var panel = document.getElementById(b.dataset.toggle), label = b.querySelector('span') || b;
    var closed = label.textContent, opened = b.dataset.openLabel || closed;
    b.addEventListener('click', function () {
      var open = panel.hidden;
      panel.hidden = !open;
      b.setAttribute('aria-expanded', open);
      label.textContent = open ? opened : closed;
    });
  });

  // Scientific communication: filters and empty state
  var list = document.querySelector('.comm-list');
  if (list) {
    var entries = list.querySelectorAll('.entry[data-type]');
    var empty = document.querySelector('.empty'), filters = document.querySelector('.filters');
    if (!entries.length) { empty.hidden = false; filters.hidden = true; }
    var buttons = document.querySelectorAll('.filter');
    buttons.forEach(function (b) {
      var f = b.dataset.filter, n = 0;
      entries.forEach(function (e) { if (f === 'all' || e.dataset.type === f) n++; });
      b.querySelector('.count').textContent = n;
      if (!n && f !== 'all') b.hidden = true;
      b.addEventListener('click', function () {
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
        entries.forEach(function (e) { e.hidden = !(f === 'all' || e.dataset.type === f); });
        list.querySelectorAll('.year-group').forEach(function (g) {
          g.hidden = !g.querySelector('.entry[data-type]:not([hidden])');
        });
      });
    });
  }

  // PDF preview in a dialog on larger screens; phones open the file directly.
  var viewer = document.querySelector('.viewer');
  if (viewer && viewer.showModal) {
    var frame = document.getElementById('viewer-frame'), title = document.getElementById('viewer-title');
    var openLink = document.getElementById('viewer-open');
    document.querySelectorAll('[data-viewer]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth < 768) return;
        e.preventDefault();
        var entry = a.closest('.entry'), h = entry && entry.querySelector('h3');
        title.textContent = h ? h.textContent : 'Preview';
        frame.src = a.href; openLink.href = a.href;
        viewer.showModal();
      });
    });
    function close() { viewer.close(); }
    document.getElementById('viewer-close').addEventListener('click', close);
    viewer.addEventListener('click', function (e) { if (e.target === viewer) close(); });
    viewer.addEventListener('close', function () { frame.src = 'about:blank'; });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
