/**
 * Seed script for About Page data
 * Run with: npx tsx scripts/seed-about-page.ts
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

// About page data based on Boxholm Cheese reference
const aboutPageData = {
	sectionVisibility: {
		history: true,
		customers: true,
		team: true,
		contact: true,
	},

	// History Section - Timeline design
	history: {
		badge: "Since 1890",
		title: "Our Little Story",
		subtitle: "The new story about tradition, craftsmanship and cheese from Boxholm",
		timelineItems: [
			{
				year: "1890",
				title: "The Beginning",
				description:
					"Cheese has been made in the area around Boxholm since time immemorial. In fact, northern Småland and southern Östergötland are an important place in the history of cheese, even before Boxholm's dairy started production in 1890 - then part of the centuries-old mill.",
				image: "/storage/images/about/history-1890.jpg",
			},
			{
				year: "1952",
				title: "Sweden's First Cream Cheese",
				description:
					"The solid knowledge of the craft has been passed down from generation to generation. From it was born Sweden's first commercially produced cream cheese in 1952, which has become one of Sweden's iconic cheeses, alongside Svecior, Herrgårdar and Präster.",
				image: "/storage/images/about/history-1952.jpg",
			},
			{
				year: "Today",
				title: "A Unique Product",
				description:
					"One of Sweden's most classic cheeses can now be found again in the cheese counter. Made with guaranteed Swedish milk from farms in and around Östergötland. The cheese from Boxholm is the only one to build on the traditional, artisanal manufacturing that has characterized production in the town since its inception in 1890.",
				image: "/storage/images/about/history-today.jpg",
			},
			{
				year: "Future",
				title: "Tradition Lives On",
				description:
					"This legacy now lives on. A Boxholm cheese should be made the way it has always been made, to the right recipe with the right ingredients and turned by hand by the cheese masters in Boxholm – all for the sake of good taste.",
				image: "/storage/images/about/history-future.jpg",
			},
		],
	},

	// Customers Section
	customers: {
		title: "Our Valued Customers",
		subtitle: "Partners who trust the quality of cheese from Boxholm",
		customers: [
			{
				name: "ICA Supermarket",
				logo: "/storage/images/customers/ica-logo.png",
				products: "Gräddost, Mästarost, Ribbing",
				description:
					"One of our largest retail partners, offering our full range of traditional cheeses to consumers across Sweden.",
				website: "https://www.ica.se",
			},
			{
				name: "Coop",
				logo: "/storage/images/customers/coop-logo.png",
				products: "Kryddost, Anno 1952, Chiliost",
				description:
					"A key distribution partner helping bring artisan cheese to households throughout the region.",
				website: "https://www.coop.se",
			},
			{
				name: "Willys",
				logo: "/storage/images/customers/willys-logo.png",
				products: "Bruksost, Gräddost",
				description:
					"Budget-conscious consumers can enjoy our quality cheese thanks to this partnership.",
				website: "https://www.willys.se",
			},
			{
				name: "Local Restaurants",
				logo: "/storage/images/customers/restaurant-logo.png",
				products: "Premium Mästarost, Ribbing, Specialty orders",
				description:
					"Fine dining establishments in Östergötland featuring our cheese on their menus.",
			},
			{
				name: "Ostbutiken Stockholm",
				logo: "/storage/images/customers/cheese-shop-logo.png",
				products: "Full assortment including aged varieties",
				description:
					"Specialty cheese shop showcasing the complete Boxholm range to cheese enthusiasts.",
				website: "https://ostbutiken.se",
			},
			{
				name: "Hotel & Conference Centers",
				logo: "/storage/images/customers/hotel-logo.png",
				products: "Breakfast assortment, Catering packages",
				description:
					"Hotels across Sweden serve our cheese at their breakfast buffets and events.",
			},
		],
	},

	// Team Section
	team: {
		title: "Meet Our Team",
		subtitle: "The people behind the quality cheese from Boxholm",
		members: [
			{
				name: "Erik Johansson",
				role: "Master Cheese Maker",
				department: "Production",
				image: "/storage/images/team/erik-johansson.jpg",
				bio: "With over 30 years of experience, Erik leads our cheese production with the traditional methods passed down through generations.",
				email: "erik@boxholmsost.se",
				phone: "+46 70 123 4567",
				linkedin: "https://linkedin.com/in/erik-johansson",
			},
			{
				name: "Anna Lindqvist",
				role: "Quality Manager",
				department: "Quality Control",
				image: "/storage/images/team/anna-lindqvist.jpg",
				bio: "Anna ensures every wheel of cheese meets our high standards before it leaves the dairy.",
				email: "anna@boxholmsost.se",
				phone: "+46 70 234 5678",
			},
			{
				name: "Lars Svensson",
				role: "Head of Sales",
				department: "Sales",
				image: "/storage/images/team/lars-svensson.jpg",
				bio: "Lars manages relationships with our retail and wholesale partners across Sweden.",
				email: "lars@boxholmsost.se",
				phone: "+46 70 345 6789",
				linkedin: "https://linkedin.com/in/lars-svensson",
			},
			{
				name: "Maria Andersson",
				role: "Marketing Director",
				department: "Marketing",
				image: "/storage/images/team/maria-andersson.jpg",
				bio: "Maria tells the story of Boxholm cheese to the world through our brand communications.",
				email: "maria@boxholmsost.se",
				linkedin: "https://linkedin.com/in/maria-andersson",
			},
			{
				name: "Johan Berg",
				role: "Production Supervisor",
				department: "Production",
				image: "/storage/images/team/johan-berg.jpg",
				bio: "Johan oversees daily operations in our cheese production facility.",
				email: "johan@boxholmsost.se",
				phone: "+46 70 456 7890",
			},
			{
				name: "Sofia Karlsson",
				role: "Customer Service Manager",
				department: "Customer Service",
				image: "/storage/images/team/sofia-karlsson.jpg",
				bio: "Sofia and her team ensure our customers always have a great experience.",
				email: "sofia@boxholmsost.se",
				phone: "+46 70 567 8901",
			},
		],
	},

	// Contact Section
	contact: {
		title: "Get In Touch",
		subtitle: "We'd love to hear from you - whether you're a customer, partner, or cheese enthusiast",
		showContactForm: true,
		showMap: true,
		showOffices: true,
	},

	// SEO
	seo: {
		title: "About Us - Boxholm Cheese | Traditional Swedish Cheese Since 1890",
		description:
			"Learn about the history, team, and tradition behind Boxholm cheese. Made with Swedish milk using artisanal methods since 1890.",
		ogImage: "/storage/images/og-about.jpg",
	},
};

async function seedAboutPage() {
	try {
		console.log("Connecting to MongoDB...");
		await mongoose.connect(MONGODB_URI!);
		console.log("Connected to MongoDB");

		const db = mongoose.connection.db;
		if (!db) {
			throw new Error("Database connection not established");
		}

		const collection = db.collection("about_page");

		// Check if document exists
		const existingDoc = await collection.findOne({});

		if (existingDoc) {
			console.log("About page document already exists. Updating...");
			await collection.updateOne(
				{},
				{ $set: { ...aboutPageData, updatedAt: new Date() } }
			);
			console.log("About page document updated successfully!");
		} else {
			console.log("Creating new about page document...");
			await collection.insertOne({
				...aboutPageData,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			console.log("About page document created successfully!");
		}

		console.log("\n========================================");
		console.log("ABOUT PAGE DATA SEEDED SUCCESSFULLY!");
		console.log("========================================\n");

		console.log("Page includes:");
		console.log("  - History Section with 4 timeline items");
		console.log("  - Customers Section with 6 customers");
		console.log("  - Team Section with 6 team members");
		console.log("  - Contact Section (linked to contact page)");

		console.log("\nOPTIONAL: Add the following images:");
		console.log("  - public/storage/images/about/history-*.jpg (timeline images)");
		console.log("  - public/storage/images/customers/*.png (customer logos)");
		console.log("  - public/storage/images/team/*.jpg (team photos)");
		console.log("  - public/storage/images/og-about.jpg (OG sharing image)");
		console.log("\n========================================\n");
	} catch (error) {
		console.error("Error seeding about page:", error);
	} finally {
		await mongoose.disconnect();
		console.log("Disconnected from MongoDB");
	}
}

seedAboutPage();
