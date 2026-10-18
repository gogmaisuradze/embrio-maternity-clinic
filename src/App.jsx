import React, { useState, useEffect, useRef } from 'react'
import { 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  X, 
  Search, 
  Sparkles, 
  Check,
  Star,
  Award,
  ChevronRight,
  Users,
  DollarSign,
  TrendingUp,
  BookOpen,
  Heart,
  Cpu,
  Baby,
  ShieldCheck,
  Stethoscope,
  Activity
} from 'lucide-react'

// Doctor list for Embrio Maternity Clinic
const DOCTORS = [
  { n: "მზია კაპანაძე", s: "მეან-გინეკოლოგი · რეპროდუქტოლოგია · ორსულთა პატრონაჟი" },
  { n: "თეიმურაზ გაგნიძე", s: "კლინიკის დირექტორი · ანდროლოგია · რეპროდუქტოლოგია" },
  { n: "ალეკო დიაკონიძე", s: "მეან-გინეკოლოგი · რეპროდუქტოლოგია · კონსულტაცია" },
  { n: "ალექსანდრე ქოიავა", s: "ანესთეზიოლოგია · რეანიმატოლოგია · გაუტკივარება" },
  { n: "თინათინ სოლომონიძე", s: "მეან-გინეკოლოგი · ორსულთა პატრონაჟი · კონსულტაცია" },
  { n: "ნინო კვარაცხელია", s: "მეან-გინეკოლოგი · ფიზიოლოგიური და საკეისრო მშობიარობა" },
  { n: "გიორგი მჭედლიძე", s: "მეან-გინეკოლოგი · ოპერაციული გინეკოლოგია · ქირურგია" },
  { n: "ეკატერინე ბერიძე", s: "ნეონატოლოგია · ახალშობილთა ინტენსიური თერაპია" },
  { n: "თამარ გელაშვილი", s: "რადიოლოგია · 4D ექოსკოპია · დოპლეროგრაფია" },
  { n: "მაია წერეთელი", s: "მეან-გინეკოლოგი · ორსულთა პატრონაჟი · კონსულტაცია" },
  { n: "სოფიო ჯაფარიძე", s: "ნეონატოლოგია · პედიატრია · ლაქტაციის კონსულტანტი" },
  { n: "დავით ლომიძე", s: "ანესთეზიოლოგია · რეანიმატოლოგია · კონსულტაცია" },
  { n: "ქეთევან მაისურაძე", s: "უფროსი ბებიაქალი · მშობელთა სკოლა · კონსულტაცია" }
]

// Gradient list for doctor avatars (Embrio Teal & Warm Coral-Peach tones)
const GRADS = [
  "linear-gradient(135deg, #1E7E75, #12544E)",
  "linear-gradient(135deg, #E08A79, #C46856)",
  "linear-gradient(135deg, #2B9E93, #1B6B63)",
  "linear-gradient(135deg, #E89D72, #C97A4E)"
]

const BOT_RESPONSES_EN = {
  welcome: 'Hello! I am EmbrioBot — virtual assistant of Embrio Maternity Clinic. How can I help you today? Choose a topic or write to us:',
  services: 'At Embrio Maternity Clinic we offer full maternal & reproductive care: Physiological Delivery & Cesarean Section (24/7), Prenatal Care, Gynecology, Reproductology & Andrology, Neonatology (NICU), 4D Ultrasound, and Painless Epidural Anesthesia.',
  prices: 'Physiological delivery starts from 1,200₾, Cesarean section from 1,650₾. Obstetrician consultation is 70₾.',
  contact: 'Embrio Maternity Clinic is located in Tbilisi, Digomi Medical Cluster, 2/6 Academician Lubliana St. Maternity & Emergency Block: 24/7 · Outpatient Clinic: Mon–Sat 09:30–18:00. Hotline: (032) 2 51 86 24 · Email: info@embrio.ge.'
};

const BOT_RESPONSES = {
  welcome: 'გამარჯობა! მე ვარ EmbrioBot — სამშობიარო კლინიკა „ემბრიოს“ ციფრული ასისტენტი. რით შემიძლია დაგეხმაროთ დღეს? აირჩიეთ კითხვა ან მოგვწერეთ:',
  services: 'სამშობიარო კლინიკა „ემბრიოში“ გთავაზობთ სრულ სამეანო-გინეკოლოგიურ და რეპროდუქტოლოგიურ მომსახურებას: ფიზიოლოგიური მშობიარობა და საკეისრო კვეთა (24/7), ორსულთა ანტენატალური პატრონაჟი, გინეკოლოგია, რეპროდუქტოლოგია და ანდროლოგია, ნეონატოლოგია, 4D ექოსკოპია და უმტკივნეულო ეპიდურული ანესთეზია.',
  prices: 'ფიზიოლოგიური მშობიარობა — 1200₾-დან, საკეისრო კვეთა — 1650₾-დან. მეან-გინეკოლოგის კონსულტაცია — 70₾.',
  contact: 'კლინიკა „ემბრიო“ მდებარეობს თბილისში, დიღმის მასივში, აკადემიკოს ლუბლიანას ქ. №2/6 (№13/6). სამშობიარო და მიმღები ბლოკი მუშაობს 24/7 რეჟიმში · ამბულატორია: ორშ – შაბ: 09:30–18:00. ცხელი ხაზი: (032) 2 51 86 24 · ელ-ფოსტა: info@embrio.ge.'
}

