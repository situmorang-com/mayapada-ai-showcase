export interface Company {
	name: string;
	ticker?: string;
	description: string;
	badge?: string;        // e.g. "Strategic Partnership"
	badgeColor?: string;   // e.g. "#f59e0b"
	highlight?: boolean;   // draws extra visual attention
}

export interface AIOpportunity {
	title: string;
	description: string;
	impact: 'High' | 'Transformative' | 'Revolutionary';
	icon: string;
}

export interface Stat {
	value: number;
	suffix: string;
	label: string;
}

export interface Sector {
	id: string;
	act: string;
	title: string;
	subtitle: string;
	icon: string;
	color: string;
	colorRgb: string;
	description: string;
	companies: Company[];
	aiOpportunities: AIOpportunity[];
	stats: Stat[];
}

export const sectors: Sector[] = [
	{
		id: 'financial',
		act: 'Act I',
		title: 'Financial Services',
		subtitle: 'The Foundation of Empire',
		icon: '🏦',
		color: '#3b82f6',
		colorRgb: '59, 130, 246',
		description:
			'At the heart of Mayapada Group lies its banking powerhouse — Bank Mayapada Internasional, serving millions across 170+ branches across 19 provinces. Complemented by fintech venture Pohon Dana and strategic insurance partnerships with Zurich and Sompo.',
		companies: [
			{
				name: 'Bank Mayapada Internasional',
				ticker: 'IDX: MAYA',
				description:
					'Flagship private bank with 170+ branches across 19 Indonesian provinces and 61 cities, primarily serving the SME market since 1989.'
			},
			{
				name: 'PT Pohon Dana Indonesia',
				description:
					'Fintech subsidiary specializing in peer-to-peer lending and digital payment solutions, established 2018.'
			},
			{
				name: 'Sompo Insurance Partnership',
				description:
					'20% stake in PT Sompo Insurance Indonesia via Mayapada Pratama Kasih, plus bancassurance with Zurich Life.'
			}
		],
		aiOpportunities: [
			{
				title: 'AI Credit Scoring Engine',
				description:
					'Deploy machine learning models that analyze alternative data — mobile usage, transaction patterns, social signals — to extend credit to Indonesia\'s vast unbanked population.',
				impact: 'Transformative',
				icon: '🧠'
			},
			{
				title: 'Real-Time Fraud Detection',
				description:
					'Neural networks monitoring transactions in real-time, detecting anomalous patterns across Bank Mayapada\'s 170+ branch network before losses occur.',
				impact: 'High',
				icon: '🛡️'
			},
			{
				title: 'Conversational Banking AI',
				description:
					'Multilingual AI assistants (Bahasa, English, Mandarin) providing 24/7 banking services, reducing branch load while improving customer satisfaction.',
				impact: 'High',
				icon: '💬'
			},
			{
				title: 'Predictive Risk Analytics',
				description:
					'AI-powered portfolio risk modeling integrating macroeconomic data, market signals, and Pohon Dana\'s P2P lending insights for smarter capital allocation.',
				impact: 'Revolutionary',
				icon: '📊'
			}
		],
		stats: [
			{ value: 170, suffix: '+', label: 'Branches Nationwide' },
			{ value: 19, suffix: '', label: 'Provinces Covered' },
			{ value: 37, suffix: 'yr', label: 'Years of Banking' }
		]
	},
	{
		id: 'healthcare',
		act: 'Act II',
		title: 'Healthcare',
		subtitle: 'Healing with Intelligence',
		icon: '🏥',
		color: '#10b981',
		colorRgb: '16, 185, 129',
		description:
			'Mayapada Hospital — one of Indonesia\'s premier private hospital chains — spans major cities from Jakarta to Surabaya, with an ambitious expansion into the new capital IKN Nusantara. Supported by Biomedilab\'s diagnostic services.',
		companies: [
			{
				name: 'Mayapada Hospital',
				ticker: 'IDX: SRAJ',
				description:
					'Premium private hospital chain with locations in Tangerang, Jakarta Selatan, Bogor, Kuningan, Surabaya, and Bandung.'
			},
			{
				name: 'Mayapada Healthcare Group',
				description:
					'Overarching healthcare holding entity managing the group\'s medical portfolio and expansion strategy.'
			},
			{
				name: 'Biomedilab (Agave Biomedi Investama)',
				description:
					'Advanced medical laboratory services providing diagnostic testing and clinical pathology across the network.'
			},
			{
				name: 'Mayapada Clinic Pratama',
				description:
					'Network of outpatient clinics providing primary care and specialist consultations closer to communities.'
			}
		],
		aiOpportunities: [
			{
				title: 'AI-Powered Diagnostics',
				description:
					'Computer vision analyzing medical imaging — X-rays, CT scans, MRIs — at Biomedilab, providing rapid preliminary diagnoses and reducing radiologist workload by 40%.',
				impact: 'Revolutionary',
				icon: '🔬'
			},
			{
				title: 'Predictive Patient Analytics',
				description:
					'Machine learning models predicting patient deterioration, readmission risks, and optimal treatment pathways across all Mayapada Hospital locations.',
				impact: 'Transformative',
				icon: '📈'
			},
			{
				title: 'Smart Hospital Operations',
				description:
					'AI optimizing bed allocation, staff scheduling, supply chain, and operating room utilization — reducing wait times and operational costs significantly.',
				impact: 'High',
				icon: '⚙️'
			},
			{
				title: 'Telemedicine AI Triage',
				description:
					'Intelligent triage systems for Mayapada Clinic Pratama, using NLP to assess symptoms and route patients to appropriate specialists across the network.',
				impact: 'Transformative',
				icon: '🩺'
			}
		],
		stats: [
			{ value: 7, suffix: '+', label: 'Hospital Locations' },
			{ value: 500, suffix: 'B', label: 'Rp IKN Investment' },
			{ value: 10, suffix: '+', label: 'Subsidiaries' }
		]
	},
	{
		id: 'property',
		act: 'Act III',
		title: 'Property & Real Estate',
		subtitle: 'Building Tomorrow\'s Landscape',
		icon: '🏙️',
		color: '#f59e0b',
		colorRgb: '245, 158, 11',
		description:
			'From the iconic Mayapada Towers dominating Jakarta\'s Sudirman-Thamrin corridor to Singapore\'s MYP Centre, the group\'s property portfolio spans premium commercial, residential, and mixed-use developments.',
		companies: [
			{
				name: 'Maha Properti Indonesia',
				ticker: 'IDX: MPRO',
				description:
					'Publicly listed developer of malls, apartments, hotels, shophouses, and townships including The Heavens and Tanjung Layar Beachfront City.'
			},
			{
				name: 'Precise Pacific Realty',
				description:
					'Manager of Mayapada Tower 1 & 2, Menara Topas, Permata Tower, and Sona Topas Tower in Jakarta\'s premium CBD.'
			},
			{
				name: 'MYP Ltd',
				ticker: 'SGX: F86',
				description:
					'Singapore-listed investment holding company with MYP Centre in the financial district and luxury residential assets.'
			}
		],
		aiOpportunities: [
			{
				title: 'Smart Building AI',
				description:
					'IoT-connected AI managing energy consumption, HVAC, lighting, and security across Mayapada Towers — reducing energy costs by 30% while improving tenant comfort.',
				impact: 'High',
				icon: '🏢'
			},
			{
				title: 'Predictive Maintenance',
				description:
					'Sensor-driven AI predicting equipment failures in elevators, HVAC, and electrical systems before breakdowns occur, minimizing costly emergency repairs.',
				impact: 'High',
				icon: '🔧'
			},
			{
				title: 'AI Market Intelligence',
				description:
					'Deep learning models analyzing property market trends, demographic shifts, and urban development patterns to inform acquisition and development decisions.',
				impact: 'Transformative',
				icon: '🗺️'
			},
			{
				title: 'Virtual AI Property Tours',
				description:
					'Generative AI creating immersive virtual tours and AI-powered property matching for Maha Properti\'s developments, engaging buyers globally.',
				impact: 'High',
				icon: '🥽'
			}
		],
		stats: [
			{ value: 5, suffix: '+', label: 'Premium Towers' },
			{ value: 2, suffix: '', label: 'Stock Exchanges Listed' },
			{ value: 3, suffix: '', label: 'Countries Present' }
		]
	},
	{
		id: 'hospitality',
		act: 'Act IV',
		title: 'Hospitality',
		subtitle: 'The Art of Welcome',
		icon: '🌴',
		color: '#f43f5e',
		colorRgb: '244, 63, 94',
		description:
			'Through a strategic partnership with IHG Hotels & Resorts, Mayapada Hospitality Holding operates 9 hotels across Indonesia — from the InterContinental Bali Sanur to Indonesia\'s first voco hotel in Seminyak.',
		companies: [
			{
				name: 'Mayapada Hospitality Holding',
				description:
					'Led by Victoria Tahir, managing 9 hotels across Indonesia with strategic IHG partnership for international brand standards.'
			},
			{
				name: 'InterContinental Bali Sanur Resort',
				description:
					'Flagship luxury resort in Bali\'s Sanur beach area, operating under IHG\'s premier brand.'
			},
			{
				name: 'voco Bali Seminyak',
				description:
					'Indonesia\'s first voco hotel, opened December 2024 in Bali\'s vibrant Seminyak district under IHG\'s upscale brand.'
			},
			{
				name: 'Holiday Inn Properties',
				description:
					'Holiday Inn Bali Sanur and Holiday Inn Express Bali Sunset Road, serving mid-scale travelers.'
			}
		],
		aiOpportunities: [
			{
				title: 'Hyper-Personalized Guest AI',
				description:
					'AI learning guest preferences across all 9 properties — room temperature, pillow type, dining preferences — creating seamless personalized experiences before arrival.',
				impact: 'Transformative',
				icon: '🎯'
			},
			{
				title: 'Dynamic Revenue Management',
				description:
					'AI-powered pricing engines analyzing demand patterns, competitor rates, events, and weather to optimize room rates in real-time across the portfolio.',
				impact: 'High',
				icon: '💰'
			},
			{
				title: 'Smart Room Technology',
				description:
					'Voice-controlled AI concierge in rooms, managing ambiance, ordering services, providing local recommendations in guests\' native languages.',
				impact: 'High',
				icon: '🏨'
			},
			{
				title: 'Predictive Service Excellence',
				description:
					'AI analyzing guest feedback, social media sentiment, and operational data to predict and prevent service failures before they impact guest satisfaction.',
				impact: 'Revolutionary',
				icon: '⭐'
			}
		],
		stats: [
			{ value: 9, suffix: '', label: 'Hotels in Portfolio' },
			{ value: 4, suffix: '', label: 'IHG Brands Operated' },
			{ value: 1, suffix: 'st', label: 'voco in Indonesia' }
		]
	},
	{
		id: 'retail',
		act: 'Act V',
		title: 'Retail & Tourism',
		subtitle: 'Gateways of Discovery',
		icon: '🛍️',
		color: '#8b5cf6',
		colorRgb: '139, 92, 246',
		description:
			'Sona Topas Tourism Industry — a legacy brand since 1978 — operates duty-free retail through its partnership with DFS (LVMH). Strategically positioned in Bali, Jakarta, and Medan to capture Indonesia\'s booming tourism industry.',
		companies: [
			{
				name: 'Sona Topas Tourism Industry',
				ticker: 'IDX: SONA',
				description:
					'Publicly listed since 1992, operating duty-free shops in partnership with DFS (LVMH subsidiary) across key tourist destinations.'
			},
			{
				name: 'Inti Dufree Promosindo',
				description:
					'Subsidiary handling duty-free retail operations in partnership with the world\'s leading travel retailer.'
			},
			{
				name: 'Arthamulia Indah',
				description:
					'Retail operations subsidiary supporting the duty-free shop network across Indonesian tourist corridors.'
			}
		],
		aiOpportunities: [
			{
				title: 'Personalized Shopping AI',
				description:
					'AI recommending products based on traveler profiles, purchase history, nationality, and real-time browsing behavior — increasing average transaction value.',
				impact: 'High',
				icon: '🎁'
			},
			{
				title: 'Demand Forecasting Engine',
				description:
					'ML models predicting product demand by analyzing flight schedules, tourist arrivals, seasonal trends, and global luxury market signals for optimal inventory.',
				impact: 'Transformative',
				icon: '📦'
			},
			{
				title: 'Computer Vision Retail Analytics',
				description:
					'AI-powered cameras analyzing foot traffic, dwell times, and product interaction patterns to optimize store layouts and product placement.',
				impact: 'High',
				icon: '👁️'
			},
			{
				title: 'Cross-Selling with Hospitality AI',
				description:
					'Unified AI platform connecting hotel guest data with retail preferences — offering personalized duty-free promotions to Mayapada hotel guests.',
				impact: 'Revolutionary',
				icon: '🔗'
			}
		],
		stats: [
			{ value: 48, suffix: 'yr', label: 'Years in Tourism' },
			{ value: 3, suffix: '', label: 'Key City Locations' },
			{ value: 1, suffix: '', label: 'LVMH Partnership' }
		]
	},
	{
		id: 'media',
		act: 'Act VI',
		title: 'Media & Publishing',
		subtitle: 'Voices of Influence',
		icon: '📡',
		color: '#06b6d4',
		colorRgb: '6, 182, 212',
		description:
			'From Forbes Indonesia and Elle Indonesia to television networks MyTV, INTV, and RTV — Mayapada\'s media arm shapes narratives across print, digital, and broadcast. Now strengthened by a recent Bloomberg partnership and complemented by Guo Ji Ri Bao, a Mandarin-language daily.',
		companies: [
			{
				name: 'Forbes Indonesia',
				description:
					'Local partner since 2010, chaired by Jonathan Tahir — the definitive voice of Indonesian business and wealth.'
			},
			{
				name: 'Bloomberg Partnership',
				description:
					'Strategic collaboration with Bloomberg — the world\'s leading financial data and media company — bringing authoritative global business journalism and financial intelligence directly to Indonesian audiences through Mayapada\'s media network.',
				badge: 'Strategic Partnership',
				badgeColor: '#f59e0b',
				highlight: true
			},
			{
				name: 'Elle Indonesia',
				description:
					'Iconic French fashion magazine\'s Indonesian edition, under Mayapada\'s control since 2008.'
			},
			{
				name: 'MyTV / INTV / RTV',
				description:
					'Television portfolio including Indonesia\'s first women-focused channel (MyTV), regional INTV, and 20% stake in RTV (Rajawali Televisi).'
			},
			{
				name: 'Guo Ji Ri Bao',
				description:
					'Mandarin-language daily newspaper since 2001, serving the Chinese-Indonesian community across Jakarta and Medan.'
			}
		],
		aiOpportunities: [
			{
				title: 'AI Content Generation',
				description:
					'Generative AI assisting Forbes Indonesia and Elle Indonesia editorial teams with research, drafts, translations, and multimedia content production at scale.',
				impact: 'Transformative',
				icon: '✍️'
			},
			{
				title: 'Personalized Media Feeds',
				description:
					'AI-curated news and content recommendations across all Mayapada media properties, increasing engagement and time-on-platform through deep personalization.',
				impact: 'High',
				icon: '📱'
			},
			{
				title: 'Audience Intelligence Platform',
				description:
					'Unified AI analytics across TV, print, and digital — understanding audience demographics, sentiment, and behavior to attract premium advertisers.',
				impact: 'High',
				icon: '📊'
			},
			{
				title: 'Bloomberg Terminal Intelligence',
				description:
					'Integrating Bloomberg\'s real-time financial data feeds with AI to deliver hyper-relevant market insights, company analyses, and investment signals tailored for Indonesian readers and Bank Mayapada\'s clientele.',
				impact: 'Revolutionary',
				icon: '📰'
			},
			{
				title: 'Multilingual AI Translation',
				description:
					'Real-time AI translation between Bahasa Indonesia, English, and Mandarin — enabling Guo Ji Ri Bao and Bloomberg content to reach broader audiences seamlessly.',
				impact: 'Transformative',
				icon: '🌐'
			}
		],
		stats: [
			{ value: 16, suffix: 'yr', label: 'Forbes Indonesia' },
			{ value: 3, suffix: '+', label: 'TV Networks' },
			{ value: 2, suffix: '', label: 'Global Media Partners' }
		]
	}
];

