import { z } from "zod";

// ============================================================================
// SECTION VISIBILITY
// ============================================================================
export const aboutSectionVisibilitySchema = z.object({
	history: z.boolean(),
	customers: z.boolean(),
	team: z.boolean(),
	contact: z.boolean(),
});

// ============================================================================
// HISTORY SECTION (Timeline)
// ============================================================================
export const historyTimelineItemSchema = z.object({
	year: z.string().max(20).optional(),
	title: z.string().max(200).optional(),
	description: z.string().max(2000).optional(),
	image: z.string().optional(),
});

export const historySectionSchema = z.object({
	badge: z.string().max(100).optional(),
	title: z.string().max(200).optional(),
	subtitle: z.string().max(500).optional(),
	timelineItems: z.array(historyTimelineItemSchema).optional(),
});

// ============================================================================
// CUSTOMERS SECTION
// ============================================================================
export const customerItemSchema = z.object({
	name: z.string().max(200).optional(),
	logo: z.string().optional(),
	products: z.string().max(500).optional(),
	description: z.string().max(1000).optional(),
	website: z.string().optional(),
});

export const customersSectionSchema = z.object({
	title: z.string().max(200).optional(),
	subtitle: z.string().max(500).optional(),
	customers: z.array(customerItemSchema).optional(),
});

// ============================================================================
// TEAM SECTION
// ============================================================================
export const teamMemberSchema = z.object({
	name: z.string().max(100).optional(),
	role: z.string().max(100).optional(),
	image: z.string().optional(),
	email: z.string().email().optional().or(z.literal("")),
	phone: z.string().max(50).optional(),
	linkedin: z.string().optional(),
	department: z.string().max(100).optional(),
	bio: z.string().max(1000).optional(),
});

export const teamSectionSchema = z.object({
	title: z.string().max(200).optional(),
	subtitle: z.string().max(500).optional(),
	members: z.array(teamMemberSchema).optional(),
});

// ============================================================================
// CONTACT SECTION
// ============================================================================
export const contactSectionSchema = z.object({
	title: z.string().max(200).optional(),
	subtitle: z.string().max(500).optional(),
	showContactForm: z.boolean().optional(),
	showMap: z.boolean().optional(),
	showOffices: z.boolean().optional(),
});

// ============================================================================
// SEO
// ============================================================================
export const aboutPageSeoSchema = z.object({
	title: z.string().max(200).optional(),
	description: z.string().max(500).optional(),
	ogImage: z.string().optional(),
});

// ============================================================================
// UPDATE SCHEMA
// ============================================================================
export const updateAboutPageSchema = z.object({
	sectionVisibility: aboutSectionVisibilitySchema.optional(),
	history: historySectionSchema.optional(),
	customers: customersSectionSchema.optional(),
	team: teamSectionSchema.optional(),
	contact: contactSectionSchema.optional(),
	seo: aboutPageSeoSchema.optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================
export type AboutSectionVisibilityInput = z.infer<typeof aboutSectionVisibilitySchema>;
export type HistoryTimelineItemInput = z.infer<typeof historyTimelineItemSchema>;
export type HistorySectionInput = z.infer<typeof historySectionSchema>;
export type CustomerItemInput = z.infer<typeof customerItemSchema>;
export type CustomersSectionInput = z.infer<typeof customersSectionSchema>;
export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
export type TeamSectionInput = z.infer<typeof teamSectionSchema>;
export type ContactSectionInput = z.infer<typeof contactSectionSchema>;
export type AboutPageSeoInput = z.infer<typeof aboutPageSeoSchema>;
export type UpdateAboutPageInput = z.infer<typeof updateAboutPageSchema>;
