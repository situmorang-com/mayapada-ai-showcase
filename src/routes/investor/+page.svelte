<script lang="ts">
	import { onMount } from 'svelte';
	import {
		groupInfo,
		roadmap,
		marketOpportunities,
		moatPillars,
		moatComparison,
		investmentTheses,
		sQuantumModel,
		aiMedTech
	} from '$lib/data';

	// ─── Theme ───────────────────────────────────────
	let isDark = $state(true);

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
	}

	// ─── Scroll / header blur ────────────────────────
	let scrollY = $state(0);
	let headerBlurred = $derived(scrollY > 60);

	// ─── Active nav section ──────────────────────────
	let activeSection = $state('cover');

	// ─── Intersection observer for reveals ──────────
	function observe(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => entries.forEach((e) => { if (e.isIntersecting) node.classList.add('in-view'); }),
			{ threshold: 0.1, rootMargin: '-5% 0px' }
		);
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}

	function trackSection(node: HTMLElement, id: string) {
		const observer = new IntersectionObserver(
			(entries) => entries.forEach((e) => { if (e.isIntersecting) activeSection = id; }),
			{ threshold: 0.3 }
		);
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}

	function stagger(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						Array.from(node.children).forEach((c, i) => {
							setTimeout(() => (c as HTMLElement).classList.add('stagger-visible'), i * 120);
						});
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.08 }
		);
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}

	function counter(node: HTMLElement, target: number) {
		let started = false;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting && !started) {
						started = true;
						const dur = 1800;
						const t0 = performance.now();
						const tick = (now: number) => {
							const p = Math.min((now - t0) / dur, 1);
							const eased = 1 - Math.pow(1 - p, 3);
							node.textContent = Math.round(eased * target).toString();
							if (p < 1) requestAnimationFrame(tick);
						};
						requestAnimationFrame(tick);
					}
				});
			},
			{ threshold: 0.5 }
		);
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}

	onMount(() => {
		document.documentElement.setAttribute('data-theme', 'dark');
	});

	const navLinks = [
		{ id: 'opportunity', label: 'Opportunity' },
		{ id: 'advantage', label: 'Advantage' },
		{ id: 'strategy', label: 'Strategy' },
		{ id: 'market', label: 'Market' },
		{ id: 'roadmap', label: 'Roadmap' },
		{ id: 'moat', label: 'Moat' },
		{ id: 'engine', label: 'Execution' },
		{ id: 'medtech', label: 'AI MedTech' },
		{ id: 'thesis', label: 'Thesis' }
	];

	function scrollTo(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<svelte:head>
	<title>Investor Deck — Mayapada Group AI Strategy</title>
	<meta name="description" content="Building Indonesia's first AI-native conglomerate. Investor brief for Mayapada Group AI transformation." />

	<meta property="og:title" content="Investor Deck — Mayapada Group AI Strategy" />
	<meta property="og:description" content="Building Indonesia's first AI-native conglomerate. Healthcare AI as the beachhead, cross-sector data flywheel across 40+ companies and 6 industries." />
	<meta property="og:url" content="https://mayapada.situmorang.com/investor" />
	<meta property="og:image" content="https://mayapada.situmorang.com/og-mayapada-ai-initiatives.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Mayapada Group AI Strategy — Investor Deck" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Investor Deck — Mayapada Group AI Strategy" />
	<meta name="twitter:description" content="Building Indonesia's first AI-native conglomerate. Healthcare AI as the beachhead, cross-sector data flywheel across 40+ companies and 6 industries." />
	<meta name="twitter:image" content="https://mayapada.situmorang.com/og-mayapada-ai-initiatives.png" />

	{@html `<style>
		:root[data-theme='light'] {
			--bg-deep: #f4f1eb;
			--bg-surface: #edeadf;
			--bg-card: #ffffff;
			--bg-card-hover: #faf8f2;
			--text-primary: #160f03;
			--text-secondary: rgba(22,15,3,0.65);
			--text-muted: rgba(22,15,3,0.38);
		}
	</style>`}
</svelte:head>

<svelte:window bind:scrollY />

<!-- ══════════════════════════════════════════════════
     STICKY HEADER
     ══════════════════════════════════════════════════ -->
<header class="inv-header" class:blurred={headerBlurred}>
	<a href="/" class="inv-brand">
		<span class="inv-logo">M</span>
		<span class="inv-brand-label">Mayapada <span>· Investor Deck</span></span>
	</a>

	<nav class="inv-nav">
		{#each navLinks as link}
			<button
				class="inv-nav-link"
				class:active={activeSection === link.id}
				onclick={() => scrollTo(link.id)}
			>
				{link.label}
			</button>
		{/each}
	</nav>

	<div class="inv-header-actions">
		<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
			{#if isDark}
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
					<circle cx="12" cy="12" r="5"/>
					<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
				</svg>
			{:else}
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
				</svg>
			{/if}
		</button>
		<a href="/" class="inv-showcase-link">View Showcase →</a>
	</div>
</header>

<!-- ══════════════════════════════════════════════════
     S1 — COVER
     ══════════════════════════════════════════════════ -->
<section id="cover" class="cover-section" use:trackSection={'cover'}>
	<div class="cover-bg">
		<div class="cover-grid"></div>
		<div class="cover-radial"></div>
	</div>
	<div class="cover-content">
		<div class="cover-tag" use:observe>INVESTOR BRIEF · CONFIDENTIAL</div>
		<h1 class="cover-title" use:observe>
			Building Indonesia's First<br />
			<em>AI-Native Conglomerate</em>
		</h1>
		<p class="cover-sub" use:observe>
			A strategic brief on how Mayapada Group — 40+ companies, 6 sectors, $11.9B — becomes the
			most intelligent business ecosystem in Southeast Asia.
		</p>

		<div class="cover-metrics" use:stagger>
			<div class="cover-metric stagger-item">
				<span class="cover-metric-value">287M</span>
				<span class="cover-metric-label">Addressable Population</span>
			</div>
			<div class="cover-metric-sep stagger-item"></div>
			<div class="cover-metric stagger-item">
				<span class="cover-metric-value">$11.9B</span>
				<span class="cover-metric-label">Group Net Worth</span>
			</div>
			<div class="cover-metric-sep stagger-item"></div>
			<div class="cover-metric stagger-item">
				<span class="cover-metric-value">6</span>
				<span class="cover-metric-label">Industry Sectors</span>
			</div>
			<div class="cover-metric-sep stagger-item"></div>
			<div class="cover-metric stagger-item">
				<span class="cover-metric-value">40+</span>
				<span class="cover-metric-label">Operating Companies</span>
			</div>
		</div>

		<div class="cover-scroll-cue">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M12 5v14M5 12l7 7 7-7"/>
			</svg>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S2 — THE OPPORTUNITY (WHY NOW)
     ══════════════════════════════════════════════════ -->
<section id="opportunity" class="section" use:trackSection={'opportunity'}>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-tag">The Problem</span>
			<h2 class="section-title">Why Indonesia. Why Now.</h2>
			<p class="section-sub">The AI opportunity here is not theoretical — it is structural. These are not future projections. They are present-day gaps that AI can close.</p>
		</div>
		<div class="problem-grid" use:stagger>
			<div class="problem-card stagger-item">
				<div class="problem-stat"><span use:counter={51}>0</span>%</div>
				<div class="problem-label">Adults Without Bank Access</div>
				<p class="problem-insight">48% of Indonesian adults remain unbanked (World Bank 2021). AI-powered credit scoring using alternative data can unlock an estimated $234B MSME financing gap (IFC) — immediately addressable through Bank Mayapada and Pohon Dana.</p>
			</div>
			<div class="problem-card stagger-item">
				<div class="problem-stat">0.<span use:counter={4}>0</span></div>
				<div class="problem-label">Doctors per 1,000 People</div>
				<p class="problem-insight">Indonesia has 0.47 doctors per 1,000 people — more than 50% below the WHO minimum standard of 1:1,000. AI triage, diagnostics, and telemedicine is not a luxury. It is the only scalable solution.</p>
			</div>
			<div class="problem-card stagger-item">
				<div class="problem-stat"><span use:counter={67}>0</span>%</div>
				<div class="problem-label">SMEs Without Formal Credit</div>
				<p class="problem-insight">47% of Indonesian MSME financing demand remains unmet (IMF 2024). AI-powered underwriting models that use business transaction history and behavioral signals can transform this into the largest untapped lending market in Asia.</p>
			</div>
		</div>
		<p class="opportunity-summary" use:observe>
			Mayapada Group already serves customers at every one of these pain points — with a bank, hospitals, clinics, hotels, and retail locations. <strong>The infrastructure is built. The AI layer is what unlocks it.</strong>
		</p>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S3 — UNFAIR ADVANTAGE (MOAT PILLARS)
     ══════════════════════════════════════════════════ -->
<section id="advantage" class="section section-alt" use:trackSection={'advantage'}>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-tag">The Edge</span>
			<h2 class="section-title">The Unfair Advantage</h2>
			<p class="section-sub">What most AI companies spend years trying to acquire, Mayapada already has. All four at once.</p>
		</div>
		<div class="moat-grid" use:stagger>
			{#each moatPillars as pillar}
				<div class="moat-card stagger-item">
					<div class="moat-icon">{pillar.icon}</div>
					<h3 class="moat-title">{pillar.title}</h3>
					<p class="moat-desc">{pillar.description}</p>
					<div class="moat-proof">
						<span class="proof-dot"></span>
						{pillar.proof}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S4 — STRATEGY: HEALTHCARE FIRST
     ══════════════════════════════════════════════════ -->
<section id="strategy" class="section" use:trackSection={'strategy'}>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-tag">The Strategy</span>
			<h2 class="section-title">Healthcare AI First</h2>
			<p class="section-sub">We don't bet on every sector simultaneously. We build the beachhead that pulls everything else forward.</p>
		</div>

		<div class="strategy-columns">
			<!-- WHY HEALTHCARE -->
			<div class="strategy-col" use:observe>
				<h3 class="strategy-col-title">Why Healthcare?</h3>
				<ul class="strategy-reasons">
					<li>
						<span class="reason-num">01</span>
						<div>
							<strong>Highest public demand</strong>
							<p>98% of telemedicine users intend to continue using digital health services post-COVID (Deloitte 2022).</p>
						</div>
					</li>
					<li>
						<span class="reason-num">02</span>
						<div>
							<strong>Mayapada brand is strongest here</strong>
							<p>7+ hospitals, Biomedilab, and clinics give immediate patient access and real training data — something no startup can replicate.</p>
						</div>
					</li>
					<li>
						<span class="reason-num">03</span>
						<div>
							<strong>Government tailwinds</strong>
							<p>Indonesia's Universal Health Coverage (JKN) push and Ministry of Health digitization mandates create direct regulatory demand.</p>
						</div>
					</li>
					<li>
						<span class="reason-num">04</span>
						<div>
							<strong>The richest data source</strong>
							<p>Health data is the most valuable and sticky data asset a conglomerate can own — and it feeds every other sector's AI models.</p>
						</div>
					</li>
				</ul>
			</div>

			<!-- FLYWHEEL DIAGRAM -->
			<div class="strategy-col" use:observe>
				<h3 class="strategy-col-title">The Cross-Sector Flywheel</h3>
				<div class="flywheel">
					<div class="flywheel-center">
						<span class="flywheel-center-icon">🏥</span>
						<span class="flywheel-center-label">Healthcare AI</span>
						<span class="flywheel-center-sub">The Beachhead</span>
					</div>
					<div class="flywheel-spokes">
						<div class="spoke">
							<div class="spoke-connector"></div>
							<div class="spoke-node" style="--c:#3b82f6">
								<span>🏦</span>
								<strong>Banking</strong>
								<p>Health data improves credit risk models</p>
							</div>
						</div>
						<div class="spoke">
							<div class="spoke-connector"></div>
							<div class="spoke-node" style="--c:#8b5cf6">
								<span>🛡️</span>
								<strong>Insurance</strong>
								<p>Health records power Sompo risk pricing</p>
							</div>
						</div>
						<div class="spoke">
							<div class="spoke-connector"></div>
							<div class="spoke-node" style="--c:#f43f5e">
								<span>🌴</span>
								<strong>Hospitality</strong>
								<p>Wellness + IHG hotel medical packages</p>
							</div>
						</div>
						<div class="spoke">
							<div class="spoke-connector"></div>
							<div class="spoke-node" style="--c:#06b6d4">
								<span>📡</span>
								<strong>Media</strong>
								<p>Bloomberg + Forbes health content AI</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S5 — MARKET OPPORTUNITY
     ══════════════════════════════════════════════════ -->
<section id="market" class="section section-alt" use:trackSection={'market'}>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-tag">The Market</span>
			<h2 class="section-title">Market Opportunity</h2>
			<p class="section-sub">Four converging markets across Mayapada's six sectors. Each one alone is a venture-scale opportunity.</p>
		</div>
		<div class="market-grid" use:stagger>
			{#each marketOpportunities as m}
				<div class="market-card stagger-item" style="--mc: {m.color}; --mc-rgb: {m.colorRgb}">
					<div class="market-sector">{m.sector}</div>
					<div class="market-tam">{m.tam}</div>
					<div class="market-tam-label">{m.tamLabel}</div>
					<div class="market-cagr-row">
						<span class="market-cagr">{m.cagr} CAGR</span>
					</div>
					<p class="market-insight">"{m.insight}"</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S6 — EXECUTION ROADMAP
     ══════════════════════════════════════════════════ -->
<section id="roadmap" class="section" use:trackSection={'roadmap'}>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-tag">The Plan</span>
			<h2 class="section-title">Execution Roadmap</h2>
			<p class="section-sub">Five phases. 24 months. From beachhead to full ecosystem intelligence.</p>
		</div>

		<div class="roadmap-legend" use:observe>
			<span class="legend-item"><span class="legend-dot" style="background:#10b981"></span> Beachhead</span>
			<span class="legend-item"><span class="legend-dot" style="background:#3b82f6"></span> Expansion</span>
			<span class="legend-item"><span class="legend-dot" style="background:#d4af37"></span> Scale</span>
		</div>

		<div class="roadmap-timeline">
			{#each roadmap as phase, i}
				<div class="roadmap-phase" use:observe style="--pc: {phase.sectorColor}">
					<div class="phase-rail">
						<div class="phase-dot"></div>
						{#if i < roadmap.length - 1}
							<div class="phase-line"></div>
						{/if}
					</div>
					<div class="phase-content">
						<div class="phase-meta">
							<span class="phase-num">Phase {phase.phase}</span>
							<span class="phase-timeframe">{phase.timeframe}</span>
							<span class="phase-sector" style="color:{phase.sectorColor}">{phase.sector}</span>
							<span class="phase-status status-{phase.status}">{phase.status}</span>
						</div>
						<h3 class="phase-title">{phase.title}</h3>
						<p class="phase-desc">{phase.description}</p>
						<ul class="phase-milestones">
							{#each phase.milestones as m}
								<li>{m}</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S7 — THE MOAT (COMPARISON)
     ══════════════════════════════════════════════════ -->
<section id="moat" class="section section-alt" use:trackSection={'moat'}>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-tag">The Moat</span>
			<h2 class="section-title">Why Competitors Can't Catch Up</h2>
			<p class="section-sub">The question is not whether AI will transform Indonesia's economy. The question is who is positioned to lead it.</p>
		</div>

		<div class="comparison-wrapper" use:observe>
			<div class="comparison-grid">
				<!-- LEFT: Startup -->
				<div class="comparison-col comparison-left">
					<div class="comparison-label">AI Startup</div>
					{#each moatComparison.left.items as item}
						<div class="comparison-row" class:has={item.have}>
							<span class="cmp-icon">{item.have ? '✓' : '✗'}</span>
							<span class="cmp-text">{item.text}</span>
						</div>
					{/each}
				</div>

				<!-- DIVIDER -->
				<div class="comparison-divider">
					<span>vs</span>
				</div>

				<!-- RIGHT: Mayapada -->
				<div class="comparison-col comparison-right">
					<div class="comparison-label gold">Mayapada + AI MedTech</div>
					{#each moatComparison.right.items as item}
						<div class="comparison-row has">
							<span class="cmp-icon gold">✓</span>
							<span class="cmp-text">{item.text}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S8 — THE ARCHITECT: S-QUANTUM ENGINE
     ══════════════════════════════════════════════════ -->
<section id="engine" class="section" use:trackSection={'engine'}>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-tag">The Execution Model</span>
			<h2 class="section-title">This Has Been Built Before.</h2>
			<p class="section-sub">At one of Indonesia's largest conglomerates, a proven innovation model was created that will power this transformation.</p>
		</div>

		<!-- Architect Card -->
		<div class="architect-card" use:observe>
			<div class="architect-badge">Strategy Architect</div>
			<div class="architect-info">
				<h3 class="architect-name">{sQuantumModel.architect.name}</h3>
				<p class="architect-title">{sQuantumModel.architect.title}</p>
				<p class="architect-role">{sQuantumModel.architect.role}</p>
			</div>
			<p class="architect-quote">
				"I built the S-Quantum Engine at Sinarmas — one of Indonesia's top 3 conglomerates — to solve exactly this problem: how do you make 40+ companies innovate as fast as a startup, without losing operational stability?"
			</p>
		</div>

		<!-- S-Quantum Model -->
		<div class="sqe-section" use:observe>
			<h3 class="sqe-title">The S-Quantum Engine Model</h3>
			<p class="sqe-desc">{sQuantumModel.hubDescription}</p>

			<!-- Hub-and-spoke diagram -->
			<div class="sqe-diagram">
				<div class="sqe-hub">
					<div class="sqe-hub-inner">
						<span class="sqe-hub-icon">⚡</span>
						<span class="sqe-hub-name">S-Quantum<br/>Engine</span>
						<span class="sqe-hub-sub">Group AI Innovation Hub</span>
					</div>
				</div>
				<div class="sqe-spokes">
					{#each sQuantumModel.spokes as spoke}
						<div class="sqe-spoke" style="--sc: {spoke.color}">
							<div class="sqe-spoke-line"></div>
							<div class="sqe-spoke-node">
								<span class="sqe-spoke-icon">{spoke.icon}</span>
								<span class="sqe-spoke-label">{spoke.label}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="sqe-annotation">
				<div class="annotation-item">
					<span class="annotation-arrow">←</span>
					<span>Each company keeps a <strong>small IT team</strong> for daily operations</span>
				</div>
				<div class="annotation-item">
					<span class="annotation-arrow">→</span>
					<span>Big innovation projects flow through the <strong>central hub</strong> as Group Innovators</span>
				</div>
			</div>

			<!-- Benefits -->
			<div class="sqe-benefits" use:stagger>
				{#each sQuantumModel.benefits as b}
					<div class="sqe-benefit stagger-item">
						<div class="sqe-benefit-stat">{b.stat}</div>
						<div class="sqe-benefit-label">{b.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S9 — AI MEDTECH COMPANY
     ══════════════════════════════════════════════════ -->
<section id="medtech" class="section section-alt" use:trackSection={'medtech'}>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-tag">The Investable Entity</span>
			<h2 class="section-title">{aiMedTech.name}</h2>
			<p class="section-sub">{aiMedTech.tagline}</p>
		</div>

		<div class="medtech-intro" use:observe>
			<p>{aiMedTech.description}</p>
		</div>

		<!-- What it builds -->
		<div class="medtech-builds" use:stagger>
			{#each aiMedTech.builds as b}
				<div class="medtech-build-item stagger-item">
					<span class="build-icon">{b.icon}</span>
					<span class="build-text">{b.item}</span>
				</div>
			{/each}
		</div>

		<!-- Strategic partners -->
		<h3 class="medtech-partners-title" use:observe>Why NVIDIA and Global Investors Are Interested</h3>
		<div class="medtech-partners" use:stagger>
			{#each aiMedTech.strategicPartners as p}
				<div class="partner-card stagger-item" style="--partner-color: {p.color}">
					<div class="partner-icon">{p.icon}</div>
					<h4 class="partner-name">{p.name}</h4>
					<p class="partner-focus">{p.focus}</p>
				</div>
			{/each}
		</div>

		<!-- Comparables -->
		<div class="comparables-section" use:observe>
			<h3 class="comparables-title">Global Comparable Valuations</h3>
			<p class="comparables-sub">Pure-play AI MedTech companies are commanding major valuations. Mayapada's version has the advantage of captive hospital infrastructure, real patient data, and an ecosystem distribution network.</p>
			<div class="comparables-grid">
				{#each aiMedTech.comparables as comp}
					<div class="comparable-item">
						<span class="comp-name">{comp.name}</span>
						<span class="comp-raised">{comp.raised}</span>
						<span class="comp-focus">{comp.focus}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S10 — LEADERSHIP
     ══════════════════════════════════════════════════ -->
<section id="leadership" class="section" use:trackSection={'leadership'}>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-tag">The Team</span>
			<h2 class="section-title">Leadership</h2>
			<p class="section-sub">A family legacy of 40 years, combined with a new generation of AI-focused leadership and an experienced innovation architect.</p>
		</div>
		<div class="leaders-grid" use:stagger>
			{#each groupInfo.familyLeaders as leader, i}
				<div class="leader-card stagger-item">
					<div class="leader-num">{String(i + 1).padStart(2, '0')}</div>
					<h3 class="leader-name">{leader.name}</h3>
					<p class="leader-role">{leader.role}</p>
					<div class="leader-line"></div>
				</div>
			{/each}
			<!-- Architect card -->
			<div class="leader-card leader-architect stagger-item">
				<div class="leader-num">06</div>
				<h3 class="leader-name">{sQuantumModel.architect.name}</h3>
				<p class="leader-role">AI Strategy Architect</p>
				<p class="leader-context">Managing Director, Techconnect Academy — Sinarmas</p>
				<div class="leader-line gold"></div>
			</div>
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S11 — INVESTMENT THESIS
     ══════════════════════════════════════════════════ -->
<section id="thesis" class="section section-alt" use:trackSection={'thesis'}>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-tag">The Investment Thesis</span>
			<h2 class="section-title">Three Reasons This Wins</h2>
		</div>
		<div class="thesis-list">
			{#each investmentTheses as t}
				<div class="thesis-item" use:observe>
					<div class="thesis-number">{t.number}</div>
					<div class="thesis-body">
						<div class="thesis-header">
							<span class="thesis-icon">{t.icon}</span>
							<h3 class="thesis-title">{t.title}</h3>
						</div>
						<p class="thesis-desc">{t.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════
     S12 — CLOSING STATEMENT
     ══════════════════════════════════════════════════ -->
<section id="closing" class="closing-section" use:trackSection={'closing'}>
	<div class="closing-bg">
		<div class="closing-rays">
			{#each Array(8) as _, i}
				<div class="ray" style="--a:{i * 45}deg; --d:{i * 0.3}s"></div>
			{/each}
		</div>
	</div>
	<div class="container">
		<div class="closing-content" use:observe>
			<div class="closing-divider">
				<span class="divider-gem">◆</span>
			</div>
			<h2 class="closing-title">
				The empire is built.<br/>
				The intelligence is next.
			</h2>
			<p class="closing-body">
				For nearly four decades, Mayapada Group has earned the trust of millions of Indonesians
				through banking, healing, building, hosting, and informing. That trust — combined with
				the AI MedTech Company, the S-Quantum Engine model, and the full weight of the group's
				infrastructure — creates something no capital alone can manufacture:
				<em>an AI ecosystem with an unassailable head start.</em>
			</p>
			<p class="closing-vision">
				The goal is not to build Indonesia's best AI company. It is to make the Mayapada Group
				the most intelligent institution in Southeast Asia — sector by sector, year by year, compounding
				with every data point generated across 40+ companies and 278 million lives.
			</p>
			<div class="closing-footer">
				<span class="closing-year">Est. {groupInfo.founded}</span>
				<span class="closing-sep">·</span>
				<span>{groupInfo.headquarters}</span>
				<span class="closing-sep">·</span>
				<a href="/" class="closing-link">View Full Showcase →</a>
			</div>
			<div class="footer-credit">
				Edmund Situmorang · AI Innovator and Technology Builder
			</div>
		</div>
	</div>
</section>

<style>
	/* ═══════════════════════════════════════════════
	   HEADER
	   ═══════════════════════════════════════════════ */
	.inv-header {
		position: fixed;
		top: 0; left: 0; right: 0;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		height: 60px;
		background: transparent;
		transition: background 0.4s ease, border-color 0.4s ease;
		border-bottom: 1px solid transparent;
	}

	.inv-header.blurred {
		background: rgba(6, 6, 14, 0.85);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-color: rgba(212, 175, 55, 0.1);
	}

	:global([data-theme='light']) .inv-header.blurred {
		background: rgba(244, 241, 235, 0.9);
	}

	.inv-brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		flex-shrink: 0;
	}

	.inv-logo {
		width: 32px; height: 32px;
		display: flex; align-items: center; justify-content: center;
		font-family: var(--font-display);
		font-weight: 700; font-size: 1rem;
		color: var(--gold);
		border: 1px solid var(--gold-dim);
		border-radius: 6px;
	}

	.inv-brand-label {
		font-size: 0.85rem;
		color: var(--text-primary);
		font-weight: 500;
	}

	.inv-brand-label span {
		color: var(--text-muted);
		font-weight: 400;
	}

	.inv-nav {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.inv-nav-link {
		background: none;
		border: none;
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
		padding: 0.3rem 0.6rem;
		border-radius: 4px;
		transition: all 0.25s ease;
	}

	.inv-nav-link:hover,
	.inv-nav-link.active {
		color: var(--gold);
		background: rgba(212, 175, 55, 0.08);
	}

	.inv-header-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-shrink: 0;
	}

	.theme-toggle {
		background: none;
		border: 1px solid rgba(212, 175, 55, 0.2);
		border-radius: 6px;
		width: 34px; height: 34px;
		display: flex; align-items: center; justify-content: center;
		cursor: pointer;
		color: var(--text-secondary);
		transition: all 0.3s ease;
	}

	.theme-toggle:hover {
		border-color: var(--gold);
		color: var(--gold);
	}

	.inv-showcase-link {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--gold);
		text-decoration: none;
		transition: opacity 0.2s;
	}

	.inv-showcase-link:hover { opacity: 0.7; }

	/* ═══════════════════════════════════════════════
	   SHARED LAYOUT
	   ═══════════════════════════════════════════════ */
	.container {
		max-width: 1160px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.section {
		padding: clamp(5rem, 10vh, 8rem) 0;
	}

	.section-alt {
		background: rgba(255,255,255,0.015);
	}

	:global([data-theme='light']) .section-alt {
		background: rgba(0,0,0,0.025);
	}

	.section-header {
		text-align: center;
		margin-bottom: clamp(2.5rem, 5vh, 4rem);
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth);
	}

	.section-header:global(.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	.section-tag {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 0.75rem;
		position: relative;
		padding: 0 1rem;
	}

	.section-tag::before,
	.section-tag::after {
		content: '';
		position: absolute;
		top: 50%; width: 28px; height: 1px;
		background: var(--gold-dim);
	}

	.section-tag::before { right: 100%; }
	.section-tag::after { left: 100%; }

	.section-title {
		font-family: var(--font-display);
		font-size: clamp(1.8rem, 3.5vw, 2.8rem);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
	}

	.section-sub {
		font-size: 1rem;
		color: var(--text-secondary);
		max-width: 580px;
		margin: 0 auto;
		line-height: 1.75;
	}

	/* Reveal animation */
	.stagger-item {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.55s var(--ease-smooth), transform 0.55s var(--ease-smooth);
	}

	.stagger-item:global(.stagger-visible) {
		opacity: 1;
		transform: translateY(0);
	}

	/* ═══════════════════════════════════════════════
	   COVER
	   ═══════════════════════════════════════════════ */
	.cover-section {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.cover-bg {
		position: absolute;
		inset: 0;
	}

	.cover-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
	}

	.cover-radial {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.05) 0%, transparent 60%);
	}

	.cover-content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 8rem 2rem 4rem;
		max-width: 900px;
		width: 100%;
	}

	.cover-tag {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--gold-dim);
		margin-bottom: 2rem;
		opacity: 0;
		transition: opacity 0.8s ease 0.2s;
	}

	.cover-tag:global(.in-view) { opacity: 1; }

	.cover-title {
		font-family: var(--font-display);
		font-size: clamp(2.2rem, 5.5vw, 4.5rem);
		font-weight: 700;
		line-height: 1.15;
		color: var(--text-primary);
		margin-bottom: 1.5rem;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.9s var(--ease-smooth) 0.3s, transform 0.9s var(--ease-smooth) 0.3s;
	}

	.cover-title:global(.in-view) { opacity: 1; transform: translateY(0); }
	.cover-title em { color: var(--gold); font-style: italic; }

	.cover-sub {
		font-size: clamp(0.95rem, 1.5vw, 1.1rem);
		color: var(--text-secondary);
		line-height: 1.75;
		max-width: 640px;
		margin: 0 auto 3rem;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.9s var(--ease-smooth) 0.5s, transform 0.9s var(--ease-smooth) 0.5s;
	}

	.cover-sub:global(.in-view) { opacity: 1; transform: translateY(0); }

	.cover-metrics {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
		margin-bottom: 4rem;
	}

	.cover-metric { text-align: center; }

	.cover-metric-value {
		display: block;
		font-family: var(--font-mono);
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		font-weight: 600;
		color: var(--gold);
	}

	.cover-metric-label {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--text-muted);
		margin-top: 0.3rem;
		display: block;
	}

	.cover-metric-sep {
		width: 1px;
		height: 36px;
		background: rgba(212,175,55,0.2);
	}

	.cover-scroll-cue {
		color: var(--gold-dim);
		animation: bounce 2s ease-in-out infinite;
	}

	@keyframes bounce {
		0%,100% { transform: translateY(0); opacity: 0.4; }
		50% { transform: translateY(8px); opacity: 1; }
	}

	/* ═══════════════════════════════════════════════
	   PROBLEM SECTION
	   ═══════════════════════════════════════════════ */
	.problem-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.problem-card {
		background: var(--bg-card);
		border: 1px solid rgba(255,255,255,0.05);
		border-top: 3px solid var(--gold);
		border-radius: 12px;
		padding: 2rem 1.75rem;
		transition: transform 0.3s var(--ease-smooth);
	}

	.problem-card:hover { transform: translateY(-4px); }

	.problem-stat {
		font-family: var(--font-mono);
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 700;
		color: var(--gold);
		line-height: 1;
		margin-bottom: 0.5rem;
	}

	.problem-label {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 1rem;
	}

	.problem-insight {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.65;
	}

	.opportunity-summary {
		text-align: center;
		font-size: 1.05rem;
		color: var(--text-secondary);
		max-width: 680px;
		margin: 0 auto;
		line-height: 1.75;
		opacity: 0;
		transform: translateY(16px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}

	.opportunity-summary:global(.in-view) { opacity: 1; transform: translateY(0); }
	.opportunity-summary strong { color: var(--text-primary); }

	/* ═══════════════════════════════════════════════
	   MOAT PILLARS
	   ═══════════════════════════════════════════════ */
	.moat-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.moat-card {
		background: var(--bg-card);
		border: 1px solid rgba(255,255,255,0.05);
		border-radius: 14px;
		padding: 2rem;
		position: relative;
		overflow: hidden;
		transition: all 0.35s var(--ease-smooth);
	}

	.moat-card::before {
		content: '';
		position: absolute;
		left: 0; top: 0; bottom: 0;
		width: 3px;
		background: linear-gradient(180deg, var(--gold) 0%, transparent 100%);
		opacity: 0;
		transition: opacity 0.35s;
	}

	.moat-card:hover::before { opacity: 1; }
	.moat-card:hover {
		background: var(--bg-card-hover);
		border-color: rgba(212,175,55,0.15);
		transform: translateX(4px);
	}

	.moat-icon { font-size: 2rem; margin-bottom: 1rem; }

	.moat-title {
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
	}

	.moat-desc {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.65;
		margin-bottom: 1rem;
	}

	.moat-proof {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--gold);
		line-height: 1.5;
	}

	.proof-dot {
		width: 5px; height: 5px;
		background: var(--gold);
		border-radius: 50%;
		flex-shrink: 0;
		margin-top: 0.4em;
	}

	/* ═══════════════════════════════════════════════
	   STRATEGY COLUMNS
	   ═══════════════════════════════════════════════ */
	.strategy-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	.strategy-col {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth);
	}

	.strategy-col:global(.in-view) { opacity: 1; transform: translateY(0); }

	.strategy-col-title {
		font-family: var(--font-display);
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 1.5rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid rgba(212,175,55,0.15);
	}

	.strategy-reasons {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.strategy-reasons li {
		display: flex;
		gap: 1rem;
	}

	.reason-num {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--gold);
		flex-shrink: 0;
		margin-top: 0.1em;
		letter-spacing: 0.05em;
	}

	.strategy-reasons strong {
		display: block;
		font-size: 0.95rem;
		color: var(--text-primary);
		margin-bottom: 0.3rem;
	}

	.strategy-reasons p {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Flywheel Diagram */
	.flywheel {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.flywheel-center {
		background: linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04));
		border: 1px solid rgba(16,185,129,0.25);
		border-radius: 12px;
		padding: 1.25rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}

	.flywheel-center-icon { font-size: 1.5rem; }

	.flywheel-center-label {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: #10b981;
	}

	.flywheel-center-sub {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.flywheel-spokes {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-left: 1.5rem;
		position: relative;
	}

	.flywheel-spokes::before {
		content: '';
		position: absolute;
		left: 0.65rem;
		top: 0.5rem;
		bottom: 0.5rem;
		width: 2px;
		background: linear-gradient(180deg, #10b981 0%, rgba(212,175,55,0.3) 100%);
	}

	.spoke {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.spoke-connector {
		width: 20px;
		height: 1px;
		background: rgba(212,175,55,0.3);
		flex-shrink: 0;
	}

	.spoke-node {
		flex: 1;
		background: var(--bg-card);
		border: 1px solid rgba(var(--c, 255 255 255), 0.15);
		border-radius: 8px;
		padding: 0.7rem 1rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		transition: all 0.3s ease;
	}

	.spoke-node:hover {
		background: var(--bg-card-hover);
		transform: translateX(3px);
	}

	.spoke-node span { font-size: 1.1rem; }
	.spoke-node strong {
		font-size: 0.85rem;
		color: var(--text-primary);
		white-space: nowrap;
	}

	.spoke-node p {
		font-size: 0.75rem;
		color: var(--text-muted);
		margin: 0;
		line-height: 1.4;
	}

	/* ═══════════════════════════════════════════════
	   MARKET CARDS
	   ═══════════════════════════════════════════════ */
	.market-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
	}

	.market-card {
		background: var(--bg-card);
		border: 1px solid rgba(var(--mc-rgb), 0.15);
		border-top: 3px solid var(--mc);
		border-radius: 12px;
		padding: 1.75rem 1.5rem;
		transition: all 0.35s var(--ease-smooth);
	}

	.market-card:hover {
		transform: translateY(-5px);
		border-color: rgba(var(--mc-rgb), 0.35);
		box-shadow: 0 16px 48px rgba(0,0,0,0.2);
	}

	.market-sector {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--mc);
		margin-bottom: 0.75rem;
	}

	.market-tam {
		font-family: var(--font-mono);
		font-size: clamp(1.8rem, 3vw, 2.5rem);
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1;
		margin-bottom: 0.4rem;
	}

	.market-tam-label {
		font-size: 0.78rem;
		color: var(--text-secondary);
		line-height: 1.4;
		margin-bottom: 0.75rem;
	}

	.market-cagr-row { margin-bottom: 0.75rem; }

	.market-cagr {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		background: rgba(var(--mc-rgb), 0.12);
		color: var(--mc);
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
	}

	.market-insight {
		font-size: 0.78rem;
		color: var(--text-muted);
		line-height: 1.55;
		font-style: italic;
	}

	/* ═══════════════════════════════════════════════
	   ROADMAP
	   ═══════════════════════════════════════════════ */
	.roadmap-legend {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		margin-bottom: 3rem;
		opacity: 0;
		transition: opacity 0.6s ease;
	}

	.roadmap-legend:global(.in-view) { opacity: 1; }

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.legend-dot {
		width: 8px; height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.roadmap-timeline {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.roadmap-phase {
		display: flex;
		gap: 2rem;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.65s var(--ease-smooth), transform 0.65s var(--ease-smooth);
	}

	.roadmap-phase:global(.in-view) { opacity: 1; transform: translateY(0); }

	.phase-rail {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		padding-top: 0.25rem;
	}

	.phase-dot {
		width: 14px; height: 14px;
		border-radius: 50%;
		background: var(--pc, var(--gold));
		box-shadow: 0 0 12px var(--pc, var(--gold));
		flex-shrink: 0;
	}

	.phase-line {
		width: 2px;
		flex: 1;
		min-height: 40px;
		background: linear-gradient(180deg, var(--pc, var(--gold)), rgba(212,175,55,0.15));
		margin: 6px 0;
	}

	.phase-content {
		padding-bottom: 2.5rem;
		flex: 1;
	}

	.phase-meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-bottom: 0.75rem;
	}

	.phase-num {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.phase-timeframe {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-secondary);
		background: rgba(255,255,255,0.05);
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
	}

	.phase-sector {
		font-size: 0.75rem;
		font-weight: 500;
	}

	.phase-status {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.15rem 0.5rem;
		border-radius: 20px;
	}

	.status-beachhead { background: rgba(16,185,129,0.12); color: #10b981; }
	.status-expansion { background: rgba(59,130,246,0.12); color: #3b82f6; }
	.status-scale { background: rgba(212,175,55,0.12); color: var(--gold); }

	.phase-title {
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.phase-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.65;
		margin-bottom: 0.75rem;
	}

	.phase-milestones {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.phase-milestones li {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		padding-left: 1rem;
		position: relative;
	}

	.phase-milestones li::before {
		content: '→';
		position: absolute;
		left: 0;
		color: var(--pc, var(--gold));
	}

	/* ═══════════════════════════════════════════════
	   COMPARISON TABLE
	   ═══════════════════════════════════════════════ */
	.comparison-wrapper {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);
	}

	.comparison-wrapper:global(.in-view) { opacity: 1; transform: translateY(0); }

	.comparison-grid {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 1.5rem;
		max-width: 860px;
		margin: 0 auto;
	}

	.comparison-col { display: flex; flex-direction: column; gap: 0.6rem; }

	.comparison-label {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.comparison-label.gold { color: var(--gold); }

	.comparison-divider {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 0.5rem;
	}

	.comparison-divider span {
		font-family: var(--font-display);
		font-size: 0.9rem;
		font-style: italic;
		color: var(--text-muted);
		writing-mode: vertical-rl;
		letter-spacing: 0.1em;
	}

	.comparison-row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 0.8rem;
		border-radius: 6px;
		background: var(--bg-card);
		border: 1px solid rgba(255,255,255,0.04);
		font-size: 0.82rem;
		color: var(--text-muted);
	}

	.comparison-row.has {
		color: var(--text-secondary);
	}

	.comparison-right .comparison-row {
		background: rgba(212,175,55,0.04);
		border-color: rgba(212,175,55,0.08);
	}

	.cmp-icon { font-size: 0.85rem; flex-shrink: 0; color: var(--text-muted); }
	.cmp-icon.gold { color: var(--gold); }
	.comparison-row.has .cmp-icon:not(.gold) { color: #10b981; }

	/* ═══════════════════════════════════════════════
	   S-QUANTUM ENGINE
	   ═══════════════════════════════════════════════ */
	.architect-card {
		background: linear-gradient(135deg, rgba(212,175,55,0.06) 0%, var(--bg-card) 60%);
		border: 1px solid rgba(212,175,55,0.2);
		border-radius: 16px;
		padding: 2rem 2.5rem;
		margin-bottom: 3rem;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 2rem;
		align-items: start;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth);
	}

	.architect-card:global(.in-view) { opacity: 1; transform: translateY(0); }

	.architect-badge {
		grid-column: 1 / -1;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: -1rem;
	}

	.architect-info { display: flex; flex-direction: column; gap: 0.25rem; }

	.architect-name {
		font-family: var(--font-display);
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.architect-title {
		font-size: 0.85rem;
		color: var(--gold);
	}

	.architect-role {
		font-size: 0.82rem;
		color: var(--text-secondary);
	}

	.architect-quote {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 0.95rem;
		color: var(--text-secondary);
		line-height: 1.7;
		padding-left: 1.25rem;
		border-left: 2px solid var(--gold-dim);
	}

	.sqe-section {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth);
	}

	.sqe-section:global(.in-view) { opacity: 1; transform: translateY(0); }

	.sqe-title {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
	}

	.sqe-desc {
		font-size: 0.95rem;
		color: var(--text-secondary);
		line-height: 1.7;
		max-width: 680px;
		margin-bottom: 2.5rem;
	}

	/* Hub-spoke diagram */
	.sqe-diagram {
		display: flex;
		align-items: center;
		gap: 2rem;
		background: var(--bg-card);
		border: 1px solid rgba(212,175,55,0.1);
		border-radius: 16px;
		padding: 2rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.sqe-hub {
		flex-shrink: 0;
		width: 130px; height: 130px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 70%);
		border: 2px solid rgba(212,175,55,0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 40px rgba(212,175,55,0.08);
	}

	.sqe-hub-inner {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.sqe-hub-icon { font-size: 1.5rem; }
	.sqe-hub-name {
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--gold);
		line-height: 1.2;
	}

	.sqe-hub-sub {
		font-family: var(--font-mono);
		font-size: 0.55rem;
		color: var(--text-muted);
		letter-spacing: 0.05em;
	}

	.sqe-spokes {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	.sqe-spoke { display: flex; flex-direction: column; gap: 0.3rem; }

	.sqe-spoke-line {
		width: 100%; height: 1px;
		background: linear-gradient(90deg, rgba(212,175,55,0.3), var(--sc, #d4af37));
	}

	.sqe-spoke-node {
		background: rgba(var(--sc, 212 175 55), 0.07);
		border: 1px solid rgba(var(--sc, 212 175 55), 0.18);
		border-radius: 8px;
		padding: 0.6rem 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.sqe-spoke-icon { font-size: 1rem; }
	.sqe-spoke-label { font-size: 0.78rem; color: var(--text-secondary); font-weight: 500; }

	.sqe-annotation {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin-bottom: 2rem;
	}

	.annotation-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.annotation-arrow {
		font-family: var(--font-mono);
		color: var(--gold);
		flex-shrink: 0;
	}

	.annotation-item strong { color: var(--text-primary); }

	.sqe-benefits {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.sqe-benefit {
		text-align: center;
		background: var(--bg-card);
		border: 1px solid rgba(212,175,55,0.1);
		border-radius: 10px;
		padding: 1.5rem 1rem;
	}

	.sqe-benefit-stat {
		font-family: var(--font-mono);
		font-size: 1.8rem;
		font-weight: 600;
		color: var(--gold);
		margin-bottom: 0.4rem;
	}

	.sqe-benefit-label {
		font-size: 0.78rem;
		color: var(--text-secondary);
		line-height: 1.4;
	}

	/* ═══════════════════════════════════════════════
	   AI MEDTECH
	   ═══════════════════════════════════════════════ */
	.medtech-intro {
		text-align: center;
		max-width: 700px;
		margin: 0 auto 2.5rem;
		opacity: 0;
		transform: translateY(16px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}

	.medtech-intro:global(.in-view) { opacity: 1; transform: translateY(0); }

	.medtech-intro p {
		font-size: 1.05rem;
		color: var(--text-secondary);
		line-height: 1.75;
	}

	.medtech-builds {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		margin-bottom: 3rem;
	}

	.medtech-build-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: var(--bg-card);
		border: 1px solid rgba(16,185,129,0.1);
		border-radius: 8px;
		padding: 0.9rem 1.1rem;
		font-size: 0.88rem;
		color: var(--text-secondary);
	}

	.build-icon { font-size: 1.2rem; flex-shrink: 0; }

	.medtech-partners-title {
		font-family: var(--font-display);
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--text-primary);
		text-align: center;
		margin-bottom: 1.5rem;
		opacity: 0;
		transform: translateY(16px);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}

	.medtech-partners-title:global(.in-view) { opacity: 1; transform: translateY(0); }

	.medtech-partners {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin-bottom: 3rem;
	}

	.partner-card {
		background: var(--bg-card);
		border: 1px solid rgba(255,255,255,0.05);
		border-radius: 12px;
		padding: 1.75rem;
		text-align: center;
		transition: all 0.35s var(--ease-smooth);
		position: relative;
		overflow: hidden;
	}

	.partner-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--partner-color, var(--gold));
		opacity: 0.6;
	}

	.partner-card:hover {
		transform: translateY(-4px);
		border-color: rgba(var(--partner-color-rgb, 212 175 55), 0.2);
	}

	.partner-icon { font-size: 2rem; margin-bottom: 0.75rem; }
	.partner-name {
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--partner-color, var(--text-primary));
		margin-bottom: 0.6rem;
	}

	.partner-focus {
		font-size: 0.82rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.comparables-section {
		background: var(--bg-card);
		border: 1px solid rgba(212,175,55,0.1);
		border-radius: 14px;
		padding: 2rem 2.5rem;
		opacity: 0;
		transform: translateY(16px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}

	.comparables-section:global(.in-view) { opacity: 1; transform: translateY(0); }

	.comparables-title {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.6rem;
	}

	.comparables-sub {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.65;
		margin-bottom: 1.25rem;
	}

	.comparables-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.comparable-item {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.9rem;
		background: rgba(212,175,55,0.04);
		border-radius: 8px;
		border: 1px solid rgba(212,175,55,0.08);
	}

	.comp-name {
		font-family: var(--font-display);
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.comp-raised {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--gold);
	}

	.comp-focus {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	/* ═══════════════════════════════════════════════
	   LEADERSHIP
	   ═══════════════════════════════════════════════ */
	.leaders-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1.25rem;
	}

	.leader-card {
		background: var(--bg-card);
		border: 1px solid rgba(212,175,55,0.08);
		border-radius: 12px;
		padding: 1.75rem 1.5rem;
		text-align: center;
		transition: all 0.35s var(--ease-smooth);
		position: relative;
		overflow: hidden;
	}

	.leader-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--gold), transparent);
		opacity: 0;
		transition: opacity 0.35s;
	}

	.leader-card:hover::before { opacity: 1; }
	.leader-card:hover { background: var(--bg-card-hover); transform: translateY(-3px); }

	.leader-architect {
		border-color: rgba(212,175,55,0.2);
		background: rgba(212,175,55,0.03);
	}

	.leader-num {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--gold-dim);
		margin-bottom: 0.75rem;
		letter-spacing: 0.1em;
	}

	.leader-name {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.4rem;
	}

	.leader-role {
		font-size: 0.78rem;
		color: var(--text-secondary);
		line-height: 1.4;
	}

	.leader-context {
		font-size: 0.72rem;
		color: var(--text-muted);
		font-style: italic;
		margin-top: 0.3rem;
		line-height: 1.4;
	}

	.leader-line {
		width: 28px; height: 2px;
		background: var(--gold-dim);
		margin: 0.9rem auto 0;
		border-radius: 1px;
	}

	.leader-line.gold { background: var(--gold); }

	/* ═══════════════════════════════════════════════
	   INVESTMENT THESIS
	   ═══════════════════════════════════════════════ */
	.thesis-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.thesis-item {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
		background: var(--bg-card);
		border: 1px solid rgba(212,175,55,0.1);
		border-left: 3px solid var(--gold);
		border-radius: 0 14px 14px 0;
		padding: 2rem;
		opacity: 0;
		transform: translateX(-20px);
		transition: opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth);
	}

	.thesis-item:global(.in-view) { opacity: 1; transform: translateX(0); }

	.thesis-number {
		font-family: var(--font-mono);
		font-size: 2.2rem;
		font-weight: 700;
		color: rgba(212,175,55,0.2);
		flex-shrink: 0;
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.thesis-body { flex: 1; }

	.thesis-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.thesis-icon { font-size: 1.3rem; }

	.thesis-title {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.thesis-desc {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	/* ═══════════════════════════════════════════════
	   CLOSING
	   ═══════════════════════════════════════════════ */
	.closing-section {
		position: relative;
		padding: clamp(6rem, 14vh, 10rem) 0;
		overflow: hidden;
	}

	.closing-bg {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.closing-rays {
		position: relative;
		width: 600px;
		height: 600px;
	}

	.ray {
		position: absolute;
		top: 50%; left: 50%;
		width: 300px; height: 1px;
		background: linear-gradient(90deg, rgba(212,175,55,0.1), transparent);
		transform-origin: left center;
		transform: rotate(var(--a));
		animation: rayPulse 5s var(--d) ease-in-out infinite;
	}

	@keyframes rayPulse {
		0%,100% { opacity: 0.2; width: 200px; }
		50% { opacity: 0.6; width: 320px; }
	}

	.closing-content {
		position: relative;
		text-align: center;
		max-width: 760px;
		margin: 0 auto;
		padding: 0 2rem;
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 1s var(--ease-smooth), transform 1s var(--ease-smooth);
	}

	.closing-content:global(.in-view) { opacity: 1; transform: translateY(0); }

	.closing-divider {
		margin-bottom: 2rem;
		color: var(--gold);
		font-size: 0.8rem;
		animation: pulse 3s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,100% { opacity: 0.5; }
		50% { opacity: 1; }
	}

	.closing-title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3.2rem);
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.25;
		margin-bottom: 2rem;
	}

	.closing-body {
		font-size: 1.05rem;
		color: var(--text-secondary);
		line-height: 1.8;
		margin-bottom: 1.5rem;
	}

	.closing-body em { color: var(--gold-light); font-style: italic; }

	.closing-vision {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1rem;
		color: var(--text-muted);
		line-height: 1.75;
		margin-bottom: 3rem;
	}

	.closing-footer {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.closing-year, .closing-footer span:not(.closing-sep) {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		color: var(--text-muted);
	}

	.closing-sep { color: var(--gold-dim); }

	.closing-link {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		color: var(--gold);
		text-decoration: none;
		transition: opacity 0.2s;
	}

	.closing-link:hover { opacity: 0.7; }

	.footer-credit {
		margin-top: 2rem;
		padding: 0.6rem 0.9rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		color: var(--text-muted);
		background: rgba(212, 175, 55, 0.06);
		border-radius: 4px;
		display: inline-block;
		margin-left: 50%;
		transform: translateX(-50%);
	}

	/* ═══════════════════════════════════════════════
	   RESPONSIVE
	   ═══════════════════════════════════════════════ */
	@media (max-width: 1100px) {
		.market-grid { grid-template-columns: 1fr 1fr; }
	}

	@media (max-width: 900px) {
		.inv-nav { display: none; }
		.problem-grid { grid-template-columns: 1fr; }
		.moat-grid { grid-template-columns: 1fr; }
		.strategy-columns { grid-template-columns: 1fr; gap: 2.5rem; }
		.market-grid { grid-template-columns: 1fr 1fr; }
		.comparison-grid { grid-template-columns: 1fr; }
		.comparison-divider { writing-mode: horizontal-tb; padding: 0.5rem 0; }
		.comparison-divider span { writing-mode: horizontal-tb; }
		.architect-card { grid-template-columns: 1fr; }
		.sqe-spokes { grid-template-columns: repeat(2, 1fr); }
		.medtech-builds { grid-template-columns: 1fr; }
		.medtech-partners { grid-template-columns: 1fr; }
		.comparables-grid { grid-template-columns: 1fr; }
		.sqe-benefits { grid-template-columns: 1fr; }
		.sqe-diagram { flex-direction: column; }
		.sqe-hub { width: 110px; height: 110px; }
	}

	@media (max-width: 600px) {
		.inv-header { padding: 0 1rem; }
		.inv-brand-label span { display: none; }
		.market-grid { grid-template-columns: 1fr; }
		.leaders-grid { grid-template-columns: 1fr 1fr; }
		.cover-metrics { gap: 1rem; }
		.cover-metric-sep { display: none; }
		.thesis-item { flex-direction: column; gap: 0.75rem; }
		.thesis-number { font-size: 1.5rem; }
	}
</style>