export const groupInfo = {
	founder: 'Dato\' Sri Prof. Dr. Tahir',
	founded: 1986,
	netWorth: '$11.9B',
	headquarters: 'Jakarta, Indonesia',
	publicEntities: 5,
	totalCompanies: 40,
	exchanges: ['IDX (Indonesia)', 'SGX (Singapore)'],
	familyLeaders: [
		{ name: 'Dato\' Sri Tahir', role: 'Founder & Chairman' },
		{ name: 'Jonathan Tahir', role: 'Deputy Chairman & Group CEO Healthcare' },
		{ name: 'Grace Tahir', role: 'Healthcare & Digital Innovation' },
		{ name: 'Jane Tahir', role: 'Financial Services' },
		{ name: 'Victoria Tahir', role: 'President Director, Hospitality' }
	]
};

// ─────────────────────────────────────────────────────────────
// INVESTOR PAGE DATA
// ─────────────────────────────────────────────────────────────

export interface RoadmapPhase {
	phase: number;
	title: string;
	timeframe: string;
	sector: string;
	sectorColor: string;
	description: string;
	milestones: string[];
	status: 'beachhead' | 'expansion' | 'scale';
}

export interface MarketOpportunity {
	sector: string;
	tam: string;
	tamLabel: string;
	cagr: string;
	color: string;
	colorRgb: string;
	insight: string;
}

