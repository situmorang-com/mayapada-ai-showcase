<script lang="ts">
	import { onMount } from 'svelte';
	import { sectors, groupInfo } from '$lib/data';

	// ─── State ──────────────────────────────────────
	let curtainOpen = $state(false);
	let heroVisible = $state(false);
	let currentScene = $state(-1);
	let scrollY = $state(0);
	let isDark = $state(true);

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
	}

	// ─── Intersection Observer for scroll reveals ───
	function observe(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						node.classList.add('in-view');
					}
				});
			},
			{ threshold: 0.15, rootMargin: '-5% 0px' }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	// ─── Scene tracking observer ────────────────────
	function trackScene(node: HTMLElement, sceneIndex: number) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						currentScene = sceneIndex;
					}
				});
			},
			{ threshold: 0.3 }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	// ─── Animated counter ───────────────────────────
	function animateCounter(node: HTMLElement, target: number) {
		let started = false;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !started) {
						started = true;
						const duration = 2000;
						const startTime = performance.now();
						function update(currentTime: number) {
							const elapsed = currentTime - startTime;
							const progress = Math.min(elapsed / duration, 1);
							const eased = 1 - Math.pow(1 - progress, 3);
							node.textContent = Math.round(eased * target).toString();
							if (progress < 1) requestAnimationFrame(update);
						}
						requestAnimationFrame(update);
					}
				});
			},
			{ threshold: 0.5 }
		);
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}

	// ─── Stagger children animation ─────────────────
	function staggerChildren(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const children = node.children;
						Array.from(children).forEach((child, i) => {
							setTimeout(() => {
								(child as HTMLElement).classList.add('stagger-visible');
							}, i * 150);
						});
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.1 }
		);
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}

	// ─── Lifecycle ──────────────────────────────────
	onMount(() => {
		document.documentElement.setAttribute('data-theme', 'dark');
		setTimeout(() => {
			curtainOpen = true;
		}, 800);
		setTimeout(() => {
			heroVisible = true;
		}, 2200);
	});

	function scrollToScene(index: number) {
		const id = index === -1 ? 'hero' : index === sectors.length ? 'finale' : sectors[index]?.id;
		if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	let allSceneIds = $derived([
		{ id: 'hero', label: 'Overture' },
		...sectors.map((s) => ({ id: s.id, label: s.act })),
		{ id: 'finale', label: 'Finale' }
	]);
</script>

<svelte:window bind:scrollY={scrollY} />

<svelte:head>
	<title>Mayapada AI Initiatives</title>
	<meta name="description" content="Mayapada AI Initiatives is a strategic portfolio of high-impact AI programs across financial services, healthcare, property, hospitality, retail, and media to drive measurable business transformation." />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Mayapada AI Initiatives" />
	<meta property="og:title" content="Mayapada AI Initiatives" />
	<meta property="og:description" content="Mayapada AI Initiatives is a strategic portfolio of high-impact AI programs across financial services, healthcare, property, hospitality, retail, and media to drive measurable business transformation." />
	<meta property="og:url" content="https://mayapada.situmorang.com" />
	<meta property="og:image" content="https://mayapada.situmorang.com/og-mayapada-ai-initiatives.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Mayapada AI Initiatives logo and brand card" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Mayapada AI Initiatives" />
	<meta name="twitter:description" content="Mayapada AI Initiatives is a strategic portfolio of high-impact AI programs across financial services, healthcare, property, hospitality, retail, and media to drive measurable business transformation." />
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

<!-- ════════════════════════════════════════════════
     THEATRICAL CURTAIN
     ════════════════════════════════════════════════ -->
<div class="curtain" class:open={curtainOpen}>
	<div class="curtain-panel curtain-left">
		<div class="curtain-fold"></div>
		<div class="curtain-fold"></div>
		<div class="curtain-fold"></div>
	</div>
	<div class="curtain-panel curtain-right">
		<div class="curtain-fold"></div>
		<div class="curtain-fold"></div>
		<div class="curtain-fold"></div>
	</div>
	<div class="curtain-valance"></div>
</div>

<!-- ════════════════════════════════════════════════
     SCENE NAVIGATION
     ════════════════════════════════════════════════ -->
{#if curtainOpen}
	<button
		class="theme-toggle"
		class:visible={heroVisible}
		onclick={toggleTheme}
		aria-label="Toggle theme"
	>
		{#if isDark}
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
				<circle cx="12" cy="12" r="5"/>
				<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
				<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
			</svg>
		{:else}
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
			</svg>
		{/if}
	</button>

	<nav class="scene-nav" class:visible={heroVisible} aria-label="Scene Navigation">
		<div class="scene-nav-track">
			<div
				class="scene-nav-progress"
				style="height: {((currentScene + 1) / (sectors.length + 1)) * 100}%"
			></div>
		</div>
		{#each allSceneIds as scene, i}
			<button
				class="scene-dot"
				class:active={currentScene === i - 1}
				onclick={() => scrollToScene(i - 1)}
				aria-label="Go to {scene.label}"
			>
				<span class="scene-dot-label">{scene.label}</span>
			</button>
		{/each}
	</nav>
{/if}

<!-- ════════════════════════════════════════════════
     HERO SCENE — Overture
     ════════════════════════════════════════════════ -->
<section id="hero" class="hero" use:trackScene={-1}>
	<div class="hero-bg">
		<div class="hero-grid"></div>
		<div class="hero-radial"></div>
		<div class="hero-particles">
			{#each Array(20) as _, i}
				<div
					class="particle"
					style="
						--x: {5 + (i * 37 + 13) % 90}%;
						--y: {5 + (i * 53 + 7) % 90}%;
						--duration: {3 + (i % 5)}s;
						--delay: {(i % 7) * 0.7}s;
						--size: {2 + (i % 4)}px;
					"
				></div>
			{/each}
		</div>
	</div>

	<div class="hero-content" class:visible={heroVisible}>
		<div class="hero-overline">
			<span class="overline-line"></span>
			<span class="overline-text">Established {groupInfo.founded}</span>
			<span class="overline-line"></span>
		</div>

		<h1 class="hero-title">
			<span class="title-word" style="--delay: 0.1s">MAYAPADA</span>
			<span class="title-word" style="--delay: 0.3s">GROUP</span>
		</h1>

		<div class="hero-divider">
			<span class="divider-diamond">&#9670;</span>
		</div>

		<p class="hero-subtitle">
			Where Tradition Meets <em>Tomorrow's Intelligence</em>
		</p>

		<div class="hero-stats">
			<div class="hero-stat">
				<span class="hero-stat-value">{groupInfo.netWorth}</span>
				<span class="hero-stat-label">Net Worth</span>
			</div>
			<div class="hero-stat-sep"></div>
			<div class="hero-stat">
				<span class="hero-stat-value">{groupInfo.totalCompanies}+</span>
				<span class="hero-stat-label">Companies</span>
			</div>
			<div class="hero-stat-sep"></div>
			<div class="hero-stat">
				<span class="hero-stat-value">{groupInfo.publicEntities}</span>
				<span class="hero-stat-label">Public Listings</span>
			</div>
			<div class="hero-stat-sep"></div>
			<div class="hero-stat">
				<span class="hero-stat-value">6</span>
				<span class="hero-stat-label">Industry Sectors</span>
			</div>
		</div>

		<p class="hero-description">
			Founded by <strong>Dato' Sri Prof. Dr. Tahir</strong>, the Mayapada Group has grown from
			a textile manufacturer into one of Indonesia's most influential conglomerates. This
			experience explores how <em>Artificial Intelligence</em> can unlock the next chapter of
			transformation across every sector of the empire.
		</p>

		<div class="hero-scroll-cue">
			<span>Scroll to begin</span>
			<div class="scroll-arrow">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M12 5v14M5 12l7 7 7-7" />
				</svg>
			</div>
		</div>
	</div>
</section>

<!-- ════════════════════════════════════════════════
     FAMILY LEADERSHIP
     ════════════════════════════════════════════════ -->
<section class="leadership-section" use:observe>
	<div class="container">
		<div class="section-header" use:observe>
			<span class="section-label">The Architects</span>
			<h2 class="section-title">A Family of Visionaries</h2>
			<p class="section-desc">
				Five members of the Tahir family lead distinct verticals of the Mayapada empire, each
				bringing unique vision and expertise to their domain.
			</p>
		</div>
		<div class="leaders-grid" use:staggerChildren>
			{#each groupInfo.familyLeaders as leader, i}
				<div class="leader-card stagger-item">
					<div class="leader-index">{String(i + 1).padStart(2, '0')}</div>
					<h3 class="leader-name">{leader.name}</h3>
					<p class="leader-role">{leader.role}</p>
					<div class="leader-line"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ════════════════════════════════════════════════
     SECTOR SCENES — Acts I through VI
     ════════════════════════════════════════════════ -->
{#each sectors as sector, sectorIndex}
	<section
		id={sector.id}
		class="sector-scene"
		style="--sector-color: {sector.color}; --sector-rgb: {sector.colorRgb};"
		use:trackScene={sectorIndex}
	>
		<!-- Act Divider -->
		<div class="act-divider" use:observe>
			<div class="act-divider-line"></div>
			<div class="act-divider-content">
				<span class="act-number">{sector.act}</span>
				<span class="act-icon">{sector.icon}</span>
				<h2 class="act-title">{sector.title}</h2>
				<p class="act-subtitle">{sector.subtitle}</p>
			</div>
			<div class="act-divider-line"></div>
		</div>

		<div class="container">
			<!-- Sector Description -->
			<div class="sector-intro" use:observe>
				<p class="sector-description">{sector.description}</p>
			</div>

			<!-- Two Column Layout -->
			<div class="sector-columns">
				<!-- LEFT: Companies -->
				<div class="sector-col">
					<h3 class="col-heading" use:observe>
						<span class="col-heading-icon">&#9670;</span>
						The Portfolio
					</h3>
					<div class="companies-list" use:staggerChildren>
						{#each sector.companies as company}
							<div
								class="company-card stagger-item"
								class:company-highlight={company.highlight}
								style={company.highlight ? `--highlight-color: ${company.badgeColor ?? '#d4af37'}` : ''}
							>
								{#if company.badge}
									<div class="company-badge" style="--badge-color: {company.badgeColor ?? '#d4af37'}">
										<span class="company-badge-dot"></span>
										{company.badge}
									</div>
								{/if}
								<div class="company-header">
									<h4 class="company-name">{company.name}</h4>
									{#if company.ticker}
										<span class="company-ticker">{company.ticker}</span>
									{/if}
								</div>
								<p class="company-desc">{company.description}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- RIGHT: AI Opportunities -->
				<div class="sector-col">
					<h3 class="col-heading" use:observe>
						<span class="col-heading-icon ai-icon">&#10038;</span>
						AI Opportunities
					</h3>
					<div class="ai-list" use:staggerChildren>
						{#each sector.aiOpportunities as opp}
							<div class="ai-card stagger-item">
								<div class="ai-card-glow"></div>
								<div class="ai-card-content">
									<div class="ai-card-header">
										<span class="ai-card-icon">{opp.icon}</span>
										<div>
											<h4 class="ai-card-title">{opp.title}</h4>
											<span
												class="ai-card-impact"
												class:transformative={opp.impact === 'Transformative'}
												class:revolutionary={opp.impact === 'Revolutionary'}
											>
												{opp.impact} Impact
											</span>
										</div>
									</div>
									<p class="ai-card-desc">{opp.description}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Stats Row -->
			<div class="stats-row" use:observe>
				{#each sector.stats as stat, si}
					{#if si > 0}
						<div class="stat-divider"></div>
					{/if}
					<div class="stat-block">
						<div class="stat-value">
							<span use:animateCounter={stat.value}>0</span><span class="stat-suffix">{stat.suffix}</span>
						</div>
						<div class="stat-label">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/each}

<!-- ════════════════════════════════════════════════
     FINALE — The Convergence
     ════════════════════════════════════════════════ -->
<section id="finale" class="finale-section" use:trackScene={sectors.length}>
	<div class="finale-bg">
		<div class="finale-rays">
			{#each Array(8) as _, i}
				<div class="ray" style="--angle: {i * 45}deg; --delay: {i * 0.2}s"></div>
			{/each}
		</div>
	</div>
	<div class="container">
		<div class="finale-content" use:observe>
			<span class="finale-label">The Convergence</span>
			<h2 class="finale-title">
				One Group.<br />Six Empires.<br /><em>Infinite Intelligence.</em>
			</h2>
			<p class="finale-desc">
				The true power of AI within Mayapada Group lies not in transforming individual
				sectors — but in connecting them. A hotel guest's preferences inform retail
				recommendations. A patient's health data improves insurance models. A property's
				energy patterns optimize across the entire portfolio. When intelligence flows across
				banking, healthcare, property, hospitality, retail, and media — the Mayapada Group
				transcends from conglomerate to <strong>intelligent ecosystem</strong>.
			</p>

			<div class="convergence-grid" use:staggerChildren>
				<div class="convergence-card stagger-item">
					<div class="convergence-icon">🔄</div>
					<h4>Unified Data Lake</h4>
					<p>Cross-sector customer intelligence connecting all 40+ entities into a single AI-ready data platform.</p>
				</div>
				<div class="convergence-card stagger-item">
					<div class="convergence-icon">🤖</div>
					<h4>Group AI Center of Excellence</h4>
					<p>Centralized AI R&D hub developing shared models, tools, and talent across all Mayapada verticals.</p>
				</div>
				<div class="convergence-card stagger-item">
					<div class="convergence-icon">🌊</div>
					<h4>Cross-Sector Synergies</h4>
					<p>AI-powered recommendations flowing between hospitality, retail, banking, and healthcare for unprecedented personalization.</p>
				</div>
			</div>

				<div class="finale-closing" use:observe>
					<div class="finale-quote">
						<span class="quote-mark">"</span>
						The future belongs to those who see possibilities before they become obvious.
						<span class="quote-mark">"</span>
					</div>
				</div>
			</div>
		</div>
	</section>

<!-- ════════════════════════════════════════════════
     FOOTER
     ════════════════════════════════════════════════ -->
	<footer class="site-footer">
		<div class="footer-content">
			<div class="footer-brand">
				<span class="footer-logo">M</span>
				<span>Mayapada AI Initiatives</span>
			</div>
			<div class="footer-right">
				<p class="footer-note">
					A conceptual exploration of AI-powered transformation.
				</p>
				<a href="/investor" class="footer-investor-link">
					View Investor Deck
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</div>
		<div class="footer-credit">
			Edmund Situmorang · AI Innovator and Technology Builder
		</div>
	</footer>

<style>
	/* ════════════════════════════════════════════════
	   CURTAIN
	   ════════════════════════════════════════════════ */
	.curtain {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		pointer-events: none;
	}

	.curtain-panel {
		width: 50%;
		height: 100%;
		background: linear-gradient(180deg, #1a0a2e 0%, #0d0520 50%, #1a0a2e 100%);
		transition: transform 1.6s var(--ease-silk);
		position: relative;
		display: flex;
		overflow: hidden;
	}

	.curtain-fold {
		flex: 1;
		background: repeating-linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.02) 0px,
			transparent 2px,
			transparent 8px
		);
		border-right: 1px solid rgba(212, 175, 55, 0.05);
	}

	.curtain-left {
		box-shadow: inset -40px 0 80px rgba(0, 0, 0, 0.6);
		transform-origin: left center;
	}

	.curtain-right {
		box-shadow: inset 40px 0 80px rgba(0, 0, 0, 0.6);
		transform-origin: right center;
	}

	.curtain.open .curtain-left {
		transform: translateX(-100%);
	}

	.curtain.open .curtain-right {
		transform: translateX(100%);
	}

	.curtain-valance {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 60px;
		background: linear-gradient(180deg, #2d1b4e 0%, transparent 100%);
		z-index: 2;
		transition: opacity 1.6s var(--ease-silk);
	}

	.curtain.open .curtain-valance {
		opacity: 0;
	}

	/* ════════════════════════════════════════════════
	   SCENE NAVIGATION
	   ════════════════════════════════════════════════ */
	.theme-toggle {
		position: fixed;
		top: 1.25rem;
		right: 1.25rem;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		border: 1px solid rgba(212, 175, 55, 0.2);
		background: rgba(6, 6, 14, 0.6);
		backdrop-filter: blur(12px);
		color: var(--text-secondary);
		cursor: pointer;
		opacity: 0;
		transform: translateY(-8px);
		transition: opacity 0.5s, transform 0.5s, border-color 0.2s, color 0.2s;
	}

	.theme-toggle.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.theme-toggle:hover {
		border-color: var(--gold);
		color: var(--gold);
	}

	:global([data-theme='light']) .theme-toggle {
		background: rgba(244, 241, 235, 0.85);
	}

	.scene-nav {
		position: fixed;
		right: 1.5rem;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.2rem;
		z-index: 100;
		opacity: 0;
		transition: opacity 0.8s ease;
	}

	.scene-nav.visible {
		opacity: 1;
	}

	.scene-nav-track {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 2px;
		background: rgba(255, 255, 255, 0.08);
		transform: translateX(-50%);
		border-radius: 1px;
	}

	.scene-nav-progress {
		width: 100%;
		background: linear-gradient(180deg, var(--gold), var(--gold-light));
		border-radius: 1px;
		transition: height 0.6s var(--ease-smooth);
	}

	.scene-dot {
		position: relative;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.2);
		background: var(--bg-deep);
		cursor: pointer;
		transition: all 0.4s var(--ease-smooth);
		z-index: 1;
	}

	.scene-dot:hover,
	.scene-dot.active {
		border-color: var(--gold);
		background: var(--gold);
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
		transform: scale(1.4);
	}

	.scene-dot-label {
		position: absolute;
		right: 1.8rem;
		top: 50%;
		transform: translateY(-50%) translateX(8px);
		white-space: nowrap;
		font-size: 0.7rem;
		font-family: var(--font-mono);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-secondary);
		opacity: 0;
		transition: all 0.3s ease;
		pointer-events: none;
	}

	.scene-dot:hover .scene-dot-label,
	.scene-dot.active .scene-dot-label {
		opacity: 1;
		transform: translateY(-50%) translateX(0);
		color: var(--gold-light);
	}

	/* ════════════════════════════════════════════════
	   HERO
	   ════════════════════════════════════════════════ */
	.hero {
		position: relative;
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
	}

	.hero-radial {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.06) 0%, transparent 60%);
	}

	.hero-particles {
		position: absolute;
		inset: 0;
	}

	.particle {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--size);
		height: var(--size);
		background: var(--gold);
		border-radius: 50%;
		opacity: 0;
		animation: particleFloat var(--duration) var(--delay) infinite ease-in-out;
	}

	@keyframes particleFloat {
		0%, 100% {
			opacity: 0;
			transform: translateY(0) scale(0.5);
		}
		50% {
			opacity: 0.6;
			transform: translateY(-30px) scale(1);
		}
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		width: 100%;
		max-width: 900px;
		padding: 2rem;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 1.2s var(--ease-smooth), transform 1.2s var(--ease-smooth);
	}

	.hero-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.hero-overline {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.overline-line {
		width: 60px;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--gold-dim));
	}

	.overline-line:last-child {
		background: linear-gradient(90deg, var(--gold-dim), transparent);
	}

	.overline-text {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--gold);
	}

	.hero-title {
		font-family: var(--font-display);
		font-size: clamp(3rem, 8vw, 7rem);
		font-weight: 700;
		line-height: 1;
		letter-spacing: 0.05em;
		color: var(--text-primary);
		margin-bottom: 1.5rem;
		text-shadow: 0 0 24px rgba(212, 175, 55, 0.1);
		animation: titleGlow 6s ease-in-out infinite;
	}

	@keyframes titleGlow {
		0%, 100% {
			text-shadow: 0 0 18px rgba(212, 175, 55, 0.08);
		}
		50% {
			text-shadow: 0 0 32px rgba(212, 175, 55, 0.2);
		}
	}

	.title-word {
		display: inline-block;
		opacity: 0;
		transform: translateY(40px);
		filter: blur(8px);
		transition: opacity 1s var(--ease-smooth), transform 1s var(--ease-smooth), filter 1s var(--ease-smooth);
		transition-delay: var(--delay);
	}

	.hero-content.visible .title-word {
		opacity: 1;
		transform: translateY(0);
		filter: blur(0);
	}

	.hero-divider {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 1.5rem 0;
	}

	.divider-diamond {
		color: var(--gold);
		font-size: 0.8rem;
		animation: diamondPulse 3s ease-in-out infinite;
	}

	@keyframes diamondPulse {
		0%, 100% { opacity: 0.5; transform: scale(1); }
		50% { opacity: 1; transform: scale(1.3); }
	}

	.hero-subtitle {
		font-family: var(--font-display);
		font-size: clamp(1.1rem, 2.5vw, 1.6rem);
		font-weight: 400;
		color: var(--text-secondary);
		letter-spacing: 0.02em;
		margin-bottom: 3rem;
	}

	.hero-subtitle em {
		color: var(--gold-light);
		font-style: italic;
	}

	.hero-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}

	.hero-stat { text-align: center; }

	.hero-stat-value {
		display: block;
		font-family: var(--font-mono);
		font-size: 1.6rem;
		font-weight: 600;
		color: var(--gold);
		letter-spacing: 0.05em;
	}

	.hero-stat-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--text-muted);
		margin-top: 0.25rem;
		display: block;
	}

	.hero-stat-sep {
		width: 1px;
		height: 30px;
		background: rgba(212, 175, 55, 0.2);
	}

	.hero-description {
		font-size: 1rem;
		line-height: 1.8;
		color: var(--text-secondary);
		max-width: 650px;
		margin: 0 auto 3rem;
	}

	.hero-description strong {
		color: var(--gold-light);
		font-weight: 600;
	}

	.hero-description em {
		color: var(--text-primary);
		font-style: normal;
		border-bottom: 1px solid var(--gold-dim);
	}

	.hero-scroll-cue {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		animation: scrollCueFade 2.5s ease-in-out infinite;
	}

	.hero-scroll-cue span {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--text-muted);
	}

	.scroll-arrow {
		color: var(--gold-dim);
		animation: scrollBounce 2s ease-in-out infinite;
	}

	@keyframes scrollCueFade {
		0%, 100% { opacity: 0.3; }
		50% { opacity: 1; }
	}

	@keyframes scrollBounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(8px); }
	}

	/* ════════════════════════════════════════════════
	   SHARED SECTION STYLES
	   ════════════════════════════════════════════════ */
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 clamp(1rem, 4vw, 2rem);
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);
	}

	.section-header:global(.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	.section-label {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 1rem;
		position: relative;
		padding: 0 1rem;
	}

	.section-label::before,
	.section-label::after {
		content: '';
		position: absolute;
		top: 50%;
		width: 30px;
		height: 1px;
		background: var(--gold-dim);
	}

	.section-label::before { right: 100%; }
	.section-label::after { left: 100%; }

	.section-title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 1rem;
		animation: sectionTitleBreath 7s ease-in-out infinite;
	}

	@keyframes sectionTitleBreath {
		0%, 100% { opacity: 0.95; }
		50% { opacity: 1; }
	}

	.section-desc {
		font-size: 1.05rem;
		color: var(--text-secondary);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.7;
	}

	/* ════════════════════════════════════════════════
	   LEADERSHIP
	   ════════════════════════════════════════════════ */
	.leadership-section {
		padding: var(--section-padding) 0;
		position: relative;
		background: var(--spotlight);
	}

	.leaders-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
	}

	.leader-card {
		background: var(--bg-card);
		border: 1px solid rgba(212, 175, 55, 0.08);
		border-radius: 12px;
		padding: 2rem 1.5rem;
		text-align: center;
		transition: all 0.4s var(--ease-smooth);
		position: relative;
		overflow: hidden;
	}

	.leader-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: linear-gradient(90deg, transparent, var(--gold), transparent);
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.leader-card:hover::before { opacity: 1; }

	.leader-card:hover {
		background: var(--bg-card-hover);
		border-color: rgba(212, 175, 55, 0.2);
		transform: translateY(-4px);
	}

	.leader-index {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--gold-dim);
		letter-spacing: 0.1em;
		margin-bottom: 1rem;
	}

	.leader-name {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.leader-role {
		font-size: 0.8rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.leader-line {
		width: 30px;
		height: 2px;
		background: var(--gold-dim);
		margin: 1rem auto 0;
		border-radius: 1px;
	}

	/* ════════════════════════════════════════════════
	   SECTOR SCENES
	   ════════════════════════════════════════════════ */
	.sector-scene {
		padding: var(--section-padding) 0;
		position: relative;
		border-top: 1px solid rgba(255, 255, 255, 0.03);
	}

	.sector-scene::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 400px;
		background: radial-gradient(ellipse at 50% 0%, rgba(var(--sector-rgb), 0.04) 0%, transparent 70%);
		pointer-events: none;
	}

	.act-divider {
		text-align: center;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);
	}

	.act-divider:global(.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	.act-divider-line {
		width: 60px;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--sector-color), transparent);
		margin: 0 auto 1.5rem;
	}

	.act-divider-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.act-number {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--sector-color);
	}

	.act-icon {
		font-size: 2.5rem;
		margin: 0.5rem 0;
		filter: drop-shadow(0 0 12px rgba(var(--sector-rgb), 0.3));
		animation: iconFloat 4.2s ease-in-out infinite;
	}

	@keyframes iconFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-6px); }
	}

	.act-title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		color: var(--text-primary);
	}

	.act-subtitle {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1rem;
		color: var(--text-muted);
		letter-spacing: 0.05em;
	}

	.sector-intro {
		max-width: 800px;
		margin: 0 auto 4rem;
		text-align: center;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.8s var(--ease-smooth) 0.2s, transform 0.8s var(--ease-smooth) 0.2s;
	}

	.sector-intro:global(.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	.sector-description {
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.8;
	}

	.sector-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		margin-bottom: 4rem;
	}

	.col-heading {
		font-family: var(--font-display);
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth);
	}

	.col-heading:global(.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	.col-heading-icon {
		color: var(--gold);
		font-size: 0.6rem;
	}

	.col-heading-icon.ai-icon {
		color: var(--sector-color);
		font-size: 1rem;
	}

	/* Company Cards */
	.company-card {
		background: var(--bg-card);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		padding: 1.5rem;
		margin-bottom: 1rem;
		transition: all 0.4s var(--ease-smooth);
		position: relative;
		overflow: hidden;
	}

	.company-card::after {
		content: '';
		position: absolute;
		top: 0;
		left: -130%;
		width: 120%;
		height: 100%;
		background: linear-gradient(115deg, transparent 0%, rgba(212, 175, 55, 0.16) 50%, transparent 100%);
		opacity: 0;
		transition: opacity 0.35s ease;
	}

	.company-card:hover {
		background: var(--bg-card-hover);
		border-color: rgba(212, 175, 55, 0.15);
		transform: translateX(4px);
	}

	.company-card:hover::after {
		opacity: 1;
		animation: sweepShine 1s var(--ease-smooth);
	}

	@keyframes sweepShine {
		from { left: -130%; }
		to { left: 120%; }
	}

	.company-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.company-name {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.company-ticker {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.08em;
		color: var(--gold);
		background: rgba(212, 175, 55, 0.1);
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		border: 1px solid rgba(212, 175, 55, 0.15);
	}

	/* ── Highlight card (e.g. Bloomberg) ── */
	.company-card.company-highlight {
		border-color: rgba(var(--highlight-color, 212 175 55), 0.35);
		background: linear-gradient(
			135deg,
			rgba(var(--highlight-color, 212 175 55), 0.07) 0%,
			var(--bg-card) 60%
		);
		box-shadow: 0 0 0 1px rgba(var(--highlight-color, 212 175 55), 0.12),
					0 8px 32px rgba(0, 0, 0, 0.25);
	}

	.company-card.company-highlight:hover {
		border-color: rgba(var(--highlight-color, 212 175 55), 0.55);
		box-shadow: 0 0 0 1px rgba(var(--highlight-color, 212 175 55), 0.3),
					0 12px 40px rgba(0, 0, 0, 0.3);
	}

	/* Badge pill */
	.company-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--badge-color, var(--gold));
		background: rgba(245, 158, 11, 0.1);
		border: 1px solid rgba(245, 158, 11, 0.28);
		padding: 0.2rem 0.65rem;
		border-radius: 20px;
		margin-bottom: 0.75rem;
	}

	.company-badge-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--badge-color, var(--gold));
		animation: badgePulse 2s ease-in-out infinite;
		flex-shrink: 0;
	}

	@keyframes badgePulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(0.7); }
	}

	.company-desc {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* AI Cards */
	.ai-card {
		position: relative;
		border-radius: 12px;
		margin-bottom: 1rem;
		overflow: hidden;
		transition: transform 0.4s var(--ease-smooth);
	}

	.ai-card:hover {
		transform: translateX(-4px);
	}

	.ai-card-glow {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(var(--sector-rgb), 0.08) 0%, rgba(var(--sector-rgb), 0.02) 100%);
		border: 1px solid rgba(var(--sector-rgb), 0.12);
		border-radius: 12px;
		transition: all 0.4s ease;
	}

	.ai-card:hover .ai-card-glow {
		border-color: rgba(var(--sector-rgb), 0.3);
		background: linear-gradient(135deg, rgba(var(--sector-rgb), 0.12) 0%, rgba(var(--sector-rgb), 0.04) 100%);
		box-shadow: 0 0 30px rgba(var(--sector-rgb), 0.08);
	}

	.ai-card-content {
		position: relative;
		padding: 1.5rem;
	}

	.ai-card-header {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.ai-card-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
		margin-top: 0.1rem;
		animation: iconBob 3.2s ease-in-out infinite;
	}

	@keyframes iconBob {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-4px); }
	}

	.ai-card-title {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.ai-card-impact {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		padding: 0.15rem 0.5rem;
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.05);
	}

	.ai-card-impact.transformative {
		color: var(--sector-color);
		background: rgba(var(--sector-rgb), 0.1);
	}

	.ai-card-impact.revolutionary {
		color: var(--gold);
		background: rgba(212, 175, 55, 0.1);
	}

	.ai-card-desc {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Stats Row */
	.stats-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3rem;
		padding: 3rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);
	}

	.stats-row:global(.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	.stat-block { text-align: center; }

	.stat-value {
		font-family: var(--font-mono);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 600;
		color: var(--sector-color);
		line-height: 1;
	}

	.stat-suffix {
		font-size: 0.6em;
		color: var(--text-muted);
	}

	.stat-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--text-muted);
		margin-top: 0.5rem;
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: rgba(var(--sector-rgb), 0.2);
	}

	/* Stagger */
	.stagger-item {
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth);
	}

	.stagger-item:global(.stagger-visible) {
		opacity: 1;
		transform: translateY(0);
	}

	/* ════════════════════════════════════════════════
	   FINALE
	   ════════════════════════════════════════════════ */
	.finale-section {
		position: relative;
		padding: calc(var(--section-padding) * 1.5) 0;
		overflow: hidden;
	}

	.finale-bg {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.finale-rays {
		position: relative;
		width: 600px;
		height: 600px;
	}

	.ray {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 300px;
		height: 1px;
		background: linear-gradient(90deg, rgba(212, 175, 55, 0.08), transparent);
		transform-origin: left center;
		transform: rotate(var(--angle));
		animation: rayPulse 4s var(--delay) ease-in-out infinite;
	}

	@keyframes rayPulse {
		0%, 100% { opacity: 0.3; width: 200px; }
		50% { opacity: 0.8; width: 350px; }
	}

	.finale-content {
		position: relative;
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 1s var(--ease-smooth), transform 1s var(--ease-smooth);
	}

	.finale-content:global(.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	.finale-label {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 1.5rem;
	}

	.finale-title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.3;
		margin-bottom: 2rem;
	}

	.finale-title em {
		color: var(--gold);
		font-style: italic;
	}

	.finale-desc {
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.8;
		max-width: 750px;
		margin: 0 auto 4rem;
	}

	.finale-desc strong {
		color: var(--gold-light);
		font-weight: 600;
	}

	.convergence-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-bottom: 4rem;
	}

	.convergence-card {
		background: var(--bg-card);
		border: 1px solid rgba(212, 175, 55, 0.08);
		border-radius: 14px;
		padding: 2rem;
		text-align: center;
		transition: all 0.4s var(--ease-smooth);
	}

	.convergence-card:hover {
		background: var(--bg-card-hover);
		border-color: rgba(212, 175, 55, 0.2);
		transform: translateY(-6px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	.convergence-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		animation: iconFloat 4s ease-in-out infinite;
	}

	.convergence-card h4 {
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
	}

	.convergence-card p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.finale-closing {
		max-width: 650px;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);
	}

	.finale-closing:global(.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	.finale-quote {
		font-family: var(--font-display);
		font-size: clamp(1.2rem, 2.5vw, 1.6rem);
		font-style: italic;
		color: var(--text-secondary);
		line-height: 1.6;
		padding: 2rem 0;
		border-top: 1px solid rgba(212, 175, 55, 0.1);
		border-bottom: 1px solid rgba(212, 175, 55, 0.1);
		animation: quoteGlow 6s ease-in-out infinite;
	}

	@keyframes quoteGlow {
		0%, 100% { box-shadow: 0 0 0 rgba(212, 175, 55, 0); }
		50% { box-shadow: 0 0 28px rgba(212, 175, 55, 0.08); }
	}

	.quote-mark {
		color: var(--gold);
		font-size: 1.5em;
		vertical-align: -0.1em;
	}

	/* ════════════════════════════════════════════════
	   FOOTER
	   ════════════════════════════════════════════════ */
	.site-footer {
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		padding: 3rem 2rem;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.footer-brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.footer-logo {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1rem;
		color: var(--gold);
		border: 1px solid var(--gold-dim);
		border-radius: 6px;
		animation: logoPulse 3.5s ease-in-out infinite;
	}

	@keyframes logoPulse {
		0%, 100% {
			transform: scale(1);
			box-shadow: 0 0 0 rgba(212, 175, 55, 0);
		}
		50% {
			transform: scale(1.04);
			box-shadow: 0 0 14px rgba(212, 175, 55, 0.25);
		}
	}

	.footer-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.footer-note {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.footer-investor-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: var(--gold);
		text-decoration: none;
		text-transform: uppercase;
		transition: opacity 0.2s;
	}

	.footer-investor-link:hover {
		opacity: 0.75;
	}

	.footer-credit {
		max-width: 1200px;
		margin: 1.25rem auto 0;
		padding: 0.6rem 0.9rem;
		padding-top: calc(0.6rem + 1.25rem);
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		text-align: center;
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

	/* ════════════════════════════════════════════════
	   RESPONSIVE
	   ════════════════════════════════════════════════ */
	@media (max-width: 900px) {
		.scene-nav {
			display: none;
		}

		.hero-content {
			padding: 1.5rem 1.25rem;
		}

		.hero-overline {
			margin-bottom: 1.25rem;
			gap: 0.65rem;
		}

		.overline-line {
			width: 32px;
		}

		.hero-subtitle {
			margin-bottom: 2rem;
		}

		.hero-stats {
			width: min(100%, 480px);
			margin: 0 auto 2rem;
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.9rem 0.75rem;
		}

		.hero-stat-value {
			font-size: 1.35rem;
		}

		.hero-stat-sep {
			display: none;
		}

		.hero-description {
			font-size: 0.95rem;
			line-height: 1.7;
			margin-bottom: 2rem;
		}

		.section-header {
			margin-bottom: 2.5rem;
		}

		.section-desc {
			font-size: 0.98rem;
		}

		.act-divider {
			margin-bottom: 2.5rem;
		}

		.sector-intro {
			margin-bottom: 2.5rem;
		}

		.sector-columns {
			grid-template-columns: 1fr;
			gap: 2rem;
			margin-bottom: 2.5rem;
		}

		.sector-description {
			font-size: 1rem;
			line-height: 1.7;
		}

		.col-heading {
			font-size: 1.15rem;
			margin-bottom: 1rem;
		}

		.company-card,
		.ai-card-content {
			padding: 1.1rem;
		}

		.company-desc,
		.ai-card-desc {
			font-size: 0.82rem;
		}

		.stats-row {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1rem;
			padding: 2.25rem 0;
		}

		.stat-divider {
			display: none;
		}

		.finale-rays {
			width: 420px;
			height: 420px;
		}

		.convergence-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
			margin-bottom: 2.5rem;
		}

		.finale-desc {
			font-size: 1rem;
			margin-bottom: 2.5rem;
		}

		.finale-quote {
			padding: 1.5rem 0;
		}
	}

	@media (max-width: 700px) {
		.hero-title {
			font-size: clamp(2.4rem, 13vw, 3.8rem);
			letter-spacing: 0.03em;
		}

		.section-label::before,
		.section-label::after {
			display: none;
		}

		.section-title {
			font-size: clamp(1.65rem, 8vw, 2.2rem);
		}

		.leaders-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.leader-card {
			padding: 1.4rem 1rem;
		}

		.act-icon {
			font-size: 2rem;
		}

		.act-title {
			font-size: clamp(1.6rem, 8vw, 2.2rem);
		}

		.stats-row {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.85rem;
		}

		.stats-row .stat-block:last-child {
			grid-column: 1 / -1;
		}

		.stat-value {
			font-size: clamp(1.5rem, 8vw, 2rem);
		}

		.finale-rays {
			display: none;
		}

		.footer-content {
			flex-direction: column;
			text-align: center;
		}

		.footer-right {
			align-items: center;
		}
	}

	@media (max-width: 520px) {
		.hero {
			padding-top: calc(1rem + env(safe-area-inset-top));
		}

		.hero-content {
			padding: 1rem 0.5rem;
		}

		.hero-title {
			font-size: clamp(2.1rem, 14vw, 3rem);
			line-height: 0.95;
		}

		.overline-text {
			font-size: 0.62rem;
			letter-spacing: 0.16em;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.hero-stat-value {
			font-size: 1.15rem;
		}

		.hero-stat-label {
			font-size: 0.62rem;
			letter-spacing: 0.1em;
		}

		.hero-description {
			font-size: 0.9rem;
		}

		.container {
			padding: 0 0.85rem;
		}

		.section-label {
			font-size: 0.62rem;
			letter-spacing: 0.14em;
		}

		.sector-columns {
			gap: 1.5rem;
		}

		.company-card,
		.ai-card-content,
		.convergence-card {
			padding: 1rem;
		}

		.company-ticker {
			font-size: 0.58rem;
		}

		.ai-card-impact {
			font-size: 0.55rem;
		}

		.stat-label {
			font-size: 0.65rem;
			letter-spacing: 0.08em;
		}

		.finale-title {
			line-height: 1.2;
		}

		.finale-quote {
			font-size: 1.05rem;
			padding: 1.2rem 0;
		}

		.site-footer {
			padding: 2rem 1rem;
		}
	}
</style>
