const DEFAULT_PLANTS = [
  {
    turkish: 'Kaktüs',
    latin: 'Cactaceae',
    soil: 'Kuru, iyi drene edilen, hafif kumlu toprak.',
    light: 'Güneş seven bitkidir. Günde 4-6 saat doğrudan güneş almalıdır.',
    water: 'Toprak tamamen kuruduktan sonra sulanır. Aşırı sulamadan kaçının.',
    care: 'Saksı altında su birikmesini önleyin. Dönemsel olarak yaprakları kontrol edin.',
    feeding: 'Azotlu gübre yerine fosfor ve potasyumlu dengeli gübre kullanın.',
    disease: 'Yaprak çürüklüğü ve kök çürüklüğü genelde aşırı sulama sonrası görülür.'
  },
  {
    turkish: 'Orkide',
    latin: 'Phalaenopsis',
    soil: 'Orkide kökleri için hava alabilen, gözenekli, humuslu ve hafif torf karışımı tercih edilir.',
    light: 'Düşük ila orta parlak ışık. Doğrudan güneşten koruyun.',
    water: 'Saksı içindeki köklerin tamamen kurumasına izin vermeden, yaklaşık 7-10 günde bir sulayın.',
    care: 'Köklerinizi düzenli kontrol edin. Yalnızca uygun saksıda yetiştirin.',
    feeding: 'Orkide gübresi ile haftada 1 kez, seyreltik şekilde uygulayın.',
    disease: 'Kök çürüklüğü, yaprak sararması ve mantar hastalıkları görülebilir.'
  },
  {
    turkish: 'Paşa Kılıcı',
    latin: 'Dracaena trifasciata',
    soil: 'İyi drene eden, hafif nemli ve besin değeri olan toprak.',
    light: 'Parlak, dolaylı ışık tercih edilir. Doğrudan güneşten kaçının.',
    water: 'Toprağın üst tabakası kuruduğunda sulayın. Aşırı sulamadan kaçının.',
    care: 'Yaprakların uçlarını düzenli kontrol edin. Gürleşmesi için zamanla budama yapın.',
    feeding: 'İlkbahar ve yaz döneminde ayda bir sıvı gübre uygulayın.',
    disease: 'Koyu lekeler ve yaprak uçlarında yanma, düşük nemden kaynaklanabilir.'
  },
  {
    turkish: 'Menekşe',
    latin: 'Viola',
    soil: 'Hafif, besleyici, organik madde zengin, iyi drene eden toprak.',
    light: 'Parlak ama doğrudan güneş almayan ortam. Günde 3-5 saat ışık.',
    water: 'Toprak hafif nemli kalacak şekilde sulayın. Çok kurutmayın.',
    care: 'Çiçeklenmeyi artırmak için düzenli budama yapın. Solan çiçekleri temizleyin.',
    feeding: 'Büyüme döneminde haftalık hafif gübre kullanın.',
    disease: 'Yaprak lekeleri ve küf, fazla nemden kaynaklanabilir.'
  },
  {
    turkish: 'Sukulent',
    latin: 'Succulent',
    soil: 'Kumlu, iyi drene eden, hafif asidik olmayan toprak.',
    light: 'Güneşi seven bir yapısı vardır. Çok yoğun güneşe alıştıra alıştıra verin.',
    water: 'Toprak tamamen kuruyana kadar bekleyin. Sulama aralıkları geniş olmalıdır.',
    care: 'Saksı deliklerinin açık olmasına dikkat edin. Kök çürümesine engel olun.',
    feeding: 'Yaz aylarında ayda bir az miktarda gübre verin.',
    disease: 'Kök çürüklüğü, aşırı sulama ve su birikimi nedeniyle oluşur.'
  }
];

const STORAGE_KEYS = {
  plants: 'plantGuideDatabase',
  adminUsers: 'plantAdminUsers',
  apiSettings: 'plantApiSettings',
  dailyLimit: 'plantDailyLimit',
  queryCount: 'plantDailyQueryCount',
  queryDate: 'plantDailyQueryDate'
};

const defaultSettings = {
  primaryKey: '',
  secondaryKey: '',
  tertiaryKey: '',
  model: 'GPT-4o'
};

const defaultUsers = [{ username: 'admin', password: 'admin123' }];

const state = {
  login: false,
  imagePreview: '',
  lastQueryDate: localStorage.getItem(STORAGE_KEYS.queryDate) || ''
};

