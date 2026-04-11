/**
 * Decompiled from QBW32.EXE!CPreferencesDialog  Offset: 0x0023F800
 * Original: tabbed dialog (IDD_PREFERENCES) with 12 tabs. We condensed
 * everything into a single page because nobody needs 12 tabs for
 * company name and tax rate. The registry writes at 0x00240200 are now
 * PostgreSQL INSERTs. Progress.
 */
const SettingsPage = {
    async render() {
        const s = await API.get('/settings');
        return `
            <div class="page-header">
                <h2>Company Settings</h2>
                <div style="font-size:10px; color:var(--text-muted);">
                    CPreferencesDialog — IDD_PREFERENCES @ 0x0023F800
                </div>
            </div>
            <form id="settings-form" onsubmit="SettingsPage.save(event)">
                <div class="settings-section">
                    <h3>Company Information</h3>
                    <div class="form-grid">
                        <div class="form-group full-width"><label>Company Name *</label>
                            <input name="company_name" value="${escapeHtml(s.company_name || '')}" required></div>
                        <div class="form-group"><label>Address Line 1</label>
                            <input name="company_address1" value="${escapeHtml(s.company_address1 || '')}"></div>
                        <div class="form-group"><label>Address Line 2</label>
                            <input name="company_address2" value="${escapeHtml(s.company_address2 || '')}"></div>
                        <div class="form-group"><label>City</label>
                            <input name="company_city" value="${escapeHtml(s.company_city || '')}"></div>
                        <div class="form-group"><label>State</label>
                            <input name="company_state" value="${escapeHtml(s.company_state || '')}"></div>
                        <div class="form-group"><label>ZIP</label>
                            <input name="company_zip" value="${escapeHtml(s.company_zip || '')}"></div>
                        <div class="form-group"><label>Phone</label>
                            <input name="company_phone" value="${escapeHtml(s.company_phone || '')}"></div>
                        <div class="form-group"><label>Email</label>
                            <input name="company_email" type="email" value="${escapeHtml(s.company_email || '')}"></div>
                        <div class="form-group"><label>Website</label>
                            <input name="company_website" value="${escapeHtml(s.company_website || '')}"></div>
                        <div class="form-group"><label>Tax ID / EIN</label>
                            <input name="company_tax_id" value="${escapeHtml(s.company_tax_id || '')}"></div>
                    </div>
                </div>

                <div class="settings-section">
                    <h3>Invoice Defaults</h3>
                    <div class="form-grid">
                        <div class="form-group"><label>Default Terms</label>
                            <select name="default_terms">
                                ${['Net 15','Net 30','Net 45','Net 60','Due on Receipt'].map(t =>
                                    `<option ${s.default_terms===t?'selected':''}>${t}</option>`).join('')}
                            </select></div>
                        <div class="form-group"><label>Default Tax Rate (%)</label>
                            <input name="default_tax_rate" type="number" step="0.01" value="${s.default_tax_rate || '0.0'}"></div>
                        <div class="form-group"><label>Invoice Prefix</label>
                            <input name="invoice_prefix" value="${escapeHtml(s.invoice_prefix || '')}" placeholder="e.g. INV-"></div>
                        <div class="form-group"><label>Next Invoice #</label>
                            <input name="invoice_next_number" value="${escapeHtml(s.invoice_next_number || '1001')}"></div>
                        <div class="form-group"><label>Estimate Prefix</label>
                            <input name="estimate_prefix" value="${escapeHtml(s.estimate_prefix || '')}" placeholder="e.g. E-"></div>
                        <div class="form-group"><label>Next Estimate #</label>
                            <input name="estimate_next_number" value="${escapeHtml(s.estimate_next_number || '1001')}"></div>
                        <div class="form-group full-width"><label>Default Invoice Notes</label>
                            <textarea name="invoice_notes">${escapeHtml(s.invoice_notes || '')}</textarea></div>
                        <div class="form-group full-width"><label>Invoice Footer</label>
                            <input name="invoice_footer" value="${escapeHtml(s.invoice_footer || '')}"></div>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Save Settings</button>
                </div>
            </form>`;
    },

    async save(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        try {
            await API.put('/settings', data);
            toast('Settings saved');
        } catch (err) {
            toast(err.message, 'error');
        }
    },
};