const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"]
const WDS = ["ორ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვ"]
const TIMES = ["09:30", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

const SERVICES_DETAILS_EN = {
  obstetrics: {
    title: "Obstetrics & Delivery",
    desc: "Safe, family-oriented physiological childbirth with 24/7 monitoring by experienced obstetricians, neonatologists, and midwives.",
    subs: [
      { title: "Modern Delivery Rooms", text: "Equipped with continuous fetal monitors and ergonomic birthing beds." },
      { title: "Partner-Assisted Childbirth", text: "Support from your partner or family member in a warm, calm, and private environment." },
      { title: "24/7 Postpartum Care", text: "Comfortable postpartum rooms with 24-hour nursing support and balanced maternal nutrition." }
    ]
  },
  cesarean: {
    title: "Cesarean Section",
    desc: "Planned and emergency cesarean delivery performed in ultra-modern operating theaters with gentle spinal/epidural anesthesia and immediate skin-to-skin newborn care.",
    subs: [
      { title: "Gentle Cesarean Technique", text: "Modern minimally traumatic surgical techniques (Stark method) ensuring rapid postpartum recovery." },
      { title: "Cosmetic Suture", text: "Aesthetic intradermal absorbable sutures that leave virtually invisible healing." },
      { title: "Enhanced Recovery", text: "Early mobilization program and attentive postoperative pain management." }
    ]
  },
  prenatal: {
    title: "Prenatal Care (Antenatal)",
    desc: "Complete medical supervision of pregnancy from the very first weeks until childbirth, including both State Antenatal Vouchers and comprehensive clinic packages.",
    subs: [
      { title: "Trimester Checkups", text: "Scheduled obstetric visits, laboratory panels, genetic screenings, and fetal growth tracking." },
      { title: "High-Risk Pregnancy Management", text: "Specialized monitoring for twin pregnancies, gestational diabetes, preeclampsia, and Rh-incompatibility." },
      { title: "Cardiotocography (CTG)", text: "Continuous non-stress fetal heart rate monitoring in the third trimester." }
    ]
  },
  gynecology: {
    title: "Gynecology",
    desc: "Outpatient, endocrine, and surgical gynecology for women of all ages using modern minimally invasive and endoscopic methods.",
    subs: [
      { title: "Diagnostic & Colposcopy", text: "Digital video colposcopy, PAP smear, HPV testing, and cervical pathology management." },
      { title: "Endocrine Gynecology", text: "Diagnosis and treatment of hormonal imbalances, PCOS, endometriosis, and menopausal care." },
      { title: "Operative Gynecology", text: "Hysteroscopy, laparoscopy, and reconstructive gynecological surgeries." }
    ]
  },
  reproductology: {
    title: "Reproductology & Andrology",
    desc: "Comprehensive diagnosis and treatment of female and male infertility led by renowned reproductologists and andrologists.",
    subs: [
      { title: "Couple Fertility Assessment", text: "Detailed hormonal, ultrasound (folliculometry), immunological, and tubal patency evaluations." },
      { title: "Andrology & Spermogram", text: "Advanced male fertility diagnostics, MAR-test, and personalized andrological therapy." },
      { title: "Ovulation Induction & Preparation", text: "Individualized protocols to help couples achieve a healthy, desired pregnancy." }
    ]
  },
  neonatology: {
    title: "Neonatology & Newborn Care",
    desc: "Round-the-clock care for newborns from the first seconds of life, supported by modern neonatal intensive care incubators and experienced neonatologists.",
    subs: [
      { title: "24/7 Neonatal Supervision", text: "Immediate assessment by a neonatologist in the delivery room and daily pediatric rounds." },
      { title: "Neonatal Intensive Care (NICU)", text: "Advanced respiratory support, phototherapy, and incubator care for premature newborns." },
      { title: "Newborn Screening & Vaccination", text: "National genetic screening, audiological otoacoustic hearing test, and first vaccinations." }
    ]
  },
  ultrasound: {
    title: "4D Ultrasound & Radiology",
    desc: "Expert prenatal ultrasound diagnostics with high-resolution 3D/4D imaging and color Doppler assessment of fetal blood flow.",
    subs: [
      { title: "3D/4D Fetal Imaging", text: "See your baby's facial features and movements in real time with crystal-clear volumetric imaging." },
      { title: "1st, 2nd & 3rd Trimester Screening", text: "Detailed anatomical scans at 11–13, 18–22, and 30–34 weeks of gestation." },
      { title: "Feto-Placental Doppler", text: "Precise evaluation of uteroplacental and fetal circulation." }
    ]
  },
  anesthesiology: {
    title: "Anesthesiology & Painless Delivery",
    desc: "Safe, comfortable childbirth without pain or stress, managed by our dedicated 24/7 obstetric anesthesiology team.",
    subs: [
      { title: "Epidural Analgesia", text: "Walking epidural technique that relieves labor pain while preserving natural mobility and sensations." },
      { title: "Spinal Anesthesia", text: "Safe regional anesthesia for cesarean sections allowing the mother to see her baby immediately at birth." }
    ]
  },
  laboratory: {
    title: "Clinical Laboratory",
    desc: "Fast and accurate on-site clinical, biochemical, hormonal, and coagulation testing for pregnant women and gynecological patients.",
    subs: [
      { title: "Prenatal & Hormonal Panels", text: "hCG, Progesterone, TSH, TORCH infections, Double/Triple genetic screening tests." },
      { title: "24/7 Express Diagnostics", text: "Complete blood count, coagulogram, blood group/Rh factor, and biochemistry." }
    ]
  },
  parenting: {
    title: "Parenting School & Lactation",
    desc: "Psychological and practical preparation for expectant mothers and partners, plus certified breastfeeding support.",
    subs: [
      { title: "Childbirth Preparation Course", text: "Breathing techniques, labor stages, relaxation methods, and newborn care basics." },
      { title: "Lactation Consulting", text: "Hands-on assistance with painless latching and successful breastfeeding in the maternity ward." }
    ]
  }
};

const SERVICES_DETAILS = {
  obstetrics: {
    title: "მეანობა და მშობიარობა",
    desc: "უსაფრთხო, ოჯახზე ორიენტირებული ფიზიოლოგიური მშობიარობა 24/7 მონიტორინგით გამოცდილი მეან-გინეკოლოგების, ნეონატოლოგებისა და ბებიაქალების გუნდთან ერთად.",
    subs: [
      { title: "თანამედროვე სამშობიარო გარემო", text: "სამშობიარო სივრცე აღჭურვილია ფეტალური მონიტორებითა და ტრანსფორმირებადი სამშობიარო საწოლებით." },
      { title: "პარტნიორული მშობიარობა", text: "მეუღლის ან ოჯახის წევრის დასწრება მშობიარობაზე მშვიდ, თბილ და კონფიდენციალურ გარემოში." },
      { title: "მშობიარობის შემდგომი მოვლა", text: "კომფორტული პოსტნატალური პალატები 24-საათიანი სამედიცინო მოვლითა და სრულფასოვანი კვებით." }
    ]
  },
  cesarean: {
    title: "საკეისრო კვეთა",
    desc: "გეგმიური და გადაუდებელი საკეისრო კვეთა უახლესი სტანდარტის საოპერაციო ბლოკში, დამზოგველი სპინალური/ეპიდურული გაუტკივარებით და ახალშობილთან მყისიერი კონტაქტით.",
    subs: [
      { title: "დამზოგველი ქირურგიული მეთოდი", text: "თანამედროვე ატრავმული ტექნიკა (Stark-ის მეთოდი), რომელიც უზრუნველყოფს სწრაფ რეაბილიტაციას." },
      { title: "ესთეტიკური კოსმეტიკური ნაკერი", text: "კანქვეშა გაწოვადი ნაკერი, რომელიც ტოვებს შეუმჩნეველ კვალს." },
      { title: "სწრაფი აღდგენის პროტოკოლი", text: "ადრეული გააქტიურება და პოსტოპერაციული პერიოდის სრული უმტკივნეულო მართვა." }
    ]
  },
  prenatal: {
    title: "ორსულთა პატრონაჟი",
    desc: "ორსულობის სრული სამედიცინო მეთვალყურეობა პირველივე კვირებიდან მშობიარობამდე — ყველა ტრიმესტრის გეგმიური კვლევებითა და მონიტორინგით.",
    subs: [
      { title: "ტრიმესტრული ვიზიტები", text: "გეგმიური კონსულტაციები, ლაბორატორიული ანალიზები, გენეტიკური სკრინინგი და ნაყოფის ზრდის მონიტორინგი." },
      { title: "მაღალი რისკის ორსულობის მართვა", text: "ტყუპი ორსულობის, გესტაციური დიაბეტის, პრეეკლამფსიისა და რეზუს-კონფლიქტის სპეციალიზებული მეთვალყურეობა." },
      { title: "კარდიოტოკოგრაფია (CTG)", text: "ნაყოფის გულისცემისა და საშვილოსნოს ტონუსის უწყვეტი მონიტორინგი." }
    ]
  },
  gynecology: {
    title: "გინეკოლოგია",
    desc: "ამბულატორიული, ენდოკრინული და ოპერაციული გინეკოლოგია ნებისმიერი ასაკის ქალბატონებისთვის თანამედროვე მცირეინვაზიური მეთოდებით.",
    subs: [
      { title: "კოლპოსკოპია და დიაგნოსტიკა", text: "ციფრული ვიდეო-კოლპოსკოპია, PAP-ტესტი და საშვილოსნოს ყელის პათოლოგიების მკურნალობა." },
      { title: "ენდოკრინული გინეკოლოგია", text: "ჰორმონალური დარღვევების, პოლიკისტოზის, ენდომეტრიოზისა და კლიმაქტერული პერიოდის მართვა." },
      { title: "ოპერაციული გინეკოლოგია", text: "ჰისტეროსკოპია, ლაპაროსკოპია და პლასტიკურ-რეკონსტრუქციული გინეკოლოგიური ოპერაციები." }
    ]
  },
  reproductology: {
    title: "რეპროდუქტოლოგია",
    desc: "ქალისა და მამაკაცის უნაყოფობის კომპლექსური დიაგნოსტიკა და მკურნალობა კლინიკა „ემბრიოს“ წამყვანი რეპროდუქტოლოგებისა და ანდროლოგების მიერ.",
    subs: [
      { title: "წყვილის კომპლექსური კვლევა", text: "ჰორმონალური პროფილი, ფოლიკულომეტრია, მილების გამტარობის კვლევა და იმუნოლოგიური შეფასება." },
      { title: "ანდროლოგია და სპერმოგრამა", text: "მამაკაცის რეპროდუქციული ჯანმრთელობის დიაგნოსტიკა და მკურნალობა კლინიკის ხელმძღვანელ თეიმურაზ გაგნიძესთან." },
      { title: "ორსულობის დაგეგმვა", text: "ინდივიდუალური რეპროდუქციული თერაპია ნანატრი ორსულობის მისაღწევად." }
    ]
  },
  neonatology: {
    title: "ნეონატოლოგია",
    desc: "ახალშობილზე ზრუნვა დაბადების პირველივე წამიდან — 24-საათიანი ნეონატოლოგიური მეთვალყურეობა და ინტენსიური თერაპიის თანამედროვე აღჭურვილობა.",
    subs: [
      { title: "24/7 ნეონატოლოგიური მოვლა", text: "ახალშობილის შეფასება სამშობიარო ბლოკშივე და ყოველდღიური პედიატრიული მონიტორინგი." },
      { title: "ინტენსიური თერაპია (NICU)", text: "დღენაკლული ახალშობილების მართვა თანამედროვე ინკუბატორებითა და ფოტოთერაპიის სისტემებით." },
      { title: "სკრინინგი და ვაქცინაცია", text: "გენეტიკური მეტაბოლური სკრინინგი, აუდიოლოგიური (სმენის) ტესტი და სამშობიარო ვაქცინაცია." }
    ]
  },
  ultrasound: {
    title: "4D ექოსკოპია და რადიოლოგია",
    desc: "ნაყოფისა და მცირე მენჯის ღრუს ორგანოების ექსპერტული ულტრაბგერითი დიაგნოსტიკა მაღალი გარჩევადობის 3D/4D აპარატურით.",
    subs: [
      { title: "3D/4D მოცულობითი ექოსკოპია", text: "ნაყოფის ნაკვთებისა და მიმიკის რეალურ დროში დათვალიერება და ფოტო/ვიდეო ჩანაწერი." },
      { title: "სკრინინგული ექოსკოპია", text: "I, II და III ტრიმესტრის დეტალური ანატომიური და გენეტიკური მარკერების შეფასება." },
      { title: "დოპლეროგრაფია", text: "დედა-პლაცენტა-ნაყოფის სისხლის მიმოქცევის ზუსტი შეფასება." }
    ]
  },
  anesthesiology: {
    title: "ანესთეზიოლოგია",
    desc: "უსაფრთხო და სრულიად უმტკივნეულო მშობიარობა 24/7 სამეანო ანესთეზიოლოგიური სამსახურის მეთვალყურეობით.",
    subs: [
      { title: "ეპიდურული გაუტკივარება", text: "მშობიარობის ტკივილის სრული მოხსნა მოძრაობისა და ბუნებრივი შეგრძნებების შენარჩუნებით." },
      { title: "სპინალური ანესთეზია", text: "უსაფრთხო რეგიონული გაუტკივარება საკეისრო კვეთისას — დედა პირველივე წამს ხედავს პატარას." }
    ]
  },
  laboratory: {
    title: "ლაბორატორიული კვლევები",
    desc: "სრული კლინიკურ-დიაგნოსტიკური, ბიოქიმიური, ჰორმონალური და იმუნოლოგიური ლაბორატორია ადგილზე სწრაფი და ზუსტი პასუხებით.",
    subs: [
      { title: "პრენატალური და ჰორმონალური პანელი", text: "ქორიონული გონადოტროპინი (hCG), პროგესტერონი, ფარისებრი ჯირკვლის ჰორმონები, TORCH-ინფექციები." },
      { title: "24/7 ექსპრეს-დიაგნოსტიკა", text: "სისხლის საერთო ანალიზი, კოაგულოგრამა, ჯგუფი/რეზუსი და ბიოქიმიური კვლევები." }
    ]
  },
  parenting: {
    title: "მშობელთა სკოლა და ლაქტაცია",
    desc: "მომავალი მშობლების ფსიქო-ფიზიკური მომზადება მშობიარობისთვის და ძუძუთი კვების ინდივიდუალური მხარდაჭერა.",
    subs: [
      { title: "მშობიარობისთვის მომზადება", text: "სუნთქვითი ვარჯიშები, მშობიარობის ეტაპების გაცნობა და ახალშობილის მოვლის პრაქტიკული კურსი." },
      { title: "ლაქტაციის კონსულტაცია", text: "სწორი მოჭიდების სწავლება და კომფორტული ძუძუთი კვების დაწყება სამშობიარო პალატაშივე." }
    ]
  }
}

const ENAMEL_DETAILS_EN = {
  sweets: {
    title: "First Trimester (Weeks 1–12)",
    damage: "During the first 12 weeks, all vital organs of the embryo are formed. Early registration with an obstetrician-gynecologist, first genetic ultrasound screening (11–13 weeks), and complete blood/hormonal workup are essential.",
    tip: "Take prescribed folic acid and prenatal vitamins daily, stay hydrated, avoid self-medication, and book your first antenatal registration visit at Embrio Clinic at 6–8 weeks."
  },
  smoking: {
    title: "Second Trimester (Weeks 13–27)",
    damage: "Known as the golden period of pregnancy — fetal movements begin and detailed anatomical 3D/4D ultrasound (18–22 weeks) evaluates organ development, placental position, and cervical length.",
    tip: "Complete your glucose tolerance screening (24–28 weeks), maintain a balanced iron- and calcium-rich diet, and join Embrio's Parenting School sessions."
  },
  coffee: {
    title: "Third Trimester & Delivery Prep (Weeks 28–40)",
    damage: "The baby actively gains weight and prepares for birth. Regular Cardiotocography (CTG) and Doppler ultrasound monitor fetal wellbeing and placental blood flow.",
    tip: "At week 34–36, meet your personal obstetrician-gynecologist at Embrio Clinic and finalize your personalized birth plan."
  }
};

const ENAMEL_DETAILS = {
  sweets: {
    title: "I ტრიმესტრი (1–12 კვირა)",
    damage: "პირველი 12 კვირის განმავლობაში ყალიბდება ნაყოფის ყველა სასიცოცხლო ორგანო. ამ ეტაპზე უმნიშვნელოვანესია ორსულობის დროული აღრიცხვა, პირველადი ლაბორატორიული კვლევები და 11–13 კვირის გენეტიკური ექოსკოპიური სკრინინგი.",
    tip: "დადგით ორსულობის ანტენატალურ აღრიცხვაზე კლინიკა „ემბრიოში“ 6–12 კვირის ვადაზე, მიიღეთ ექიმის მიერ დანიშნული ფოლიუმის მჟავა და მოერიდეთ თვითნებურ მედიკამენტებს."
  },
  smoking: {
    title: "II ტრიმესტრი (13–27 კვირა)",
    damage: "ორსულობის ყველაზე მშვიდი და სასიამოვნო პერიოდი, როდესაც მომავალი დედა პირველად გრძნობს პატარას მოძრაობას. 18–22 კვირაზე ტარდება ექსპერტული 4D ანატომიური ექოსკოპია ნაყოფის განვითარების დეტალური შეფასებისთვის.",
    tip: "24–28 კვირაზე ჩაიტარეთ გესტაციური დიაბეტის სკრინინგი, აკონტროლეთ რკინისა და კალციუმის ბალანსი და დაესწარით „ემბრიოს“ მშობელთა სკოლის პრაქტიკულ შეხვედრებს."
  },
  coffee: {
    title: "III ტრიმესტრი და მშობიარობის დაგეგმვა (28–40 კვირა)",
    damage: "ნაყოფი აქტიურად იმატებს წონაში და ემზადება დაბადებისთვის. ამ პერიოდში რეგულარულად ტარდება კარდიოტოკოგრაფია (CTG) და დოპლეროგრაფია დედა-პლაცენტა-ნაყოფის სისხლის მიმოქცევის შესაფასებლად.",
    tip: "34–36 კვირაზე შეარჩიეთ პირადი მეან-გინეკოლოგი კლინიკა „ემბრიოში“ და შეადგინეთ თქვენი მშობიარობის ინდივიდუალური გეგმა."
  }
}

const DOCTORS_DETAILS_EN = {
  "mzia-kapanadze": {
    name: "Mzia Kapanadze",
    role: "Lead Obstetrician-Gynecologist / Reproductologist",
    specialization: "Obstetrics and gynecology, prenatal care & patronage, physiological and cesarean childbirth, reproductive health.",
    education: "Tbilisi State Medical University, certified Obstetrician-Gynecologist and Reproductologist with extensive clinical experience.",
    bio: "Lead Obstetrician-Gynecologist at Embrio Maternity Clinic. Dedicated to guiding expectant mothers with warmth, professionalism, and evidence-based care from pregnancy planning through safe delivery."
  },
  "teimuraz-gagnidze": {
    name: "Teimuraz Gagnidze",
    role: "General Director / Andrologist / Reproductologist",
    specialization: "Male & couple infertility diagnostics, reproductive medicine, clinical management.",
    education: "Tbilisi State Medical University; specialized postgraduate training in Reproductive Medicine and Andrology.",
    bio: "Founder and General Director of Embrio Maternity & Reproductive Clinic. Decades of clinical experience helping thousands of families welcome healthy children."
  },
  "aleko-diakonidze": {
    name: "Aleko Diakonidze",
    role: "Obstetrician-Gynecologist / Reproductologist",
    specialization: "Obstetrics, physiological and cesarean deliveries, reproductive endocrinology, infertility treatment.",
    education: "Higher medical education, certified Obstetrician-Gynecologist and Reproductologist.",
    bio: "Lead obstetrician-gynecologist and reproductologist at Embrio Clinic, known for attentive high-risk pregnancy management and personalized care."
  },
  "aleksandre-koiava": {
    name: "Aleksandre Koiava",
    role: "Head of Anesthesiology & Intensive Care",
    specialization: "Obstetric anesthesiology, painless labor (epidural/spinal analgesia), critical care medicine.",
    education: "Higher medical education, residency in Anesthesiology and Resuscitation.",
    bio: "Ensures 24/7 painless childbirth and safe anesthesia for cesarean and gynecological surgeries at Embrio Clinic."
  },
  "tinatin-solomonidze": {
    name: "Tinatin Solomonidze",
    role: "Obstetrician-Gynecologist",
    specialization: "Prenatal care, outpatient gynecology, physiological childbirth, colposcopy.",
    education: "Tbilisi State Medical University, certified specialist in Obstetrics and Gynecology.",
    bio: "Dedicated obstetrician-gynecologist guiding expectant mothers through every stage of pregnancy with warmth and evidence-based care."
  },
  "nino-kvaratskhelia": {
    name: "Nino Kvaratskhelia",
    role: "Senior Obstetrician-Gynecologist",
    specialization: "Physiological childbirth, gentle cesarean section, twin and high-risk deliveries.",
    education: "Tbilisi State Medical University, Residency in Obstetrics & Gynecology.",
    bio: "Over 15 years of delivery-room experience. Specializes in family-centered childbirth and gentle surgical techniques."
  },
  "giorgi-mchedlidze": {
    name: "Giorgi Mchedlidze",
    role: "Obstetrician-Gynecologist / Surgeon",
    specialization: "Operative gynecology, cesarean section, hysteroscopy, laparoscopic surgery.",
    education: "Higher medical education, fellowship in endoscopic and minimally invasive gynecological surgery.",
    bio: "Performs complex obstetric and minimally invasive gynecological operations with rapid patient recovery."
  },
  "ekaterine-beridze": {
    name: "Ekaterine Beridze",
    role: "Head of Neonatology",
    specialization: "Newborn care, neonatal resuscitation, premature infant care (NICU).",
    education: "Higher medical education in Pediatrics & Neonatology.",
    bio: "Cares for newborns from the very first minute of life, supervising the neonatal department 24/7."
  },
  "tamar-gelashvili": {
    name: "Tamar Gelashvili",
    role: "Prenatal Radiologist / 4D Ultrasound Specialist",
    specialization: "3D/4D fetal ultrasound, genetic screening scans, feto-placental Dopplerography.",
    education: "Certified specialist in Medical Radiology and Prenatal Ultrasound Diagnostics (FMF standards).",
    bio: "Provides high-precision 3D/4D prenatal ultrasound imaging across all three trimesters."
  },
  "maia-tsereteli": {
    name: "Maia Tsereteli",
    role: "Obstetrician-Gynecologist",
    specialization: "Antenatal patronage, endocrine gynecology, pregnancy planning.",
    education: "Tbilisi State Medical University, certified Obstetrician-Gynecologist.",
    bio: "Experienced specialist in state and individual prenatal monitoring programs."
  },
  "sopio-japaridze": {
    name: "Sopio Japaridze",
    role: "Neonatologist / Lactation Consultant",
    specialization: "Newborn developmental assessment, breastfeeding support, neonatal screening.",
    education: "Higher medical education in Pediatrics and Neonatology.",
    bio: "Helps new mothers establish comfortable breastfeeding and monitors newborn adaptation."
  },
  "davit-lomidze": {
    name: "Davit Lomidze",
    role: "Anesthesiologist-Resuscitator",
    specialization: "Epidural analgesia, spinal anesthesia, postoperative pain management.",
    education: "Higher medical education in Anesthesiology and Intensive Care.",
    bio: "Member of the 24/7 obstetric anesthesia team ensuring stress-free and painless childbirth."
  },
  "ketevan-maisuradze": {
    name: "Ketevan Maisuradze",
    role: "Chief Midwife / Parenting School Lead",
    specialization: "Physiological labor support, breathing techniques, maternal preparation.",
    education: "Higher nursing & midwifery education, certified childbirth educator.",
    bio: "Supports mothers throughout labor with compassion and leads Embrio's childbirth preparation classes."
  }
};

const DOCTORS_DETAILS = {
  "mzia-kapanadze": {
    name: "მზია კაპანაძე",
    role: "მეან-გინეკოლოგი / რეპროდუქტოლოგი",
    image: `${import.meta.env.BASE_URL}images/mzia-kapanadze.jpg`,
    specialization: "მეანობა-გინეკოლოგია, ორსულთა პატრონაჟი და ანტენატალური მეთვალყურეობა, ფიზიოლოგიური მშობიარობა და საკეისრო კვეთა, რეპროდუქტოლოგია.",
    education: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი.\nსახელმწიფო სერტიფიკატები მეანობა-გინეკოლოგიასა და რეპროდუქტოლოგიაში.",
    bio: "სამშობიარო კლინიკა „ემბრიოს“ წამყვანი მეან-გინეკოლოგი და რეპროდუქტოლოგი. მრავალწლიანი კლინიკური გამოცდილებით, განსაკუთრებული სითბოთი და ინდივიდუალური მიდგომით ზრუნავს მომავალ დედებზე ორსულობის დაგეგმვიდან უსაფრთხო მშობიარობამდე."
  },
  "teimuraz-gagnidze": {
    name: "თეიმურაზ გაგნიძე",
    role: "კლინიკის გენერალური დირექტორი / ანდროლოგი / რეპროდუქტოლოგი",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    specialization: "მამაკაცისა და წყვილის უნაყოფობის დიაგნოსტიკა და მკურნალობა, რეპროდუქტოლოგია, კლინიკური მენეჯმენტი.",
    education: "უმაღლესი სამედიცინო განათლება, სერტიფიცირებული ანდროლოგი და რეპროდუქტოლოგი მრავალწლიანი კლინიკური გამოცდილებით.",
    bio: "სამშობიარო და რეპროდუქტოლოგიური კლინიკა „ემბრიოს“ დამფუძნებელი და გენერალური დირექტორი. ათწლეულების განმავლობაში ეხმარება წყვილებს ნანატრი შვილის ყოლასა და რეპროდუქციული ჯანმრთელობის აღდგენაში."
  },
  "aleko-diakonidze": {
    name: "ალეკო დიაკონიძე",
    role: "მეან-გინეკოლოგი / რეპროდუქტოლოგი",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
    specialization: "ფიზიოლოგიური მშობიარობა, საკეისრო კვეთა, რეპროდუქტოლოგია, მაღალი რისკის ორსულობის მართვა.",
    education: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი.\nსახელმწიფო სერტიფიკატები მეანობა-გინეკოლოგიასა და რეპროდუქტოლოგიაში.",
    bio: "კლინიკა „ემბრიოს“ წამყვანი მეან-გინეკოლოგი და რეპროდუქტოლოგი. გამოირჩევა ინდივიდუალური მიდგომით, ორსულობის დაგეგმვიდან უსაფრთხო მშობიარობამდე."
  },
  "aleksandre-koiava": {
    name: "ალექსანდრე ქოიავა",
    role: "ანესთეზიოლოგიისა და რეანიმაციის მიმართულების ხელმძღვანელი",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800",
    specialization: "სამეანო ანესთეზიოლოგია, უმტკივნეულო მშობიარობა (ეპიდურული და სპინალური გაუტკივარება), ინტენსიური თერაპია.",
    education: "უმაღლესი სამედიცინო განათლება, სერტიფიცირებული ანესთეზიოლოგ-რეანიმატოლოგი.",
    bio: "უზრუნველყოფს 24/7 რეჟიმში უმტკივნეულო ფიზიოლოგიურ მშობიარობასა და უსაფრთხო რეგიონულ ანესთეზიას საკეისრო კვეთის დროს."
  },
  "tinatin-solomonidze": {
    name: "თინათინ სოლომონიძე",
    role: "მეან-გინეკოლოგი",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
    specialization: "ორსულთა ანტენატალური პატრონაჟი, ამბულატორიული გინეკოლოგია, ფიზიოლოგიური მშობიარობა, კოლპოსკოპია.",
    education: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი, რეზიდენტურა მეანობა-გინეკოლოგიაში.",
    bio: "კლინიკა „ემბრიოს“ გამოცდილი მეან-გინეკოლოგი. ზრუნავს მომავალ დედებზე ორსულობის პირველივე კვირიდან მშობიარობის ჩათვლით."
  },
  "nino-kvaratskhelia": {
    name: "ნინო კვარაცხელია",
    role: "უფროსი მეან-გინეკოლოგი",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    specialization: "ფიზიოლოგიური მშობიარობა, დამზოგველი საკეისრო კვეთა, პარტნიორული მშობიარობა.",
    education: "უმაღლესი სამედიცინო განათლება, 15+ წლიანი სამეანო პრაქტიკა.",
    bio: "სპეციალიზებულია ფიზიოლოგიური და გართულებული მშობიარობის მართვაში, თანამედროვე სამეანო პროტოკოლების სრული დაცვით."
  },
  "giorgi-mchedlidze": {
    name: "გიორგი მჭედლიძე",
    role: "მეან-გინეკოლოგი / ქირურგი",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800",
    specialization: "ოპერაციული გინეკოლოგია, საკეისრო კვეთა, ჰისტეროსკოპია, ლაპაროსკოპიული ოპერაციები.",
    education: "უმაღლესი სამედიცინო განათლება, კვალიფიკაცია ენდოსკოპიურ და ოპერაციულ გინეკოლოგიაში.",
    bio: "ატარებს როგორც გეგმიურ და გადაუდებელ საკეისრო კვეთებს, ისე მცირეინვაზიურ გინეკოლოგიურ ოპერაციებს."
  },
  "ekaterine-beridze": {
    name: "ეკატერინე ბერიძე",
    role: "ნეონატოლოგიური სამსახურის ხელმძღვანელი",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=800",
    specialization: "ახალშობილთა მეთვალყურეობა, ნეონატალური რეანიმაცია, დღენაკლულ ახალშობილთა მართვა.",
    education: "უმაღლესი სამედიცინო განათლება პედიატრიასა და ნეონატოლოგიაში.",
    bio: "ხელმძღვანელობს ახალშობილთა განყოფილებას და ზრუნავს პატარების ჯანმრთელობაზე დაბადების პირველივე წამიდან."
  },
  "tamar-gelashvili": {
    name: "თამარ გელაშვილი",
    role: "რადიოლოგი / 4D ექოსკოპიის სპეციალისტი",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=800",
    specialization: "ნაყოფის 3D/4D ექოსკოპია, ტრიმესტრული გენეტიკური სკრინინგი, დოპლეროგრაფია.",
    education: "სერტიფიცირებული რადიოლოგი, პრენატალური ულტრაბგერითი დიაგნოსტიკის სპეციალისტი.",
    bio: "ატარებს მაღალი სიზუსტის 3D/4D ექოსკოპიურ კვლევებს ორსულობის ყველა ტრიმესტრში."
  },
  "maia-tsereteli": {
    name: "მაია წერეთელი",
    role: "მეან-გინეკოლოგი",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800",
    specialization: "ორსულთა პატრონაჟი, ენდოკრინული გინეკოლოგია, ორსულობის დაგეგმვა.",
    education: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი.",
    bio: "უძღვება ორსულთა სახელმწიფო და ინდივიდუალურ ანტენატალურ მეთვალყურეობას."
  },
  "sopio-japaridze": {
    name: "სოფიო ჯაფარიძე",
    role: "ნეონატოლოგი / ლაქტაციის კონსულტანტი",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&q=80&w=800",
    specialization: "ახალშობილთა ადაპტაცია, ძუძუთი კვების კონსულტირება, ნეონატალური სკრინინგი.",
    education: "უმაღლესი სამედიცინო განათლება ნეონატოლოგიასა და პედიატრიაში.",
    bio: "ეხმარება ახალბედა დედებს ლაქტაციის სწორად დაწყებასა და ახალშობილის მოვლის საკითხებში."
  },
  "davit-lomidze": {
    name: "დავით ლომიძე",
    role: "ანესთეზიოლოგ-რეანიმატოლოგი",
    image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&q=80&w=800",
    specialization: "ეპიდურული ანალგეზია, სპინალური ანესთეზია, პოსტოპერაციული მართვა.",
    education: "უმაღლესი სამედიცინო განათლება ანესთეზიოლოგია-რეანიმატოლოგიაში.",
    bio: "24/7 სამეანო ანესთეზიოლოგიური გუნდის წევრი, უზრუნველყოფს უსაფრთხო და უმტკივნეულო მშობიარობას."
  },
  "ketevan-maisuradze": {
    name: "ქეთევან მაისურაძე",
    role: "უფროსი ბებიაქალი / მშობელთა სკოლა",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    specialization: "ფიზიოლოგიური მშობიარობის მიღება, სუნთქვითი ტექნიკები, მშობელთა სკოლის კოორდინაცია.",
    education: "სამეანო-საექთნო უმაღლესი განათლება, 20-წლიანი გამოცდილება სამშობიარო ბლოკში.",
    bio: "სითბოთი და პროფესიონალიზმით ეხმარება მშობიარეებს მშობიარობის ყველა ეტაპზე."
  }
}

const getServiceDetailTranslated = (activeDetail, currentLang) => {
  if (!activeDetail) return null;
  if (currentLang === 'ka') return activeDetail;
  const enDetail = SERVICES_DETAILS_EN[activeDetail.key];
  if (enDetail) {
    return { ...enDetail, key: activeDetail.key };
  }
  return activeDetail;
};

const getEnamelDetailTranslated = (activeDetail, currentLang) => {
  if (!activeDetail) return null;
  if (currentLang === 'ka') return activeDetail;
  const enDetail = ENAMEL_DETAILS_EN[activeDetail.key];
  if (enDetail) {
    return { ...enDetail, key: activeDetail.key };
  }
  return activeDetail;
};

const getDoctorDetailsByName = (name, currentLang = 'ka') => {
  const cleanName = name.replace(/\s+/g, '').toLowerCase();
  let foundKey = null;
  for (const key of Object.keys(DOCTORS_DETAILS)) {
    const doc = DOCTORS_DETAILS[key];
    const docCleanName = doc.name.replace(/\s+/g, '').toLowerCase();
    if (docCleanName === cleanName) {
      foundKey = key;
      break;
    }
  }
  if (!foundKey) {
    for (const key of Object.keys(DOCTORS_DETAILS_EN)) {
      const doc = DOCTORS_DETAILS_EN[key];
      const docCleanName = doc.name.replace(/\s+/g, '').toLowerCase();
      if (docCleanName === cleanName) {
        foundKey = key;
        break;
      }
    }
  }
  if (foundKey) {
    if (currentLang === 'ka') {
      return { ...DOCTORS_DETAILS[foundKey], key: foundKey };
    } else {
      return { ...DOCTORS_DETAILS_EN[foundKey], image: DOCTORS_DETAILS[foundKey].image, key: foundKey };
    }
  }
  return null;
}

// Soft tactile click sound using Web Audio API (zero latency, always works)
const playClickSound = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.028);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.028);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Ignore autoplay restrictions
  }
}

