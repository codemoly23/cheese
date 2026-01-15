/**
 * Seed script for Cheese/Dairy Farm Home Page
 * Converts the site from medical equipment to cheese/dairy theme
 * Run with: npx tsx scripts/seed-cheese-home.ts
 */

import mongoose from "mongoose";
import * as fs from "fs";
import * as path from "path";

// Load .env file manually (since we're outside Next.js)
function loadEnvFile() {
	const envFiles = [".env.local", ".env"];

	for (const envFile of envFiles) {
		const envPath = path.resolve(process.cwd(), envFile);
		if (fs.existsSync(envPath)) {
			console.log(`Loading environment from ${envFile}...`);
			const content = fs.readFileSync(envPath, "utf-8");
			for (const line of content.split("\n")) {
				const trimmed = line.trim();
				if (!trimmed || trimmed.startsWith("#")) continue;
				const eqIndex = trimmed.indexOf("=");
				if (eqIndex === -1) continue;
				const key = trimmed.slice(0, eqIndex).trim();
				let value = trimmed.slice(eqIndex + 1).trim();
				if (
					(value.startsWith('"') && value.endsWith('"')) ||
					(value.startsWith("'") && value.endsWith("'"))
				) {
					value = value.slice(1, -1);
				}
				if (!process.env[key]) {
					process.env[key] = value;
				}
			}
			break;
		}
	}
}

loadEnvFile();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	console.error("MONGODB_URI is not defined in environment variables");
	process.exit(1);
}

