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

type ForgotPasswordEmailProps = {
	forgotPasswordLink: string;
};

function ForgotPasswordEmail({ forgotPasswordLink }: ForgotPasswordEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Forgot Password | Henrik's Wishlist</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white px-2 font-sans">
					<Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
						<Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
							<strong>Forgot Password</strong> for <strong>Henrik's Wishlist</strong>
						</Heading>

						<Text className="text-[14px] leading-[24px] text-black">
							Hello! It seems you have forgotten your password for Henrik's Wishlist. Click the
							button below to go reset your password.
						</Text>

						<Section className="mt-[32px] mb-[32px] text-center">
							<Button
								className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
								href={forgotPasswordLink}
								target="_blank"
							>
								Reset your password
							</Button>
						</Section>
						<Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
						<Text className="text-[12px] leading-[24px] text-[#666666]">
							If you're not able to click the button above, try pasting this URL into your browser:{' '}
							<Link
								target="_blank"
								href={forgotPasswordLink}
								className="text-blue-600 no-underline"
							>
								{forgotPasswordLink}
							</Link>
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

ForgotPasswordEmail.PreviewProps = {
	forgotPasswordLink: `http://localhost:5173/iforgot?code=${'asdajsfhandoq'}`
} satisfies ForgotPasswordEmailProps;

export default ForgotPasswordEmail;
