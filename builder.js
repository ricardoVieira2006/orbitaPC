// Orbita PC — PC Builder com IA (chama a API online da Orbita PC)
(function () {
  "use strict";

  // Endpoint da IA. Por omissão usa a API pública da Orbita PC.
  // Se alojares o teu próprio backend, muda este URL.
  var AI_URL = "https://fiber-pc-shop.preview.emergentagent.com/api/ai/build-pc";

  var useCases = document.getElementById("useCases");
  var budget = document.getElementById("budget");
  var budgetValue = document.getElementById("budgetValue");
  var notes = document.getElementById("notes");
  var btn = document.getElementById("generateBtn");
  var loader = document.getElementById("loader");
  var loaderLine = document.getElementById("loaderLine");
  var result = document.getElementById("result");
  var placeholder = document.getElementById("placeholder");
  var quoteForm = document.getElementById("quoteForm");
  var buildSummary = document.getElementById("buildSummary");

  if (!btn) return;

  var useCase = "Gaming Ultra 4K";
  useCases.addEventListener("click", function (e) {
    var b = e.target.closest(".usecase");
    if (!b) return;
    useCases.querySelectorAll(".usecase").forEach(function (u) { u.classList.remove("active"); });
    b.classList.add("active");
    useCase = b.getAttribute("data-value");
  });

  function eur(v) {
    return Number(v).toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
  }
  budget.addEventListener("input", function () {
    budgetValue.textContent = eur(budget.value);
  });

  var loaderLines = [
    "> a analisar exigências do cliente…",
    "> a consultar preços do mercado PT…",
    "> a verificar compatibilidade de socket…",
    "> a equilibrar CPU / GPU / RAM…",
    "> a calcular estimativas de FPS…",
  ];
  var loaderTimer = null;

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function renderBuild(b) {
    var html = "";
    html += '<div class="build-head">';
    html += '<p class="step-label cy">Build gerada por IA</p>';
    html += "<h3>" + esc(b.build_name) + "</h3>";
    html += '<p class="muted small">' + esc(b.summary) + "</p>";
    html += '<p class="build-total">' + eur(b.total_eur) + ' <span class="muted small mono">total estimado</span></p>';
    html += "</div>";
    html += '<div class="panel" style="padding:0">';
    (b.components || []).forEach(function (c) {
      html += '<div class="comp-row"><div><p class="cat">' + esc(c.category) + '</p><p class="name">' + esc(c.name) + '</p>';
      if (c.note) html += '<p class="note">' + esc(c.note) + "</p>";
      html += '</div><span class="price">' + eur(c.price_eur) + "</span></div>";
    });
    html += "</div>";
    if (b.fps_estimates && b.fps_estimates.length) {
      html += '<div class="panel" style="margin-top:18px"><p class="step-label">Desempenho estimado</p><div class="fps-grid">';
      b.fps_estimates.forEach(function (f) {
        html += '<div class="fps-item"><span>' + esc(f.game) + " · " + esc(f.settings) + "</span><strong>" + esc(f.fps) + " fps</strong></div>";
      });
      html += "</div></div>";
    }
    if (b.compatibility && b.compatibility.length) {
      html += '<div class="panel" style="margin-top:18px"><p class="step-label">Verificações de compatibilidade</p><ul style="list-style:none;margin-top:10px">';
      b.compatibility.forEach(function (c) {
        html += '<li style="font-size:13px;padding:4px 0 4px 20px;position:relative"><span style="position:absolute;left:0;color:var(--lime)">✓</span>' + esc(c) + "</li>";
      });
      html += "</ul>";
      if (b.assembly_note) html += '<p class="muted small" style="margin-top:10px;font-style:italic">' + esc(b.assembly_note) + "</p>";
      html += "</div>";
    }
    result.innerHTML = html;

    var resumo = "BUILD IA: " + b.build_name + " — " + eur(b.total_eur) + "\n" +
      (b.components || []).map(function (c) { return c.category + ": " + c.name + " (" + eur(c.price_eur) + ")"; }).join("\n") +
      (notes.value ? "\n\nNotas: " + notes.value : "");
    buildSummary.value = resumo;
  }

  btn.addEventListener("click", function () {
    btn.disabled = true;
    btn.textContent = "A gerar build…";
    placeholder.classList.add("hidden");
    result.classList.add("hidden");
    quoteForm.classList.add("hidden");
    loader.classList.remove("hidden");
    var li = 0;
    loaderTimer = setInterval(function () {
      li = (li + 1) % loaderLines.length;
      loaderLine.textContent = loaderLines[li];
    }, 900);

    fetch(AI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        use_case: useCase,
        budget: Number(budget.value),
        notes: notes.value || undefined,
      }),
    })
      .then(function (r) {
        if (!r.ok) throw new Error("api");
        return r.json();
      })
      .then(function (b) {
        renderBuild(b);
        result.classList.remove("hidden");
        quoteForm.classList.remove("hidden");
        result.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch(function () {
        result.innerHTML = '<div class="panel"><p class="form-status err">A IA não respondeu. Verifica a ligação à internet e tenta novamente — ou envia-nos o pedido por telefone: +351 916 040 762.</p></div>';
        result.classList.remove("hidden");
      })
      .finally(function () {
        clearInterval(loaderTimer);
        loader.classList.add("hidden");
        btn.disabled = false;
        btn.textContent = "✦ Gerar Build com IA";
      });
  });
})();
