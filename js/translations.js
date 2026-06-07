/* ===========================================================
   Bilingual dictionary (English + Gujarati)
   -----------------------------------------------------------
   Any element in the HTML with  data-i18n="some.key"
   will have its text replaced from the object below
   when the language is switched.

   To edit wording: just change the strings here.
   =========================================================== */

const TRANSLATIONS = {
  en: {
    // ---- Nav ----
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.process": "Process",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.call": "Call Now",

    // ---- Hero ----
    "hero.badge": "Govt. Approved Marriage Certificate",
    "hero.title": "One of the Best Court Marriage Advocates in Ahmedabad",
    "hero.subtitle":
      "Court Marriage • Love Marriage • Register Marriage. Proper guidance for documents and the complete legal process.",
    "hero.whatsapp": "WhatsApp Now",
    "hero.call": "Call 6355475659",

    // ---- Services ----
    "services.heading": "Our Legal Services",
    "services.sub": "Trusted, confidential and complete legal support across marriage, family & civil law",
    "services.note": "Plus honest legal advice and consultation for all marriage & family law matters.",
    "services.cat1.title": "Marriage & Registration",
    "services.cat2.title": "Divorce & Separation",
    "services.cat3.title": "Matrimonial Crimes & Protection",
    "services.cat4.title": "Maintenance, Alimony & Custody",
    "services.cat5.title": "High Court & Supreme Court",
    "services.cat6.title": "Registration & Documentation",
    "services.court.title": "Court Marriage",
    "services.court.desc":
      "Fast, legally valid court marriage with full document guidance and registration.",
    "services.love.title": "Love Marriage",
    "services.love.desc":
      "Safe and confidential support for couples — legal marriage with complete protection.",
    "services.register.title": "Register Marriage",
    "services.register.desc":
      "Official marriage registration and Govt.-approved marriage certificate.",
    "services.bond.title": "Legal Bond / Agreement",
    "services.bond.desc":
      "Drafting of affidavits, legal bonds and agreements with proper attestation.",
    "services.divorce.title": "Divorce",
    "services.divorce.desc":
      "Mutual and contested divorce guidance handled with care and confidentiality.",
    "services.advice.title": "Legal Advice",
    "services.advice.desc":
      "Clear, honest legal consultation for all marriage and family law matters.",
    "services.inquire": "Inquire on WhatsApp",

    // ---- About ----
    "about.heading": "About Advocate Urvish",
    "about.role": "Advocate — B.Com, LL.B",
    "about.p1":
      "Advocate Urvish is a trusted, Govt.-approved marriage advocate based in Chandkheda, Ahmedabad, helping couples complete court marriage, love marriage and marriage registration smoothly and legally.",
    "about.p2":
      "With proper guidance on every document and each step of the process, clients get a stress-free, fully confidential and legally valid experience.",
    "about.badge1": "Govt. Approved",
    "about.badge2": "100% Confidential",
    "about.badge3": "Document Guidance",
    "about.stat1": "Happy Couples",
    "about.stat2": "Years Experience",
    "about.stat3": "Marriages Registered",

    // ---- Process ----
    "process.heading": "Simple 4-Step Process",
    "process.sub": "We guide you from the first call to your marriage certificate",
    "process.s1.title": "Consultation",
    "process.s1.desc": "Call or WhatsApp us to discuss your situation — free guidance.",
    "process.s2.title": "Document Check",
    "process.s2.desc": "We list and verify all required documents for you.",
    "process.s3.title": "Application & Marriage",
    "process.s3.desc": "We file the application and complete the court/registration process.",
    "process.s4.title": "Marriage Certificate",
    "process.s4.desc": "You receive your Govt.-approved marriage certificate.",

    // ---- Blog ----
    "blog.heading": "Latest Legal Updates",
    "blog.sub": "Daily updates and guidance on marriage & family law",
    "blog.readall": "Read All Updates",
    "blog.readmore": "Read more",
    "blog.allheading": "Legal Blog & Updates",
    "blog.allsub": "Helpful articles on court marriage, registration and family law",
    "blog.back": "← Back to Home",

    // ---- Contact ----
    "contact.heading": "Get In Touch",
    "contact.sub": "Send your inquiry directly on WhatsApp — quick reply guaranteed",
    "contact.formtitle": "Send an Inquiry",
    "contact.name": "Your Name",
    "contact.phone": "Phone Number",
    "contact.service": "Select Service",
    "contact.message": "Your Message",
    "contact.send": "Send on WhatsApp",
    "contact.or": "or reach us directly",
    "contact.phonelabel": "Phone / WhatsApp",
    "contact.addresslabel": "Office Address",
    "contact.address":
      "Chandkheda, Alpha Square Society, Near Highway Mall, Ahmedabad, Gujarat",
    "contact.hours": "Mon – Sat: 9:00 AM – 8:00 PM",
    "contact.hourslabel": "Working Hours",

    // ---- Footer ----
    "footer.tagline":
      "Trusted court marriage & legal services in Ahmedabad. Confidential, professional and Govt.-approved.",
    "footer.quicklinks": "Quick Links",
    "footer.ourservices": "Our Services",
    "footer.contactus": "Contact Us",
    "footer.rights": "All rights reserved.",
    "footer.disclaimer":
      "Disclaimer: This website is for general information only and is not legal advice.",
  },

  gu: {
    // ---- Nav ----
    "nav.home": "હોમ",
    "nav.services": "સેવાઓ",
    "nav.about": "વિશે",
    "nav.process": "પ્રક્રિયા",
    "nav.blog": "બ્લોગ",
    "nav.contact": "સંપર્ક",
    "nav.call": "કૉલ કરો",

    // ---- Hero ----
    "hero.badge": "સરકાર માન્ય મેરેજ સર્ટિફિકેટ",
    "hero.title": "અમદાવાદના શ્રેષ્ઠ કોર્ટ મેરેજ એડવોકેટમાંના એક",
    "hero.subtitle":
      "કોર્ટ મેરેજ • લવ મેરેજ • રજિસ્ટર મેરેજ. દસ્તાવેજો અને સંપૂર્ણ કાનૂની પ્રક્રિયા માટે યોગ્ય માર્ગદર્શન.",
    "hero.whatsapp": "વોટ્સએપ કરો",
    "hero.call": "કૉલ કરો 6355475659",

    // ---- Services ----
    "services.heading": "અમારી કાનૂની સેવાઓ",
    "services.sub": "લગ્ન, કુટુંબ અને દિવાની કાયદામાં વિશ્વસનીય, ગોપનીય અને સંપૂર્ણ કાનૂની સહાય",
    "services.note": "સાથે જ લગ્ન અને કુટુંબ કાયદાની તમામ બાબતો માટે પ્રામાણિક કાનૂની સલાહ અને પરામર્શ.",
    "services.cat1.title": "લગ્ન અને રજિસ્ટ્રેશન",
    "services.cat2.title": "છૂટાછેડા અને અલગતા",
    "services.cat3.title": "વૈવાહિક ગુના અને રક્ષણ",
    "services.cat4.title": "ભરણપોષણ, ભથ્થું અને કસ્ટડી",
    "services.cat5.title": "હાઈકોર્ટ અને સુપ્રીમ કોર્ટ",
    "services.cat6.title": "રજિસ્ટ્રેશન અને દસ્તાવેજીકરણ",
    "services.court.title": "કોર્ટ મેરેજ",
    "services.court.desc":
      "ઝડપી, કાયદેસર માન્ય કોર્ટ મેરેજ — સંપૂર્ણ દસ્તાવેજ માર્ગદર્શન અને રજિસ્ટ્રેશન સાથે.",
    "services.love.title": "લવ મેરેજ",
    "services.love.desc":
      "યુગલો માટે સુરક્ષિત અને ગોપનીય સહાય — સંપૂર્ણ રક્ષણ સાથે કાયદેસર લગ્ન.",
    "services.register.title": "રજિસ્ટર મેરેજ",
    "services.register.desc":
      "સત્તાવાર લગ્ન રજિસ્ટ્રેશન અને સરકાર માન્ય મેરેજ સર્ટિફિકેટ.",
    "services.bond.title": "લીગલ બોન્ડ / કરાર",
    "services.bond.desc":
      "એફિડેવિટ, લીગલ બોન્ડ અને કરારનું યોગ્ય પ્રમાણીકરણ સાથે ડ્રાફ્ટિંગ.",
    "services.divorce.title": "ડિવોર્સ",
    "services.divorce.desc":
      "પરસ્પર સંમતિ અને વિવાદિત છૂટાછેડાનું કાળજીપૂર્વક અને ગોપનીય માર્ગદર્શન.",
    "services.advice.title": "કાનૂની સલાહ",
    "services.advice.desc":
      "લગ્ન અને કુટુંબ કાયદાની તમામ બાબતો માટે સ્પષ્ટ, પ્રામાણિક સલાહ.",
    "services.inquire": "વોટ્સએપ પર પૂછો",

    // ---- About ----
    "about.heading": "એડવોકેટ ઉર્વિશ વિશે",
    "about.role": "એડવોકેટ — બી.કોમ, એલ.એલ.બી",
    "about.p1":
      "એડવોકેટ ઉર્વિશ ચાંદખેડા, અમદાવાદ સ્થિત વિશ્વસનીય, સરકાર માન્ય મેરેજ એડવોકેટ છે, જે યુગલોને કોર્ટ મેરેજ, લવ મેરેજ અને લગ્ન રજિસ્ટ્રેશન સરળતાથી અને કાયદેસર રીતે પૂર્ણ કરવામાં મદદ કરે છે.",
    "about.p2":
      "દરેક દસ્તાવેજ અને પ્રક્રિયાના દરેક પગલા પર યોગ્ય માર્ગદર્શન સાથે, ગ્રાહકોને તણાવમુક્ત, સંપૂર્ણ ગોપનીય અને કાયદેસર માન્ય અનુભવ મળે છે.",
    "about.badge1": "સરકાર માન્ય",
    "about.badge2": "૧૦૦% ગોપનીય",
    "about.badge3": "દસ્તાવેજ માર્ગદર્શન",
    "about.stat1": "ખુશ યુગલો",
    "about.stat2": "વર્ષનો અનુભવ",
    "about.stat3": "નોંધાયેલા લગ્નો",

    // ---- Process ----
    "process.heading": "સરળ ૪-પગલાંની પ્રક્રિયા",
    "process.sub": "પ્રથમ કૉલથી લઈને તમારા મેરેજ સર્ટિફિકેટ સુધી અમે માર્ગદર્શન આપીએ છીએ",
    "process.s1.title": "પરામર્શ",
    "process.s1.desc": "તમારી પરિસ્થિતિ વિશે ચર્ચા કરવા કૉલ અથવા વોટ્સએપ કરો — મફત માર્ગદર્શન.",
    "process.s2.title": "દસ્તાવેજ તપાસ",
    "process.s2.desc": "અમે તમારા માટે જરૂરી તમામ દસ્તાવેજોની યાદી અને ચકાસણી કરીએ છીએ.",
    "process.s3.title": "અરજી અને લગ્ન",
    "process.s3.desc": "અમે અરજી દાખલ કરીએ છીએ અને કોર્ટ/રજિસ્ટ્રેશન પ્રક્રિયા પૂર્ણ કરીએ છીએ.",
    "process.s4.title": "મેરેજ સર્ટિફિકેટ",
    "process.s4.desc": "તમને તમારું સરકાર માન્ય મેરેજ સર્ટિફિકેટ મળે છે.",

    // ---- Blog ----
    "blog.heading": "તાજેતરની કાનૂની અપડેટ્સ",
    "blog.sub": "લગ્ન અને કુટુંબ કાયદા પર દૈનિક અપડેટ્સ અને માર્ગદર્શન",
    "blog.readall": "બધી અપડેટ્સ વાંચો",
    "blog.readmore": "વધુ વાંચો",
    "blog.allheading": "કાનૂની બ્લોગ અને અપડેટ્સ",
    "blog.allsub": "કોર્ટ મેરેજ, રજિસ્ટ્રેશન અને કુટુંબ કાયદા પર ઉપયોગી લેખો",
    "blog.back": "← હોમ પર પાછા",

    // ---- Contact ----
    "contact.heading": "સંપર્ક કરો",
    "contact.sub": "તમારી પૂછપરછ સીધી વોટ્સએપ પર મોકલો — ઝડપી જવાબની ખાતરી",
    "contact.formtitle": "પૂછપરછ મોકલો",
    "contact.name": "તમારું નામ",
    "contact.phone": "ફોન નંબર",
    "contact.service": "સેવા પસંદ કરો",
    "contact.message": "તમારો સંદેશ",
    "contact.send": "વોટ્સએપ પર મોકલો",
    "contact.or": "અથવા સીધો સંપર્ક કરો",
    "contact.phonelabel": "ફોન / વોટ્સએપ",
    "contact.addresslabel": "ઓફિસ સરનામું",
    "contact.address":
      "ચાંદખેડા, આલ્ફા સ્ક્વેર સોસાયટી, હાઈવે મોલ પાસે, અમદાવાદ, ગુજરાત",
    "contact.hours": "સોમ – શનિ: સવારે ૯:૦૦ – રાત્રે ૮:૦૦",
    "contact.hourslabel": "કાર્ય સમય",

    // ---- Footer ----
    "footer.tagline":
      "અમદાવાદમાં વિશ્વસનીય કોર્ટ મેરેજ અને કાનૂની સેવાઓ. ગોપનીય, વ્યાવસાયિક અને સરકાર માન્ય.",
    "footer.quicklinks": "ઝડપી લિંક્સ",
    "footer.ourservices": "અમારી સેવાઓ",
    "footer.contactus": "સંપર્ક કરો",
    "footer.rights": "બધા હક્કો સુરક્ષિત.",
    "footer.disclaimer":
      "અસ્વીકરણ: આ વેબસાઇટ માત્ર સામાન્ય માહિતી માટે છે અને કાનૂની સલાહ નથી.",
  },
};
