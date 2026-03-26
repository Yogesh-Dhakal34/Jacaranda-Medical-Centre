
let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-ne').classList.toggle('active', lang === 'ne');
  stopSpeech();
}


const pageTextEN = `
  Welcome to Patient Resources at Jacaranda Blue-Mist Medical Centre.
  You can book an appointment, read our check-up guidelines, follow-up instructions, and health education tips on this page.
  To book an appointment, fill in your name, phone number, preferred specialty, date, and time, then click Confirm Appointment.
  For emergencies, please call 1134 at any time, 24 hours a day, 7 days a week.
`;

const pageTextNE = `
  जाकारान्डा ब्लु-मिस्ट मेडिकल सेन्टरको बिरामी स्रोतहरूमा स्वागत छ।
  यस पृष्ठमा तपाईं अपोइन्टमेन्ट बुक गर्न, चेकअप दिशानिर्देशहरू पढ्न, फलो-अप निर्देशनहरू र स्वास्थ्य शिक्षा सुझावहरू पाउन सक्नुहुन्छ।
  अपोइन्टमेन्ट बुक गर्न, आफ्नो नाम, फोन नम्बर, मनपर्ने विशेषता, मिति र समय भर्नुहोस्, त्यसपछि अपोइन्टमेन्ट पुष्टि गर्नुहोस् क्लिक गर्नुहोस्।
  आपतकालीन अवस्थामा कृपया जुनसुकै समय ११३४ मा फोन गर्नुहोस्।
`;

function speakPage() {
  stopSpeech();
  const text = currentLang === 'ne' ? pageTextNE : pageTextEN;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentLang === 'ne' ? 'ne-NP' : 'en-US';
  utterance.rate = 0.92;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  window.speechSynthesis.cancel();
}


function submitForm(e) {
  e.preventDefault();

  const name      = document.getElementById('full-name');
  const phone     = document.getElementById('phone');
  const email     = document.getElementById('email');
  const specialty = document.getElementById('specialty');
  const date      = document.getElementById('appt-date');
  const time      = document.getElementById('appt-time');

  let valid = true;

  ['name','phone','email','specialty','date','time'].forEach(id => {
    document.getElementById('err-' + id).textContent = '';
  });
  [name, phone, email, specialty, date, time].forEach(el => el.classList.remove('error'));

  if (!name.value.trim()) {
    showError(name, 'err-name', 'Full name is required.');
    valid = false;
  }

  if (!phone.value.trim()) {
    showError(phone, 'err-phone', 'Phone number is required.');
    valid = false;
  } else if (!/^\d{7,15}$/.test(phone.value.trim())) {
    showError(phone, 'err-phone', 'Enter a valid phone number.');
    valid = false;
  }

  if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, 'err-email', 'Enter a valid email address.');
    valid = false;
  }

  if (!specialty.value) {
    showError(specialty, 'err-specialty', 'Please select a specialty.');
    valid = false;
  }

  if (!date.value) {
    showError(date, 'err-date', 'Please select a date.');
    valid = false;
  } else {
    const selected = new Date(date.value);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selected < today) {
      showError(date, 'err-date', 'Please select a future date.');
      valid = false;
    }
  }

  if (!time.value) {
    showError(time, 'err-time', 'Please select a time slot.');
    valid = false;
  }

  if (valid) {
    document.getElementById('booking-form').style.display = 'none';
    const success = document.getElementById('form-success');
    success.style.display = 'block';
    document.getElementById('success-details').textContent =
      `Thank you, ${name.value.trim()}! Your ${specialty.value} appointment on ${date.value} at ${time.value} has been received. We will contact you at ${phone.value.trim()} to confirm.`;
  }
}

function showError(input, errId, message) {
  input.classList.add('error');
  document.getElementById(errId).textContent = message;
}

function resetForm() {
  document.getElementById('booking-form').reset();
  document.getElementById('booking-form').style.display = 'block';
  document.getElementById('form-success').style.display = 'none';
  ['name','phone','email','specialty','date','time'].forEach(id => {
    document.getElementById('err-' + id).textContent = '';
  });
}


function showTab(id, btn) {
  document.querySelectorAll('.health-tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.health-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('appt-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
});
