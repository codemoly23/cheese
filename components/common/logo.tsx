import Link from "next/link";
import { ImageComponent } from "./image-component";

interface LogoProps {
	asLink?: boolean;
	className?: string;
	logoUrl?: string;
	companyName?: string;
}

const Logo = ({
	asLink = true,
	className = "shrink-0",
	logoUrl,
	companyName = "Milatte Farm",
}: LogoProps) => {
	const content = logoUrl ? (
		<ImageComponent
			src={logoUrl}
			alt={companyName}
			width={0}
			height={0}
			sizes="100vw"
			className="h-12 w-32 sm:h-14 sm:w-40 lg:h-14 lg:w-40 p-2 py-1.5 rounded"
		/>
	) : (
		<div className="text-xl sm:text-2xl font-bold text-white px-2">
			{companyName}
		</div>
	);

	if (!asLink) {
		return <div className={className}>{content}</div>;
	}

	return (
		<Link href="/" className={className}>
			{content}
		</Link>
	);
};

export default Logo;
