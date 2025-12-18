import { useState } from 'react'

// ============================================
// CONFIGURATION - Update this with your webhook URL
// ============================================
const WEBHOOK_URL = 'YOUR_MAKE_WEBHOOK_URL_HERE'
// ============================================

export default function DiscoveryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    companyWebsite: '',
    companySize: '',
    annualRevenue: '',
    currentSoftware: '',
    systemsIntegration: '',
    technicalOwnership: '',
    problemDescription: '',
    processVolume: '',
    timeSpent: '',
    successLooksLike: '',
    previousAttempts: '',
    timeline: '',
    budget: '',
    decisionMakers: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [currentSection, setCurrentSection] = useState(1)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again or contact us directly.')
      console.error('Form submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  // Success screen
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#f5f5f0' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">
            We've received your project details and will be in touch within 1-2 business days to schedule your discovery call.
          </p>
          <p className="text-sm text-gray-500">A confirmation has been sent to {formData.email}</p>
        </div>
      </div>
    )
  }

  const RadioOption = ({ name, value, checked, onChange, children }) => (
    <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${checked ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-gray-900"
      />
      <span className="text-gray-700 text-sm">{children}</span>
    </label>
  )

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#f5f5f0' }}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mb-3">
            <img
              src="/logo.png"
              alt="Synergaise"
              className="w-32 h-32 mx-auto object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Project Discovery Form</h1>
          <p className="text-gray-500 text-sm">Help us understand your automation needs</p>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {[1, 2, 3, 4, 5].map(n => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full ${currentSection >= n ? '' : 'bg-gray-300'}`}
              style={currentSection >= n ? { backgroundColor: '#a8c5d4' } : {}}
            />
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Section 1: About You & Your Company */}
          {currentSection === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">About You & Your Company</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name & Role *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="e.g., John Smith, Operations Manager"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="+44 7XXX XXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="https://www.example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['1-10 employees', '11-50 employees', '51-200 employees', '200+ employees'].map(opt => (
                      <RadioOption
                        key={opt}
                        name="companySize"
                        value={opt}
                        checked={formData.companySize === opt}
                        onChange={handleChange}
                      >
                        {opt}
                      </RadioOption>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Revenue *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Under £100k', '£100k – £500k', '£500k – £1M', '£1M – £2M', '£2M+'].map(opt => (
                      <RadioOption
                        key={opt}
                        name="annualRevenue"
                        value={opt}
                        checked={formData.annualRevenue === opt}
                        onChange={handleChange}
                      >
                        {opt}
                      </RadioOption>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Current Setup */}
          {currentSection === 2 && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Current Setup</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What software/systems do you currently use? *</label>
                  <p className="text-xs text-gray-500 mb-2">e.g., CRM, accounting, project management tools</p>
                  <textarea
                    name="currentSoftware"
                    value={formData.currentSoftware}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Do these systems need to talk to each other? *</label>
                  <div className="space-y-2">
                    {[
                      "Yes, and they currently don't",
                      "Yes, but integrations aren't working well",
                      "Not sure – want to explore",
                      "No, automating within one system"
                    ].map(opt => (
                      <RadioOption
                        key={opt}
                        name="systemsIntegration"
                        value={opt}
                        checked={formData.systemsIntegration === opt}
                        onChange={handleChange}
                      >
                        {opt}
                      </RadioOption>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Who will manage automations day-to-day? *</label>
                  <div className="space-y-2">
                    {[
                      "Technical staff in-house",
                      "Someone comfortable with Zapier/Make",
                      "No one – we'd need support",
                      "Not sure yet"
                    ].map(opt => (
                      <RadioOption
                        key={opt}
                        name="technicalOwnership"
                        value={opt}
                        checked={formData.technicalOwnership === opt}
                        onChange={handleChange}
                      >
                        {opt}
                      </RadioOption>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: The Problem */}
          {currentSection === 3 && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">The Problem You Want Solved</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What manual process are you trying to fix? *</label>
                  <p className="text-xs text-gray-500 mb-2">Describe the task, frequency, and who does it</p>
                  <textarea
                    name="problemDescription"
                    value={formData.problemDescription}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 h-28"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Process volume</label>
                    <input
                      type="text"
                      name="processVolume"
                      value={formData.processVolume}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="e.g., 50/week"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time spent/week</label>
                    <input
                      type="text"
                      name="timeSpent"
                      value={formData.timeSpent}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="e.g., 5 hours"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What does success look like? *</label>
                  <textarea
                    name="successLooksLike"
                    value={formData.successLooksLike}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 h-20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Have you tried to solve this before?</label>
                  <div className="space-y-2">
                    {[
                      "No, first attempt",
                      "Yes, tried internally",
                      "Yes, worked with agency/freelancer",
                      "Yes, needs improving"
                    ].map(opt => (
                      <RadioOption
                        key={opt}
                        name="previousAttempts"
                        value={opt}
                        checked={formData.previousAttempts === opt}
                        onChange={handleChange}
                      >
                        {opt}
                      </RadioOption>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Timeline & Budget */}
          {currentSection === 4 && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Timeline & Budget</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">When do you need this completed? *</label>
                  <div className="space-y-2">
                    {[
                      "ASAP (urgent)",
                      "Within 1-2 months",
                      "Within 3-6 months",
                      "No fixed deadline"
                    ].map(opt => (
                      <RadioOption
                        key={opt}
                        name="timeline"
                        value={opt}
                        checked={formData.timeline === opt}
                        onChange={handleChange}
                      >
                        {opt}
                      </RadioOption>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget range *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Under £2,000",
                      "£2,000 – £5,000",
                      "£5,000 – £10,000",
                      "£10,000 – £20,000",
                      "£20,000+",
                      "Not yet determined"
                    ].map(opt => (
                      <RadioOption
                        key={opt}
                        name="budget"
                        value={opt}
                        checked={formData.budget === opt}
                        onChange={handleChange}
                      >
                        {opt}
                      </RadioOption>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Decision Making */}
          {currentSection === 5 && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Decision Making</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Who's involved in the decision? *</label>
                  <div className="space-y-2">
                    {[
                      "Just me – I can approve",
                      "Me + one other person",
                      "Small team/committee",
                      "Board/senior leadership"
                    ].map(opt => (
                      <RadioOption
                        key={opt}
                        name="decisionMakers"
                        value={opt}
                        checked={formData.decisionMakers === opt}
                        onChange={handleChange}
                      >
                        {opt}
                      </RadioOption>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">What Happens Next</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Review within 1-2 business days</li>
                  <li>• 30-minute discovery call</li>
                  <li>• Detailed proposal within a week</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3">
            {currentSection > 1 && (
              <button
                type="button"
                onClick={() => setCurrentSection(s => s - 1)}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
            )}
            {currentSection < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentSection(s => s + 1)}
                className="flex-1 py-3 px-6 bg-gray-900 text-white font-medium rounded-lg transition-colors duration-200"
                style={{ '--hover-bg': '#a8c5d4' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#a8c5d4'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#111827'}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 py-3 px-6 font-medium rounded-lg transition-colors duration-200 ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900'} text-white`}
                onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#a8c5d4')}
                onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#111827')}
              >
                {submitting ? 'Submitting...' : 'Submit Form'}
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pb-4">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-900">SYNERG</span>
            <span className="font-semibold" style={{ color: '#a8c5d4' }}>AI</span>
            <span className="font-semibold text-gray-900">SE</span>
            <span className="mx-2">|</span>
            AI systems that think for you
          </p>
        </div>
      </div>
    </div>
  )
}