// Cheese/Dairy Farm Home Page Data - Milatte style
const homePageData = {
	sectionVisibility: {
		hero: true,
		categoryShowcase: true,
		productCarousel: true,
		promoBanner: true,
		featureBanner: true,
		features: true,
		productShowcase: true,
		imageGallery: true,
		processSteps: true,
		about: true,
		testimonials: true,
		cta: true,
		richContent: false,
	},

	// Category Showcase Section - displays product categories on home page
	categoryShowcase: {
		badge: "OUR PRODUCTS",
		title: "Natural Dairy Products",
		maxCategories: 3,
	},

	// Product Carousel Section - displays featured products on home page
	productCarousel: {
		badge: "BUY ONLINE",
		title: "Popular Products",
		maxProducts: 6,
	},

	// Promo Banner Section - 1:2 layout with two banners
	promoBanner: {
		leftBanner: {
			badge: "NEW ARRIVALS",
			title: "Fresh Artisan Cheese",
			subtitle: "",
			description: "Handcrafted with care from locally sourced milk. Experience the authentic taste of traditional cheese making.",
			image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=1000&fit=crop",
			ctaText: "",
			ctaHref: "",
		},
		rightBanner: {
			badge: "Award Winning",
			title: "Best Dairy Farm",
			subtitle: "2024",
			description: "",
			image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800&h=1000&fit=crop",
			ctaText: "LEARN MORE",
			ctaHref: "/about",
		},
	},

	// Feature Banner Section - white background with image, title with highlight, and feature cards
	featureBanner: {
		image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&h=500&fit=crop",
		title: "Our farm uses eco-friendly technologies and practices to minimize the environmental impact.",
		titleHighlight: "eco-friendly",
		features: [
			{
				icon: "Leaf",
				title: "100% Organic Product",
				description: "Guaranteed quality from our farm to your table",
			},
			{
				icon: "MilkOff",
				title: "High Quality Milk",
				description: "Freshness and naturalness are the main principles of our production",
			},
			{
				icon: "Package",
				title: "Wide Assortment",
				description: "We produce not only traditional but also innovative products",
			},
			{
				icon: "Box",
				title: "Perfect Packaging",
				description: "Freshness and naturalness are the main principles of our production",
			},
		],
	},

	// Hero Section - Slider Mode (Milatte style)
	hero: {
		isSlider: true,
		autoPlayInterval: 6000,
		slides: [
			{
				badge: "BORN OF NATURE",
				title: "TRADITIONS OF QUALITY IN EVERY BITE",
				subtitle:
					"We carefully follow traditions passed down through generations to ensure every wheel of cheese is flawless. We use only natural ingredients and age our cheeses in special conditions.",
				backgroundImage: "/storage/images/hero/hero-cows.jpg",
				ctaText: "READ MORE",
				ctaHref: "/about",
				isActive: true,
			},
			{
				badge: "BORN OF NATURE",
				title: "A TASTE BORN IN THE MEADOWS",
				subtitle:
					"We carefully follow traditions passed down through generations to ensure every wheel of cheese is flawless. We use only natural ingredients and age our cheeses in special conditions.",
				backgroundImage: "/storage/images/hero/hero-cheese.jpg",
				ctaText: "READ MORE",
				ctaHref: "/store",
				isActive: true,
			},
			{
				badge: "ARTISAN CRAFTED",
				title: "FROM OUR FARM TO YOUR TABLE",
				subtitle:
					"Experience the authentic taste of handcrafted dairy products made with love and dedication. Every product tells a story of passion and quality.",
				backgroundImage: "/storage/images/hero/hero-farm.jpg",
				ctaText: "EXPLORE",
				ctaHref: "/products",
				isActive: true,
			},
		],
		// Legacy fields (not used in slider mode but kept for fallback)
		badge: "",
		title: "",
		titleHighlight: "",
		subtitle: "",
		backgroundImage: "",
		mainImage: "",
	},

	// Features Section - Dairy/Cheese USPs
	features: [
		{
			icon: "Leaf",
			title: "100% Natural",
			description:
				"All our products are made from pure, natural ingredients without any artificial additives or preservatives.",
		},
		{
			icon: "Award",
			title: "Award Winning",
			description:
				"Our cheeses have won numerous awards for their exceptional taste and quality craftsmanship.",
		},
		{
			icon: "Clock",
			title: "Traditional Methods",
			description:
				"We use time-honored techniques passed down through generations to create authentic flavors.",
		},
		{
			icon: "Heart",
			title: "Made with Love",
			description:
				"Every product is crafted with passion and care by our dedicated artisan cheesemakers.",
		},
		{
			icon: "Truck",
			title: "Farm Fresh Delivery",
			description:
				"Get fresh dairy products delivered straight from our farm to your doorstep.",
		},
		{
			icon: "Shield",
			title: "Quality Guaranteed",
			description:
				"We stand behind every product with our 100% satisfaction guarantee.",
		},
	],

	// Product Showcase Section
	productShowcase: {
		title: "Natural Dairy Products",
		subtitle:
			"Discover our range of artisan cheeses and dairy products, crafted with care using traditional methods",
		ctaText: "View All Products",
		ctaHref: "/store",
		products: [
			{
				name: "Aged Cheddar",
				category: "Hard Cheese",
				description:
					"Our signature aged cheddar, matured for 18 months to develop a rich, complex flavor with crystalline texture.",
				status: "Best Seller",
				image: "/storage/images/products/aged-cheddar.jpg",
				href: "/store/aged-cheddar",
			},
			{
				name: "Creamy Brie",
				category: "Soft Cheese",
				description:
					"A luxuriously creamy brie with a bloomy white rind and buttery, earthy flavor that melts in your mouth.",
				status: "Popular",
				image: "/storage/images/products/creamy-brie.jpg",
				href: "/store/creamy-brie",
			},
			{
				name: "Fresh Mozzarella",
				category: "Fresh Cheese",
				description:
					"Hand-pulled mozzarella made fresh daily. Perfect for salads, pizzas, or simply enjoyed with olive oil.",
				status: "New",
				image: "/storage/images/products/fresh-mozzarella.jpg",
				href: "/store/fresh-mozzarella",
			},
			{
				name: "Farmhouse Butter",
				category: "Dairy",
				description:
					"Rich, golden butter churned from fresh cream. A taste of pure countryside in every spread.",
				status: "",
				image: "/storage/images/products/farmhouse-butter.jpg",
				href: "/store/farmhouse-butter",
			},
		],
	},

	// Image Gallery Section
	imageGallery: {
		badge: "Our Story",
		title: "From Farm to Table",
		subtitle:
			"Experience the journey of our dairy products from our beautiful countryside farm",
		images: [
			{
				src: "/storage/images/gallery/farm-landscape.jpg",
				title: "Our Farm",
				subtitle:
					"Nestled in the rolling hills, our farm provides the perfect environment for happy, healthy cows.",
			},
			{
				src: "/storage/images/gallery/cheese-making.jpg",
				title: "Artisan Craftsmanship",
				subtitle:
					"Watch our master cheesemakers transform fresh milk into exceptional cheese using traditional methods.",
			},
			{
				src: "/storage/images/gallery/aging-cellar.jpg",
				title: "Aging Cellars",
				subtitle:
					"Our temperature-controlled cellars provide the perfect conditions for aging our cheeses to perfection.",
			},
			{
				src: "/storage/images/gallery/happy-cows.jpg",
				title: "Happy Cows",
				subtitle:
					"Our grass-fed cows roam freely, producing the rich, flavorful milk that makes our cheese special.",
			},
		],
		ctaTitle: "Visit Our Farm",
		ctaSubtitle:
			"Experience the beauty of our dairy farm and see how our products are made",
		ctaButtonText: "Book a Tour",
	},

	// Process Steps Section
	processStepsSection: {
		badge: "Our Process",
		title: "How We Make Our Cheese",
		subtitle: "From fresh milk to aged perfection - every step matters",
		steps: [
			{
				stepNumber: "01",
				title: "Fresh Milk Collection",
				description:
					"Every morning, we collect fresh milk from our grass-fed cows, ensuring the highest quality starting point.",
				icon: "Milk",
			},
			{
				stepNumber: "02",
				title: "Traditional Crafting",
				description:
					"Our master cheesemakers use traditional techniques to transform the milk into curds and whey.",
				icon: "ChefHat",
			},
			{
				stepNumber: "03",
				title: "Careful Aging",
				description:
					"Each cheese is aged in our climate-controlled cellars, developing its unique flavor profile.",
				icon: "Clock",
			},
			{
				stepNumber: "04",
				title: "Quality Testing",
				description:
					"Before reaching you, every batch is tested by our experts to ensure it meets our high standards.",
				icon: "CheckCircle",
			},
		],
	},

	// About Section
	aboutSection: {
		badge: "About Milatte Farm",
		title: "A Family Tradition of",
		titleHighlight: "Quality & Excellence",
		content: `For over three generations, our family has been dedicated to producing the finest artisan cheeses and dairy products. What started as a small family farm has grown into a beloved local institution, known for our commitment to quality and traditional methods.

Our farm sits on 200 acres of pristine countryside, where our grass-fed cows graze freely on lush pastures. We believe that happy cows produce the best milk, and the best milk makes the finest cheese.

Every wheel of cheese that leaves our farm carries with it our family's dedication to excellence. From the morning milk collection to the final aging process, we oversee every step to ensure you receive nothing but the best.`,
		image: "/storage/images/about/family-farm.jpg",
		benefits: [
			"100% grass-fed, free-range dairy cows",
			"No artificial preservatives or additives",
			"Traditional cheese-making methods",
			"Award-winning artisan cheeses",
			"Family-owned for three generations",
			"Sustainable farming practices",
		],
		primaryCta: {
			text: "Learn Our Story",
			href: "/about",
			variant: "primary",
		},
		secondaryCta: {
			text: "Visit the Farm",
			href: "/contact",
			variant: "outline",
		},
		certificationBadge: {
			title: "Certified Organic",
			description: "USDA certified organic dairy farm",
		},
	},

	// Testimonials Section
	testimonialsSection: {
		title: "What Our Customers Say",
		subtitle:
			"Join thousands of happy customers who have discovered the Milatte difference",
		testimonials: [
			{
				quote:
					"The aged cheddar from Milatte Farm is absolutely incredible. You can taste the quality and care in every bite. My family won't eat any other cheese now!",
				author: "Sarah Mitchell",
				role: "Food Blogger",
				company: "The Culinary Journey",
			},
			{
				quote:
					"As a chef, I'm very particular about my ingredients. Milatte's mozzarella is the freshest I've ever used - it's transformed our caprese salads.",
				author: "Marco Rossi",
				role: "Executive Chef",
				company: "Bella Vista Restaurant",
			},
			{
				quote:
					"I've been ordering from Milatte Farm for years. The consistency and quality are unmatched. Plus, knowing it's sustainably produced makes it even better.",
				author: "Emma Thompson",
				role: "Home Cook",
				company: "Loyal Customer",
			},
		],
	},

	// CTA Section
	ctaSection: {
		title: "Ready to Taste the Difference?",
		subtitle:
			"Order our artisan cheeses and dairy products today, or visit our farm for a tour",
		phoneTitle: "Call Us",
		phoneSubtitle: "+1 (555) 123-4567",
		emailTitle: "Email Us",
		emailSubtitle: "hello@milattefarm.com",
		formTitle: "Get in Touch",
		formSubtitle: "Fill out the form and we'll get back to you within 24 hours",
		formCtaText: "Send Message",
	},

	// SEO
	seo: {
		title: "Milatte Farm - Artisan Cheese & Natural Dairy Products",
		description:
			"Discover premium artisan cheeses and natural dairy products from Milatte Farm. Family-owned, traditionally crafted, and made with love for over three generations.",
		ogImage: "/storage/images/og-image.jpg",
	},
};

