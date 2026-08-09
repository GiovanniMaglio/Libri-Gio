/* La mia libreria — app.js
   Carica data/books.json, disegna lo scaffale (uno "spine" per libro),
   gestisce ricerca/filtro e la pagina di dettaglio via hash routing (#/libro/ID). */

(function () {
  "use strict";

  var SPINE_CLASSES = ["forest", "oxblood", "navy", "ochre", "walnut", "plum"];

  var state = { books: [], filtered: [] };

  var els = {
    shelf: document.getElementById("shelf"),
    empty: document.getElementById("empty-state"),
    search: document.getElementById("search"),
    genreFilter: document.getElementById("genre-filter"),
    count: document.getElementById("count"),
    legend: document.getElementById("legend"),
    overlay: document.getElementById("overlay"),
    scrim: document.getElementById("scrim"),
    card: document.getElementById("detail-card"),
    detailContent: document.getElementById("detail-content"),
    closeBtn: document.getElementById("close-btn")
  };

  // ---------- helpers ----------

  function hashString(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  function spineClassFor(genere) {
    var key = (genere || "senza genere").trim().toLowerCase();
    return SPINE_CLASSES[hashString(key) % SPINE_CLASSES.length];
  }

  function spineWidthFor(title) {
    var len = (title || "").length;
    var w = 34 + (len % 22); // 34–56px, varia in modo deterministico
    return Math.min(58, Math.max(34, w));
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  }

  function ratingDotsHtml(rating) {
    var r = Number(rating) || 0;
    var out = "";
    for (var i = 1; i <= 5; i++) {
      if (r >= i) out += '<span class="dot-full"></span>';
      else if (r >= i - 0.5) out += '<span class="dot-half"></span>';
      else out += '<span class="dot-empty"></span>';
    }
    return out;
  }

  // ---------- rendering ----------

  function renderLegend(books) {
    var genres = uniqueGenres(books);
    els.legend.innerHTML = genres.map(function (g) {
      var cls = spineClassFor(g);
      return '<span><span class="dot" style="background:var(--spine-' + cls + ')"></span>' + escapeHtml(g) + '</span>';
    }).join("");
  }

  function uniqueGenres(books) {
    var set = {};
    var out = [];
    books.forEach(function (b) {
      var g = b.genere || "Senza genere";
      if (!set[g]) { set[g] = true; out.push(g); }
    });
    out.sort(function (a, b) { return a.localeCompare(b, "it"); });
    return out;
  }

  function populateGenreFilter(books) {
    var genres = uniqueGenres(books);
    var current = els.genreFilter.value;
    els.genreFilter.innerHTML = '<option value="">Tutti i generi</option>' +
      genres.map(function (g) { return '<option value="' + escapeHtml(g) + '">' + escapeHtml(g) + '</option>'; }).join("");
    els.genreFilter.value = current;
  }

  function renderShelf(books) {
    if (!books.length) {
      els.shelf.innerHTML = "";
      els.empty.hidden = false;
      els.count.textContent = "Nessun libro";
      return;
    }
    els.empty.hidden = true;
    els.count.textContent = books.length + (books.length === 1 ? " libro" : " libri");

    els.shelf.innerHTML = books.map(function (b) {
      var cls = spineClassFor(b.genere);
      var width = spineWidthFor(b.title);
      var ratingLabel = b.rating != null ? Number(b.rating).toFixed(1) : "—";
      var label = escapeHtml(b.title) + (b.author ? ", " + escapeHtml(b.author) : "");
      return '<button type="button" class="spine ' + cls + '" style="width:' + width + 'px" ' +
        'data-id="' + escapeHtml(b.id) + '" aria-label="Apri la recensione di ' + label + '" title="' + label + '">' +
        '<span class="spine-title">' + escapeHtml(b.title) + '</span>' +
        '<span class="spine-tag">' + ratingLabel + '</span>' +
        '</button>';
    }).join("");
  }

  function applyFilters() {
    var q = els.search.value.trim().toLowerCase();
    var genre = els.genreFilter.value;

    state.filtered = state.books.filter(function (b) {
      var matchesGenre = !genre || (b.genere || "Senza genere") === genre;
      if (!matchesGenre) return false;
      if (!q) return true;
      var haystack = [b.title, b.author, b.review].filter(Boolean).join(" ").toLowerCase();
      return haystack.indexOf(q) !== -1;
    });

    renderShelf(state.filtered);
  }

  // ---------- detail view ----------

  function findBook(id) {
    var idStr = String(id);
    return state.books.filter(function (b) { return String(b.id) === idStr; })[0];
  }

  function openDetail(book) {
    document.getElementById("detail-title") && document.getElementById("detail-title").remove();
    els.detailContent.innerHTML =
      '<p class="detail-genre">' + escapeHtml(book.genere || "Senza genere") + '</p>' +
      '<h2 class="detail-title" id="detail-title">' + escapeHtml(book.title) + '</h2>' +
      '<p class="detail-author">' + escapeHtml(book.author || "Autore sconosciuto") + '</p>' +
      '<div class="detail-rating">' +
        '<span class="dots">' + ratingDotsHtml(book.rating) + '</span>' +
        '<span class="rating-number">' + (book.rating != null ? Number(book.rating).toFixed(1) + " / 5" : "Nessun voto") + '</span>' +
      '</div>' +
      (book.review ? '<p class="detail-review">' + escapeHtml(book.review) + '</p>' : '') +
      '<p class="detail-meta">Aggiunto il ' + escapeHtml(formatDate(book.added_on) || "data sconosciuta") + '</p>';

    els.overlay.hidden = false;
    els.closeBtn.focus();
    document.body.style.overflow = "hidden";
  }

  function closeDetail() {
    els.overlay.hidden = true;
    document.body.style.overflow = "";
  }

  function route() {
    var hash = window.location.hash;
    var match = hash.match(/^#\/libro\/(.+)$/);
    if (match) {
      var book = findBook(decodeURIComponent(match[1]));
      if (book) {
        openDetail(book);
        return;
      }
    }
    closeDetail();
  }

  // ---------- wiring ----------

  els.shelf.addEventListener("click", function (e) {
    var btn = e.target.closest(".spine");
    if (!btn) return;
    window.location.hash = "#/libro/" + encodeURIComponent(btn.dataset.id);
  });

  els.closeBtn.addEventListener("click", function () {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    closeDetail();
  });

  els.scrim.addEventListener("click", function () {
    els.closeBtn.click();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !els.overlay.hidden) els.closeBtn.click();
  });

  els.search.addEventListener("input", applyFilters);
  els.genreFilter.addEventListener("change", applyFilters);
  window.addEventListener("hashchange", route);

  // ---------- boot ----------

  fetch("data/books.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Impossibile caricare data/books.json");
      return res.json();
    })
    .then(function (data) {
      state.books = Array.isArray(data) ? data : [];
      state.filtered = state.books.slice();
      populateGenreFilter(state.books);
      renderLegend(state.books);
      renderShelf(state.filtered);
      route();
    })
    .catch(function (err) {
      els.shelf.innerHTML = "";
      els.empty.hidden = false;
      els.empty.textContent = "Non riesco a caricare i libri. Controlla che data/books.json esista e sia formattato correttamente.";
      console.error(err);
    });
})();
