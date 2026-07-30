import React from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import PageContainer from '@/components/PageContainer';

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen bg-[#F8F5EF] overflow-x-hidden">
      {/* Global Seamless Background Gradients & Noise */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(200,154,61,0.04)_0%,transparent_60%)] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundRepeat: 'repeat' }}></div>

      <Navbar />

      <PageContainer>
        <div style={{ width: '100%', maxWidth: '896px', margin: '0 auto' }} className="w-full pt-32 pb-24 px-6">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-syne font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-gray-600 text-lg">Last updated: July 30, 2026</p>
          </div>

          <div className="prose prose-lg prose-indigo max-w-none text-gray-700">
            <p>
              At Prep2Place, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website and use our AI-powered
              career preparation services.
            </p>

            <h2 className="text-2xl font-syne font-bold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Register for an account</li>
              <li>Upload your resume or curriculum vitae</li>
              <li>Interact with our AI Career Coach</li>
              <li>Track your DSA progress and applications</li>
            </ul>
            <p>
              This may include your name, email address, educational background, work history, and any other
              information contained within the documents you upload.
            </p>

            <h2 className="text-2xl font-syne font-bold text-gray-900 mt-10 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect primarily to provide, maintain, and improve our services.
              Specifically, we use your resume data to generate personalized AI analysis, roadmaps, and 
              career recommendations. We do not sell your personal data to third parties.
            </p>

            <h2 className="text-2xl font-syne font-bold text-gray-900 mt-10 mb-4">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures designed to protect
              the security of any personal information we process. However, despite our safeguards and
              efforts to secure your information, no electronic transmission over the Internet or information
              storage technology can be guaranteed to be 100% secure.
            </p>

            <h2 className="text-2xl font-syne font-bold text-gray-900 mt-10 mb-4">4. Third-Party Services</h2>
            <p>
              We utilize secure third-party APIs (such as Google Gemini) to process and analyze your resume.
              These services only receive the data strictly necessary to perform the analysis and are bound 
              by stringent data processing agreements.
            </p>

            <h2 className="text-2xl font-syne font-bold text-gray-900 mt-10 mb-4">5. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@prep2place.com" className="text-indigo-600 hover:text-indigo-800 font-medium">
                privacy@prep2place.com
              </a>
            </p>
          </div>
        </div>
      </PageContainer>
      
      <Footer />
    </main>
  );
}
