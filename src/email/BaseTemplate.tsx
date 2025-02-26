import { Body, Container, Head, Hr, Html, Preview, Section, Text } from '@react-email/components'
import { box, container, footer, hr, main, paragraph } from './styles'

// const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''

export const BaseTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>You`re now ready to make live transactions with Stripe!</Preview>
      <Container style={container}>
        <Section style={box}>
          {/* <Img
            src={`${baseUrl}/static/stripe-logo.png`}
            width="49"
            height="21"
            alt="Stripe"
          /> */}
          LOGO
          <Hr style={hr} />
          {children}
          <Text style={paragraph}>— The team</Text>
          <Hr style={hr} />
          <Text style={footer}>Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default BaseTemplate