export interface MoatPillar {
	title: string;
	description: string;
	icon: string;
	proof: string;
}

export interface InvestmentThesis {
	number: string;
	title: string;
	description: string;
	icon: string;
}

export const sQuantumModel = {
	hubName: 'S-Quantum Engine',
	hubDescription:
		'A centralized Group AI Innovation Hub — upskilling IT teams across all companies into "Group Innovators", pooling talent for breakthrough projects while keeping lean daily-ops teams at each subsidiary.',
	origin: 'Proven at Sinarmas Innovation Center (Techconnect Academy)',
	architect: {
		name: 'Edmund Situmorang',
		title: 'Managing Director, Techconnect Academy — Sinarmas Innovation Center',
		role: 'AI Strategy Architect, Mayapada Group'
	},
	benefits: [
		{ stat: '40+', label: 'Companies innovated from one hub' },
		{ stat: '80%', label: 'Reduction in duplicated IT spend' },
		{ stat: '10×', label: 'Innovation velocity vs siloed teams' }
	],
	spokes: [
		{ label: 'Healthcare', icon: '🏥', color: '#10b981' },
		{ label: 'Banking', icon: '🏦', color: '#3b82f6' },
		{ label: 'Property', icon: '🏙️', color: '#f59e0b' },
		{ label: 'Hospitality', icon: '🌴', color: '#f43f5e' },
		{ label: 'Retail', icon: '🛍️', color: '#8b5cf6' },
		{ label: 'Media', icon: '📡', color: '#06b6d4' }
	]
};

