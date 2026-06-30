/**
 * MC Équipe site config — update GHL calendar settings here.
 *
 * In GoHighLevel: Calendars → [your calendar] → ⋮ → Share → Embed Code
 * Copy the calendar ID from the iframe URL:
 *   https://api.leadconnectorhq.com/widget/booking/YOUR_CALENDAR_ID
 *
 * Or paste the full scheduling link from Share → Link.
 *
 * Contact prefill: funnel forms save name/email/phone in sessionStorage;
 * merci.html passes them to the calendar iframe as first_name, last_name, email, phone.
 *
 * GHL consent checkbox (English "I confirm that I want to receive content…"):
 *   Cannot be changed from this site — edit in GoHighLevel:
 *   Calendars → [Consultation MC Équipe] → Forms / Forms & Payments
 *
 *   Recommended: turn OFF "Show consent checkbox" — visitors already accept
 *   Loi 25 consent on merci.html (French) before the calendar loads.
 *
 *   If you keep it, paste this French text in the consent message field:
 *   Je confirme vouloir recevoir des communications de MC Équipe aux coordonnées
 *   que je fournis.
 *
 *   Also: Calendars → Services → Global Settings → Booking Page → Language
 *   → French (Canada) for other widget labels (Enter Details, etc.).
 */
(function (global) {
  global.MC_SITE_CONFIG = {
    ghl: {
      /** Calendar widget ID from GHL embed code */
      bookingCalendarId: 'a8qchb7qYi7qgqSwUqOX',
      /** Direct booking page URL (fallback if no embed ID, or for funnel link) */
      bookingUrl: '',
    },
  };
})(window);