const renderServiceIcon = (key) => {
  switch (key) {
    case 'obstetrics':
      return <Baby width={22} height={22} strokeWidth={1.8} />
    case 'cesarean':
      return <Heart width={22} height={22} strokeWidth={1.8} />
    case 'prenatal':
      return <ShieldCheck width={22} height={22} strokeWidth={1.8} />
    case 'gynecology':
      return <Stethoscope width={22} height={22} strokeWidth={1.8} />
    case 'reproductology':
      return <Sparkles width={22} height={22} strokeWidth={1.8} />
    case 'neonatology':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/>
          <path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0"/>
          <path d="M12 3c-1.5 1.5-1.5 3 0 4"/>
        </svg>
      )
    case 'ultrasound':
      return <Activity width={22} height={22} strokeWidth={1.8} />
    case 'anesthesiology':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
          <path d="M9 12h6M12 9v6"/>
        </svg>
      )
    case 'laboratory':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M10 2v7.31L4.72 18.55A2 2 0 0 0 6.46 21.5h11.08a2 2 0 0 0 1.74-2.95L14 9.31V2"/>
          <path d="M8.5 2h7M7 15h10"/>
        </svg>
      )
    case 'parenting':
      return <BookOpen width={22} height={22} strokeWidth={1.8} />
    default:
      return <Heart width={22} height={22} strokeWidth={1.8} />
  }
}

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('embrio-site-lang') || 'ka';
  });

  const toggleLanguage = () => {
    playClickSound();
    setLang(prev => prev === 'ka' ? 'en' : 'ka');
  };

  useEffect(() => {
    localStorage.setItem('embrio-site-lang', lang);
    const root = document.documentElement;
    if (lang === 'en') {
      root.classList.add('lang-en');
    } else {
      root.classList.remove('lang-en');
    }
  }, [lang]);

  // Navigation states
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#dashboard')
  const [expandedEnamel, setExpandedEnamel] = useState(null)
  const [expandedService, setExpandedService] = useState(null)
  const [servicesViewMode, setServicesViewMode] = useState('balanced') // 'balanced' (3+2), 'all' (10 cards), 'deep' (Metafora deep alternating sections)

  // Doctor filtering states
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('ყველა')
  const categories = [
    'ყველა',
    'მეან-გინეკოლოგი',
    'რეპროდუქტოლოგია',
    'ნეონატოლოგია',
    'ანესთეზიოლოგია',
    'რადიოლოგია',
    'ანდროლოგია',
    'ბებიაქალი'
  ]

  // Floating chatbot states
  const [showChat, setShowChat] = useState(false)
  const [chatUnread, setChatUnread] = useState(1)
  const [customMessage, setCustomMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: (lang === 'ka' ? BOT_RESPONSES.welcome : BOT_RESPONSES_EN.welcome) }
  ])

  // Calendar states
  const [today] = useState(() => {
    const d = new Date()
    d.setHours(0,0,0,0)
    return d
  })
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  // Default theme is 'teal' (Embrio primary teal #1E7E75), toggling to 'coral' (#E08A79 from the heart inside Embrio logo)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('embrio-site-theme') || 'teal';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'coral') {
      root.classList.add('theme-coral');
    } else {
      root.classList.remove('theme-coral');
    }
    localStorage.setItem('embrio-site-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    playClickSound();
    setTheme(prev => prev === 'teal' ? 'coral' : 'teal');
  };

  // Form inputs
  const [patientName, setPatientName] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
  const [selectedService, setSelectedService] = useState('მეან-გინეკოლოგის კონსულტაცია')
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [showPricesModal, setShowPricesModal] = useState(false)
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [showEquipModal, setShowEquipModal] = useState(false)
  const [activeServiceDetail, setActiveServiceDetail] = useState(null)
  const [activeDoctorDetail, setActiveDoctorDetail] = useState(null)
  const [showMapModal, setShowMapModal] = useState(false)
  const [activeEnamelDetail, setActiveEnamelDetail] = useState(null)
  const [activePriceCategory, setActivePriceCategory] = useState(null)

  // Doctor rating authentication states
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem('embrio_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [pendingRating, setPendingRating] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');

  // Doctor ratings state loaded from localStorage
  const [doctorRatings, setDoctorRatings] = useState(() => {
    try {
      const saved = localStorage.getItem('embrio_doctor_ratings')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const [hoverRating, setHoverRating] = useState(0)

  const getDoctorRating = (name) => {
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseCount = (hash % 18) + 16;
    const baseRatingSum = baseCount * 5.0;
    
    const userRating = doctorRatings[name];
    const totalCount = userRating ? baseCount + 1 : baseCount;
    const totalSum = userRating ? baseRatingSum + userRating : baseRatingSum;
    const avgRating = (totalSum / totalCount).toFixed(1);
    
    return {
      average: avgRating,
      count: totalCount,
      userRating: userRating || null
    };
  }

  const handleRateDoctor = async (name, score) => {
    const newRatings = { ...doctorRatings, [name]: score };
    setDoctorRatings(newRatings);
    try {
      localStorage.setItem('embrio_doctor_ratings', JSON.stringify(newRatings));
    } catch (e) {}
  }

  // Tactile click handler
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, .svc, .doctor-app-card, .menu-hub-card, .service-chip, .slot, .day, .chat-quick-btn');
      if (target) {
        playClickSound();
        return;
      }
      
      let cur = e.target;
      while (cur && cur !== document.body) {
        if (cur.style && (cur.style.cursor === 'pointer' || window.getComputedStyle(cur).cursor === 'pointer')) {
          playClickSound();
          break;
        }
        cur = cur.parentElement;
      }
    };
    
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-open chatbot with 1.4s delay on desktop screens only (keep mobile unobstructed)
  useEffect(() => {
    if (window.innerWidth <= 768) return
    const timer = setTimeout(() => {
      setShowChat(true)
      setChatUnread(0)
    }, 1400)
    return () => clearTimeout(timer)
  }, [])

  // Chat scroll anchor
  const chatEndRef = useRef(null)
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Filtered doctors list
  const filteredDoctors = DOCTORS.filter(d => {
    const detailsEn = getDoctorDetailsByName(d.n, 'en');
    const enName = detailsEn ? detailsEn.name.toLowerCase() : '';
    const enRole = detailsEn ? detailsEn.role.toLowerCase() : '';
    const q = searchQuery.toLowerCase();
    const matchesSearch = d.n.toLowerCase().includes(q) || d.s.toLowerCase().includes(q) || enName.includes(q) || enRole.includes(q);
    const matchesCategory = activeCategory === 'ყველა' || d.s.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  })

  // Smart Local + Assistant Reply for EmbrioBot
  const generateEmbrioBotReply = (text, queryType) => {
    const dict = lang === 'ka' ? BOT_RESPONSES : BOT_RESPONSES_EN;
    if (queryType && dict[queryType]) {
      return dict[queryType];
    }
    const lower = text.toLowerCase();
    if (lower.includes('ფას') || lower.includes('ღირ') || lower.includes('price') || lower.includes('cost')) {
      return dict.prices;
    }
    if (lower.includes('მისამართ') || lower.includes('სად') || lower.includes('ტელეფონ') || lower.includes('ლუბლიან') || lower.includes('address') || lower.includes('phone') || lower.includes('where')) {
      return dict.contact;
    }
    if (lower.includes('სერვის') || lower.includes('მშობიარ') || lower.includes('საკეისრო') || lower.includes('ექოსკოპ') || lower.includes('service') || lower.includes('delivery')) {
      return dict.services;
    }
    return lang === 'ka'
      ? 'გმადლობთ შეტყობინებისთვის! დეტალური კონსულტაციისა და ვიზიტის დასაჯავშნად შეგიძლიათ აირჩიოთ სასურველი დრო ჩვენს ონლაინ კალენდარში ან დაგვიკავშირდეთ 24/7 ცხელ ხაზზე: (032) 2 51 86 24 · info@embrio.ge.'
      : 'Thank you for your message! To schedule a visit, please pick a convenient date and time in our online booking calendar below or call our 24/7 hotline: (032) 2 51 86 24 · info@embrio.ge.';
  }

  const sendChatMessage = (userText, queryType = null) => {
    if (!userText || !userText.trim()) return
    const textToSend = userText.trim()
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: textToSend }])

    setTimeout(() => {
      const reply = generateEmbrioBotReply(textToSend, queryType)
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }])
    }, 380)
  }

  const handleBotQuery = (queryType, userText) => {
    sendChatMessage(userText, queryType)
  }

  const handleCustomMessageSubmit = (e) => {
    e.preventDefault()
    if (!customMessage.trim()) return
    const userText = customMessage.trim()
    setCustomMessage('')
    sendChatMessage(userText)
  }

  // Handle calendar month change
  const handleMonthChange = (direction) => {
    const newMonth = viewDate.getMonth() + direction
    setViewDate(new Date(viewDate.getFullYear(), newMonth, 1))
  }

  const getDaysInMonth = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const offset = firstDay === 0 ? 6 : firstDay - 1
    const totalDays = new Date(year, month + 1, 0).getDate()
    
    const days = []
    for (let i = 0; i < offset; i++) {
      days.push(null)
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const daysList = getDaysInMonth()

  // Form submit handler
  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !patientName || !patientPhone) {
      alert(lang === 'ka' ? 'გთხოვთ შეავსოთ ყველა აუცილებელი ველი და აირჩიოთ თარიღი/საათი!' : 'Please fill out all required fields and choose date/time!')
      return
    }
    
    setBookingSuccess(true)
    setTimeout(() => {
      setBookingSuccess(false)
      setSelectedDate(null)
      setSelectedTime(null)
      setPatientName('')
      setPatientPhone('')
      setSelectedDoctor('')
    }, 4500)
  }

  // Auto-fill doctor and scroll to booking
  const handleSelectDoctorForBooking = (docName, specialty) => {
    setSelectedDoctor(docName)
    if (specialty.includes('რეპროდუქტოლოგია') || specialty.includes('ანდროლოგია')) setSelectedService('რეპროდუქტოლოგია / ანდროლოგია')
    else if (specialty.includes('ექოსკოპია') || specialty.includes('რადიოლოგია')) setSelectedService('4D ექოსკოპია')
    else if (specialty.includes('ნეონატოლოგია')) setSelectedService('ნეონატოლოგია / პედიატრია')
    else if (specialty.includes('ანესთეზიოლოგია')) setSelectedService('ანესთეზიოლოგის კონსულტაცია')
    else if (specialty.includes('პატრონაჟი')) setSelectedService('ორსულთა პატრონაჟი')
    else setSelectedService('მეან-გინეკოლოგის კონსულტაცია')
    
    const bookingSec = document.getElementById('booking')
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen font-sans pb-16" id="top">
      
      {/* HEADER */}
      <header className={headerScrolled ? 'scrolled' : ''}>
        <div className="wrap nav">
          <a href="#top" className="brand">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo-clean.png`} 
              alt="Embrio Maternity Clinic Logo" 
              style={{ width: '34px', height: '42px', objectFit: 'contain' }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <span>{lang === 'ka' ? 'ემბრიო' : 'EMBRIO'}</span>
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--accent-color)', letterSpacing: '0.04em' }}>
                {lang === 'ka' ? 'სამშობიარო კლინიკა' : 'MATERNITY CLINIC'}
              </span>
            </div>
          </a>
          <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="navLinks">
            <a href="#dashboard" onClick={() => { setMobileMenuOpen(false); setActiveLink('#dashboard'); }} className={activeLink === '#dashboard' ? 'active' : ''}>{lang === 'ka' ? 'მთავარი' : 'Home'}</a>
            <a href="#services" onClick={() => { setMobileMenuOpen(false); setActiveLink('#services'); }} className={activeLink === '#services' ? 'active' : ''}>{lang === 'ka' ? 'სერვისები' : 'Services'}</a>
            <a href="#doctors" onClick={() => { setMobileMenuOpen(false); setActiveLink('#doctors'); }} className={activeLink === '#doctors' ? 'active' : ''}>{lang === 'ka' ? 'ექიმები' : 'Doctors'}</a>
            <a href="#clinical-menu" onClick={() => { setMobileMenuOpen(false); setActiveLink('#clinical-menu'); }} className={activeLink === '#clinical-menu' ? 'active' : ''}>{lang === 'ka' ? 'კლინიკა' : 'Clinic'}</a>
            <a href="#booking" onClick={() => { setMobileMenuOpen(false); setActiveLink('#booking'); }} className={activeLink === '#booking' ? 'active' : ''}>{lang === 'ka' ? 'დაჯავშნა' : 'Booking'}</a>
          </nav>
          <div className="nav-right">
            <button 
              onClick={toggleLanguage}
              className="lang-toggle-btn"
              title={lang === 'ka' ? 'Change Language to English' : 'ენის შეცვლა ქართულად'}
              aria-label="ენა"
            >
              {lang === 'ka' ? 'EN' : 'KA'}
            </button>
            <button 
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={lang === 'ka' ? 'ფერის შეცვლა (ზურმუხტისფერი / მარჯნისფერი)' : 'Switch Theme Color'}
              aria-label="ფერის შეცვლა"
            >
              <span className="color-preview-circle"></span>
            </button>
            <a href="#booking" className="nav-cta">
              <CalendarIcon className="w-4 h-4" />
              {lang === 'ka' ? 'დაჯავშნე ვიზიტი' : 'Book Visit'}
            </a>
          </div>
          <button className="burger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="მენიუ">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* HERO / COVER SHOWCASE SECTION */}
      <section className="block" id="dashboard">
        <div className="wrap">
          <div className="phone-onboarding-card" style={{ maxWidth: '100%', width: '100%', padding: '14px', minHeight: 'auto' }}>
            <div
              className="hero-cover-banner"
              style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-cover.jpg)`
              }}
            >
              {/* Left-Side Transparent Info & Functional Controls (Opposite the 3D Wall Logo on the Right) */}
              <div className="hero-cover-content-panel">
                <span className="hero-cover-eyebrow">
                  {lang === 'ka' ? '✦ სამშობიარო კლინიკა ემბრიო · 24/7' : '✦ Embrio Maternity Clinic · 24/7'}
                </span>

                <h1 className="hero-cover-title">
                  {lang === 'ka' ? 'ახალი სიცოცხლის დაბადება სანდო ხელში!' : 'Where New Life Begins in Safe Hands!'}
                </h1>

                <p className="hero-cover-subtitle">
                  {lang === 'ka'
                    ? 'ორსულობის დაგეგმვიდან უსაფრთხო, კომფორტულ მშობიარობამდე — 24/7 სამეანო-ნეონატოლოგიური მეთვალყურეობა და პროფესიონალი გუნდი.'
                    : 'From pregnancy planning to safe, comfortable childbirth — 24/7 obstetric-neonatal care and an experienced medical team.'}
                </p>

                <div className="hero-cover-actions">
                  <a
                    href="#booking"
                    onClick={() => playClickSound()}
                    className="phone-onboarding-btn"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span>{lang === 'ka' ? 'დაჯავშნე ვიზიტი' : 'Book Visit'}</span>
                  </a>

                  <a
                    href="tel:+995322518624"
                    onClick={() => playClickSound()}
                    className="phone-onboarding-btn-secondary"
                  >
                    <Phone className="w-4 h-4" style={{ color: 'var(--accent-warm)' }} />
                    <span>032 2 51 86 24</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* METAFORA-STYLE SERVICES SECTION */}
      <section className="block" id="services" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head text-left" style={{ marginBottom: '22px' }}>
            <span className="eyebrow">{lang === 'ka' ? 'მიმართულებები' : 'Specialties'}</span>
            <h2>{lang === 'ka' ? 'სრულყოფილი სამეანო და გინეკოლოგიური სერვისები' : 'Complete Maternity & Gynecological Services'}</h2>
            <p>{lang === 'ka' ? 'ორსულობის დაგეგმვიდან და 4D დიაგნოსტიკიდან უსაფრთხო მშობიარობასა და ახალშობილის მოვლამდე — სრული ციკლი ერთ სივრცეში.' : 'From pregnancy planning and 4D diagnostics to safe childbirth and newborn care — complete cycle under one roof.'}</p>
          </div>

          {/* Metafora Navigation Pills */}
          <div className="services-nav-pills">
            <button
              type="button"
              onClick={() => { playClickSound(); setServicesViewMode('balanced'); }}
              className={`service-pill ${servicesViewMode === 'balanced' ? 'active' : ''}`}
            >
              {lang === 'ka' ? '✦ 5 მთავარი მიმართულება' : '✦ 5 Flagship Specialties'}
            </button>
            <button
              type="button"
              onClick={() => { playClickSound(); setServicesViewMode('all'); }}
              className={`service-pill ${servicesViewMode === 'all' ? 'active' : ''}`}
            >
              {lang === 'ka' ? 'ყველა სერვისი (10)' : 'All Services (10)'}
            </button>
            <button
              type="button"
              onClick={() => { playClickSound(); setServicesViewMode('deep'); }}
              className={`service-pill ${servicesViewMode === 'deep' ? 'active' : ''}`}
            >
              {lang === 'ka' ? 'დეტალური მიმოხილვა' : 'Detailed Breakdown'}
            </button>
          </div>

          {(() => {
            const serviceMetaList = [
              {
                key: 'obstetrics',
                featured: true,
                image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=900',
                badgeStrongKa: '24/7',
                badgeStrongEn: '24/7',
                badgeSmallKa: 'სამშობიარო ბლოკი',
                badgeSmallEn: 'Maternity Care',
                zoneKa: '01 · მეანობა და მშობიარობა',
                zoneEn: '01 · Obstetrics & Delivery',
                shortKa: 'უსაფრთხო ფიზიოლოგიური და პარტნიორული მშობიარობა 24/7 სამედიცინო მონიტორინგით.',
                shortEn: 'Safe physiological and partner-assisted childbirth with 24/7 monitoring.'
              },
              {
                key: 'cesarean',
                featured: false,
                image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=900',
                badgeStrongKa: 'Stark',
                badgeStrongEn: 'Stark',
                badgeSmallKa: 'დამზოგველი მეთოდი',
                badgeSmallEn: 'Gentle Technique',
                zoneKa: '02 · საკეისრო კვეთა',
                zoneEn: '02 · Cesarean Section',
                shortKa: 'გეგმიური და გადაუდებელი საკეისრო კვეთა დამზოგველი მეთოდით, სპინალური გაუტკივარებითა და ესთეტიკური ნაკერით.',
                shortEn: 'Planned & emergency C-section with gentle recovery, spinal analgesia, and cosmetic suture.'
              },
              {
                key: 'prenatal',
                featured: false,
                image: `${import.meta.env.BASE_URL}images/prenatal-care.jpg`,
                badgeStrongKa: '3 ტრიმესტრი',
                badgeStrongEn: '3 Trimesters',
                badgeSmallKa: 'სრული მეთვალყურეობა',
                badgeSmallEn: 'Full Supervision',
                zoneKa: '03 · ორსულთა პატრონაჟი',
                zoneEn: '03 · Prenatal Care',
                shortKa: 'ორსულობის სრული ანტენატალური მეთვალყურეობა პირველივე კვირებიდან მშობიარობამდე.',
                shortEn: 'Full antenatal pregnancy supervision across all three trimesters.'
              },
              {
                key: 'reproductology',
                featured: false,
                image: `${import.meta.env.BASE_URL}images/reproductology.jpg`,
                badgeStrongKa: 'წყვილის',
                badgeStrongEn: 'Fertility',
                badgeSmallKa: 'რეპროდუქტოლოგია',
                badgeSmallEn: 'Reproductology',
                zoneKa: '04 · რეპროდუქტოლოგია და ანდროლოგია',
                zoneEn: '04 · Reproductology & Andrology',
                shortKa: 'ქალისა და მამაკაცის უნაყოფობის კომპლექსური დიაგნოსტიკა, ანდროლოგია და ორსულობის დაგეგმვა.',
                shortEn: 'Comprehensive female & male infertility diagnostics, andrology, and pregnancy planning.'
              },
              {
                key: 'ultrasound',
                featured: false,
                image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=900',
                badgeStrongKa: '3D / 4D',
                badgeStrongEn: '3D / 4D',
                badgeSmallKa: 'GE Voluson ექოსკოპია',
                badgeSmallEn: 'GE Voluson Scan',
                zoneKa: '05 · 4D ექოსკოპია და რადიოლოგია',
                zoneEn: '05 · 4D Ultrasound & Radiology',
                shortKa: 'ნაყოფის მაღალი გარჩევადობის 3D/4D მოცულობითი ექოსკოპია, ფერადი დოპლეროგრაფია და CTG.',
                shortEn: 'High-resolution 3D/4D volumetric fetal ultrasound, color Doppler, and CTG monitoring.'
              },
              {
                key: 'gynecology',
                featured: false,
                image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=900',
                badgeStrongKa: 'HD',
                badgeStrongEn: 'HD',
                badgeSmallKa: 'კოლპოსკოპია & ქირურგია',
                badgeSmallEn: 'Colposcopy & Surgery',
                zoneKa: '06 · გინეკოლოგია',
                zoneEn: '06 · Gynecology',
                shortKa: 'ამბულატორიული, ენდოკრინული და ოპერაციული გინეკოლოგია, ვიდეო-კოლპოსკოპია და ჰისტეროსკოპია.',
                shortEn: 'Outpatient, endocrine, and operative gynecology, video colposcopy, and hysteroscopy.'
              },
              {
                key: 'neonatology',
                featured: false,
                image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=900',
                badgeStrongKa: 'NICU',
                badgeStrongEn: 'NICU',
                badgeSmallKa: '24/7 ნეონატოლოგია',
                badgeSmallEn: '24/7 Newborn Care',
                zoneKa: '07 · ნეონატოლოგია',
                zoneEn: '07 · Neonatology',
                shortKa: 'ახალშობილთა 24-საათიანი მეთვალყურეობა, ინტენსიური თერაპია (NICU) და სკრინინგი.',
                shortEn: '24/7 newborn supervision, neonatal intensive care unit (NICU), and screenings.'
              },
              {
                key: 'anesthesiology',
                featured: false,
                image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=900',
                badgeStrongKa: '0% ტკივილი',
                badgeStrongEn: 'Painless',
                badgeSmallKa: 'ეპიდურული ანესთეზია',
                badgeSmallEn: 'Epidural Analgesia',
                zoneKa: '08 · ანესთეზიოლოგია',
                zoneEn: '08 · Anesthesiology',
                shortKa: 'უსაფრთხო და უმტკივნეულო მშობიარობა — ეპიდურული და სპინალური გაუტკივარება 24/7 რეჟიმში.',
                shortEn: 'Safe and painless childbirth — 24/7 walking epidural and spinal analgesia.'
              },
              {
                key: 'laboratory',
                featured: false,
                image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=900',
                badgeStrongKa: 'სწრაფი',
                badgeStrongEn: 'Express',
                badgeSmallKa: '24/7 ლაბორატორია',
                badgeSmallEn: '24/7 Clinical Lab',
                zoneKa: '09 · კლინიკური ლაბორატორია',
                zoneEn: '09 · Clinical Laboratory',
                shortKa: 'სრული ჰორმონალური, ბიოქიმიური, გენეტიკური, კოაგულოლოგიური და კლინიკური ანალიზები ადგილზე.',
                shortEn: 'Complete hormonal, biochemical, genetic, coagulation, and express lab diagnostics.'
              },
              {
                key: 'parenting',
                featured: false,
                image: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&q=80&w=900',
                badgeStrongKa: 'სკოლა',
                badgeStrongEn: 'Classes',
                badgeSmallKa: 'მშობელთა მომზადება',
                badgeSmallEn: 'Parenting & Lactation',
                zoneKa: '10 · მშობელთა სკოლა და ლაქტაცია',
                zoneEn: '10 · Parenting School & Lactation',
                shortKa: 'მომავალი მშობლების ფსიქო-ფიზიკური მომზადება მშობიარობისთვის და ძუძუთი კვების კონსულტაცია.',
                shortEn: 'Childbirth preparation classes for expectant parents and certified lactation consulting.'
              }
            ];

            const renderFeatureCard = (item) => {
              const detailObj = (lang === 'ka' ? SERVICES_DETAILS : SERVICES_DETAILS_EN)[item.key] || SERVICES_DETAILS[item.key];
              return (
                <article
                  key={item.key}
                  className={`feature-card service-five-card ${item.featured ? 'featured-service' : ''}`}
                  onClick={() => {
                    playClickSound();
                    setActiveServiceDetail({
                      ...SERVICES_DETAILS[item.key],
                      key: item.key,
                      image: item.image,
                      badgeStrong: lang === 'ka' ? item.badgeStrongKa : item.badgeStrongEn,
                      badgeSmall: lang === 'ka' ? item.badgeSmallKa : item.badgeSmallEn,
                      zone: lang === 'ka' ? item.zoneKa : item.zoneEn
                    });
                  }}
                >
                  <div className="card-image-wrapper">
                    <img
                      src={item.image}
                      alt={detailObj.title}
                      className="card-feature-img"
                      loading="lazy"
                    />
                    <div className="card-floating-badge">
                      <strong>{lang === 'ka' ? item.badgeStrongKa : item.badgeStrongEn}</strong>
                      <small>{lang === 'ka' ? item.badgeSmallKa : item.badgeSmallEn}</small>
                    </div>
                  </div>
                  <div className="card-body-content">
                    <div className="card-icon-box">
                      {renderServiceIcon(item.key)}
                    </div>
                    <h3 className="card-title">{detailObj.title}</h3>
                    <p className="card-desc">{lang === 'ka' ? item.shortKa : item.shortEn}</p>
                    <span className="card-more-link">
                      {lang === 'ka' ? 'მეტის ნახვა →' : 'Learn More →'}
                    </span>
                  </div>
                </article>
              );
            };

            if (servicesViewMode === 'deep') {
              return (
                <div className="services-deep-wrapper">
                  {serviceMetaList.map((item, idx) => {
                    const detailObj = (lang === 'ka' ? SERVICES_DETAILS : SERVICES_DETAILS_EN)[item.key] || SERVICES_DETAILS[item.key];
                    return (
                      <div key={item.key} className={`service-deep-section ${idx % 2 === 1 ? 'reverse-layout' : ''}`}>
                        <div className="service-deep-grid">
                          <div className="service-deep-media">
                            <div className="service-media-card">
                              <img src={item.image} alt={detailObj.title} loading="lazy" />
                              <div className="service-media-badge">
                                ✦ {lang === 'ka' ? `${item.badgeStrongKa} · ${item.badgeSmallKa}` : `${item.badgeStrongEn} · ${item.badgeSmallEn}`}
                              </div>
                            </div>
                          </div>
                          <div className="service-deep-info">
                            <span className="zone-badge">{lang === 'ka' ? item.zoneKa : item.zoneEn}</span>
                            <h3 className="service-deep-title">{detailObj.title}</h3>
                            <p className="service-deep-desc">{detailObj.desc}</p>
                            <div className="service-features-list">
                              {detailObj.subs && detailObj.subs.map((sub, sIdx) => (
                                <div key={sIdx} className="service-feat-item">
                                  <span className="feat-check">✓</span>
                                  <div>
                                    <strong>{sub.title}</strong>
                                    <small>{sub.text}</small>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="service-action-row">
                              <a
                                href="#booking"
                                onClick={() => {
                                  playClickSound();
                                  setSelectedService(SERVICES_DETAILS[item.key].title);
                                }}
                                className="phone-onboarding-btn"
                                style={{ flex: 'none', padding: '11px 24px', borderRadius: '999px' }}
                              >
                                {lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'}
                              </a>
                              <button
                                type="button"
                                onClick={() => { playClickSound(); setShowPricesModal(true); }}
                                className="phone-onboarding-btn-secondary"
                                style={{ flex: 'none', padding: '11px 22px', borderRadius: '999px' }}
                              >
                                {lang === 'ka' ? 'ფასების ნახვა' : 'View Prices'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }

            return (
              <div className="services-balanced-container">
                {/* Top Row: 3 Cards */}
                <div className="services-row-three">
                  {serviceMetaList.slice(0, 3).map(renderFeatureCard)}
                </div>
                {/* Bottom Row: 2 Centered Cards */}
                <div className="services-row-two">
                  {serviceMetaList.slice(3, 5).map(renderFeatureCard)}
                </div>

                {/* Second Balanced 3+2 Block when viewing All 10 Services */}
                {servicesViewMode === 'all' && (
                  <>
                    <div className="services-row-three" style={{ marginTop: '24px' }}>
                      {serviceMetaList.slice(5, 8).map(renderFeatureCard)}
                    </div>
                    <div className="services-row-two">
                      {serviceMetaList.slice(8, 10).map(renderFeatureCard)}
                    </div>
                  </>
                )}

                {servicesViewMode === 'balanced' && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                    <button
                      type="button"
                      onClick={() => { playClickSound(); setServicesViewMode('all'); }}
                      className="service-pill"
                      style={{ padding: '10px 26px' }}
                    >
                      {lang === 'ka' ? 'ყველა მიმართულების ნახვა (10) ↓' : 'Show All 10 Specialties ↓'}
                    </button>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>


      {/* ACTIVE DOCTORS PORTAL SECTION */}
      <section className="block" id="doctors" style={{ paddingTop: 0 }}>
        <div className="wrap text-left">
          <div className="glass-neu">
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'block', marginBottom: '6px' }}>
              {lang === 'ka' ? '✦ კლინიკა ემბრიოს გუნდი' : '✦ Embrio Medical Team'}
            </span>
            <h2 className="font-serif font-bold text-2xl mb-5" style={{ color: 'var(--app-text-dark)' }}>
              {lang === 'ka' ? 'აირჩიე სპეციალისტი და მიმართულება' : 'Choose Specialist & Department'}
            </h2>
            
            {/* Category Pill Filters */}
            <div className="service-track">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`service-chip ${activeCategory === cat ? 'active' : ''}`}
                >
                  {lang === 'ka' ? cat : ({
                    'ყველა': 'All',
                    'მეან-გინეკოლოგი': 'OB-GYN',
                    'რეპროდუქტოლოგია': 'Reproductology',
                    'ნეონატოლოგია': 'Neonatology',
                    'ანესთეზიოლოგია': 'Anesthesiology',
                    'რადიოლოგია': '4D Ultrasound',
                    'ანდროლოგია': 'Andrology',
                    'ბებიაქალი': 'Midwife'
                  }[cat] || cat)}
                </button>
              ))}
            </div>

            {/* Dynamic Doctor Search bar */}
            <div className="search-container">
              <Search className="search-icon w-5 h-5" />
              <input 
                type="text" 
                placeholder={lang === 'ka' ? "მოძებნე მეან-გინეკოლოგი, რეპროდუქტოლოგი ან სპეციალობა..." : "Search obstetrician, reproductologist or specialty..."} 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Dynamic Doctors Grid */}
            <div className="doctor-app-grid">
              {filteredDoctors.slice(0, 6).map((d, i) => {
                const init = d.n.split(" ").map(w => w[0]).join("")
                const details = getDoctorDetailsByName(d.n, lang)
                const ratingInfo = getDoctorRating(d.n)
                return (
                  <article 
                    key={i} 
                    className="doctor-app-card"
                    onClick={() => {
                      if (details) {
                        setActiveDoctorDetail(details);
                      } else {
                        setActiveDoctorDetail({
                          name: d.n,
                          role: d.s,
                          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
                          specialization: d.s,
                          bio: lang === 'ka' ? "სამშობიარო კლინიკა „ემბრიოს“ წამყვანი სპეციალისტი." : "Leading specialist at Embrio Maternity Clinic.",
                          education: lang === 'ka' ? "უმაღლესი სამედიცინო განათლება, სახელმწიფო სერტიფიკატი." : "Higher medical education, state board certification."
                        });
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="doctor-app-top">
                      <div className="doctor-app-avatar" style={{ background: GRADS[i % GRADS.length], overflow: 'hidden' }}>
                        {details && details.image ? (
                          <img src={details.image} alt={details.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          init
                        )}
                      </div>
                      <div className="doctor-app-info">
                        <h3 title={details ? details.name : d.n}>{details ? details.name : d.n}</h3>
                        <p title={details ? details.role : d.s}>{details ? details.role : d.s}</p>
                        <span className="doctor-profile-link">{lang === 'ka' ? 'პროფილი ➔' : 'Profile ➔'}</span>
                      </div>
                    </div>
                    <div className="doctor-app-meta">
                      <span className="doctor-app-badge" title={lang === 'ka' ? `${ratingInfo.count} შეფასება` : `${ratingInfo.count} reviews`}>
                        <Star className="w-3.5 h-3.5" style={{ color: '#FFB800', fill: '#FFB800' }} />
                        {ratingInfo.average} ({ratingInfo.count})
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectDoctorForBooking(d.n, d.s);
                        }}
                        className="doctor-app-btn"
                      >
                        {lang === 'ka' ? 'დაჯავშნა' : 'Book'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
            {filteredDoctors.length === 0 && (
              <div className="text-center py-12" style={{ color: 'var(--app-text-soft)' }}>
                {lang === 'ka' ? 'ექიმი მოცემული სპეციალობით ვერ მოიძებნა.' : 'No doctor found with the selected specialty.'}
              </div>
            )}

            {/* View All Doctors Button */}
            <div className="doctor-view-all-container" style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '32px', paddingLeft: '4px' }}>
              <button 
                onClick={() => setShowTeamModal(true)} 
                className="glass-neu"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '8px', 
                  width: 'auto', 
                  flex: 'none',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  backgroundColor: 'var(--accent-color)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '3px 3px 8px var(--shadow-dark), -3px -3px 8px var(--shadow-light)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Users className="w-4 h-4" />
                {lang === 'ka' ? `ყველა ექიმის ნახვა (${DOCTORS.length})` : `View All Doctors (${DOCTORS.length})`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL HUB PORTALS */}
      <section className="block" id="clinical-menu" style={{paddingTop: 0}}>
        <div className="wrap text-left">
          <div className="head">
            <span className="eyebrow">{lang === 'ka' ? 'კლინიკის გზამკვლევი' : 'Clinical Hub'}</span>
            <h2>{lang === 'ka' ? 'გაეცანით დეტალებს' : 'Explore Embrio Clinic'}</h2>
            <p>{lang === 'ka' ? 'აირჩიეთ სასურველი სექცია სამშობიარო კლინიკა „ემბრიოს“ პალატების, ფასებისა და სერვისების შესახებ სრული ინფორმაციის მისაღებად.' : 'Select a section to explore complete information about Embrio Clinic wards, packages, and medical achievements.'}</p>
          </div>
          
          <div className="menu-hub-grid">
            
            <div className="menu-hub-card" onClick={() => setShowAboutModal(true)}>
              <div className="menu-hub-icon">
                <Award className="w-5 h-5" />
              </div>
              <h3>{lang === 'ka' ? 'ჩვენს შესახებ' : 'About Us'}</h3>
              <p>{lang === 'ka' ? 'კლინიკის ისტორია და მისია' : 'Clinic history & mission'}</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowTeamModal(true)}>
              <div className="menu-hub-icon">
                <Users className="w-5 h-5" />
              </div>
              <h3>{lang === 'ka' ? 'ჩვენი გუნდი' : 'Our Team'}</h3>
              <p>{lang === 'ka' ? 'მეან-გინეკოლოგები და ნეონატოლოგები' : 'Obstetricians & Neonatologists'}</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowEquipModal(true)}>
              <div className="menu-hub-icon">
                <Cpu className="w-5 h-5" />
              </div>
              <h3>{lang === 'ka' ? 'აპარატურა' : 'Equipment'}</h3>
              <p>{lang === 'ka' ? '24/7 სამეანო და 4D ტექნოლოგიები' : '24/7 maternity & 4D technology'}</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowResultsModal(true)}>
              <div className="menu-hub-icon">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3>{lang === 'ka' ? 'ახალი სიცოცხლე' : 'Birth Stories'}</h3>
              <p>{lang === 'ka' ? 'ბედნიერი დედები და შედეგები' : 'Happy mothers & outcomes'}</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowPricesModal(true)}>
              <div className="menu-hub-icon">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3>{lang === 'ka' ? 'ფასები' : 'Prices'}</h3>
              <p>{lang === 'ka' ? 'მშობიარობისა და კვლევების ფასები' : 'Delivery & service price list'}</p>
            </div>

          </div>

          {/* Wide Blog Hub Card */}
          <div className="menu-hub-blog-wide" onClick={() => setShowBlogModal(true)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="menu-hub-icon">
                <BookOpen className="w-5 h-5" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3>{lang === 'ka' ? 'მომავალი დედების ბლოგი და რჩევები' : 'Expectant Mothers Blog & Guides'}</h3>
                <p>{lang === 'ka' ? 'რა ნივთები დაგჭირდებათ სამშობიაროში, როგორ მოვემზადოთ უმტკივნეულო მშობიარობისთვის და ახალშობილის მოვლა.' : 'What to pack in your hospital bag, preparing for painless childbirth, and newborn care essentials.'}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 shrink-0" style={{ color: 'var(--accent-color)' }} />
          </div>
        </div>
      </section>

      {/* PREGNANCY TRIMESTERS & MATERNAL CARE SECTION (Adapted from #enamel) */}
      <section className="block" id="enamel" style={{paddingTop: 0}}>
        <div className="wrap">
          <div className="head text-left">
            <span className="eyebrow">{lang === 'ka' ? 'ორსულობის გზამკვლევი' : 'Pregnancy Guide'}</span>
            <h2>{lang === 'ka' ? 'ორსულობის 3 ტრიმესტრი და უსაფრთხო დედობა' : '3 Trimesters of Pregnancy & Safe Motherhood'}</h2>
            <p>{lang === 'ka' ? 'რა ეტაპებს გადის მომავალი დედა და რა კვლევებია აუცილებელი თქვენი და პატარას ჯანმრთელობისთვის.' : 'Key stages of pregnancy and essential prenatal checkups for your and your baby’s health.'}</p>
          </div>
          
          <div className="enamel-layout">
            <div className="enamel-grid">
              <div className="enamel-card" onClick={() => {
                if (window.innerWidth <= 768) {
                  setExpandedEnamel(expandedEnamel === 'sweets' ? null : 'sweets');
                } else {
                  setActiveEnamelDetail({ ...ENAMEL_DETAILS.sweets, key: 'sweets' });
                }
              }} style={{ cursor: 'pointer' }}>
                <div className="enamel-card-icon">
                  <Heart className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="enamel-card-content">
                  <h3>{lang === 'ka' ? 'I ტრიმესტრი (1–12 კვირა)' : 'First Trimester (Weeks 1–12)'}</h3>
                  <p className={`enamel-desc ${expandedEnamel === 'sweets' ? 'expanded' : ''}`}>{lang === 'ka' ? 'ორსულობის დადასტურება, ანტენატალურ მეთვალყურეობაზე აღრიცხვა და 11–13 კვირის გენეტიკური სკრინინგი.' : 'Pregnancy confirmation, antenatal registration, and 11–13 week genetic ultrasound screening.'}</p>
                </div>
              </div>

              <div className="enamel-card" onClick={() => {
                if (window.innerWidth <= 768) {
                  setExpandedEnamel(expandedEnamel === 'smoking' ? null : 'smoking');
                } else {
                  setActiveEnamelDetail({ ...ENAMEL_DETAILS.smoking, key: 'smoking' });
                }
              }} style={{ cursor: 'pointer' }}>
                <div className="enamel-card-icon">
                  <Activity className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="enamel-card-content">
                  <h3>{lang === 'ka' ? 'II ტრიმესტრი (13–27 კვირა)' : 'Second Trimester (Weeks 13–27)'}</h3>
                  <p className={`enamel-desc ${expandedEnamel === 'smoking' ? 'expanded' : ''}`}>{lang === 'ka' ? 'ნაყოფის დეტალური ანატომიური 3D/4D ექოსკოპია, გესტაციური კონტროლი და მშობელთა სკოლა.' : 'Detailed anatomical 3D/4D fetal ultrasound, gestational screening, and parenting classes.'}</p>
                </div>
              </div>

              <div className="enamel-card" onClick={() => {
                if (window.innerWidth <= 768) {
                  setExpandedEnamel(expandedEnamel === 'coffee' ? null : 'coffee');
                } else {
                  setActiveEnamelDetail({ ...ENAMEL_DETAILS.coffee, key: 'coffee' });
                }
              }} style={{ cursor: 'pointer' }}>
                <div className="enamel-card-icon">
                  <Baby className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="enamel-card-content">
                  <h3>{lang === 'ka' ? 'III ტრიმესტრი (28–40 კვირა)' : 'Third Trimester (Weeks 28–40)'}</h3>
                  <p className={`enamel-desc ${expandedEnamel === 'coffee' ? 'expanded' : ''}`}>{lang === 'ka' ? 'კარდიოტოკოგრაფია (CTG), დოპლეროგრაფია, პირადი მეან-გინეკოლოგის შერჩევა და მშობიარობის დაგეგმვა.' : 'Cardiotocography (CTG), Doppler scan, selecting your personal obstetrician, and birth plan.'}</p>
                </div>
              </div>
            </div>

            <div className="enamel-info-pane">
              <div className="enamel-info-video">
                <img 
                  src={`${import.meta.env.BASE_URL}images/logo-3d.jpg`} 
                  alt="Embrio Emblem" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3>{lang === 'ka' ? '24/7 სამეანო მზადყოფნა' : '24/7 Maternity Readiness'}</h3>
              <p>{lang === 'ka' ? 'სამშობიარო კლინიკა „ემბრიო“ გთავაზობთ 24/7 უწყვეტ მეთვალყურეობასა და გამოცდილ მეან-გინეკოლოგთა გუნდს.' : 'Embrio Maternity Clinic offers 24/7 continuous supervision and an experienced obstetric team.'}</p>
              <a href="#booking" className="btn btn-primary">{lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'}</a>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CALENDAR */}
      <section className="block" id="booking" style={{paddingTop: 0}}>
        <div className="wrap text-left">
          <div className="head">
            <span className="eyebrow">{lang === 'ka' ? 'ონლაინ ჩაწერა' : 'Online Booking'}</span>
            <h2>{lang === 'ka' ? 'აირჩიე დღე და დრო' : 'Choose Date & Time'}</h2>
            <p>{lang === 'ka' ? 'ჩაეწერეთ მეან-გინეკოლოგთან, რეპროდუქტოლოგთან ან 4D ექოსკოპიაზე — დაგიდასტურებთ ტელეფონით.' : 'Schedule your appointment with an obstetrician, reproductologist, or 4D ultrasound — we will confirm by phone.'}</p>
          </div>
          
          <div className="booking">
            <div className="cal-pane">
              <div className="cal-top">
                <div className="m">
                  {lang === 'ka' ? MONTHS[viewDate.getMonth()] : MONTHS_EN[viewDate.getMonth()]} {viewDate.getFullYear()}
                </div>
                <div className="cal-nav">
                  <button 
                    onClick={() => handleMonthChange(-1)} 
                    disabled={viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() <= today.getMonth()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleMonthChange(1)} 
                    disabled={viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() >= today.getMonth() + 2}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="cal-grid">
                {(lang === 'ka' ? WDS : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]).map((w, idx) => (
                  <div key={idx} className="wd">{w}</div>
                ))}
                {daysList.map((day, idx) => {
                  if (!day) return <div key={`empty-${idx}`} className="day empty"></div>
                  const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString()
                  const isPast = day < today
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedDate(day)
                        setSelectedTime(null)
                      }}
                      disabled={isPast}
                      className={`day ${isSelected ? 'sel' : ''}`}
                    >
                      {day.getDate()}
                    </button>
                  )
                })}
              </div>

              <div className="slots-label">{lang === 'ka' ? 'აირჩიე დრო' : 'Select Time'}</div>
              <div className="slots">
                {TIMES.map((time, idx) => {
                  const isSelected = selectedTime === time
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTime(time)}
                      className={`slot ${isSelected ? 'sel' : ''}`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Sum Pane */}
            <div className="sum-pane">
              <h3>{lang === 'ka' ? 'ვიზიტის დეტალები' : 'Visit Details'}</h3>
              <p className="hint">{lang === 'ka' ? 'შეავსეთ ველები და დაადასტურეთ ჯავშანი.' : 'Fill in your details and confirm appointment.'}</p>
              
              <div className="picked">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/>
                </svg>
                <span>
                  {selectedDate && selectedTime 
                    ? `${selectedDate.getDate()} ${lang === 'ka' ? MONTHS[selectedDate.getMonth()] : MONTHS_EN[selectedDate.getMonth()]} · ${selectedTime}`
                    : (lang === 'ka' ? 'ჯერ აირჩიე დღე და დრო' : 'Select date & time first')
                  }
                </span>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-6" style={{ color: 'var(--app-text-dark)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: 'var(--accent-color)', color: '#fff', marginInline: 'auto' }}>
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm mb-1">{lang === 'ka' ? 'ჯავშანი წარმატებით გაიგზავნა!' : 'Booking Request Sent!'}</h4>
                  <p className="text-xs">{lang === 'ka' ? 'კლინიკა „ემბრიოს“ რეგისტრატურა მალე დაგიკავშირდებათ.' : 'Embrio Clinic reception will contact you shortly.'}</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                  <div className="field">
                    <label>{lang === 'ka' ? 'სახელი და გვარი' : 'Full Name'}</label>
                    <input 
                      type="text" 
                      placeholder={lang === 'ka' ? "თქვენი სახელი და გვარი" : "Your Full Name"}
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="field">
                    <label>{lang === 'ka' ? 'ტელეფონი' : 'Phone'}</label>
                    <input 
                      type="tel" 
                      placeholder="5xx xx xx xx"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label>{lang === 'ka' ? 'მიმართულება' : 'Service / Specialty'}</label>
                    <select 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="მეან-გინეკოლოგის კონსულტაცია">{lang === 'ka' ? 'მეან-გინეკოლოგის კონსულტაცია' : 'OB-GYN Consultation'}</option>
                      <option value="ორსულთა პატრონაჟი">{lang === 'ka' ? 'ორსულთა პატრონაჟი (აღრიცხვა)' : 'Prenatal Care Registration'}</option>
                      <option value="მშობიარობის დაგეგმვა / საკეისრო">{lang === 'ka' ? 'მშობიარობის დაგეგმვა / საკეისრო' : 'Delivery / C-Section Planning'}</option>
                      <option value="4D ექოსკოპია">{lang === 'ka' ? '3D/4D ექოსკოპია და დოპლერი' : '3D/4D Ultrasound & Doppler'}</option>
                      <option value="რეპროდუქტოლოგია / ანდროლოგია">{lang === 'ka' ? 'რეპროდუქტოლოგია / ანდროლოგია' : 'Reproductology / Andrology'}</option>
                      <option value="ნეონატოლოგია / პედიატრია">{lang === 'ka' ? 'ნეონატოლოგია / პედიატრია' : 'Neonatology / Pediatrics'}</option>
                      <option value="ანესთეზიოლოგის კონსულტაცია">{lang === 'ka' ? 'ანესთეზიოლოგის კონსულტაცია' : 'Anesthesiologist Consultation'}</option>
                    </select>
                  </div>

                  {selectedDoctor && (
                    <div className="field">
                      <label>{lang === 'ka' ? 'არჩეული ექიმი' : 'Selected Doctor'}</label>
                      <input 
                        type="text" 
                        value={selectedDoctor} 
                        disabled 
                      />
                    </div>
                  )}

                  <button className="btn btn-primary" type="submit">
                    {lang === 'ka' ? 'ვიზიტის დადასტურება' : 'Confirm Appointment'}
                  </button>
                </form>
              )}
              <small>{lang === 'ka' ? 'სამშობიარო ბლოკი: 24/7 · ცხელი ხაზი: (032) 2 51 86 24' : 'Maternity Block: 24/7 · Hotline: (032) 2 51 86 24'}</small>
            </div>
          </div>

          <div className="cstrip">
            <a className="citem" href="tel:+995322518624" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <span className="ic"><Phone className="w-5 h-5" /></span>
              <div>
                <div className="lab">{lang === 'ka' ? '24/7 ცხელი ხაზი' : '24/7 Hotline'}</div>
                <div className="val">(032) 2 51 86 24</div>
              </div>
            </a>

            <div className="citem" onClick={() => setShowMapModal(true)} style={{ cursor: 'pointer' }}>
              <span className="ic"><MapPin className="w-5 h-5" /></span>
              <div>
                <div className="lab">{lang === 'ka' ? 'მისამართი' : 'Address'}</div>
                <button className="val" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', textAlign: 'left', cursor: 'pointer', color: 'inherit' }}>
                  {lang === 'ka' ? 'ლუბლიანას ქ. 2/6, დიღომი, თბილისი' : '2/6 Lubliana St, Digomi, Tbilisi'}
                </button>
              </div>
            </div>

            <a className="citem" href="mailto:info@embrio.ge" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <span className="ic"><Mail className="w-5 h-5" /></span>
              <div>
                <div className="lab">{lang === 'ka' ? 'ელ. ფოსტა' : 'Email'}</div>
                <div className="val">info@embrio.ge</div>
              </div>
            </a>

            <div 
              className="citem" 
              onClick={() => {
                const bookingSec = document.getElementById('booking');
                if (bookingSec) {
                  bookingSec.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              style={{ cursor: 'pointer' }}
            >
              <span className="ic"><Clock className="w-5 h-5" /></span>
              <div>
                <div className="lab">{lang === 'ka' ? 'სამუშაო საათები' : 'Working Hours'}</div>
                <div className="val">{lang === 'ka' ? 'სამშობიარო: 24/7 · ამბულატორია: 09:30–18:00' : 'Maternity: 24/7 · Outpatient: 09:30–18:00'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METAFORA-STYLE UNIFIED FOOTER & EMBEDDED MAP SECTION */}
      <footer className="site-footer" id="contact">
        <div className="footer-container">
          <div className="unified-footer-card">
            {/* Left 50%: Brand, Contact Details & Socials */}
            <div className="footer-info-panel">
              <div>
                <div className="footer-brand-wrap">
                  <a href="#top" className="footer-brand-row">
                    <img
                      src={`${import.meta.env.BASE_URL}images/logo-clean.png`}
                      alt="სამშობიარო კლინიკა ემბრიო"
                      className="footer-brand-logo"
                    />
                    <span className="footer-brand-title">
                      {lang === 'ka' ? 'სამშობიარო კლინიკა ემბრიო' : 'Embrio Maternity Clinic'}
                    </span>
                  </a>
                  <span className="footer-tagline">
                    {lang === 'ka'
                      ? '✦ ახალი სიცოცხლის დაბადება სანდო ხელში'
                      : '✦ Where New Life Begins in Safe Hands'}
                  </span>
                </div>

                <p className="footer-summary-text">
                  {lang === 'ka'
                    ? 'სრული სამეანო-გინეკოლოგიური, რეპროდუქტოლოგიური და ნეონატოლოგიური მომსახურება 24/7 რეჟიმში.'
                    : 'Complete obstetric-gynecological, reproductive, and neonatal care 24/7.'}
                </p>

                <div className="footer-details-list">
                  <div className="footer-detail-row">
                    <span className="f-icon"><MapPin className="w-4 h-4" /></span>
                    <div>
                      <strong>{lang === 'ka' ? 'მისამართი:' : 'Address:'}</strong>
                      <p>{lang === 'ka' ? 'თბილისი, დიღმის მასივი, აკადემიკოს ლუბლიანას ქ. №2/6 (№13/6)' : '2/6 Academician Lubliana St, Digomi Medical Cluster, Tbilisi'}</p>
                    </div>
                  </div>

                  <div className="footer-detail-row">
                    <span className="f-icon"><Clock className="w-4 h-4" /></span>
                    <div>
                      <strong>{lang === 'ka' ? 'სამუშაო საათები:' : 'Working Hours:'}</strong>
                      <p>{lang === 'ka' ? 'სამშობიარო ბლოკი: 24/7 · ამბულატორია: ორშ–შაბ 09:30 – 18:00' : 'Maternity Block: 24/7 · Outpatient: Mon–Sat 09:30 – 18:00'}</p>
                    </div>
                  </div>

                  <div className="footer-detail-row">
                    <span className="f-icon"><Phone className="w-4 h-4" /></span>
                    <div>
                      <strong>{lang === 'ka' ? '24/7 ცხელი ხაზი:' : '24/7 Hotline:'}</strong>
                      <p><a href="tel:+995322518624">(032) 2 51 86 24</a></p>
                    </div>
                  </div>

                  <div className="footer-detail-row">
                    <span className="f-icon"><Mail className="w-4 h-4" /></span>
                    <div>
                      <strong>{lang === 'ka' ? 'ელ-ფოსტა:' : 'Email:'}</strong>
                      <p><a href="mailto:info@embrio.ge">info@embrio.ge</a></p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="footer-bottom-actions">
                  <div className="social-links-wrap footer-social-chips">
                    <a
                      href="https://www.facebook.com/EmbrioClinic/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-chip"
                      aria-label="Facebook"
                      title="Facebook — სამშობიარო კლინიკა ემბრიო"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-chip"
                      aria-label="Instagram"
                      title="Instagram"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </a>
                    <a
                      href="tel:+995322518624"
                      className="social-chip"
                      aria-label="Call"
                      title="(032) 2 51 86 24"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href="mailto:info@embrio.ge"
                      className="social-chip"
                      aria-label="Email"
                      title="info@embrio.ge"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Lubliana+St+2/6,+Tbilisi,+Georgia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gmap"
                  >
                    <span>{lang === 'ka' ? 'რუკის გახსნა' : 'Open in Maps'}</span> ↗
                  </a>
                </div>

                <div className="footer-copyright-note">
                  <span>
                    {lang === 'ka'
                      ? '© 2026 სამშობიარო კლინიკა „ემბრიო“. ყველა უფლება დაცულია.'
                      : '© 2026 Embrio Maternity Clinic. All rights reserved.'}
                  </span>
                  <div className="footer-visitor-counter">
                    <span>👁️ {lang === 'ka' ? 'ვიზიტორები:' : 'Visitors:'}</span>
                    <strong>14,820</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 50%: Interactive Google Map with Grayscale-to-Color Hover */}
            <div className="footer-map-panel">
              <iframe
                src="https://maps.google.com/maps?q=Lubliana+St+2/6,+Tbilisi,+Georgia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="bw-google-map"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={lang === 'ka' ? 'სამშობიარო კლინიკა ემბრიოს მდებარეობა' : 'Embrio Maternity Clinic Location'}
              ></iframe>
              <div className="map-status-badge">
                📍 {lang === 'ka' ? 'სამშობიარო კლინიკა ემბრიო' : 'Embrio Maternity Clinic'}
              </div>
            </div>
          </div>
        </div>
      </footer>


      {/* EMBRIOBOT GLOWING CHATBOT WIDGET */}
      <div className="floating-container">
        
        {showChat && (
          <div className="chat-window">
            <div className="chat-header-recipe">
              <div className="chat-sphere logo-sphere">
                <img
                  src={`${import.meta.env.BASE_URL}images/logo-clean.png`}
                  alt="EmbrioBot Logo"
                />
              </div>
              <h4>EmbrioBot</h4>
              <p>{lang === 'ka' ? 'სამშობიარო კლინიკის ასისტენტი' : 'Maternity Clinic Assistant'}</p>
              <button onClick={() => { playClickSound(); setShowChat(false); }} className="chat-close-recipe" aria-label="დახურვა">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="chat-viewport">
              {messages.map((m) => (
                <div key={m.id} className={`chat-msg-row ${m.sender === 'user' ? 'user' : 'bot'}`}>
                  <div className={`chat-msg ${m.sender === 'user' ? 'user' : 'bot'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="chat-quick-actions">
              <div className="chat-quick-btns">
                <button onClick={() => handleBotQuery('services', lang === 'ka' ? 'სერვისები' : 'Services')} className="chat-quick-btn">
                  {lang === 'ka' ? 'სერვისები' : 'Services'}
                </button>
                <button onClick={() => handleBotQuery('prices', lang === 'ka' ? 'მშობიარობის ფასები' : 'Delivery Prices')} className="chat-quick-btn">
                  {lang === 'ka' ? 'ფასები' : 'Prices'}
                </button>
                <button onClick={() => handleBotQuery('contact', lang === 'ka' ? 'მისამართი' : 'Address')} className="chat-quick-btn">
                  {lang === 'ka' ? 'მისამართი' : 'Address'}
                </button>
              </div>
            </div>

            <form onSubmit={handleCustomMessageSubmit} className="chat-input-form">
              <input 
                type="text" 
                placeholder={lang === 'ka' ? 'ჩაწერეთ შეკითხვა...' : 'Ask a question...'} 
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="chat-input"
              />
              <button type="submit" className="chat-send-btn" aria-label="გაგზავნა">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        <button 
          onClick={() => {
            setShowChat(!showChat)
            setChatUnread(0)
          }}
          className={`float-btn ${showChat ? 'active' : ''}`}
          aria-label="ჩატი"
        >
          {showChat ? <X className="w-5 h-5" /> : (
            <>
              <MessageSquare className="w-5 h-5" />
              {chatUnread > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', background: '#E08A79', color: '#fff', fontSize: '9px', fontWeight: 800, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {chatUnread}
                </span>
              )}
            </>
          )}
        </button>

      </div>

      {/* ABOUT US MODAL OVERLAY */}
      {showAboutModal && (
        <div className="modal-overlay" onClick={() => setShowAboutModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => { playClickSound(); setShowAboutModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'block', marginBottom: '8px' }}>
                {lang === 'ka' ? '✦ კლინიკის შესახებ' : '✦ About Embrio Clinic'}
              </span>
              <h3 className="font-serif font-bold text-xl mb-4" style={{ color: 'var(--app-text-dark)' }}>
                {lang === 'ka' ? 'სამშობიარო კლინიკა „ემბრიო“ — ახალი სიცოცხლის საიმედო კერა' : 'Embrio Maternity Clinic — Trusted Home for New Life'}
              </h3>
              <p className="text-sm leading-relaxed mb-3">
                {lang === 'ka' 
                  ? 'სამშობიარო სახლი და რეპროდუქტოლოგიური კლინიკა „ემბრიო“ მრავალი წელია ერთგულად ემსახურება ქალისა და ახალშობილის ჯანმრთელობას თბილისში, დიღმის სამედიცინო კლასტერში (ლუბლიანას ქ. №2/6). ჩვენი გუნდი აერთიანებს ქვეყნის წამყვან მეან-გინეკოლოგებს, რეპროდუქტოლოგებს, ანდროლოგებს, ნეონატოლოგებსა და ანესთეზიოლოგებს.'
                  : 'For many years, Embrio Maternity & Reproductive Clinic has been dedicated to maternal and newborn healthcare in Tbilisi’s Digomi medical cluster (2/6 Lubliana St). Our team brings together leading obstetrician-gynecologists, reproductologists, andrologists, neonatologists, and anesthesiologists.'}
              </p>
              <p className="text-sm leading-relaxed mb-6">
                {lang === 'ka'
                  ? 'კლინიკაში დანერგილია მშობიარობისა და ნეონატალური მოვლის თანამედროვე საერთაშორისო სტანდარტები: უსაფრთხო ეპიდურული გაუტკივარება, 3D/4D ექოსკოპიური დიაგნოსტიკა და 24/7 ინტენსიური მონიტორინგი.'
                  : 'We uphold modern international standards of maternal and neonatal care: safe painless epidural analgesia, 3D/4D ultrasound diagnostics, and 24/7 clinical monitoring.'}
              </p>
              
              <div className="stats-grid-4">
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold font-serif" style={{ color: 'var(--accent-color)' }}>24/7</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--app-text-soft)', textTransform: 'uppercase', marginTop: '4px' }}>
                    {lang === 'ka' ? 'სამშობიარო ბლოკი' : 'Maternity Block'}
                  </div>
                </div>
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold font-serif" style={{ color: 'var(--accent-color)' }}>15K+</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--app-text-soft)', textTransform: 'uppercase', marginTop: '4px' }}>
                    {lang === 'ka' ? 'დაბადებული პატარა' : 'Babies Born'}
                  </div>
                </div>
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold font-serif" style={{ color: 'var(--accent-color)' }}>3D/4D</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--app-text-soft)', textTransform: 'uppercase', marginTop: '4px' }}>
                    {lang === 'ka' ? 'ექოსკოპია' : 'Ultrasound'}
                  </div>
                </div>
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold font-serif" style={{ color: 'var(--accent-color)' }}>NICU</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--app-text-soft)', textTransform: 'uppercase', marginTop: '4px' }}>
                    {lang === 'ka' ? 'ნეონატოლოგია' : 'Neonatal Care'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEAM MODAL OVERLAY */}
      {showTeamModal && (
        <div className="modal-overlay" onClick={() => setShowTeamModal(false)}>
          <div className="modal-card wide glass-neu" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => { playClickSound(); setShowTeamModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'block', marginBottom: '8px' }}>
                ✦ {lang === 'ka' ? 'კლინიკის გუნდი' : 'Clinic Team'}
              </span>
              <h3 className="font-serif font-bold text-xl mb-4" style={{ color: 'var(--app-text-dark)' }}>
                {lang === 'ka' ? 'ჩვენი მეან-გინეკოლოგები და სპეციალისტები' : 'Our Obstetricians & Medical Specialists'}
              </h3>
              
              {/* Category Pill Filters */}
              <div className="service-track">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => { playClickSound(); setActiveCategory(cat); }}
                    className={`service-chip ${activeCategory === cat ? 'active' : ''}`}
                  >
                    {lang === 'ka' ? cat : ({
                      'ყველა': 'All',
                      'მეან-გინეკოლოგი': 'OB-GYN',
                      'რეპროდუქტოლოგია': 'Reproductology',
                      'ნეონატოლოგია': 'Neonatology',
                      'ანესთეზიოლოგია': 'Anesthesiology',
                      'რადიოლოგია': '4D Ultrasound',
                      'ანდროლოგია': 'Andrology',
                      'ბებიაქალი': 'Midwife'
                    }[cat] || cat)}
                  </button>
                ))}
              </div>

              {/* Dynamic Doctor Search bar */}
              <div className="search-container">
                <Search className="search-icon w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={lang === 'ka' ? "მოძებნე ექიმი ან სპეციალობა..." : "Search doctor or specialty..."} 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Doctors Grid */}
              <div className="doctor-app-grid" style={{ maxHeight: '50vh', overflowY: 'auto', paddingRight: '6px' }}>
                {filteredDoctors.map((d, i) => {
                  const init = d.n.split(" ").map(w => w[0]).join("")
                  const details = getDoctorDetailsByName(d.n, lang)
                  const ratingInfo = getDoctorRating(d.n)
                  return (
                    <article 
                      key={i} 
                      className="doctor-app-card"
                      onClick={() => {
                        playClickSound();
                        if (details) {
                          setActiveDoctorDetail(details);
                        } else {
                          setActiveDoctorDetail({
                            name: d.n,
                            role: d.s,
                            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
                            specialization: d.s,
                            bio: lang === 'ka' ? "სამშობიარო კლინიკა „ემბრიოს“ გამოცდილი სპეციალისტი." : "Experienced specialist at Embrio Maternity Clinic.",
                            education: lang === 'ka' ? "უმაღლესი სამედიცინო განათლება და სერტიფიკატები." : "Higher medical education and board certifications."
                          });
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="doctor-app-top">
                        <div className="doctor-app-avatar" style={{ background: GRADS[i % GRADS.length], overflow: 'hidden' }}>
                          {details && details.image ? (
                            <img src={details.image} alt={details.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            init
                          )}
                        </div>
                        <div className="doctor-app-info">
                          <h3 title={details ? details.name : d.n}>{details ? details.name : d.n}</h3>
                          <p title={details ? details.role : d.s}>{details ? details.role : d.s}</p>
                          <span className="doctor-profile-link">{lang === 'ka' ? 'პროფილი ➔' : 'Profile ➔'}</span>
                        </div>
                      </div>
                      <div className="doctor-app-meta">
                        <span className="doctor-app-badge" title={lang === 'ka' ? `${ratingInfo.count} შეფასება` : `${ratingInfo.count} reviews`}>
                          <Star className="w-3.5 h-3.5" style={{ color: '#FFB800', fill: '#FFB800' }} />
                          {ratingInfo.average} ({ratingInfo.count})
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                            setShowTeamModal(false);
                            handleSelectDoctorForBooking(d.n, d.s);
                          }}
                          className="doctor-app-btn"
                        >
                          {lang === 'ka' ? 'დაჯავშნა' : 'Book'}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BIRTH STORIES & OUTCOMES MODAL OVERLAY */}
      {showResultsModal && (
        <div className="modal-overlay" onClick={() => setShowResultsModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => { playClickSound(); setShowResultsModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'block', marginBottom: '8px' }}>
                ✦ {lang === 'ka' ? 'ბედნიერი ისტორიები' : 'Happy Birth Stories'}
              </span>
              <h3 className="font-serif font-bold text-xl mb-4" style={{ color: 'var(--app-text-dark)' }}>
                {lang === 'ka' ? 'ახალი სიცოცხლე კლინიკა „ემბრიოში“' : 'New Life at Embrio Clinic'}
              </h3>
              <p className="text-sm mb-6">
                {lang === 'ka' ? 'თითოეული დაბადებული პატარა და ბედნიერი ოჯახი ჩვენი გუნდის უდიდესი სიამაყეა.' : 'Every newborn baby and happy family is the greatest pride of our medical team.'}
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--app-text-dark)' }}>
                    {lang === 'ka' ? 'ნანატრი ორსულობა და რეპროდუქტოლოგიური წარმატება' : 'Long-Awaited Pregnancy & Fertility Success'}
                  </h4>
                  <p className="text-xs mb-2">
                    {lang === 'ka' ? '5-წლიანი უნაყოფობის შემდეგ, კლინიკა „ემბრიოს“ რეპროდუქტოლოგიური და ანდროლოგიური გუნდის კომპლექსური მკურნალობით დადგა ფიზიოლოგიური ორსულობა და დაიბადა ჯანმრთელი ახალშობილი.' : 'After 5 years of infertility, comprehensive reproductive and andrological treatment at Embrio resulted in a healthy full-term birth.'}
                  </p>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                    {lang === 'ka' ? 'მიმართულება: რეპროდუქტოლოგია და მეანობა' : 'Department: Reproductology & Obstetrics'}
                  </span>
                </div>

                <div className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--app-text-dark)' }}>
                    {lang === 'ka' ? 'უმტკივნეულო პარტნიორული მშობიარობა' : 'Painless Partner-Assisted Birth'}
                  </h4>
                  <p className="text-xs mb-2">
                    {lang === 'ka' ? 'ფიზიოლოგიური მშობიარობა ეპიდურული გაუტკივარებით და მეუღლის დასწრებით, მშვიდ და ოჯახურ გარემოში.' : 'Physiological delivery with walking epidural analgesia and partner support in a calm, homelike environment.'}
                  </p>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                    {lang === 'ka' ? 'მიმართულება: ფიზიოლოგიური მშობიარობა' : 'Department: Physiological Delivery'}
                  </span>
                </div>

                <div className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--app-text-dark)' }}>
                    {lang === 'ka' ? 'ტყუპების უსაფრთხო დაბადება და ნეონატალური ზრუნვა' : 'Safe Twin Delivery & Neonatal Care'}
                  </h4>
                  <p className="text-xs mb-2">
                    {lang === 'ka' ? 'მაღალი რისკის ტყუპი ორსულობის სრული ანტენატალური მართვა და გეგმიური საკეისრო კვეთა ნეონატოლოგიური გუნდის სრული მზადყოფნით.' : 'Full antenatal management of twin pregnancy and planned C-section with dedicated neonatal support.'}
                  </p>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                    {lang === 'ka' ? 'მიმართულება: საკეისრო კვეთა და ნეონატოლოგია' : 'Department: Cesarean & Neonatology'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRICES MODAL OVERLAY */}
      {showPricesModal && (
        <div className="modal-overlay" onClick={() => setShowPricesModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', width: '92%', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '32px 24px 24px 24px' }}>
            <button 
              onClick={() => { playClickSound(); setShowPricesModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 10 }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.5)', flexShrink: 0 }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'block', marginBottom: '4px' }}>
                  ✦ {lang === 'ka' ? 'ფასების კატალოგი' : 'Price Catalog'}
                </span>
                <h3 className="font-serif font-bold text-xl mb-1" style={{ color: 'var(--app-text-dark)' }}>
                  {lang === 'ka' ? 'კლინიკა „ემბრიოს“ სერვისების ფასები' : 'Embrio Clinic Service Prices'}
                </h3>
                <p className="text-xs">
                  {lang === 'ka' ? 'სამეანო, გინეკოლოგიური, რადიოლოგიური და ლაბორატორიული სერვისების ტარიფები.' : 'Rates for obstetric, gynecological, radiological, and laboratory services.'}
                </p>
              </div>

              {/* Tab Category Buttons */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '12px 0', flexShrink: 0 }}>
                {[
                  "მშობიარობა და საკეისრო",
                  "ორსულთა პატრონაჟი",
                  "ექოსკოპია და რადიოლოგია",
                  "გინეკოლოგია და რეპროდუქტოლოგია",
                  "ლაბორატორიული კვლევები"
                ].map((categoryName) => {
                  const isActive = (activePriceCategory || "მშობიარობა და საკეისრო") === categoryName;
                  return (
                    <button
                      key={categoryName}
                      onClick={() => setActivePriceCategory(categoryName)}
                      style={{
                        padding: '7px 15px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        borderRadius: '20px',
                        backgroundColor: isActive ? 'var(--accent-color)' : 'rgba(255,255,255,0.55)',
                        color: isActive ? '#fff' : 'var(--app-text-dark)',
                        border: '1px solid var(--line-color)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {categoryName}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Area */}
              <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '4px', marginBlock: '8px' }}>
                {(() => {
                  const currentCatName = activePriceCategory || "მშობიარობა და საკეისრო";
                  const pricingData = {
                    "მშობიარობა და საკეისრო": [
                      { n: "ფიზიოლოგიური მშობიარობა", p: "1200₾" },
                      { n: "გეგმიური / გადაუდებელი საკეისრო კვეთა", p: "1650₾ - 2100₾" },
                      { n: "ეპიდურული გაუტკივარება (ანესთეზია)", p: "250₾" },
                      { n: "პირადი მეან-გინეკოლოგის აყვანა", p: "350₾ - 500₾" }
                    ],
                    "ორსულთა პატრონაჟი": [
                      { n: "მეან-გინეკოლოგის პირველადი კონსულტაცია", p: "70₾" },
                      { n: "მეან-გინეკოლოგის განმეორებითი კონსულტაცია", p: "50₾" },
                      { n: "კარდიოტოკოგრაფია (CTG - ნაყოფის გულისცემის მონიტორინგი)", p: "45₾" }
                    ],
                    "ექოსკოპია და რადიოლოგია": [
                      { n: "ორსულობის 3D/4D ექოსკოპია + დოპლეროგრაფია", p: "90₾ - 120₾" },
                      { n: "I ტრიმესტრის გენეტიკური სკრინინგ ექოსკოპია (11–13 კვ.)", p: "90₾" },
                      { n: "მცირე მენჯის ღრუს გინეკოლოგიური ექოსკოპია", p: "70₾" },
                      { n: "ფოლიკულომეტრია (დინამიკაში)", p: "40₾" }
                    ],
                    "გინეკოლოგია და რეპროდუქტოლოგია": [
                      { n: "რეპროდუქტოლოგის / ანდროლოგის კონსულტაცია", p: "80₾" },
                      { n: "ვიდეო-კოლპოსკოპია", p: "75₾" },
                      { n: "PAP-ტესტი (ციტოლოგიური კვლევა)", p: "55₾" },
                      { n: "ჰისტეროსკოპია (დიაგნოსტიკური / ოპერაციული)", p: "850₾ - 1400₾" }
                    ],
                    "ლაბორატორიული კვლევები": [
                      { n: "სისხლის საერთო ანალიზი + ედს", p: "25₾" },
                      { n: "კოაგულოგრამა (სრული)", p: "40₾" },
                      { n: "ქორიონული გონადოტროპინი (Beta-hCG)", p: "45₾" },
                      { n: "სპერმოგრამა (სრული მორფოლოგიით)", p: "70₾" }
                    ]
                  };
                  const items = pricingData[currentCatName] || [];
                  return items.map((item, idx) => (
                    <div key={idx} className="price-item-row">
                      <span className="price-item-name">{item.n}</span>
                      <span className="price-item-val">{item.p}</span>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BLOG MODAL OVERLAY */}
      {showBlogModal && (
        <div className="modal-overlay" onClick={() => setShowBlogModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => { playClickSound(); setShowBlogModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'block', marginBottom: '8px' }}>
                ✦ {lang === 'ka' ? 'კლინიკის ბლოგი' : 'Clinic Blog'}
              </span>
              <h3 className="font-serif font-bold text-xl mb-4" style={{ color: 'var(--app-text-dark)' }}>
                {lang === 'ka' ? 'რჩევები მომავალი დედებისთვის' : 'Guides for Expectant Mothers'}
              </h3>
              
              <div className="flex flex-col gap-4">
                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--app-text-dark)' }}>
                    {lang === 'ka' ? 'რა ნივთები წავიღოთ სამშობიაროში? (სრული სია)' : 'What to Pack in Your Hospital Bag? (Complete Checklist)'}
                  </h4>
                  <p className="text-xs mb-2">
                    {lang === 'ka' ? '35-ე კვირიდან სასურველია სამშობიარო ჩანთის მომზადება: პირადობის დამადასტურებელი დოკუმენტი, გაცვლა-გამოცვლის ბარათი, კომფორტული ხალათი და ახალშობილის პირველადი ჰიგიენური ნაკრები.' : 'From week 35, prepare your maternity bag: ID card, antenatal exchange card, comfortable robe, slippers, and newborn essentials.'}
                  </p>
                  <a href="#booking" onClick={() => { playClickSound(); setShowBlogModal(false); }} style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-color)', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'} <ChevronRight className="w-3 h-3" />
                  </a>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--app-text-dark)' }}>
                    {lang === 'ka' ? 'ეპიდურული ანესთეზია — მითები და რეალობა' : 'Epidural Analgesia — Myths & Reality'}
                  </h4>
                  <p className="text-xs mb-2">
                    {lang === 'ka' ? 'თანამედროვე ეპიდურული გაუტკივარება სრულიად უსაფრთხოა როგორც დედისთვის, ისე ნაყოფისთვის და საშუალებას გაძლევთ მშობიარობის პროცესი გახადოთ მაქსიმალურად მშვიდი და უმტკივნეულო.' : 'Modern epidural analgesia is completely safe for both mother and baby, turning childbirth into a calm and comfortable experience.'}
                  </p>
                  <a href="#booking" onClick={() => { playClickSound(); setShowBlogModal(false); }} style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-color)', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'} <ChevronRight className="w-3 h-3" />
                  </a>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--app-text-dark)' }}>
                    {lang === 'ka' ? 'ოქროს საათი და ძუძუთი კვების მნიშვნელობა' : 'The Golden Hour & Benefits of Breastfeeding'}
                  </h4>
                  <p className="text-xs mb-2">
                    {lang === 'ka' ? 'დაბადებისთანავე დედისა და ახალშობილის „კანი-კანთან“ კონტაქტი აძლიერებს პატარას იმუნიტეტს და ხელს უწყობს ლაქტაციის ბუნებრივ დაწყებას.' : 'Immediate skin-to-skin contact after birth strengthens newborn immunity and naturally initiates lactation.'}
                  </p>
                  <a href="#booking" onClick={() => { playClickSound(); setShowBlogModal(false); }} style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-color)', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'} <ChevronRight className="w-3 h-3" />
                  </a>
                </article>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EQUIPMENT MODAL OVERLAY */}
      {showEquipModal && (
        <div className="modal-overlay" onClick={() => setShowEquipModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px', width: '92%', maxHeight: '85vh', overflowY: 'auto' }}>
            <button 
              onClick={() => { playClickSound(); setShowEquipModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'block', marginBottom: '8px' }}>
                ✦ {lang === 'ka' ? 'ინფრასტრუქტურა და აპარატურა' : 'Infrastructure & Equipment'}
              </span>
              <h3 className="font-serif font-bold text-xl mb-4" style={{ color: 'var(--app-text-dark)' }}>
                {lang === 'ka' ? 'სამედიცინო აპარატურა და ტექნოლოგიები' : 'Medical Equipment & Technologies'}
              </h3>
              <p className="text-xs mb-6">
                {lang === 'ka' ? 'კლინიკა „ემბრიო“ აღჭურვილია ევროპული და ამერიკული წარმოების თანამედროვე სამეანო-ნეონატალური და დიაგნოსტიკური აპარატურით.' : 'Embrio Clinic is equipped with advanced European and American obstetric-neonatal and diagnostic technology.'}
              </p>
              
              <div className="flex flex-col gap-4">
                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--app-text-dark)' }}>
                    {lang === 'ka' ? '4D ექსპერტული ულტრაბგერითი სისტემა (GE Voluson)' : '4D Expert Ultrasound System (GE Voluson)'}
                  </h4>
                  <p className="text-xs mb-2">
                    {lang === 'ka' ? 'უმაღლესი გარჩევადობის 3D/4D პრენატალური ვიზუალიზაცია და ფერადი დოპლეროგრაფია ნაყოფის ანატომიური და გულ-სისხლძარღვთა სისტემის უზუსტესი დიაგნოსტიკისთვის.' : 'High-definition 3D/4D prenatal imaging and color Doppler for accurate fetal anatomical and cardiovascular assessment.'}
                  </p>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--app-text-dark)' }}>
                    {lang === 'ka' ? 'ნეონატალური ინტენსიური თერაპიის აღჭურვილობა (Dräger)' : 'Neonatal Intensive Care Incubators (Dräger)'}
                  </h4>
                  <p className="text-xs mb-2">
                    {lang === 'ka' ? 'თანამედროვე ინკუბატორები მიკროკლიმატის ავტომატური კონტროლით, არაინვაზიური სუნთქვითი მხარდაჭერის (CPAP) აპარატებითა და LED ფოტოთერაპიის სისტემებით.' : 'Modern incubators with automated microclimate control, CPAP respiratory support, and LED phototherapy units.'}
                  </p>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--app-text-dark)' }}>
                    {lang === 'ka' ? 'ფეტალური მონიტორინგისა და კარდიოტოკოგრაფიის (CTG) სისტემები' : 'Fetal Telemetry & Cardiotocography (CTG) Systems'}
                  </h4>
                  <p className="text-xs mb-2">
                    {lang === 'ka' ? 'ნაყოფის გულისცემისა და დედის სასიცოცხლო პარამეტრების უწყვეტი 24/7 მონიტორინგი.' : 'Continuous 24/7 monitoring of fetal heart rate and maternal vital signs.'}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE DETAILS MODAL OVERLAY (METAFORA DEEP SERVICE STYLE) */}
      {activeServiceDetail && (
        <div className="modal-overlay" onClick={() => setActiveServiceDetail(null)}>
          <div className="modal-card glass-neu wide" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '880px', width: '94%', padding: '32px' }}>
            <button 
              onClick={() => { playClickSound(); setActiveServiceDetail(null); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 10 }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="service-deep-grid text-left">
              {activeServiceDetail.image && (
                <div className="service-deep-media">
                  <div className="service-media-card">
                    <img
                      src={activeServiceDetail.image}
                      alt={getServiceDetailTranslated(activeServiceDetail, lang).title}
                    />
                    {activeServiceDetail.badgeStrong && (
                      <div className="service-media-badge">
                        ✦ {activeServiceDetail.badgeStrong} · {activeServiceDetail.badgeSmall}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="service-deep-info">
                <span className="zone-badge">
                  {renderServiceIcon(activeServiceDetail.key)}
                  <span>{activeServiceDetail.zone || (lang === 'ka' ? 'სერვისის დეტალები' : 'Service Details')}</span>
                </span>
                <h3 className="service-deep-title">
                  {getServiceDetailTranslated(activeServiceDetail, lang).title}
                </h3>
                <p className="service-deep-desc">
                  {getServiceDetailTranslated(activeServiceDetail, lang).desc}
                </p>

                <div className="service-features-list">
                  {activeServiceDetail.subs && getServiceDetailTranslated(activeServiceDetail, lang).subs.map((sub, i) => (
                    <div key={i} className="service-feat-item">
                      <span className="feat-check">✓</span>
                      <div>
                        <strong>{sub.title}</strong>
                        <small>{sub.text}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="service-action-row">
                  <button
                    onClick={() => {
                      playClickSound();
                      setSelectedService(SERVICES_DETAILS[activeServiceDetail.key]?.title || 'მეან-გინეკოლოგის კონსულტაცია');
                      setActiveServiceDetail(null);
                      const bookingSec = document.getElementById('booking');
                      if (bookingSec) {
                        bookingSec.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="phone-onboarding-btn"
                    style={{ width: 'auto', padding: '12px 24px', flex: 'none', borderRadius: '999px' }}
                  >
                    {lang === 'ka' ? 'ჩაეწერე კონსულტაციაზე' : 'Book Consultation'}
                  </button>
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveServiceDetail(null);
                      setShowPricesModal(true);
                    }}
                    className="phone-onboarding-btn-secondary"
                    style={{ width: 'auto', padding: '12px 22px', flex: 'none', borderRadius: '999px' }}
                  >
                    {lang === 'ka' ? 'ფასების ნახვა' : 'View Prices'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRIMESTER DETAILS MODAL OVERLAY */}
      {activeEnamelDetail && (
        <div className="modal-overlay" onClick={() => setActiveEnamelDetail(null)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px', width: '92%' }}>
            <button 
              onClick={() => { playClickSound(); setActiveEnamelDetail(null); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                ✦ {lang === 'ka' ? 'ორსულობის კალენდარი' : 'Pregnancy Trimester Guide'}
              </span>
              <h3 className="font-serif font-bold text-2xl mb-4 mt-2" style={{ color: 'var(--app-text-dark)' }}>
                {getEnamelDetailTranslated(activeEnamelDetail, lang).title}
              </h3>
              
              <div className="glass-neu p-4 mb-4" style={{ background: 'rgba(var(--accent-color-rgb), 0.06)', border: '1px solid rgba(var(--accent-color-rgb), 0.2)', boxShadow: 'none' }}>
                <h4 className="font-bold text-xs mb-2 uppercase" style={{ color: 'var(--accent-color)' }}>
                  {lang === 'ka' ? 'მნიშვნელოვანი ეტაპები და კვლევები:' : 'Key Milestones & Checkups:'}
                </h4>
                <p className="text-sm leading-relaxed">
                  {getEnamelDetailTranslated(activeEnamelDetail, lang).damage}
                </p>
              </div>

              <div className="glass-neu p-4" style={{ background: 'rgba(255, 255, 255, 0.35)', boxShadow: 'none' }}>
                <h4 className="font-bold text-xs mb-2 uppercase" style={{ color: 'var(--app-text-dark)' }}>
                  {lang === 'ka' ? 'მეან-გინეკოლოგის რეკომენდაცია:' : 'Obstetrician Recommendation:'}
                </h4>
                <p className="text-sm leading-relaxed">
                  {getEnamelDetailTranslated(activeEnamelDetail, lang).tip}
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedService('ორსულთა პატრონაჟი');
                    setActiveEnamelDetail(null);
                    const bookingSec = document.getElementById('booking');
                    if (bookingSec) {
                      bookingSec.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="phone-onboarding-btn"
                  style={{ width: 'auto', padding: '12px 24px', flex: 'none' }}
                >
                  {lang === 'ka' ? 'ჩაეწერე ვიზიტზე' : 'Book Prenatal Visit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOCTOR DETAILS MODAL OVERLAY */}
      {activeDoctorDetail && (
        <div className="modal-overlay" onClick={() => setActiveDoctorDetail(null)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '660px', width: '92%' }}>
            <button 
              onClick={() => { playClickSound(); setActiveDoctorDetail(null); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="doctor-modal-grid">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img 
                  src={activeDoctorDetail.image} 
                  alt={activeDoctorDetail.name} 
                  className="rounded-3xl" 
                  style={{ width: '100%', aspectRatio: '4/5', maxWidth: '220px', objectFit: 'cover', boxShadow: '6px 6px 18px var(--shadow-dark)' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'block', marginBottom: '4px' }}>
                  ✦ {lang === 'ka' ? 'კლინიკა ემბრიოს სპეციალისტი' : 'Embrio Clinic Specialist'}
                </span>
                <h3 className="font-serif font-bold text-2xl mb-1" style={{ color: 'var(--app-text-dark)' }}>
                  {activeDoctorDetail.name}
                </h3>
                <span className="text-xs font-bold block mb-3" style={{ color: 'var(--app-text-soft)' }}>
                  {activeDoctorDetail.role}
                </span>

                {/* 5-Star interactive rating system */}
                <div className="mb-4 glass-neu p-3" style={{ background: 'rgba(255, 255, 255, 0.35)', border: '1px solid rgba(var(--accent-color-rgb), 0.2)' }}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h4 style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '2px' }}>
                        {lang === 'ka' ? 'პაციენტების შეფასება' : 'Patient Rating'}
                      </h4>
                      <p className="text-xs" style={{ margin: 0 }}>
                        <span>{lang === 'ka' ? 'რეიტინგი:' : 'Rating:'}</span> <strong>{getDoctorRating(activeDoctorDetail.name).average} / 5</strong> ({getDoctorRating(activeDoctorDetail.name).count} {lang === 'ka' ? 'ხმა' : 'votes'})
                      </p>
                    </div>
                    <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                      {[1, 2, 3, 4, 5].map((star) => {
                        const userRating = getDoctorRating(activeDoctorDetail.name).userRating;
                        const isGold = hoverRating > 0 ? star <= hoverRating : (userRating ? star <= userRating : false);
                        return (
                          <button
                            key={star}
                            onClick={() => {
                              if (authUser) {
                                handleRateDoctor(activeDoctorDetail.name, star);
                              } else {
                                setPendingRating({ doctorName: activeDoctorDetail.name, score: star });
                                setShowAuthModal(true);
                              }
                            }}
                            onMouseEnter={() => setHoverRating(star)}
                            style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer' }}
                            title={lang === 'ka' ? `შეაფასე ${star} ვარსკვლავით` : `Rate ${star} Stars`}
                          >
                            <Star 
                              className="w-4 h-4" 
                              style={{ 
                                color: isGold ? '#FFB800' : '#D1D1D6', 
                                fill: isGold ? '#FFB800' : 'none' 
                              }} 
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {getDoctorRating(activeDoctorDetail.name).userRating && (
                    <div style={{ fontSize: '10px', color: '#1E7E75', fontWeight: 700, marginTop: '6px' }}>
                      {lang === 'ka' 
                        ? `✦ გმადლობთ შეფასებისთვის! (თქვენ მიანიჭეთ ${getDoctorRating(activeDoctorDetail.name).userRating} ვარსკვლავი)` 
                        : `✦ Thank you for rating! (You gave ${getDoctorRating(activeDoctorDetail.name).userRating} stars)`}
                    </div>
                  )}
                </div>

                {activeDoctorDetail.bio && (
                  <div className="mb-3">
                    <h4 style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '4px' }}>
                      {lang === 'ka' ? 'მოკლე მიმოხილვა' : 'Biography'}
                    </h4>
                    <p className="text-xs leading-relaxed whitespace-pre-line">{activeDoctorDetail.bio}</p>
                  </div>
                )}

                {activeDoctorDetail.education && (
                  <div className="mb-3">
                    <h4 style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '4px' }}>
                      {lang === 'ka' ? 'განათლება და გამოცდილება' : 'Education & Experience'}
                    </h4>
                    <p className="text-xs leading-relaxed whitespace-pre-line">{activeDoctorDetail.education}</p>
                  </div>
                )}

                {activeDoctorDetail.specialization && (
                  <div className="mb-3">
                    <h4 style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '4px' }}>
                      {lang === 'ka' ? 'სპეციალიზაცია' : 'Specialization'}
                    </h4>
                    <p className="text-xs leading-relaxed whitespace-pre-line">{activeDoctorDetail.specialization}</p>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      playClickSound();
                      setSelectedDoctor(activeDoctorDetail.name);
                      setActiveDoctorDetail(null);
                      setShowTeamModal(false);
                      const bookingSec = document.getElementById('booking');
                      if (bookingSec) {
                        bookingSec.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="phone-onboarding-btn"
                    style={{ width: 'auto', padding: '10px 22px', fontSize: '12px', flex: 'none' }}
                  >
                    {lang === 'ka' ? 'ჩაეწერე ვიზიტზე' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RATING AUTHENTICATION MODAL */}
      {showAuthModal && (
        <div className="modal-overlay" style={{ zIndex: 3000 }} onClick={() => {
          setShowAuthModal(false);
          setPendingRating(null);
          setAuthError('');
        }}>
          <div className="modal-card glass-neu text-left" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', width: '90%', padding: '28px' }}>
            <button 
              onClick={() => {
                playClickSound();
                setShowAuthModal(false);
                setPendingRating(null);
                setAuthError('');
              }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            
            <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'block', marginBottom: '6px' }}>
              ✦ {lang === 'ka' ? 'ვერიფიკაცია' : 'Verification'}
            </span>
            <h3 className="font-serif font-bold text-lg mb-2" style={{ color: 'var(--app-text-dark)' }}>
              {lang === 'ka' ? 'შეფასების დადასტურება' : 'Confirm Rating'}
            </h3>
            <p className="text-xs mb-4">
              {lang === 'ka' ? 'ექიმის შესაფასებლად გთხოვთ მიუთითოთ თქვენი სახელი, გვარი და მობილურის ნომერი.' : 'To rate the doctor, please enter your full name and mobile number.'}
            </p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const cleanPhone = authPhone.replace(/\s+/g, '').replace('+995', '');
              const georgianMobileRegex = /^5\d{8}$/;
              
              if (!authName.trim() || authName.trim().split(/\s+/).length < 2) {
                setAuthError(lang === 'ka' ? 'გთხოვთ მიუთითოთ სახელი და გვარი' : 'Please enter your full name');
                return;
              }
              
              if (!georgianMobileRegex.test(cleanPhone)) {
                setAuthError(lang === 'ka' ? 'მიუთითეთ მობილურის ნომერი (მაგ: 599 xx xx xx)' : 'Please enter a valid number (5xx xx xx xx)');
                return;
              }
              
              const verifiedUser = {
                name: authName.trim(),
                phone: '+995 ' + cleanPhone
              };
              
              setAuthUser(verifiedUser);
              localStorage.setItem('embrio_auth_user', JSON.stringify(verifiedUser));
              setAuthError('');
              setShowAuthModal(false);
              
              if (pendingRating) {
                handleRateDoctor(pendingRating.doctorName, pendingRating.score);
                setPendingRating(null);
              }
            }}>
              <div className="field mb-3">
                <label>{lang === 'ka' ? 'სახელი და გვარი' : 'Full Name'}</label>
                <input 
                  type="text" 
                  placeholder={lang === 'ka' ? "მაგ: ნინო მაისურაძე" : "e.g., Nino Maisuradze"}
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  required
                />
              </div>
              
              <div className="field mb-3">
                <label>{lang === 'ka' ? 'ტელეფონის ნომერი' : 'Phone Number'}</label>
                <input 
                  type="tel" 
                  placeholder="5xx xx xx xx"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  required
                />
              </div>
              
              {authError && (
                <div className="text-xs font-bold mb-3" style={{ color: '#E74C3C' }}>
                  ⚠️ {authError}
                </div>
              )}
              
              <button 
                type="submit" 
                className="phone-onboarding-btn mt-2" 
                style={{ width: '100%', padding: '12px', fontSize: '12px' }}
              >
                {lang === 'ka' ? 'დადასტურება' : 'Confirm'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* GOOGLE MAPS MODAL OVERLAY */}
      {showMapModal && (
        <div className="modal-overlay" onClick={() => setShowMapModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', width: '92%', padding: '24px' }}>
            <button 
              onClick={() => { playClickSound(); setShowMapModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left mb-4">
              <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent-color)', display: 'block', marginBottom: '4px' }}>
                ✦ {lang === 'ka' ? 'კლინიკის მდებარეობა' : 'Clinic Location'}
              </span>
              <h3 className="font-serif font-bold text-xl" style={{ color: 'var(--app-text-dark)' }}>
                {lang === 'ka' ? 'სამშობიარო კლინიკა „ემბრიო“ რუკაზე' : 'Embrio Maternity Clinic on Map'}
              </h3>
              <p className="text-xs mt-1" style={{ color: 'var(--app-text-soft)' }}>
                {lang === 'ka' ? 'აკადემიკოს ლუბლიანას ქ. №2/6, დიღმის მასივი, თბილისი' : '2/6 Academician Lubliana St, Digomi, Tbilisi'}
              </p>
            </div>
            <div className="rounded-2xl" style={{ width: '100%', height: '400px', overflow: 'hidden', border: '1px solid var(--line-color)' }}>
              <iframe 
                src="https://www.google.com/maps?q=Lubliana+St+2/6,+Tbilisi,+Georgia&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Embrio Clinic Map"
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
