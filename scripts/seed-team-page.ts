/**
 * Seed script for Team Page (Vårt Team) data - Cheese Theme
 * Run with: npx tsx scripts/seed-team-page.ts
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

// Team page data for Boxholm Cheese
const teamPageData = {
	sectionVisibility: {
		hero: true,
		stats: true,
		teamMembers: true,
		values: true,
		joinUs: true,
		contact: true,
		richContent: false,
	},

	// Hero Section
	hero: {
		badge: "Vårt Team",
		title: "Möt teamet bakom Boxholms Ost",
		subtitle:
			"Vi är ett dedikerat team av ostmästare, mjölkbönder och entusiaster som brinner för att skapa de finaste hantverksgjorda ostarna.",
	},

	// Stats Section
	stats: [
		{
			value: "100+",
			label: "År av tradition",
		},
		{
			value: "1000+",
			label: "Nöjda kunder",
		},
		{
			value: "15+",
			label: "Ostssorter",
		},
		{
			value: "5",
			label: "Generationer",
		},
	],

	// Team Members
	teamMembers: [
		{
			name: "Erik Lindgren",
			role: "VD & Ostmästare",
			department: "Ledning",
			bio: "Erik representerar femte generationen av ostmästare i familjen. Med över 30 års erfarenhet leder han mejeriet med samma passion som sina förfäder.",
			image: "/storage/images/team/placeholder.jpg",
			email: "erik@boxholmsost.se",
			linkedin: "https://linkedin.com/in/",
			phone: "+46 142-510 50",
		},
		{
			name: "Anna Bergström",
			role: "Produktionschef",
			department: "Produktion",
			bio: "Anna ansvarar för all osttillverkning och säkerställer att varje ost håller högsta kvalitet. Hennes expertis inom mjölkkemi är oöverträffad.",
			image: "/storage/images/team/placeholder.jpg",
			email: "anna@boxholmsost.se",
			linkedin: "https://linkedin.com/in/",
		},
		{
			name: "Lars Johansson",
			role: "Kvalitetsansvarig",
			department: "Kvalitet",
			bio: "Lars övervakar alla kvalitetskontroller och certifieringar. Han ser till att våra ostar alltid uppfyller de strängaste standarderna.",
			image: "/storage/images/team/placeholder.jpg",
			email: "lars@boxholmsost.se",
		},
		{
			name: "Maria Svensson",
			role: "Försäljningschef",
			department: "Försäljning",
			bio: "Maria leder vårt säljteam och bygger relationer med återförsäljare och restauranger över hela Sverige. Hennes mål är att sprida kärleken till hantverksost.",
			image: "/storage/images/team/placeholder.jpg",
			email: "maria@boxholmsost.se",
		},
		{
			name: "Johan Pettersson",
			role: "Mejeriingenjör",
			department: "Teknik",
			bio: "Johan kombinerar traditionella metoder med modern teknik för att optimera vår produktion utan att kompromissa med kvaliteten.",
			image: "/storage/images/team/placeholder.jpg",
			email: "johan@boxholmsost.se",
		},
		{
			name: "Karin Andersson",
			role: "Kundservice",
			department: "Support",
			bio: "Karin är första kontakten för våra kunder och hjälper med allt från beställningar till produktrekommendationer.",
			image: "/storage/images/team/placeholder.jpg",
			email: "kundservice@boxholmsost.se",
			phone: "+46 142-510 50",
		},
	],

	// Values Section
	valuesSection: {
		title: "Våra värderingar",
		subtitle:
			"Det som driver oss varje dag är kärleken till hantverksost och respekten för traditioner.",
		values: [
			{
				title: "Tradition",
				description:
					"Vi bevarar och hedrar de traditionella metoderna som gått i arv genom generationer, samtidigt som vi utvecklas med tiden.",
			},
			{
				title: "Kvalitet",
				description:
					"Varje ost vi producerar representerar vårt engagemang för högsta kvalitet - från mjölken till den färdiga produkten.",
			},
			{
				title: "Hantverk",
				description:
					"Vi tror på kraften i handgjorda produkter. Varje ost formas med omsorg av erfarna ostmästare.",
			},
			{
				title: "Hållbarhet",
				description:
					"Vi arbetar med lokala mjölkbönder och strävar efter hållbara metoder som är bra för både miljön och våra produkter.",
			},
		],
	},

	// Join Us Section
	joinUs: {
		title: "Vill du bli en del av vårt team?",
		description:
			"Vi söker passionerade människor som delar vår kärlek till hantverksost och vill vara med och föra traditionen vidare. Se våra lediga tjänster eller skicka en spontanansökan.",
		primaryCta: {
			text: "Se lediga tjänster",
			href: "/careers",
		},
		secondaryCta: {
			text: "Skicka spontanansökan",
			href: "/contact-us",
		},
	},

	// Contact Section
	contact: {
		title: "Kontakta oss",
		description:
			"Har du frågor eller vill veta mer om vårt team och våra ostar? Vi finns här för dig.",
		phone: "+46 142-510 50",
		email: "info@boxholmsost.se",
	},

	// Rich Content (HTML)
	richContent: "",

	// SEO
	seo: {
		title: "Vårt Team | Boxholms Ost",
		description:
			"Möt teamet bakom Boxholms Ost - erfarna ostmästare och entusiaster som brinner för hantverksgjorda ostar med över 100 års tradition.",
		ogImage: "/storage/images/og-team.jpg",
	},
};

async function seedTeamPage() {
	try {
		console.log("Connecting to MongoDB...");
		await mongoose.connect(MONGODB_URI!);
		console.log("Connected to MongoDB");

		const db = mongoose.connection.db;
		if (!db) {
			throw new Error("Database connection not established");
		}

		const collection = db.collection("team_page");

		// Check if document exists
		const existingDoc = await collection.findOne({});

		if (existingDoc) {
			console.log("Team page document already exists. Updating...");
			await collection.updateOne(
				{},
				{ $set: { ...teamPageData, updatedAt: new Date() } }
			);
			console.log("Team page document updated successfully!");
		} else {
			console.log("Creating new team page document...");
			await collection.insertOne({
				...teamPageData,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			console.log("Team page document created successfully!");
		}

		console.log("\n========================================");
		console.log("TEAM PAGE DATA SEEDED SUCCESSFULLY!");
		console.log("========================================\n");
		console.log("Preview at: /about-us/team");
	} catch (error) {
		console.error("Error seeding team page:", error);
	} finally {
		await mongoose.disconnect();
		console.log("Disconnected from MongoDB");
	}
}

seedTeamPage();
