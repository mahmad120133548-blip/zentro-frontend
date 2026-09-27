import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const PrivacyPolicy = () => {
  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-[#EEF2F6]">
      <header className="border-b border-slate-200 bg-white">
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <h1 className="text-3xl font-bold text-[#061525]">
            Privacy Policy
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Last updated: September 2026
          </p>

          <div className="mt-8 space-y-8 text-sm leading-7 text-slate-600">
            <section>
              <h2 className="text-lg font-bold text-[#061525]">
                1. Information We Collect
              </h2>
              <p className="mt-2">
                When you use Zentro, we may collect information such as your
                name, email address, phone number, delivery address, and account
                information that you provide during registration or checkout.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#061525]">
                2. How We Use Your Information
              </h2>
              <p className="mt-2">
                We use your information to create and manage your account,
                process orders, provide delivery information, communicate with
                you about your orders, and improve the Zentro experience.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#061525]">
                3. Order Information
              </h2>
              <p className="mt-2">
                Information provided during checkout is used to process and
                deliver your order. We may share necessary order details with
                the relevant vendor so that your order can be fulfilled.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#061525]">
                4. Account Security
              </h2>
              <p className="mt-2">
                We take reasonable measures to protect your account and
                personal information. However, no online service can guarantee
                complete security of information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#061525]">
                5. Cookies
              </h2>
              <p className="mt-2">
                Zentro uses cookies where necessary to maintain user sessions
                and provide essential functionality, such as keeping you
                signed in.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#061525]">
                6. Your Information
              </h2>
              <p className="mt-2">
                You should provide accurate information when creating an
                account or placing an order. If you need to update your
                account information, you can do so through the available
                account settings or contact Zentro for assistance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#061525]">
                7. Changes to This Policy
              </h2>
              <p className="mt-2">
                We may update this Privacy Policy when necessary. Any changes
                will be reflected on this page.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#061525]">
                8. Contact Us
              </h2>
              <p className="mt-2">
                If you have questions about this Privacy Policy or how your
                information is handled, please contact the Zentro team.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default PrivacyPolicy;