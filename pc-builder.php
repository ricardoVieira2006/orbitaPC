<!doctype html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PC Builder IA — Orbita PC</title>
<meta name="description" content="Descreve o que precisas e a nossa IA gera uma build de PC completa com preços reais.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=DM+Sans:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<header class="nav" id="nav">
  <div class="nav-inner">
    <a href="index.html" class="brand"><span class="brand-icon">◈</span> ORBITA<span class="cy">·</span>PC</a>
    <nav class="nav-links" id="navLinks">
      <a href="index.html">Início</a>
      <a href="pc-builder.html" class="active">PC Builder IA</a>
      <a href="vodafone.html">Fibra Vodafone</a>
      <a href="web-design.html">Criação de Sites</a>
      <a href="pc-builder.html" class="btn btn-primary btn-sm nav-cta">Pedir Orçamento</a>
    </nav>
    <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
  </div>
</header>

<main class="page container">
  <p class="label"><span class="cy">IA</span> / PC Builder</p>
  <h1 class="page-title">A tua build,<br>gerada por <span class="cy glow">IA.</span></h1>
  <p class="lead">Diz-nos para que precisas do computador e quanto queres gastar. A nossa IA compõe uma build equilibrada com preços reais do mercado português — e nós tratamos da montagem, testes e entrega.</p>

  <div class="builder-grid">
    <div class="panel">
      <p class="step-label">01 · Utilização</p>
      <div class="usecases" id="useCases">
        <button type="button" class="usecase active" data-value="Gaming Ultra 4K"><strong>Gaming Ultra 4K</strong><span>FPS máximo, ray tracing, 144Hz+</span></button>
        <button type="button" class="usecase" data-value="Edição de Vídeo / 3D"><strong>Edição de Vídeo / 3D</strong><span>Premiere, Blender, DaVinci</span></button>
        <button type="button" class="usecase" data-value="Programação / Workstation"><strong>Programação / Workstation</strong><span>Multitarefa, VMs, compilação</span></button>
        <button type="button" class="usecase" data-value="Económico / Escritório"><strong>Económico / Escritório</strong><span>Dia-a-dia fluido e silencioso</span></button>
      </div>

      <p class="step-label">02 · Orçamento máximo</p>
      <div class="budget-row"><span class="budget-value" id="budgetValue">1 500,00 €</span><span class="muted small">500€ — 4500€</span></div>
      <input type="range" id="budget" min="500" max="4500" step="50" value="1500">

      <p class="step-label">03 · Notas extra (opcional)</p>
      <textarea id="notes" rows="3" maxlength="800" placeholder="Ex.: quero caixa branca com RGB, arrefecimento líquido, muito silencioso…"></textarea>

      <button class="btn btn-primary btn-block" id="generateBtn">✦ Gerar Build com IA</button>
      <p class="muted small" id="aiNote">A IA corre online — precisas de ligação à internet.</p>
    </div>

    <div>
      <div class="panel loader hidden" id="loader">
        <p class="cy step-label">✦ IA a montar a tua build</p>
        <p class="mono muted" id="loaderLine">&gt; a analisar exigências do cliente…</p>
        <div class="bar" style="width:80%"></div><div class="bar" style="width:65%"></div><div class="bar" style="width:90%"></div>
      </div>

      <div id="result" class="hidden"></div>

      <div class="hero-img-wrap tall" id="placeholder">
        <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?crop=entropy&cs=srgb&fm=jpg&q=85&w=900" alt="Interior de PC personalizado" class="hero-img">
        <div class="hero-hud">A tua máquina começa aqui — configura à esquerda.</div>
      </div>

      <form class="panel form hidden" id="quoteForm" data-tipo="pc">
        <p class="step-label">04 · Pedir esta build</p>
        <p class="muted small">Deixa os teus contactos e confirmamos o orçamento final em menos de 24h.</p>
        <div class="form-row">
          <input type="text" name="nome" placeholder="Nome" required>
          <input type="email" name="email" placeholder="Email" required>
          <input type="tel" name="telemovel" placeholder="Telemóvel">
        </div>
        <input type="hidden" name="mensagem" id="buildSummary">
        <button type="submit" class="btn btn-lime btn-block">Enviar Pedido de Orçamento</button>
        <p class="form-status" id="quoteStatus"></p>
      </form>
    </div>
  </div>
</main>

<footer class="footer">
  <div class="container footer-grid">
    <div>
      <p class="brand"><span class="brand-icon">◈</span> ORBITA<span class="cy">·</span>PC</p>
      <p class="muted">Montagem de computadores à medida, adesão a pacotes Fibra Vodafone e criação de sites profissionais.</p>
    </div>
    <div>
      <p class="footer-h">Serviços</p>
      <a href="pc-builder.html">Montagem de PC com IA</a>
      <a href="vodafone.html">Pacotes Fibra Vodafone</a>
      <a href="web-design.html">Criação de Sites</a>
    </div>
    <div>
      <p class="footer-h">Contactos</p>
      <p>✉ geral@nexustech.pt</p>
      <p>☏ +351 916 040 762</p>
      <p>◎ Porto, Portugal</p>
    </div>
  </div>
  <div class="footer-bottom"><div class="container">© 2026 Orbita PC — Todos os direitos reservados</div></div>
</footer>

<script src="assets/js/main.js"></script>
<script src="assets/js/builder.js"></script>
</body>
</html>