// Site Settings Data for Cheese Theme
const siteSettingsData = {
	companyName: "Milatte Dairy Farm",
	orgNumber: "123-456-789",
	vatNumber: "US123456789",
	phone: "+1 (555) 123-4567",
	email: "hello@milattefarm.com",
	noreplyEmail: "noreply@milattefarm.com",
	offices: [
		{
			name: "Main Farm",
			street: "1234 Countryside Lane",
			postalCode: "12345",
			city: "Green Valley",
			country: "USA",
			isHeadquarters: true,
			isVisible: true,
		},
		{
			name: "City Store",
			street: "567 Market Street",
			postalCode: "67890",
			city: "Downtown",
			country: "USA",
			isHeadquarters: false,
			isVisible: true,
		},
	],
	socialMedia: {
		facebook: "https://www.facebook.com/milattefarm",
		instagram: "https://www.instagram.com/milattefarm",
		twitter: "https://www.twitter.com/milattefarm",
		youtube: "https://www.youtube.com/milattefarm",
	},
	seo: {
		siteName: "Milatte Farm",
		siteDescription:
			"Premium artisan cheeses and natural dairy products from our family farm. Traditionally crafted with love for over three generations.",
	},
	branding: {
		logoUrl: "/storage/images/milatte-logo.svg",
	},
	footer: {
		banner: {
			enabled: true,
			backgroundImage: "/storage/images/footer/footer-banner.jpg",
			badge: "CHEESEMAKING",
			title: "We make the creative solutions for modern brands.",
			ctaText: "About Us",
			ctaHref: "/about",
		},
		quickLinksTitle: "Links",
		contactTitle: "Office",
		newsletterTitle: "Stay Updated",
		quickLinks: [
			{ label: "About Us", href: "/about" },
			{ label: "Our Products", href: "/store" },
			{ label: "Farm Tours", href: "/tours" },
			{ label: "Articles", href: "/articles" },
			{ label: "Contact", href: "/contact" },
		],
		newsletterDescription:
			"Subscribe to get updates on new products, recipes, and farm news.",
		newsletterPlaceholder: "Your email address",
		newsletterButtonText: "Subscribe",
		bottomLinks: [
			{ label: "Privacy Policy", href: "/privacy" },
			{ label: "Terms of Service", href: "/terms" },
			{ label: "Sitemap", href: "/sitemap.xml" },
		],
	},
};