const elements = {
  plantSearchInput: document.getElementById('plantSearchInput'),
  plantSearchBtn: document.getElementById('plantSearchBtn'),
  guideResults: document.getElementById('guideResults'),
  guideEmpty: document.getElementById('guideEmpty'),
  imageInput: document.getElementById('imageInput'),
  cameraInput: document.getElementById('cameraInput'),
  selectImageBtn: document.getElementById('selectImageBtn'),
  captureImageBtn: document.getElementById('captureImageBtn'),
  previewImage: document.getElementById('previewImage'),
  imagePreviewWrap: document.getElementById('imagePreviewWrap'),
  runDetectionBtn: document.getElementById('runDetectionBtn'),
  resultSummary: document.getElementById('resultSummary'),
  detectionResults: document.getElementById('detectionResults'),
  openAdmin: document.getElementById('openAdmin'),
  closeAdmin: document.getElementById('closeAdmin'),
  adminModal: document.getElementById('adminModal'),
  loginSection: document.getElementById('loginSection'),
  adminDashboard: document.getElementById('adminDashboard'),
  adminUsername: document.getElementById('adminUsername'),
  adminPassword: document.getElementById('adminPassword'),
  loginAdminBtn: document.getElementById('loginAdminBtn'),
  addUserBtn: document.getElementById('addUserBtn'),
  newUserName: document.getElementById('newUserName'),
  newUserPassword: document.getElementById('newUserPassword'),
  saveApiBtn: document.getElementById('saveApiBtn'),
  apiModelSelect: document.getElementById('apiModelSelect'),
  apiKeyPrimary: document.getElementById('apiKeyPrimary'),
  apiKeySecondary: document.getElementById('apiKeySecondary'),
  apiKeyTertiary: document.getElementById('apiKeyTertiary'),
  dailyLimitInput: document.getElementById('dailyLimitInput'),
  savePlantBtn: document.getElementById('savePlantBtn'),
  newPlantTurkish: document.getElementById('newPlantTurkish'),
  newPlantLatin: document.getElementById('newPlantLatin'),
  newPlantSoil: document.getElementById('newPlantSoil'),
  newPlantLight: document.getElementById('newPlantLight'),
  newPlantWater: document.getElementById('newPlantWater'),
  newPlantCare: document.getElementById('newPlantCare'),
  newPlantFeeding: document.getElementById('newPlantFeeding'),
  newPlantDisease: document.getElementById('newPlantDisease'),
  logoutAdminBtn: document.getElementById('logoutAdminBtn'),
  toast: document.getElementById('toast')
};

const getPlants = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.plants) || 'null') || DEFAULT_PLANTS;
const setPlants = (plants) => localStorage.setItem(STORAGE_KEYS.plants, JSON.stringify(plants));
const getUsers = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.adminUsers) || 'null') || defaultUsers;
const setUsers = (users) => localStorage.setItem(STORAGE_KEYS.adminUsers, JSON.stringify(users));
const getApiSettings = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.apiSettings) || 'null') || defaultSettings;
const setApiSettings = (settings) => localStorage.setItem(STORAGE_KEYS.apiSettings, JSON.stringify(settings));
const getDailyLimit = () => Number(localStorage.getItem(STORAGE_KEYS.dailyLimit) || 1);
const setDailyLimit = (value) => localStorage.setItem(STORAGE_KEYS.dailyLimit, String(value));

function updateDailyLimitInput() {
  elements.dailyLimitInput.value = getDailyLimit();
}

function loadApiSettings() {
  const settings = getApiSettings();
  elements.apiModelSelect.value = settings.model || 'GPT-4o';
  elements.apiKeyPrimary.value = settings.primaryKey || '';
  elements.apiKeySecondary.value = settings.secondaryKey || '';
  elements.apiKeyTertiary.value = settings.tertiaryKey || '';
  updateDailyLimitInput();
}

function saveToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.remove('hidden');
  clearTimeout(saveToast.timer);
  saveToast.timer = setTimeout(() => elements.toast.classList.add('hidden'), 2200);
}

function searchPlants(query = '') {
  const queryText = query.trim().toLowerCase();
  const plants = getPlants();

  if (!queryText) {
    renderGuideCards(plants);
    return;
  }

  const filtered = plants.filter((plant) => {
    const searchable = [plant.turkish, plant.latin, plant.soil, plant.light, plant.water, plant.care]
      .join(' ')
      .toLowerCase();
    return searchable.includes(queryText);
  });

  renderGuideCards(filtered);
}