export const aiMedTech = {
	name: 'AI MedTech Company',
	tagline: "Indonesia's first AI-native medical technology company",
	description:
		"Purpose-built at the intersection of Mayapada Healthcare infrastructure and S-Quantum Engine's innovation model — developing AI diagnostic tools, medical imaging models, and clinical decision support systems for the Indonesian market and beyond.",
	strategicPartners: [
		{
			name: 'NVIDIA',
			focus: 'Clara · Holoscan · BioNeMo — GPU-accelerated medical imaging and drug discovery AI',
			icon: '⬛',
			color: '#76b900'
		},
		{
			name: 'Global Health Funds',
			focus: 'WHO, IFC, and sovereign wealth funds actively investing in SEA health infrastructure',
			icon: '🌐',
			color: '#3b82f6'
		},
		{
			name: 'MedTech Strategics',
			focus: 'Siemens Healthineers, Philips, GE Healthcare — seeking AI integration partners across SEA',
			icon: '🏥',
			color: '#10b981'
		}
	],
	comparables: [
		{ name: 'PathAI', raised: '$165M', focus: 'Pathology AI' },
		{ name: 'Tempus AI', raised: 'IPO 2024', focus: 'Clinical AI' },
		{ name: 'Viz.ai', raised: '$251M', focus: 'Care coordination AI' }
	],
	builds: [
		{ icon: '🔬', item: 'AI diagnostic engines integrated with Biomedilab' },
		{ icon: '🧬', item: 'Medical imaging models trained on Mayapada Hospital data' },
		{ icon: '🩺', item: 'Clinical decision support tools for hospital physicians' },
		{ icon: '🌏', item: 'Exportable AI platform for other Indonesian hospital groups' }
	]
};

