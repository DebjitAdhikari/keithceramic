import { Helmet } from "react-helmet-async"
import Address from "../components/Address"
import ContactForm from "../components/ContactForm"

function Contact() {
    return (
        <section className="pt-[150px] bg-gray-100 min-h-[100vh] py-5 px-4 md:px-8 ">
            <Helmet>
      <title>Contact Us - Keith Ceramic</title>
      <meta
        name="description"
        content="Get in touch with Keith Ceramic for inquiries, support, and collaborations. Reach out to us via phone, email, or our contact form."
      />
      <meta
        name="keywords"
        content="Contact Keith Ceramic, Keith Ceramic Support, Ceramic Inquiries, Customer Service, Ceramic Manufacturer Contact, Get in Touch, Ceramic Product Assistance"
      />
    </Helmet>
        {/* heading */}
        <div>
            <h1 className="text-lg md:text-3xl font-bold text-[#02245B] mb-4">Contact Us</h1>
        </div>

        {/* Address */}
        <Address></Address>

        {/* lets connect */}
        <ContactForm></ContactForm>

        
    </section>
    )
}

export default Contact