// Sample Products Data for Cheese Theme
const productsData = [
	{
		title: "Premium Aged Cheddar",
		slug: "premium-aged-cheddar",
		description: "Our signature aged cheddar, matured for 18 months to develop a rich, complex flavor with crystalline texture. Perfect for cheese boards and gourmet cooking.",
		shortDescription: "18-month aged cheddar with rich, complex flavor",
		productImages: [
			"https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=800&fit=crop",
		],
		publishType: "publish",
		visibility: "public",
		benefits: ["Rich flavor", "Perfect for cheese boards", "Aged 18 months"],
	},
	{
		title: "Creamy French Brie",
		slug: "creamy-french-brie",
		description: "A luxuriously creamy brie with a bloomy white rind and buttery, earthy flavor that melts in your mouth. Ideal for entertaining.",
		shortDescription: "Luxuriously creamy brie with bloomy white rind",
		productImages: [
			"https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800&h=800&fit=crop",
		],
		publishType: "publish",
		visibility: "public",
		benefits: ["Creamy texture", "Bloomy rind", "Perfect for entertaining"],
	},
	{
		title: "Fresh Mozzarella",
		slug: "fresh-mozzarella",
		description: "Hand-pulled mozzarella made fresh daily. Perfect for salads, pizzas, or simply enjoyed with olive oil and fresh basil.",
		shortDescription: "Hand-pulled fresh mozzarella, made daily",
		productImages: [
			"https://images.unsplash.com/photo-1571024057537-71b8c79df19e?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1634487359989-3e90c9432133?w=800&h=800&fit=crop",
		],
		publishType: "publish",
		visibility: "public",
		benefits: ["Made fresh daily", "Hand-pulled", "Great for pizza"],
	},
	{
		title: "Farmhouse Butter",
		slug: "farmhouse-butter",
		description: "Rich, golden butter churned from fresh cream. A taste of pure countryside in every spread. Perfect for baking and cooking.",
		shortDescription: "Rich golden butter from fresh cream",
		productImages: [
			"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=800&fit=crop",
		],
		publishType: "publish",
		visibility: "public",
		benefits: ["Fresh cream", "Rich flavor", "Great for baking"],
	},
	{
		title: "Gorgonzola Blue",
		slug: "gorgonzola-blue",
		description: "Bold and creamy Italian blue cheese with distinctive blue-green veins. Aged to perfection for a tangy, complex flavor.",
		shortDescription: "Italian blue cheese with bold, tangy flavor",
		productImages: [
			"https://images.unsplash.com/photo-1626957341926-98752fc2ba90?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800&h=800&fit=crop",
		],
		publishType: "publish",
		visibility: "public",
		benefits: ["Bold flavor", "Creamy texture", "Aged to perfection"],
	},
	{
		title: "Gruyère Reserve",
		slug: "gruyere-reserve",
		description: "Swiss-style Gruyère aged for 12 months. Nutty, slightly sweet flavor perfect for fondue and gratins.",
		shortDescription: "12-month aged Swiss-style Gruyère",
		productImages: [
			"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=800&h=800&fit=crop",
		],
		publishType: "publish",
		visibility: "public",
		benefits: ["Nutty flavor", "Great for fondue", "12-month aged"],
	},
	{
		title: "Organic Whole Milk",
		slug: "organic-whole-milk",
		description: "Fresh organic whole milk from our grass-fed cows. Rich in nutrients and naturally creamy.",
		shortDescription: "Fresh organic milk from grass-fed cows",
		productImages: [
			"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=800&fit=crop",
		],
		publishType: "publish",
		visibility: "public",
		benefits: ["Organic", "Grass-fed", "Rich in nutrients"],
	},
	{
		title: "Greek Style Yogurt",
		slug: "greek-style-yogurt",
		description: "Thick, creamy Greek-style yogurt made from our farm-fresh milk. High in protein and probiotics.",
		shortDescription: "Thick creamy Greek yogurt, high in protein",
		productImages: [
			"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=800&fit=crop",
			"https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=800&h=800&fit=crop",
		],
		publishType: "publish",
		visibility: "public",
		benefits: ["High protein", "Probiotics", "Thick and creamy"],
	},
];