export const roadmap: RoadmapPhase[] = [
	{
		phase: 1,
		title: 'AI Triage + Telemedicine',
		timeframe: '0 – 6 months',
		sector: 'Healthcare',
		sectorColor: '#10b981',
		status: 'beachhead',
		description:
			'Deploy AI-powered symptom triage at Mayapada Clinic Pratama locations — enabling 24/7 assessment and intelligent specialist routing.',
		milestones: ['AI triage MVP at 3 clinics', '10,000 patient sessions', 'Bahasa + English NLP model']
	},
	{
		phase: 2,
		title: 'Biomedilab AI Diagnostics',
		timeframe: '3 – 9 months',
		sector: 'Healthcare',
		sectorColor: '#10b981',
		status: 'beachhead',
		description:
			'Computer vision models analyzing X-rays, CT scans, and blood panels at Biomedilab — cutting report turnaround from 24h to under 2h.',
		milestones: [
			'Radiology AI at 2 lab sites',
			'40% reduction in report time',
			'Radiologist co-pilot tool live'
		]
	},
	{
		phase: 3,
		title: 'Customer 360° Data Layer',
		timeframe: '6 – 18 months',
		sector: 'Cross-Sector',
		sectorColor: '#d4af37',
		status: 'expansion',
		description:
			'Unified data platform connecting patient, banking, hotel, and retail touchpoints — the intelligence backbone powering the entire group.',
		milestones: [
			'Data lake ingesting 4 sectors',
			'Shared AI identity graph',
			'Privacy-compliant consent layer'
		]
	},
	{
		phase: 4,
		title: 'AI Credit for Health Financing',
		timeframe: '9 – 18 months',
		sector: 'Banking + Healthcare',
		sectorColor: '#3b82f6',
		status: 'expansion',
		description:
			'Bank Mayapada and Pohon Dana offer AI-underwritten healthcare financing products, powered by health and behavioral data.',
		milestones: [
			'Health installment product launch',
			'ML credit scoring model live',
			'Sompo insurance integration'
		]
	},
	{
		phase: 5,
		title: 'Wellness Hospitality Packages',
		timeframe: '12 – 24 months',
		sector: 'Hospitality + Healthcare',
		sectorColor: '#f43f5e',
		status: 'scale',
		description:
			"IHG hotels bundled with Mayapada Hospital health screenings and Biomedilab diagnostics — Indonesia's first AI-powered medical tourism product.",
		milestones: [
			'3 hotel–hospital bundles live',
			'Medical tourism platform',
			'International guest health packages'
		]
	}
];

