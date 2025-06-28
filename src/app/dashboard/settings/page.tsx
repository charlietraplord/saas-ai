export default function SettingsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="h2">Settings</h1>
          <p className="text-text">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-6">Account Settings</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-2 mb-2">Email Notifications</label>
              <select className="input w-full">
                <option>All notifications</option>
                <option>Important only</option>
                <option>None</option>
              </select>
              <p className="mt-1 text-sm text-text-2">Choose what kinds of notifications you want to receive</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-2 mb-2">API Key</label>
              <div className="flex gap-2">
                <input type="text" className="input flex-grow font-mono" value="sk_test_..." disabled />
                <button className="btn btn-secondary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-2">Copy</span>
                </button>
              </div>
              <p className="mt-1 text-sm text-text-2">Your API key for making authenticated requests</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-2 mb-2">Timezone</label>
              <select className="input w-full">
                <option>(UTC+02:00) Johannesburg</option>
                <option>(UTC+00:00) London</option>
                <option>(UTC-08:00) Pacific Time</option>
              </select>
              <p className="mt-1 text-sm text-text-2">Choose your preferred timezone for reporting</p>
            </div>

            <div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-6">Team Members</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium">JD</span>
                </div>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-text-2">john@example.com</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-2">Admin</span>
                <button className="text-text-2 hover:text-primary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <button className="btn btn-secondary w-full">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Team Member
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-red-600 mb-6">Danger Zone</h2>
          <div className="space-y-4">
            <button className="btn btn-danger">
              Delete Account
            </button>
            <p className="text-sm text-text-2">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