// Sample Categories Data for Cheese Theme with Unsplash images
const categoriesData = [
	{
		name: "Fresh Milk",
		slug: "fresh-milk",
		description: "Farm-fresh milk straight from our happy, grass-fed cows. Available in whole, low-fat, and skim varieties.",
		image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=1000&fit=crop",
		order: 1,
		isActive: true,
		seo: {
			title: "Fresh Milk | Milatte Farm",
			description: "Farm-fresh milk from grass-fed cows. Organic, delicious, and delivered fresh to your door.",
		},
	},
	{
		name: "Blue Cheeses",
		slug: "blue-cheeses",
		description: "Rich, bold blue cheeses aged to perfection in our temperature-controlled caves.",
		image: "https://images.unsplash.com/photo-1626957341926-98752fc2ba90?w=800&h=1000&fit=crop",
		order: 2,
		isActive: true,
		seo: {
			title: "Blue Cheeses | Milatte Farm",
			description: "Artisan blue cheeses crafted with traditional methods. Bold flavors, creamy textures.",
		},
	},
	{
		name: "Dairy Products",
		slug: "dairy-products",
		description: "Premium butter, cream, yogurt, and other dairy delights made fresh daily.",
		image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&h=1000&fit=crop",
		order: 3,
		isActive: true,
		seo: {
			title: "Dairy Products | Milatte Farm",
			description: "Fresh butter, cream, yogurt and more. All made from the finest farm-fresh milk.",
		},
	},
	{
		name: "Aged Cheeses",
		slug: "aged-cheeses",
		description: "Our carefully aged cheeses develop complex, rich flavors over months of patient aging.",
		image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=1000&fit=crop",
		order: 4,
		isActive: true,
		seo: {
			title: "Aged Cheeses | Milatte Farm",
			description: "Premium aged cheeses with rich, complex flavors developed over months of careful aging.",
		},
	},
	{
		name: "Soft Cheeses",
		slug: "soft-cheeses",
		description: "Creamy brie, camembert, and other soft-ripened cheeses for the gourmet palate.",
		image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&h=1000&fit=crop",
		order: 5,
		isActive: true,
		seo: {
			title: "Soft Cheeses | Milatte Farm",
			description: "Luxuriously creamy soft cheeses including brie, camembert, and more.",
		},
	},
];

