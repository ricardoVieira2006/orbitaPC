// Orbita PC — interações gerais
(function () {
  "use strict";

  // Menu mobile
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  // Nav com sombra ao fazer scroll
  var nav = document.getElementById("nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Ticker do hero
  var tickerEl = document.getElementById("ticker");
  if (tickerEl) {
    var lines = [
      "> build rtx-5080-4k :: compatibilidade OK",
      "> fibra 1gbps :: ping 4ms :: jitter 0.6ms",
      "> orçamento #1247 :: enviado em 3h12m",
      "> stress-test cpu/gpu :: 100% estável",
      "> uptime monitorizado :: 99.98%",
    ];
    var i = 0;
    setInterval(function () {
      i = (i + 1) % lines.length;
      tickerEl.textContent = lines[i];
    }, 2400);
  }

  // Envio de formulários para enviar.php (PHP mail)
  function enviarForm(form, statusEl) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var dados = new FormData(form);
      dados.set("tipo", form.getAttribute("data-tipo") || "contacto");
      statusEl.textContent = "A enviar…";
      statusEl.className = "form-status";
      fetch("enviar.php", { method: "POST", body: dados })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.ok) {
            statusEl.textContent = "Pedido enviado com sucesso! Respondemos em menos de 24h.";
            statusEl.className = "form-status ok";
            form.reset();
          } else {
            statusEl.textContent = res.erro || "Não foi possível enviar. Tenta novamente ou liga-nos.";
            statusEl.className = "form-status err";
          }
        })
        .catch(function () {
          statusEl.textContent = "Erro de ligação. Tenta novamente ou contacta-nos por telefone.";
          statusEl.className = "form-status err";
        });
    });
  }

  var qf = document.getElementById("quoteForm");
  if (qf) enviarForm(qf, document.getElementById("quoteStatus"));
  var af = document.getElementById("adesaoForm");
  if (af) enviarForm(af, document.getElementById("adesaoStatus"));
  var wf = document.getElementById("wdForm");
  if (wf) enviarForm(wf, document.getElementById("wdStatus"));

  // Vodafone: escolher pacote
  var picker = document.getElementById("pkgPicker");
  var pacoteField = document.getElementById("pacoteField");
  function escolherPacote(nome) {
    if (pacoteField) pacoteField.value = nome;
    if (picker) {
      picker.querySelectorAll("button").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-pkg") === nome);
      });
    }
  }
  if (picker) {
    picker.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (b) escolherPacote(b.getAttribute("data-pkg"));
    });
  }
  document.querySelectorAll(".pkg-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      escolherPacote(btn.getAttribute("data-pkg"));
      var alvo = document.getElementById("adesao");
      if (alvo) alvo.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Web Design: estimador
  var servicos = document.getElementById("wdServices");
  var extras = document.getElementById("wdExtras");
  var totalEl = document.getElementById("wdTotal");
  var summaryEl = document.getElementById("wdSummary");
  var servicoAtual = { price: 299, name: "Landing Page" };
  function eur(v) {
    return v.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
  }
  function atualizarTotal() {
    var total = servicoAtual.price;
    var partes = [servicoAtual.name];
    if (extras) {
      extras.querySelectorAll("input:checked").forEach(function (c) {
        total += Number(c.value);
        partes.push(c.getAttribute("data-name"));
      });
    }
    if (totalEl) totalEl.textContent = eur(total);
    if (summaryEl) summaryEl.textContent = partes.join(" + ");
  }
  if (servicos) {
    servicos.addEventListener("click", function (e) {
      var b = e.target.closest(".usecase");
      if (!b) return;
      servicos.querySelectorAll(".usecase").forEach(function (u) { u.classList.remove("active"); });
      b.classList.add("active");
      servicoAtual = { price: Number(b.getAttribute("data-price")), name: b.getAttribute("data-name") };
      atualizarTotal();
    });
  }
  if (extras) extras.addEventListener("change", atualizarTotal);
  if (wf) {
    wf.addEventListener("submit", function () {
      var msg = wf.querySelector('textarea[name="mensagem"]');
      if (msg && summaryEl) msg.value = (msg.value ? msg.value + "\n\n" : "") + "Estimativa: " + summaryEl.textContent + " = " + totalEl.textContent;
    });
  }
})();