export const marketOpportunities: MarketOpportunity[] = [
	{
		sector: 'Digital Health',
		tam: '$2.7B',
		tamLabel: 'Indonesia Digital Health Market by 2030',
		cagr: '27%',
		color: '#10b981',
		colorRgb: '16, 185, 129',
		insight: '98% of telemedicine users intend to continue post-COVID (Deloitte 2022)'
	},
	{
		sector: 'AI Fintech',
		tam: '$11.1B',
		tamLabel: 'Indonesia Fintech Market by 2033',
		cagr: '15%',
		color: '#3b82f6',
		colorRgb: '59, 130, 246',
		insight: '48% of adults still unbanked (World Bank 2021) — AI credit can unlock $234B MSME financing gap (IFC)'
	},
	{
		sector: 'PropTech AI',
		tam: '$1.9B',
		tamLabel: 'Southeast Asia PropTech by 2026',
		cagr: '22%',
		color: '#f59e0b',
		colorRgb: '245, 158, 11',
		insight: 'Smart building AI can cut energy costs 30% across the Mayapada Towers portfolio'
	},
	{
		sector: 'AI Media',
		tam: '$4.5B',
		tamLabel: 'Indonesia Digital Advertising by 2031',
		cagr: '6%',
		color: '#06b6d4',
		colorRgb: '6, 182, 212',
		insight:
			'Bloomberg partnership positions Mayapada as the premier AI-powered financial newsroom in Indonesia'
	}
];

