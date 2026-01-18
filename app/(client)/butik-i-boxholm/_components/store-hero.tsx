"use client";

import { motion } from "framer-motion";
import { Store, MapPin } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { IStoreHeroSection } from "@/models/store-page.model";
import { ImageComponent } from "@/components/common/image-component";

interface StoreHeroProps {
	data: IStoreHeroSection;
}

export function StoreHero({ data }: StoreHeroProps) {
	return (
		<section className="relative min-h-[60vh] flex items-center overflow-hidden">
			{/* Background Image */}
			{data.backgroundImage ? (
				<div className="absolute inset-0 z-0">
					<ImageComponent
						src={data.backgroundImage}
						alt="Store background"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70" />
				</div>
			) : (
				<div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 z-0" />
			)}

			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5 z-[1]">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				/>
			</div>

			<div className="_container relative z-10 py-32">
				<motion.div
					initial="initial"
					animate="animate"
					variants={staggerContainer}
					className="max-w-3xl"
				>
					{/* Badge */}
					{data.badge && (
						<motion.div
							variants={fadeUp}
							className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2"
						>
							<Store className="h-4 w-4 text-primary" />
							<span className="text-sm font-semibold text-white">
								{data.badge}
							</span>
						</motion.div>
					)}

					{/* Title */}
					{data.title && (
						<motion.h1
							variants={fadeUp}
							className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
						>
							{data.title}
						</motion.h1>
					)}

					{/* Subtitle */}
					{data.subtitle && (
						<motion.p
							variants={fadeUp}
							className="text-lg text-white/80 md:text-xl max-w-2xl"
						>
							{data.subtitle}
						</motion.p>
					)}

					{/* Location indicator */}
					<motion.div
						variants={fadeUp}
						className="mt-8 flex items-center gap-2 text-white/70"
					>
						<MapPin className="h-5 w-5" />
						<span>Boxholm, Sweden</span>
					</motion.div>
				</motion.div>
			</div>

			{/* Bottom Wave */}
			<div className="absolute bottom-0 left-0 right-0 z-[2]">
				<svg
					viewBox="0 0 1440 120"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full h-auto"
					preserveAspectRatio="none"
				>
					<path
						d="M0 120L60 110C120 100 240 80 360 73.3C480 67 600 73 720 76.7C840 80 960 80 1080 73.3C1200 67 1320 53 1380 46.7L1440 40V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
						fill="white"
					/>
				</svg>
			</div>
		</section>
	);
}