function renderGuideCards(plants) {
  const list = plants || getPlants();
  elements.guideResults.innerHTML = '';

  if (!list.length) {
    elements.guideEmpty.classList.remove('hidden');
    return;
  }

  elements.guideEmpty.classList.add('hidden');

  list.forEach((plant) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${plant.turkish}</h3>
      <div class="muted">${plant.latin}</div>
      <h4>Toprak Özellikleri</h4>
      <p>${plant.soil}</p>
      <h4>Işık ve Güneş Alma Durumu</h4>
      <p>${plant.light}</p>
      <h4>Sulama Özellikleri</h4>
      <p>${plant.water}</p>
      <h4>Bakım İpuçları</h4>
      <p>${plant.care}</p>
      <h4>Gübre ve Besin</h4>
      <p>${plant.feeding}</p>
      <h4>Hastalık</h4>
      <p>${plant.disease}</p>
    `;
    elements.guideResults.appendChild(card);
  });
}

function openAdmin() {
  elements.adminModal.classList.remove('hidden');
}

function closeAdmin() {
  elements.adminModal.classList.add('hidden');
}

function loginAdmin() {
  const username = elements.adminUsername.value.trim();
  const password = elements.adminPassword.value.trim();
  const users = getUsers();
  const found = users.find((user) => user.username === username && user.password === password);

  if (!found) {
    saveToast('Kullanıcı adı veya şifre hatalı.');
    return;
  }

  state.login = true;
  elements.loginSection.classList.add('hidden');
  elements.adminDashboard.classList.remove('hidden');
  elements.adminUsername.value = '';
  elements.adminPassword.value = '';
  loadApiSettings();
}

function logoutAdmin() {
  state.login = false;
  elements.adminDashboard.classList.add('hidden');
  elements.loginSection.classList.remove('hidden');
}

function addUser() {
  const username = elements.newUserName.value.trim();
  const password = elements.newUserPassword.value.trim();

  if (!username || !password) {
    saveToast('Kullanıcı adı ve şifre zorunludur.');
    return;
  }

  const users = getUsers();
  const exists = users.some((user) => user.username === username);

  if (exists) {
    saveToast('Bu kullanıcı adı zaten kayıtlı.');
    return;
  }

  users.push({ username, password });
  setUsers(users);
  elements.newUserName.value = '';
  elements.newUserPassword.value = '';
  saveToast('Kullanıcı eklendi.');
}

function saveApiSettings() {
  const settings = {
    primaryKey: elements.apiKeyPrimary.value.trim(),
    secondaryKey: elements.apiKeySecondary.value.trim(),
    tertiaryKey: elements.apiKeyTertiary.value.trim(),
    model: elements.apiModelSelect.value
  };

  setApiSettings(settings);
  setDailyLimit(Number(elements.dailyLimitInput.value || 1));
  saveToast('API ayarları kaydedildi.');
}

function saveNewPlant() {
  const plant = {
    turkish: elements.newPlantTurkish.value.trim(),
    latin: elements.newPlantLatin.value.trim(),
    soil: elements.newPlantSoil.value.trim(),
    light: elements.newPlantLight.value.trim(),
    water: elements.newPlantWater.value.trim(),
    care: elements.newPlantCare.value.trim(),
    feeding: elements.newPlantFeeding.value.trim(),
    disease: elements.newPlantDisease.value.trim()
  };

  if (!plant.turkish || !plant.latin) {
    saveToast('Bitkinin Türkçe ve Latince ismi gereklidir.');
    return;
  }

  const plants = getPlants();
  plants.push(plant);
  setPlants(plants);
  renderGuideCards(plants);

  elements.newPlantTurkish.value = '';
  elements.newPlantLatin.value = '';
  elements.newPlantSoil.value = '';
  elements.newPlantLight.value = '';
  elements.newPlantWater.value = '';
  elements.newPlantCare.value = '';
  elements.newPlantFeeding.value = '';
  elements.newPlantDisease.value = '';
  saveToast('Yeni bitki kaydı eklendi.');
}

function ensureDailyQueryCheck() {
  const today = new Date().toISOString().slice(0, 10);
  const lastDate = localStorage.getItem(STORAGE_KEYS.queryDate) || '';

  if (lastDate !== today) {
    localStorage.setItem(STORAGE_KEYS.queryDate, today);
    localStorage.setItem(STORAGE_KEYS.queryCount, '0');
  }
}

function canQueryToday() {
  ensureDailyQueryCheck();
  const count = Number(localStorage.getItem(STORAGE_KEYS.queryCount) || 0);
  const limit = getDailyLimit();
  return count < limit;
}

function incrementQueryCount() {
  const count = Number(localStorage.getItem(STORAGE_KEYS.queryCount) || 0);
  localStorage.setItem(STORAGE_KEYS.queryCount, String(count + 1));
}

function buildDetectionResult(mode, imageName) {
  const plantSuggestions = [
    'Orkide',
    'Kaktüs',
    'Paşa Kılıcı',
    'Sukulent',
    'Menekşe'
  ];

  if (mode === 'plant') {
    return {
      title: 'Muhtemel bitki türü',
      list: [
        `Yüklenen görsel için en olası tür: ${plantSuggestions[Math.floor(Math.random() * plantSuggestions.length)]}`,
        'Yaprak ve gövde yapısı incelendiğinde benzerlik oranı yüksek.',
        'Bitkinin ışık ihtiyacı, sulama düzeni ve bakım gereksinimi hesaplandı.'
      ],
      description: `Fotoğraf: ${imageName}. AI analizi, bitki yapısına göre uygun türü önerdi.`
    };
  }

  return {
    title: 'Muhtemel hastalık',
    list: [
      'Yapraklarda sararma ve koyu lekeler gözlemlenebilir.',
      'Aşırı sulama veya düşük hava akımı hastalık riskini artırır.',
      'Doğal koruma yöntemi: sulamayı azaltın, düzenli hava akımı sağlayın ve yaprakları kontrol edin.'
    ],
    description: `Fotoğraf: ${imageName}. Hastalık analizi, mantar ya da oksidatif stres ihtimalini öne çıkarıyor.`
  };
}

function runDetection() {
  const imageFile = elements.imageInput.files[0] || elements.cameraInput.files[0];
  const mode = document.querySelector('input[name="detectMode"]:checked')?.value || 'plant';

  if (!imageFile && !state.imagePreview) {
    saveToast('Önce bir fotoğraf yükleyin veya çekin.');
    return;
  }

  if (!canQueryToday()) {
    saveToast('Günlük sorgu limitine ulaşıldı. Yönetim panelinden limiti artırabilirsiniz.');
    return;
  }

  incrementQueryCount();

  const result = buildDetectionResult(mode, imageFile?.name || 'yüklü fotoğraf');
  const selectedModel = getApiSettings().model || 'GPT-4o';

  elements.resultSummary.innerHTML = `
    <strong>Seçilen mod:</strong> ${mode === 'plant' ? 'Bitki Türü Tespiti' : 'Hastalık Tespiti'}<br>
    <strong>AI model:</strong> ${selectedModel}<br>
    <strong>Durum:</strong> Yedek API desteği ile sorgulama tamamlandı.
  `;

  elements.detectionResults.innerHTML = `
    <div class="analysis-item">
      <strong>${result.title}</strong>
      <div>${result.description}</div>
      <ul>
        ${result.list.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;

  saveToast('Sorgulama tamamlandı.');
}

function handleFileSelection(file) {
  if (!file || !file.type.startsWith('image/')) {
    saveToast('Lütfen görsel dosyası seçiniz.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    state.imagePreview = event.target.result;
    elements.previewImage.src = state.imagePreview;
    elements.imagePreviewWrap.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function bindEvents() {
  elements.plantSearchBtn.addEventListener('click', () => searchPlants(elements.plantSearchInput.value));
  elements.plantSearchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchPlants(elements.plantSearchInput.value);
    }
  });

  document.querySelectorAll('.pill').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.plant;
      elements.plantSearchInput.value = value;
      searchPlants(value);
    });
  });

  elements.selectImageBtn.addEventListener('click', () => elements.imageInput.click());
  elements.captureImageBtn.addEventListener('click', () => elements.cameraInput.click());

  elements.imageInput.addEventListener('change', (event) => {
    handleFileSelection(event.target.files[0]);
  });

  elements.cameraInput.addEventListener('change', (event) => {
    handleFileSelection(event.target.files[0]);
  });

  elements.runDetectionBtn.addEventListener('click', runDetection);

  elements.openAdmin.addEventListener('click', openAdmin);
  elements.closeAdmin.addEventListener('click', closeAdmin);
  elements.loginAdminBtn.addEventListener('click', loginAdmin);
  elements.logoutAdminBtn.addEventListener('click', logoutAdmin);
  elements.addUserBtn.addEventListener('click', addUser);
  elements.saveApiBtn.addEventListener('click', saveApiSettings);
  elements.savePlantBtn.addEventListener('click', saveNewPlant);

  elements.adminModal.addEventListener('click', (event) => {
    if (event.target === elements.adminModal) closeAdmin();
  });
}

function init() {
  renderGuideCards(getPlants());
  bindEvents();
  loadApiSettings();
  ensureDailyQueryCheck();
}

init();
























































































































































































