async function seedCheeseHomePage() {
	try {
		console.log("Connecting to MongoDB...");
		await mongoose.connect(MONGODB_URI!);
		console.log("Connected to MongoDB");

		const db = mongoose.connection.db;
		if (!db) {
			throw new Error("Database connection not established");
		}

		// Seed Categories
		console.log("\n--- Seeding Categories ---");
		const categoriesCollection = db.collection("categories");

		for (const category of categoriesData) {
			const existing = await categoriesCollection.findOne({ slug: category.slug });
			if (existing) {
				console.log(`Updating category: ${category.name}`);
				await categoriesCollection.updateOne(
					{ slug: category.slug },
					{ $set: { ...category, updatedAt: new Date() } }
				);
			} else {
				console.log(`Creating category: ${category.name}`);
				await categoriesCollection.insertOne({
					...category,
					parent: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			}
		}
		console.log("Categories seeded successfully!");

		// Seed Products
		console.log("\n--- Seeding Products ---");
		const productsCollection = db.collection("products");

		for (const product of productsData) {
			const existing = await productsCollection.findOne({ slug: product.slug });
			if (existing) {
				console.log(`Updating product: ${product.title}`);
				await productsCollection.updateOne(
					{ slug: product.slug },
					{ $set: { ...product, updatedAt: new Date() } }
				);
			} else {
				console.log(`Creating product: ${product.title}`);
				await productsCollection.insertOne({
					...product,
					categories: [],
					primaryCategory: null,
					qa: [],
					techSpecifications: [],
					documentation: [],
					beforeAfterImages: [],
					seo: {},
					purchaseInfo: {},
					publishedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			}
		}
		console.log("Products seeded successfully!");

		// Update Home Page
		console.log("\n--- Seeding Home Page ---");
		const homeCollection = db.collection("home_page");
		const existingHome = await homeCollection.findOne({});

		if (existingHome) {
			console.log("Home page document exists. Updating...");
			await homeCollection.updateOne(
				{},
				{ $set: { ...homePageData, updatedAt: new Date() } }
			);
			console.log("Home page updated successfully!");
		} else {
			console.log("Creating new home page document...");
			await homeCollection.insertOne({
				...homePageData,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			console.log("Home page created successfully!");
		}

		// Update Site Settings
		console.log("\n--- Seeding Site Settings ---");
		const settingsCollection = db.collection("site_settings");
		const existingSettings = await settingsCollection.findOne({});

		if (existingSettings) {
			console.log("Site settings document exists. Updating...");
			await settingsCollection.updateOne(
				{},
				{ $set: { ...siteSettingsData, updatedAt: new Date() } }
			);
			console.log("Site settings updated successfully!");
		} else {
			console.log("Creating new site settings document...");
			await settingsCollection.insertOne({
				...siteSettingsData,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			console.log("Site settings created successfully!");
		}

		console.log("\n========================================");
		console.log("CHEESE THEME DATA SEEDED SUCCESSFULLY!");
		console.log("========================================\n");

		console.log("IMPORTANT: Add the following images to your project:");
		console.log("\nHero Slides:");
		console.log("  - public/storage/images/hero/hero-cows.jpg");
		console.log("  - public/storage/images/hero/hero-cheese.jpg");
		console.log("  - public/storage/images/hero/hero-farm.jpg");
		console.log("\nProduct Images:");
		console.log("  - public/storage/images/products/aged-cheddar.jpg");
		console.log("  - public/storage/images/products/creamy-brie.jpg");
		console.log("  - public/storage/images/products/fresh-mozzarella.jpg");
		console.log("  - public/storage/images/products/farmhouse-butter.jpg");
		console.log("\nGallery Images:");
		console.log("  - public/storage/images/gallery/farm-landscape.jpg");
		console.log("  - public/storage/images/gallery/cheese-making.jpg");
		console.log("  - public/storage/images/gallery/aging-cellar.jpg");
		console.log("  - public/storage/images/gallery/happy-cows.jpg");
		console.log("\nCategory Images:");
		console.log("  - public/storage/images/categories/fresh-milk.jpg");
		console.log("  - public/storage/images/categories/blue-cheese.jpg");
		console.log("  - public/storage/images/categories/dairy-products.jpg");
		console.log("  - public/storage/images/categories/aged-cheese.jpg");
		console.log("  - public/storage/images/categories/soft-cheese.jpg");
		console.log("\nAbout Section:");
		console.log("  - public/storage/images/about/family-farm.jpg");
		console.log("\nBranding:");
		console.log("  - public/storage/images/milatte-logo.svg");
		console.log("  - public/storage/images/og-image.jpg");
		console.log("\nFooter Banner:");
		console.log("  - public/storage/images/footer/footer-banner.jpg");
		console.log("\n========================================\n");
	} catch (error) {
		console.error("Error seeding cheese data:", error);
	} finally {
		await mongoose.disconnect();
		console.log("Disconnected from MongoDB");
	}
}

seedCheeseHomePage();
