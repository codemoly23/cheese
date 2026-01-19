"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Linkedin, Phone, ExternalLink } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useSetNavbarVariant } from "@/lib/context/navbar-variant-context";
import { ImageComponent } from "@/components/common/image-component";
import type { AboutPageData } from "@/lib/repositories/about-page.repository";
import type { KontaktPageData } from "@/lib/repositories/kontakt-page.repository";
import type { SiteSettingsData } from "@/lib/repositories/site-settings.repository";
import type { IOffice } from "@/models/site-settings.model";
import { AnimatedFormSection } from "../../contact-us/_components/animated-form-section";
import { AnimatedOfficeLocations } from "../../contact-us/_components/animated-office-locations";

interface AboutUsPageClientProps {
	data: AboutPageData;
	kontaktData: KontaktPageData;
	siteSettings: SiteSettingsData;
	offices: IOffice[];
}

export function AboutUsPageClient({
	data,
	kontaktData,
	siteSettings,
	offices,
}: AboutUsPageClientProps) {
	// Set navbar variant
	useSetNavbarVariant("default");

	const visibility = data.sectionVisibility || {
		history: true,
		customers: true,
		team: true,
		contact: true,
	};

	// Check if we have content to display
	const hasHistory =
		data.history?.title ||
		data.history?.subtitle ||
		(data.history?.timelineItems && data.history.timelineItems.length > 0);
	const hasCustomers =
		data.customers?.title ||
		(data.customers?.customers && data.customers.customers.length > 0);
	const hasTeam =
		data.team?.title ||
		(data.team?.members && data.team.members.length > 0);
	const hasContact =
		data.contact?.title || data.contact?.showContactForm || data.contact?.showOffices;

	const validTimelineItems = (data.history?.timelineItems || []).filter(
		(item) => item.year || item.title
	);
	const validCustomers = (data.customers?.customers || []).filter(
		(c) => c.name
	);
	const validTeamMembers = (data.team?.members || []).filter(
		(m) => m.name && m.role
	);

	return (
		<div className="min-h-screen bg-white">
			{/* History Section - Timeline Design */}
			{visibility.history && hasHistory && (
				<section className="py-20 md:py-28 lg:py-32 bg-white relative overflow-hidden">
					<div className="_container relative z-10">
						{/* Section Header */}
						<motion.div
							variants={staggerContainer}
							initial="initial"
							whileInView="animate"
							viewport={{ once: true }}
							className="text-center mb-20"
						>
							{data.history?.badge && (
								<motion.p
									variants={fadeUp}
									className="text-primary italic text-2xl md:text-3xl mb-2"
									style={{ fontFamily: "Georgia, serif" }}
								>
									{data.history.badge}
								</motion.p>
							)}
							{data.history?.title && (
								<motion.h2
									variants={fadeUp}
									className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary uppercase tracking-[0.2em] mb-4"
								>
									{data.history.title}
								</motion.h2>
							)}
							{data.history?.subtitle && (
								<motion.p
									variants={fadeUp}
									className="text-muted-foreground max-w-2xl mx-auto"
								>
									{data.history.subtitle}
								</motion.p>
							)}
						</motion.div>

						{/* Timeline */}
						{validTimelineItems.length > 0 && (
							<div className="relative">
								{/* Vertical Dashed Line */}
								<div
									className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden md:block"
									style={{
										width: "1px",
										backgroundImage: "linear-gradient(to bottom, #e5e7eb 50%, transparent 50%)",
										backgroundSize: "1px 8px",
									}}
								/>

								{validTimelineItems.map((item, index) => {
									const isEven = index % 2 === 0;
									// Even (0, 2, 4...): Image LEFT, Text RIGHT - line goes RIGHT
									// Odd (1, 3, 5...): Text LEFT, Image RIGHT - line goes LEFT
									return (
										<motion.div
											key={index}
											initial={{ opacity: 0, y: 50 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: index * 0.15 }}
											className="relative flex flex-col md:flex-row items-center mb-24 last:mb-0"
										>
											{/* Left Side */}
											<div className={`w-full md:w-[calc(50%-40px)] md:pr-8 order-2 md:order-1 ${!isEven ? "md:text-right" : ""}`}>
												{isEven ? (
													// Even rows: Image on left
													item.image ? (
														<div className="relative bg-white p-3 shadow-lg rounded-sm">
															<ImageComponent
																src={item.image}
																alt={item.title || "Timeline image"}
																width={500}
																height={350}
																className="w-full h-auto object-cover"
															/>
														</div>
													) : (
														<div className="relative bg-white p-3 shadow-lg rounded-sm">
															<div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
																<svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
																</svg>
															</div>
														</div>
													)
												) : (
													// Odd rows: Text on left (right-aligned)
													<>
														<p
															className="text-primary text-4xl md:text-5xl mb-3"
															style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
														>
															{item.year}
														</p>
														<h3 className="text-sm font-bold text-secondary uppercase tracking-[0.15em] mb-4">
															{item.title}
														</h3>
														{item.description && (
															<p className="text-muted-foreground leading-relaxed text-sm">
																{item.description}
															</p>
														)}
													</>
												)}
											</div>

											{/* Center Column - Dot with horizontal line going to text side */}
											<div className="hidden md:flex flex-col items-center justify-center order-2" style={{ width: "80px" }}>
												<div className="relative flex items-center">
													{/* The center dot */}
													<div className="w-3 h-3 rounded-full bg-primary z-10" />
													{/* Horizontal line - goes towards text side */}
													<div className={`absolute w-10 h-0.5 bg-primary ${isEven ? "left-3" : "right-3"}`} />
												</div>
											</div>

											{/* Right Side */}
											<div className={`w-full md:w-[calc(50%-40px)] md:pl-8 order-1 md:order-3 mb-6 md:mb-0`}>
												{isEven ? (
													// Even rows: Text on right (left-aligned)
													<>
														<p
															className="text-primary text-4xl md:text-5xl mb-3"
															style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
														>
															{item.year}
														</p>
														<h3 className="text-sm font-bold text-secondary uppercase tracking-[0.15em] mb-4">
															{item.title}
														</h3>
														{item.description && (
															<p className="text-muted-foreground leading-relaxed text-sm">
																{item.description}
															</p>
														)}
													</>
												) : (
													// Odd rows: Image on right
													item.image ? (
														<div className="relative bg-white p-3 shadow-lg rounded-sm">
															<ImageComponent
																src={item.image}
																alt={item.title || "Timeline image"}
																width={500}
																height={350}
																className="w-full h-auto object-cover"
															/>
														</div>
													) : (
														<div className="relative bg-white p-3 shadow-lg rounded-sm">
															<div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
																<svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
																</svg>
															</div>
														</div>
													)
												)}
											</div>
										</motion.div>
									);
								})}
							</div>
						)}
					</div>
				</section>
			)}

			{/* Our Customers Section */}
			{visibility.customers && hasCustomers && (
				<section className="py-16 md:py-20 lg:py-24 bg-slate-50">
					<div className="_container">
						{/* Section Header */}
						<motion.div
							variants={staggerContainer}
							initial="initial"
							whileInView="animate"
							viewport={{ once: true }}
							className="text-center mb-12"
						>
							{data.customers?.title && (
								<motion.h2
									variants={fadeUp}
									className="text-3xl md:text-4xl font-bold text-secondary mb-4"
								>
									{data.customers.title}
								</motion.h2>
							)}
							{data.customers?.subtitle && (
								<motion.p
									variants={fadeUp}
									className="text-muted-foreground max-w-2xl mx-auto"
								>
									{data.customers.subtitle}
								</motion.p>
							)}
						</motion.div>

						{/* Customers Grid */}
						<motion.div
							variants={staggerContainer}
							initial="initial"
							whileInView="animate"
							viewport={{ once: true }}
							className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
						>
							{validCustomers.map((customer, index) => (
								<motion.div
									key={index}
									variants={fadeUp}
									className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-slate-100"
								>
									{/* Customer Logo */}
									{customer.logo && (
										<div className="mb-4 h-20 flex items-center justify-center">
											<Image
												src={customer.logo}
												alt={customer.name || "Customer logo"}
												width={160}
												height={80}
												className="max-h-16 w-auto object-contain"
											/>
										</div>
									)}

									{/* Customer Name */}
									<h3 className="text-xl font-bold text-secondary mb-2">
										{customer.name}
									</h3>

									{/* Products They Purchase */}
									{customer.products && (
										<div className="mb-3">
											<p className="text-sm font-medium text-primary mb-1">
												Products they purchase:
											</p>
											<p className="text-muted-foreground text-sm">
												{customer.products}
											</p>
										</div>
									)}

									{/* Description */}
									{customer.description && (
										<p className="text-muted-foreground text-sm mb-4">
											{customer.description}
										</p>
									)}

									{/* Website Link */}
									{customer.website && (
										<a
											href={customer.website}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
										>
											Visit website
											<ExternalLink className="h-3 w-3" />
										</a>
									)}
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>
			)}

			{/* Our Team Section */}
			{visibility.team && hasTeam && (
				<section className="py-16 md:py-20 lg:py-24 bg-white">
					<div className="_container">
						{/* Section Header */}
						<motion.div
							variants={staggerContainer}
							initial="initial"
							whileInView="animate"
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							{data.team?.title && (
								<motion.h2
									variants={fadeUp}
									className="text-3xl md:text-4xl font-bold text-secondary mb-4"
								>
									{data.team.title}
								</motion.h2>
							)}
							{data.team?.subtitle && (
								<motion.p
									variants={fadeUp}
									className="text-muted-foreground max-w-2xl mx-auto"
								>
									{data.team.subtitle}
								</motion.p>
							)}
						</motion.div>

						{/* Team Grid - Circular Design */}
						<motion.div
							variants={staggerContainer}
							initial="initial"
							whileInView="animate"
							viewport={{ once: true }}
							className="flex flex-wrap justify-center gap-12 md:gap-16 lg:gap-20"
						>
							{validTeamMembers.map((member, index) => (
								<motion.div
									key={index}
									variants={fadeUp}
									custom={index}
									className="flex flex-col items-center text-center"
								>
									{/* Circular Image Container */}
									<div className="relative mb-6">
										<div className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white shadow-lg">
											{member.image ? (
												<ImageComponent
													src={member.image}
													alt={member.name || "Team member"}
													className="w-full h-full object-cover"
													height={208}
													width={208}
													wrapperClasses="w-full h-full"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center bg-slate-100">
													<span className="text-4xl font-bold text-primary/40">
														{(member.name || "?")
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</span>
												</div>
											)}
										</div>
									</div>

									{/* Info */}
									<div className="text-center">
										<h3 className="text-xl md:text-2xl font-bold text-secondary mb-1">
											{member.name}
										</h3>
										<p className="text-sm md:text-base text-muted-foreground">
											{member.role}
										</p>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>
			)}

			{/* Contact Section */}
			{visibility.contact && hasContact && (
				<section className="bg-slate-50">
					{/* Section Header */}
					{(data.contact?.title || data.contact?.subtitle) && (
						<div className="py-12 bg-white">
							<div className="_container">
								<motion.div
									variants={staggerContainer}
									initial="initial"
									whileInView="animate"
									viewport={{ once: true }}
									className="text-center"
								>
									{data.contact?.title && (
										<motion.h2
											variants={fadeUp}
											className="text-3xl md:text-4xl font-bold text-secondary mb-4"
										>
											{data.contact.title}
										</motion.h2>
									)}
									{data.contact?.subtitle && (
										<motion.p
											variants={fadeUp}
											className="text-muted-foreground max-w-2xl mx-auto"
										>
											{data.contact.subtitle}
										</motion.p>
									)}
								</motion.div>
							</div>
						</div>
					)}

					{/* Contact Form */}
					{data.contact?.showContactForm && (
						<div className="py-12 bg-white">
							<div className="_container">
								<div className="mx-auto max-w-3xl">
									<AnimatedFormSection data={kontaktData.formSection} />
								</div>
							</div>
						</div>
					)}

					{/* Office Locations */}
					{data.contact?.showOffices && offices.length > 0 && (
						<div className="py-12">
							<div className="_container overflow-hidden">
								<AnimatedOfficeLocations
									data={kontaktData.officeSection}
									addresses={offices}
								/>
							</div>
						</div>
					)}
				</section>
			)}
		</div>
	);
}
