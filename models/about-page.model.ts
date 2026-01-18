import mongoose, { Schema, Model, Document } from "mongoose";
import { connectMongoose } from "@/lib/db/db-connect";

// ============================================================================
// SECTION VISIBILITY
// ============================================================================
export interface IAboutSectionVisibility {
	history: boolean;
	customers: boolean;
	team: boolean;
	contact: boolean;
}

const AboutSectionVisibilitySchema = new Schema<IAboutSectionVisibility>(
	{
		history: { type: Boolean, default: true },
		customers: { type: Boolean, default: true },
		team: { type: Boolean, default: true },
		contact: { type: Boolean, default: true },
	},
	{ _id: false }
);

// ============================================================================
// HISTORY SECTION (Timeline Design)
// ============================================================================
export interface IHistoryTimelineItem {
	year: string;
	title: string;
	description: string;
	image?: string;
}

export interface IHistorySection {
	badge?: string;
	title?: string;
	subtitle?: string;
	timelineItems?: IHistoryTimelineItem[];
}

const HistoryTimelineItemSchema = new Schema<IHistoryTimelineItem>(
	{
		year: { type: String, trim: true },
		title: { type: String, trim: true },
		description: { type: String, trim: true },
		image: { type: String, trim: true },
	},
	{ _id: false }
);

const HistorySectionSchema = new Schema<IHistorySection>(
	{
		badge: { type: String, trim: true },
		title: { type: String, trim: true },
		subtitle: { type: String, trim: true },
		timelineItems: { type: [HistoryTimelineItemSchema], default: [] },
	},
	{ _id: false }
);

// ============================================================================
// CUSTOMERS SECTION
// ============================================================================
export interface ICustomerItem {
	name: string;
	logo?: string;
	products?: string;
	description?: string;
	website?: string;
}

export interface ICustomersSection {
	title?: string;
	subtitle?: string;
	customers?: ICustomerItem[];
}

const CustomerItemSchema = new Schema<ICustomerItem>(
	{
		name: { type: String, trim: true },
		logo: { type: String, trim: true },
		products: { type: String, trim: true },
		description: { type: String, trim: true },
		website: { type: String, trim: true },
	},
	{ _id: false }
);

const CustomersSectionSchema = new Schema<ICustomersSection>(
	{
		title: { type: String, trim: true },
		subtitle: { type: String, trim: true },
		customers: { type: [CustomerItemSchema], default: [] },
	},
	{ _id: false }
);

// ============================================================================
// TEAM SECTION
// ============================================================================
export interface ITeamMember {
	name: string;
	role: string;
	image?: string;
	email?: string;
	phone?: string;
	linkedin?: string;
	department?: string;
	bio?: string;
}

export interface ITeamSection {
	title?: string;
	subtitle?: string;
	members?: ITeamMember[];
}

const TeamMemberSchema = new Schema<ITeamMember>(
	{
		name: { type: String, trim: true },
		role: { type: String, trim: true },
		image: { type: String, trim: true },
		email: { type: String, trim: true },
		phone: { type: String, trim: true },
		linkedin: { type: String, trim: true },
		department: { type: String, trim: true },
		bio: { type: String, trim: true },
	},
	{ _id: false }
);

const TeamSectionSchema = new Schema<ITeamSection>(
	{
		title: { type: String, trim: true },
		subtitle: { type: String, trim: true },
		members: { type: [TeamMemberSchema], default: [] },
	},
	{ _id: false }
);

// ============================================================================
// CONTACT SECTION
// ============================================================================
export interface IContactSection {
	title?: string;
	subtitle?: string;
	showContactForm?: boolean;
	showMap?: boolean;
	showOffices?: boolean;
}

const ContactSectionSchema = new Schema<IContactSection>(
	{
		title: { type: String, trim: true },
		subtitle: { type: String, trim: true },
		showContactForm: { type: Boolean, default: true },
		showMap: { type: Boolean, default: true },
		showOffices: { type: Boolean, default: true },
	},
	{ _id: false }
);

// ============================================================================
// SEO
// ============================================================================
export interface IAboutPageSeo {
	title?: string;
	description?: string;
	ogImage?: string;
}

const AboutPageSeoSchema = new Schema<IAboutPageSeo>(
	{
		title: { type: String, trim: true },
		description: { type: String, trim: true },
		ogImage: { type: String, trim: true },
	},
	{ _id: false }
);

// ============================================================================
// MAIN ABOUT PAGE
// ============================================================================
export interface IAboutPage extends Document {
	_id: mongoose.Types.ObjectId;
	sectionVisibility: IAboutSectionVisibility;
	history: IHistorySection;
	customers: ICustomersSection;
	team: ITeamSection;
	contact: IContactSection;
	seo: IAboutPageSeo;
	updatedAt: Date;
	createdAt: Date;
}

const AboutPageSchema = new Schema<IAboutPage>(
	{
		sectionVisibility: {
			type: AboutSectionVisibilitySchema,
			default: {
				history: true,
				customers: true,
				team: true,
				contact: true,
			},
		},
		history: { type: HistorySectionSchema, default: {} },
		customers: { type: CustomersSectionSchema, default: {} },
		team: { type: TeamSectionSchema, default: {} },
		contact: { type: ContactSectionSchema, default: {} },
		seo: { type: AboutPageSeoSchema, default: {} },
	},
	{
		timestamps: true,
		collection: "about_page",
	}
);

// Ensure virtuals are included in JSON
AboutPageSchema.set("toJSON", {
	virtuals: true,
	transform: function (_doc, ret) {
		ret = Object.assign({}, ret);
		delete (ret as unknown as Record<string, unknown>).__v;
		return ret;
	},
});

AboutPageSchema.set("toObject", { virtuals: true });

/**
 * Get AboutPage Model
 */
export const getAboutPageModel = async (): Promise<Model<IAboutPage>> => {
	await connectMongoose();

	return (
		(mongoose.models.AboutPage as Model<IAboutPage>) ||
		mongoose.model<IAboutPage>("AboutPage", AboutPageSchema)
	);
};

/**
 * Export synchronous model getter for use in repositories
 */
export function getAboutPageModelSync(): Model<IAboutPage> {
	return (
		(mongoose.models.AboutPage as Model<IAboutPage>) ||
		mongoose.model<IAboutPage>("AboutPage", AboutPageSchema)
	);
}
