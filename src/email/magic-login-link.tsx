import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Text,
	Tailwind,
	Section,
	Button,
	Hr
} from '@react-email/components';

type MagicLoginEmailProps = {
	magicLink: string;
};

function MagicLoginEmail({ magicLink }: MagicLoginEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Login to Henrik's Wishlist</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white px-2 font-sans">
					<Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
						<Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
							<strong>Log in</strong> to <strong>Henrik's Wishlist</strong>
						</Heading>

						<Text className="text-[14px] leading-[24px] text-black">
							Hello! It sounds like you want to log in to Henrik's Wishlist. Click to button below
							to go log in!
						</Text>

						<Section className="mt-[32px] mb-[32px] text-center">
							<Button
								className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
								href={magicLink}
								target="_blank"
							>
								Log in here
							</Button>
						</Section>
						<Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
						<Text className="text-[12px] leading-[24px] text-[#666666]">
							If you're not able to click the button above, try pasting this URL into your browser:{' '}
							<Link target="_blank" href={magicLink} className="text-blue-600 no-underline">
								{magicLink}
							</Link>
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

MagicLoginEmail.PreviewProps = {
	magicLink: `http://localhost:5173/iforgot?code=${'asdajsfhandoq'}`
} satisfies MagicLoginEmailProps;

export default MagicLoginEmail;
