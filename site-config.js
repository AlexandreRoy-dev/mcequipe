/**
 * MC Équipe site config — update GHL calendar settings here.
 *
 * In GoHighLevel: Calendars → [your calendar] → ⋮ → Share → Embed Code
 * Copy the calendar ID from the iframe URL:
 *   https://api.leadconnectorhq.com/widget/booking/YOUR_CALENDAR_ID
 *
 * Or paste the full scheduling link from Share → Link.
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