export const moatPillars: MoatPillar[] = [
	{
		title: 'Data Depth',
		icon: '🧠',
		description:
			'40+ years of cross-sector customer relationships spanning banking, healthcare, property, travel, and media — generating continuous, structured, high-value data.',
		proof: '5 listed companies on 2 exchanges. Every transaction is a training signal.'
	},
	{
		title: 'Distribution at Scale',
		icon: '🌐',
		description:
			'170+ bank branches, 7+ hospitals, 9 hotels, duty-free shops, and 3+ TV networks. AI output reaches customers exactly where they already are.',
		proof: '19 provinces, 61 cities. Zero new customer acquisition cost to deploy AI products.'
	},
	{
		title: 'Institutional Trust',
		icon: '🏛️',
		description:
			'Mayapada is a regulated, publicly-listed entity with decades of customer relationships. OJK, BPOM, and all operating licenses already secured.',
		proof: '37 years of banking operations. Patients already consent. Regulators already know the name.'
	},
	{
		title: 'Capital & Execution',
		icon: '💎',
		description:
			"Founder net worth $11.9B (Forbes Oct 2025). Tahir Foundation's $100M+ Bill & Melinda Gates partnership demonstrates the group's global execution standard.",
		proof: '5 public entities provide direct access to capital markets for AI investment rounds.'
	}
];

export const moatComparison = {
	left: {
		label: 'AI Startup',
		items: [
			{ have: true, text: 'Strong AI engineering team' },
			{ have: true, text: 'Modern ML infrastructure' },
			{ have: false, text: 'Real patient data at scale' },
			{ have: false, text: 'Hospital network for deployment' },
			{ have: false, text: 'Banking + insurance distribution' },
			{ have: false, text: 'Regulatory licenses already held' },
			{ have: false, text: '40 years of customer trust' },
			{ have: false, text: 'Cross-sector data flywheel' }
		]
	},
	right: {
		label: 'Mayapada + AI MedTech',
		items: [
			{ have: true, text: 'S-Quantum Engine innovation model' },
			{ have: true, text: 'NVIDIA + cloud AI infrastructure' },
			{ have: true, text: 'Biomedilab + 7+ hospitals of real data' },
			{ have: true, text: 'Own the hospitals deploying the AI' },
			{ have: true, text: 'Bank Mayapada + Sompo integration' },
			{ have: true, text: 'OJK, BPOM, IDX licensed and listed' },
			{ have: true, text: 'Indonesia\'s most trusted conglomerate' },
			{ have: true, text: '6 sectors feeding one AI brain' }
		]
	}
};

export const investmentTheses: InvestmentThesis[] = [
	{
		number: '01',
		icon: '🔄',
		title: 'The Flywheel Multiplier',
		description:
			'Each AI investment in one sector compounds returns in all others. Healthcare AI data improves banking risk models. Banking data funds hospitality personalization. The more sectors connected, the faster the entire system accelerates — creating exponential returns from linear investment.'
	},
	{
		number: '02',
		icon: '🏰',
		title: 'The Unreplicable Moat',
		description:
			"No startup can acquire 37 years of institutional trust, 40+ operating companies, 5 stock listings, a presidential advisory track record, and real cross-sector patient and financial data. Mayapada's AI moat is the conglomerate itself — which is precisely why pure-play AI firms cannot compete here."
	},
	{
		number: '03',
		icon: '🌊',
		title: "Indonesia's AI Inflection Point",
		description:
			'278 million people. A young, digital-native population. A government actively incentivizing AI adoption and healthcare digitization. Mayapada is already positioned at the intersection of every major demand curve — health, finance, property, travel, and media — at exactly the right moment.'
	}
];
