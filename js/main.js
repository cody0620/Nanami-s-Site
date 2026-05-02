/* ============================================
   七海網 main.js
   功能：輪播 / 罐子計時 / 相簿燈箱 / 購物車 / 今日小語
   ============================================ */

// ====== ▼ 可修改設定區（請依需求修改下面的日期 / 商品 / 語錄 / 連結） ▼ ======

// 七海生日（出生天數從這天開始算起）
const NANAMI_BIRTHDAY = '2022-11-16';
// 七海成為家人的日子
const NANAMI_FAMILY_DAY = '2023-01-20';

// 罐子視覺滿格參考天數（fill 高度比例 = 天數 / 此值，最大 100%）
const JAR_VISUAL_MAX = 5000;

// 商品清單（如要新增/修改商品，調整下列陣列即可）
const PRODUCTS = [
    { id: 'bath',     price: 10,   img: 'images/shop/bath.png' },
    { id: 'paper',    price: 79,   img: 'images/shop/paper.png' },
    { id: 'meal',     price: 8,    img: 'images/shop/meal.png' },
    { id: 'baseball', price: 25,   img: 'images/shop/baseball_ball.png' },
    { id: 'sheep',    price: 550,  img: 'images/shop/sheep.png' },
    { id: 'sanpo',    price: 100,  img: 'images/shop/pet_dog_sanpo_man.png' },
    { id: 'drug',     price: 2000, img: 'images/shop/durg.png' },
    { id: 'hug',      price: 100,  img: 'images/shop/hug.png' },
    { id: 'light',    price: 0,    img: 'images/shop/light.jpg', limit: 1 }
];

// 優惠碼（套用後總金額為 0）
const PROMO_CODE = '#愛七海';

// 七海每日小語（依當天日期決定，同一天顯示同一句）
const DAILY_QUOTES = [
    '牛肉乾的夢，又長了 3 公分。',
    '用最無辜的臉，騙到了一塊肉干。',
    '今天也撿到了棒球。',
    '今天要去哪裡玩呢。',
    '好想睡覺...。',
    '肚子好餓。',
    '想找朋友玩...。',
    '昨天夢到吃不完的潔牙骨。',
    '今天也會出去玩嗎。',
    '不喜歡雨天。',
    '不要給我穿衣服。',
    '不想洗澡。'
];

// 相簿圖片（最多 8 張，少於 8 張會顯示腳印佔位圖）
const GALLERY_IMAGES = [
    'images/gallery/G1.jpg',
    'images/gallery/G2.jpg',
    'images/gallery/G3.jpg',
    'images/gallery/G4.jpg',
    'images/gallery/G5.jpg',
    'images/gallery/G6.jpg',
    'images/gallery/G7.jpg',
    'images/gallery/G8.jpg'

    // 可繼續加：'images/gallery/G3.jpg', ...（最多 8 張）
];
const GALLERY_MAX = 8;

// 訂閱方案（價格與功能數量；文案在 I18N 中以 plan.{id}.* 為 key）
const PLANS = [
    { id: 'free',    tier: 'free',    price: 0,    ribbon: 'sub.ribbonDefault', featureCount: 3 },
    { id: 'lite',    tier: 'lite',    price: 30,                                 featureCount: 3 },
    { id: 'plus',    tier: 'plus',    price: 299,  ribbon: 'sub.ribbonHot', featured: true, featureCount: 5 },
    { id: 'premium', tier: 'premium', price: 8190,                                featureCount: 8 }
];
const SUB_KEY = 'nanami_subscription_v1';
const LANG_KEY = 'nanami_lang_v1';

// 多語系（如要新增/修改翻譯，請改下面的 I18N 物件）
const I18N = {
    zh: {
        'nav.brand': '七海網',
        'nav.timer': '時光罐',
        'nav.gallery': '相簿',
        'nav.shop': '購物',
        'nav.map': '氣味地圖',
        'nav.subscribe': '訂閱',
        'nav.links': '連結',
        'hero.title': '七海的網站',
        'hero.sub': "welcome to nanami's little world",
        'timer.eyebrow': 'days & days',
        'timer.title': '七海的時光罐',
        'timer.desc': '每一天，都是一塊小骨頭，一點一點疊滿幸福。',
        'timer.unit': '天',
        'timer.birth': '出生天數',
        'timer.family': '成為家人',
        'gallery.eyebrow': 'memories',
        'gallery.title': '七海精選相簿',
        'gallery.desc': '收藏每一個值得停下來的瞬間。',
        'gallery.placeholder': 'coming soon',
        'shop.eyebrow': "nanami's shop",
        'shop.title': '七海購物',
        'shop.desc': '把對七海的愛，輕輕放進購物籃。',
        'shop.add': '加入',
        'shop.added': '已加入',
        'shop.limit': '限購 {n}',
        'cart.title': '購物籃',
        'cart.empty': '購物籃還是空空的',
        'cart.promoPh': '輸入優惠碼',
        'cart.apply': '套用',
        'cart.total': '總金額',
        'cart.checkout': '結帳',
        'cart.promoOk': '優惠碼已套用！七海愛你 ♡',
        'cart.promoFail': '優惠碼好像不對喔...',
        'cart.added': '已將「{name}」放入購物籃 ♡',
        'cart.limitMsg': '「{name}」限購 {n} 個喔 ♡',
        'cart.checkoutMsg': '給七海的愛心已經在路上了 💌',
        'map.eyebrow': "today's scent",
        'map.title': '氣味地圖',
        'map.desc': '今天的七海，正想著什麼呢？',
        'sub.eyebrow': 'subscribe',
        'sub.title': '訂閱七海的服務',
        'sub.desc': '選一個適合你的方案，加入七海的小宇宙。',
        'sub.current': '＊ 目前已選擇方案：',
        'sub.subscribe': '訂閱此方案',
        'sub.useFree': '使用此方案',
        'sub.subscribed': '已訂閱',
        'sub.tagSubscribed': '✓ 已訂閱',
        'sub.month': '/ 月',
        'sub.free': '免費',
        'sub.ribbonDefault': '預設',
        'sub.ribbonHot': '最熱門',
        'plan.free.name': '免費方案',
        'plan.lite.name': '七海-Lite',
        'plan.plus.name': '七海-Plus',
        'plan.premium.name': '七海-Premium',
        'modal.thanks': '感謝你訂閱七海{thanks}',
        'plan.free.thanks': '免費方案',
        'plan.lite.thanks': '-Lite 方案',
        'plan.plus.thanks': '-Plus 方案',
        'plan.premium.thanks': '-Premium 方案',
        'modal.priceLine': '方案費用 ${price} / 月',
        'modal.freeLine': '免費方案不需付款，要直接套用嗎？',
        'modal.pay': '付款',
        'modal.refuse': '拒絕付款',
        'modal.fakeTitle': '騙你的 ♡',
        'modal.fakeDesc': '七海不想要任何人的錢。\n但七海記住你的心意了。',
        'modal.cancelTitle': '已經取消訂閱',
        'modal.cancelDesc': '沒關係，七海還是愛你 🐾',
        'modal.ok': '好',
        'links.eyebrow': 'find nanami',
        'links.title': '在別的地方找七海',
        'links.fb': '七海臉書',
        'links.tarot': '七海塔羅 ・ AI 聊天',
        'footer': '© 七海網 ｜ 用愛與肉肉建造',
        'plan.free.f1': '瀏覽七海網站',
        'plan.free.f2': '體驗七海購物',
        'plan.free.f3': '觀賞七海美照',
        'plan.lite.f1': '先前等級的全部權限',
        'plan.lite.f2': '有限制存取柴犬塔羅',
        'plan.lite.f3': '七海會跟你玩',
        'plan.plus.f1': '先前等級的全部權限',
        'plan.plus.f2': '更多塔羅次數',
        'plan.plus.f3': '使用 AI 聊天',
        'plan.plus.f4': '七海年賀卡',
        'plan.plus.f5': '七海的認可',
        'plan.premium.f1': '先前等級的全部權限',
        'plan.premium.f2': '無限制的塔羅牌使用',
        'plan.premium.f3': '無限制的聊天',
        'plan.premium.f4': '七海電子月報',
        'plan.premium.f5': '七海會愛你',
        'plan.premium.f6': '七海舔你',
        'plan.premium.f7': '可以餵七海',
        'plan.premium.f8': '跟七海見面（聯繫客服約時間）',
        'quotes': [
            '牛肉乾的夢，又長了 3 公分。',
            '用最無辜的臉，騙到了一塊肉干。',
            '今天也撿到了棒球。',
            '今天要去哪裡玩呢。',
            '好想睡覺...。',
            '肚子好餓。',
            '想找朋友玩...。',
            '昨天夢到吃不完的潔牙骨。',
            '今天也會出去玩嗎。',
            '不喜歡雨天。',
            '不要給我穿衣服。',
            '不想洗澡。'
        ],
        'product.bath': '洗澡',
        'product.paper': '報紙',
        'product.meal': '肉乾',
        'product.baseball': '棒球',
        'product.sheep': '洋妹妹',
        'product.sanpo': '散步',
        'product.drug': '驅蟲藥',
        'product.hug': '抱抱',
        'product.light': '光'
    },
    en: {
        'nav.brand': "Nanami's Site",
        'nav.timer': 'Timer',
        'nav.gallery': 'Gallery',
        'nav.shop': 'Shop',
        'nav.map': 'Scent Map',
        'nav.subscribe': 'Subscribe',
        'nav.links': 'Links',
        'hero.title': "Nanami's Site",
        'hero.sub': "welcome to nanami's little world",
        'timer.eyebrow': 'days & days',
        'timer.title': "Nanami's Time Jars",
        'timer.desc': 'Each day is a little bone, slowly stacking up happiness.',
        'timer.unit': 'days',
        'timer.birth': 'Days alive',
        'timer.family': 'Days as family',
        'gallery.eyebrow': 'memories',
        'gallery.title': "Nanami's Photo Album",
        'gallery.desc': 'Collecting every moment worth pausing for.',
        'gallery.placeholder': 'coming soon',
        'shop.eyebrow': "nanami's shop",
        'shop.title': "Nanami's Shop",
        'shop.desc': "Place your love for Nanami gently into the basket.",
        'shop.add': 'Add',
        'shop.added': 'Added',
        'shop.limit': 'Limit {n}',
        'cart.title': 'Basket',
        'cart.empty': 'Your basket is empty',
        'cart.promoPh': 'Enter promo code',
        'cart.apply': 'Apply',
        'cart.total': 'Total',
        'cart.checkout': 'Checkout',
        'cart.promoOk': 'Code applied! Nanami loves you ♡',
        'cart.promoFail': "Hmm, that code doesn't seem right...",
        'cart.added': '"{name}" added to basket ♡',
        'cart.limitMsg': '"{name}" is limited to {n}',
        'cart.checkoutMsg': 'Your love for Nanami is on its way 💌',
        'map.eyebrow': "today's scent",
        'map.title': 'Scent Map',
        'map.desc': 'What is Nanami thinking about today?',
        'sub.eyebrow': 'subscribe',
        'sub.title': "Subscribe to Nanami",
        'sub.desc': "Choose a plan and join Nanami's little universe.",
        'sub.current': '* Current plan: ',
        'sub.subscribe': 'Subscribe',
        'sub.useFree': 'Use this plan',
        'sub.subscribed': 'Subscribed',
        'sub.tagSubscribed': '✓ Subscribed',
        'sub.month': '/ mo',
        'sub.free': 'Free',
        'sub.ribbonDefault': 'Default',
        'sub.ribbonHot': 'Most Popular',
        'plan.free.name': 'Free Plan',
        'plan.lite.name': 'Nanami-Lite',
        'plan.plus.name': 'Nanami-Plus',
        'plan.premium.name': 'Nanami-Premium',
        'modal.thanks': 'Thanks for subscribing to Nanami {thanks}',
        'plan.free.thanks': 'Free Plan',
        'plan.lite.thanks': '-Lite',
        'plan.plus.thanks': '-Plus',
        'plan.premium.thanks': '-Premium',
        'modal.priceLine': 'Plan fee: ${price} / month',
        'modal.freeLine': 'The free plan needs no payment. Apply it directly?',
        'modal.pay': 'Pay',
        'modal.refuse': 'Refuse',
        'modal.fakeTitle': 'Just kidding ♡',
        'modal.fakeDesc': "Nanami doesn't want anyone's money.\nBut your kindness is remembered.",
        'modal.cancelTitle': 'Subscription cancelled',
        'modal.cancelDesc': "It's okay — Nanami still loves you 🐾",
        'modal.ok': 'OK',
        'links.eyebrow': 'find nanami',
        'links.title': 'Find Nanami elsewhere',
        'links.fb': "Nanami's Facebook",
        'links.tarot': 'Nanami Tarot ・ AI Chat',
        'footer': '© Nanami Web ｜ built with love & meatballs',
        'plan.free.f1': "Browse Nanami's site",
        'plan.free.f2': "Try Nanami's shop",
        'plan.free.f3': "Enjoy Nanami's photos",
        'plan.lite.f1': 'All previous tier benefits',
        'plan.lite.f2': 'Limited Shiba tarot access',
        'plan.lite.f3': 'Nanami plays with you',
        'plan.plus.f1': 'All previous tier benefits',
        'plan.plus.f2': 'More tarot draws',
        'plan.plus.f3': 'AI chat access',
        'plan.plus.f4': 'Nanami New Year card',
        'plan.plus.f5': "Nanami's approval",
        'plan.premium.f1': 'All previous tier benefits',
        'plan.premium.f2': 'Unlimited tarot',
        'plan.premium.f3': 'Unlimited chat',
        'plan.premium.f4': "Nanami's monthly newsletter",
        'plan.premium.f5': 'Nanami loves you',
        'plan.premium.f6': 'Nanami licks you',
        'plan.premium.f7': 'You can feed Nanami',
        'plan.premium.f8': 'Meet Nanami (contact support to schedule)',
        'quotes': [
            'My beef-jerky dream grew another 3 cm.',
            'With my most innocent face, I scored a piece of jerky.',
            'Found another baseball today.',
            'Where shall we go play today?',
            'So sleepy...',
            'My tummy is so empty.',
            'Want to find a friend to play...',
            'Last night I dreamed of endless dental sticks.',
            'Are we going out to play today?',
            'I do not like rainy days.',
            'Please do not put clothes on me.',
            "I don't want a bath."
        ],
        'product.bath': 'Bath',
        'product.paper': 'Newspaper',
        'product.meal': 'Jerky',
        'product.baseball': 'Baseball',
        'product.sheep': 'Sheep Doll',
        'product.sanpo': 'Walk',
        'product.drug': 'Deworming Med',
        'product.hug': 'Hug',
        'product.light': 'Light'
    },
    ja: {
        'nav.brand': '七海ウェブ',
        'nav.timer': '時のジャー',
        'nav.gallery': 'アルバム',
        'nav.shop': 'ショップ',
        'nav.map': '匂いの地図',
        'nav.subscribe': 'サブスク',
        'nav.links': 'リンク',
        'hero.title': '七海のウェブサイト',
        'hero.sub': "welcome to nanami's little world",
        'timer.eyebrow': 'days & days',
        'timer.title': '七海の時間ジャー',
        'timer.desc': '一日は小さなお骨。少しずつ幸せが積み上がる。',
        'timer.unit': '日',
        'timer.birth': '生まれてからの日数',
        'timer.family': '家族になった日数',
        'gallery.eyebrow': 'memories',
        'gallery.title': '七海セレクトアルバム',
        'gallery.desc': '立ち止まる価値のある瞬間を集めて。',
        'gallery.placeholder': 'coming soon',
        'shop.eyebrow': "nanami's shop",
        'shop.title': '七海ショップ',
        'shop.desc': '七海への愛をそっとかごに入れて。',
        'shop.add': '追加',
        'shop.added': '追加済',
        'shop.limit': '限定 {n}',
        'cart.title': 'かご',
        'cart.empty': 'かごは空っぽ',
        'cart.promoPh': 'クーポンコードを入力',
        'cart.apply': '適用',
        'cart.total': '合計',
        'cart.checkout': 'お会計',
        'cart.promoOk': 'クーポン適用！七海はあなたが大好き ♡',
        'cart.promoFail': 'コードが違うみたい...',
        'cart.added': '「{name}」をかごに入れました ♡',
        'cart.limitMsg': '「{name}」は{n}個までだよ ♡',
        'cart.checkoutMsg': '七海への愛、届けに行ってるよ 💌',
        'map.eyebrow': "today's scent",
        'map.title': '匂いの地図',
        'map.desc': '今日の七海は何を考えているのかな？',
        'sub.eyebrow': 'subscribe',
        'sub.title': '七海のサービスをサブスク',
        'sub.desc': 'ぴったりのプランを選んで、七海の小宇宙へ。',
        'sub.current': '＊ 現在のプラン：',
        'sub.subscribe': 'このプランに登録',
        'sub.useFree': 'このプランを使う',
        'sub.subscribed': '登録済み',
        'sub.tagSubscribed': '✓ 登録済み',
        'sub.month': '/ 月',
        'sub.free': '無料',
        'sub.ribbonDefault': 'デフォルト',
        'sub.ribbonHot': '人気No.1',
        'plan.free.name': '無料プラン',
        'plan.lite.name': '七海-Lite',
        'plan.plus.name': '七海-Plus',
        'plan.premium.name': '七海-Premium',
        'modal.thanks': '七海{thanks}にご登録ありがとう',
        'plan.free.thanks': '無料プラン',
        'plan.lite.thanks': '-Lite プラン',
        'plan.plus.thanks': '-Plus プラン',
        'plan.premium.thanks': '-Premium プラン',
        'modal.priceLine': 'プラン料金 ${price} / 月',
        'modal.freeLine': '無料プランは支払い不要。そのまま適用しますか？',
        'modal.pay': '支払う',
        'modal.refuse': '支払わない',
        'modal.fakeTitle': 'なんてね ♡',
        'modal.fakeDesc': '七海は誰のお金もいらないよ。\nでもあなたの気持ちは覚えたよ。',
        'modal.cancelTitle': 'サブスクをキャンセルしました',
        'modal.cancelDesc': '大丈夫、七海はあなたが大好き 🐾',
        'modal.ok': 'OK',
        'links.eyebrow': 'find nanami',
        'links.title': 'ほかの場所で七海を探す',
        'links.fb': '七海フェイスブック',
        'links.tarot': '七海タロット ・ AIチャット',
        'footer': '© 七海ウェブ ｜ 愛とお肉でできています',
        'plan.free.f1': '七海ウェブを閲覧',
        'plan.free.f2': '七海ショップを体験',
        'plan.free.f3': '七海の写真を鑑賞',
        'plan.lite.f1': '前のレベルの全権限',
        'plan.lite.f2': '柴犬タロットの制限付きアクセス',
        'plan.lite.f3': '七海が遊んでくれる',
        'plan.plus.f1': '前のレベルの全権限',
        'plan.plus.f2': 'より多くのタロット回数',
        'plan.plus.f3': 'AIチャットを利用',
        'plan.plus.f4': '七海年賀状',
        'plan.plus.f5': '七海の認め',
        'plan.premium.f1': '前のレベルの全権限',
        'plan.premium.f2': 'タロット使い放題',
        'plan.premium.f3': 'チャット使い放題',
        'plan.premium.f4': '七海電子月報',
        'plan.premium.f5': '七海があなたを愛する',
        'plan.premium.f6': '七海があなたを舐める',
        'plan.premium.f7': '七海にエサをあげられる',
        'plan.premium.f8': '七海と会える（お問い合わせで日程調整）',
        'quotes': [
            '牛肉ジャーキーの夢が、また3センチ伸びた。',
            '一番無邪気な顔で、ジャーキーを一切れゲット。',
            '今日も野球ボールを拾った。',
            '今日はどこへ遊びに行こうかな。',
            'すごく眠い…。',
            'お腹がぺこぺこ。',
            '友達と遊びたいな…。',
            '昨日、食べきれない歯磨きガムの夢を見た。',
            '今日も外に出るの？',
            '雨の日は嫌い。',
            '服を着せないで。',
            'お風呂に入りたくない。'
        ],
        'product.bath': 'お風呂',
        'product.paper': '新聞紙',
        'product.meal': 'ジャーキー',
        'product.baseball': '野球ボール',
        'product.sheep': '羊さん',
        'product.sanpo': 'お散歩',
        'product.drug': '虫よけ薬',
        'product.hug': 'ぎゅっ',
        'product.light': '光'
    }
};

const LANG_LABEL = { zh: '中文', en: 'English', ja: '日本語' };

// ====== ▲ 設定區結束 ▲ ======


/* -------------------- i18n -------------------- */
let currentLang = localStorage.getItem(LANG_KEY) || 'zh';
if (!I18N[currentLang]) currentLang = 'zh';

function t(key, params) {
    let str = (I18N[currentLang] && I18N[currentLang][key]) || (I18N.zh[key]) || key;
    if (params && typeof str === 'string') {
        Object.keys(params).forEach(k => {
            str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
        });
    }
    return str;
}

function applyI18nToDom() {
    document.documentElement.lang = currentLang === 'zh' ? 'zh-Hant' : currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const v = t(key);
        if (typeof v === 'string') el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const v = t(key);
        if (typeof v === 'string') el.setAttribute('placeholder', v);
    });
}

function setLang(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyI18nToDom();
    // 重新渲染動態內容
    document.getElementById('langCurrent').textContent = LANG_LABEL[lang];
    document.querySelectorAll('#langMenu button').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
    });
    renderShop();
    renderCart();
    renderPlans();
    initDailyQuote();
}

function initLangSwitch() {
    const wrap = document.getElementById('langSwitch');
    const btn = document.getElementById('langBtn');
    btn.addEventListener('click', e => {
        e.stopPropagation();
        wrap.classList.toggle('open');
        btn.setAttribute('aria-expanded', wrap.classList.contains('open'));
    });
    document.addEventListener('click', e => {
        if (!wrap.contains(e.target)) {
            wrap.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
    document.querySelectorAll('#langMenu button').forEach(b => {
        b.addEventListener('click', () => {
            setLang(b.dataset.lang);
            wrap.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
    document.getElementById('langCurrent').textContent = LANG_LABEL[currentLang];
    document.querySelectorAll('#langMenu button').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === currentLang);
    });
}


/* -------------------- 工具函式 -------------------- */

// 取得「現在」在台灣時區（UTC+8）的 Date 物件
function nowTaiwan() {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utcMs + 8 * 3600 * 1000);
}

// 計算自某日起的天數（以台北 00:00 為界）
function daysSince(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const start = Date.UTC(y, m - 1, d);
    const tw = nowTaiwan();
    const today = Date.UTC(tw.getFullYear(), tw.getMonth(), tw.getDate());
    return Math.floor((today - start) / 86400000);
}

// 距離下一個台北 00:00 的毫秒數
function msUntilNextTaipeiMidnight() {
    const tw = nowTaiwan();
    const next = new Date(Date.UTC(tw.getFullYear(), tw.getMonth(), tw.getDate() + 1));
    const diff = next.getTime() - tw.getTime();
    return diff > 0 ? diff : 1000;
}


/* -------------------- 輪播 -------------------- */
function initCarousel() {
    const slides = document.querySelectorAll('.slide');
    const dotsBox = document.getElementById('dots');
    if (!slides.length || !dotsBox) return;

    let idx = 0;
    slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `第 ${i + 1} 張`);
        d.addEventListener('click', () => go(i));
        dotsBox.appendChild(d);
    });
    const dots = dotsBox.querySelectorAll('.dot');

    function go(n) {
        slides[idx].classList.remove('active');
        dots[idx].classList.remove('active');
        idx = (n + slides.length) % slides.length;
        slides[idx].classList.add('active');
        dots[idx].classList.add('active');
    }

    let timer = setInterval(() => go(idx + 1), 4000);

    // 滑鼠移入暫停
    const carousel = document.getElementById('carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', () => {
        timer = setInterval(() => go(idx + 1), 4000);
    });
}


/* -------------------- 罐子（出生 / 成為家人） -------------------- */
function bonePath(x, y, scale = 1, rotate = 0) {
    // 一個小骨頭的 SVG <g>
    const t = `translate(${x} ${y}) rotate(${rotate}) scale(${scale})`;
    return `<g transform="${t}" opacity="0.92">
        <ellipse cx="-9" cy="-3" rx="5" ry="4.2" fill="#FFF6E6" stroke="#C4A37C" stroke-width="1"/>
        <ellipse cx="-9" cy="3"  rx="5" ry="4.2" fill="#FFF6E6" stroke="#C4A37C" stroke-width="1"/>
        <rect x="-9" y="-3" width="18" height="6" fill="#FFF6E6" stroke="#C4A37C" stroke-width="1"/>
        <ellipse cx="9"  cy="-3" rx="5" ry="4.2" fill="#FFF6E6" stroke="#C4A37C" stroke-width="1"/>
        <ellipse cx="9"  cy="3"  rx="5" ry="4.2" fill="#FFF6E6" stroke="#C4A37C" stroke-width="1"/>
    </g>`;
}

function fillJar(svgFillId, bonesId, days) {
    const fill = document.getElementById(svgFillId);
    const bones = document.getElementById(bonesId);
    if (!fill || !bones) return;

    const ratio = Math.min(days / JAR_VISUAL_MAX, 1);
    // 罐子內部 y 範圍約 60~245（高 185）
    const top = 60;
    const bottom = 245;
    const innerH = bottom - top;
    const fillH = innerH * ratio;
    const fillY = bottom - fillH;

    // 動畫起點
    requestAnimationFrame(() => {
        fill.setAttribute('y', fillY);
        fill.setAttribute('height', fillH);
    });

    // 散落骨頭：根據填充高度推算數量
    const targetBones = Math.round(ratio * 24); // 滿格約 24 顆
    let html = '';
    // 用偽隨機（以 days 為種子），確保視覺穩定
    let seed = days || 1;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    const placed = [];
    for (let i = 0; i < targetBones; i++) {
        // 在 fill 區內亂放骨頭
        const yMargin = 12;
        const minY = fillY + yMargin;
        const maxY = bottom - yMargin;
        if (maxY <= minY) break;
        const x = 60 + rnd() * 80;
        const y = minY + rnd() * (maxY - minY);
        const rot = (rnd() - 0.5) * 60;
        const sc = 0.55 + rnd() * 0.25;
        placed.push(bonePath(x, y, sc, rot));
    }
    bones.innerHTML = placed.join('');
}

function updateJars() {
    const birthDays = daysSince(NANAMI_BIRTHDAY);
    const familyDays = daysSince(NANAMI_FAMILY_DAY);

    document.getElementById('numBirth').textContent = birthDays.toLocaleString();
    document.getElementById('numFamily').textContent = familyDays.toLocaleString();

    fillJar('fillBirth', 'bonesBirth', birthDays);
    fillJar('fillFamily', 'bonesFamily', familyDays);
}

function initTimers() {
    updateJars();
    // 每天台北 00:00 自動更新
    function scheduleNext() {
        setTimeout(() => {
            updateJars();
            scheduleNext();
        }, msUntilNextTaipeiMidnight());
    }
    scheduleNext();
}


/* -------------------- 相簿 + 燈箱 -------------------- */
function initGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    const items = [];
    for (let i = 0; i < GALLERY_MAX; i++) {
        const src = GALLERY_IMAGES[i];
        if (src) {
            items.push(`
                <div class="gallery-item" data-src="${src}">
                    <img src="${src}" alt="七海相片 ${i + 1}" loading="lazy">
                </div>
            `);
        } else {
            items.push(`
                <div class="gallery-item placeholder">
                    <div class="gallery-placeholder">
                        <i class="fa-solid fa-paw"></i>
                        <span>${t('gallery.placeholder')}</span>
                    </div>
                </div>
            `);
        }
    }
    grid.innerHTML = items.join('');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');

    grid.addEventListener('click', e => {
        const item = e.target.closest('.gallery-item');
        if (!item || item.classList.contains('placeholder')) return;
        const src = item.dataset.src;
        if (!src) return;
        lightboxImg.src = src;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}


/* -------------------- 購物 + 購物車 -------------------- */
const CART_KEY = 'nanami_cart_v1';
let cart = loadCart();
let promoApplied = false;

function loadCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}
function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

let shopBound = false;
function productName(id) { return t('product.' + id); }
function planName(id) { return t('plan.' + id + '.name'); }
function planThanks(id) { return t('plan.' + id + '.thanks'); }
function planFeatures(id) {
    const p = PLANS.find(x => x.id === id);
    if (!p) return [];
    const out = [];
    for (let i = 1; i <= p.featureCount; i++) out.push(t(`plan.${id}.f${i}`));
    return out;
}

function renderShop() {
    const grid = document.getElementById('shopGrid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(p => {
        const name = productName(p.id);
        return `
        <div class="shop-card">
            <div class="shop-img-wrap">
                <img src="${p.img}" alt="${name}" loading="lazy">
            </div>
            ${p.limit ? `<span class="shop-tag">${t('shop.limit', { n: p.limit })}</span>` : ''}
            <h3 class="shop-name">${name}</h3>
            <div class="shop-price">$${p.price}</div>
            <button class="shop-add" data-id="${p.id}">
                <i class="fa-solid fa-plus"></i> ${t('shop.add')}
            </button>
        </div>`;
    }).join('');

    if (!shopBound) {
        grid.addEventListener('click', e => {
            const btn = e.target.closest('.shop-add');
            if (!btn || btn.classList.contains('disabled')) return;
            addToCart(btn.dataset.id);
        });
        shopBound = true;
    }

    refreshAddButtons();
}

function refreshAddButtons() {
    document.querySelectorAll('.shop-add').forEach(btn => {
        const id = btn.dataset.id;
        const product = PRODUCTS.find(p => p.id === id);
        const qty = cart[id] || 0;
        if (product.limit && qty >= product.limit) {
            btn.classList.add('disabled');
            btn.innerHTML = `<i class="fa-solid fa-check"></i> ${t('shop.added')}`;
        } else {
            btn.classList.remove('disabled');
            btn.innerHTML = `<i class="fa-solid fa-plus"></i> ${t('shop.add')}`;
        }
    });
}

function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    const name = productName(id);
    const current = cart[id] || 0;
    if (product.limit && current >= product.limit) {
        showToast(t('cart.limitMsg', { name, n: product.limit }));
        return;
    }
    cart[id] = current + 1;
    promoApplied = false;
    saveCart();
    renderCart();
    refreshAddButtons();
    bumpBadge();
    showToast(t('cart.added', { name }));
}

function changeQty(id, delta) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    const next = (cart[id] || 0) + delta;
    if (next <= 0) {
        delete cart[id];
    } else if (product.limit && next > product.limit) {
        showToast(t('cart.limitMsg', { name: productName(id), n: product.limit }));
        return;
    } else {
        cart[id] = next;
    }
    promoApplied = false;
    saveCart();
    renderCart();
    refreshAddButtons();
}

function removeItem(id) {
    delete cart[id];
    promoApplied = false;
    saveCart();
    renderCart();
    refreshAddButtons();
}

function calcTotal() {
    if (promoApplied) return 0;
    return Object.entries(cart).reduce((sum, [id, qty]) => {
        const p = PRODUCTS.find(x => x.id === id);
        return sum + (p ? p.price * qty : 0);
    }, 0);
}

function renderCart() {
    const body = document.getElementById('cartBody');
    const total = document.getElementById('cartTotal');
    const badge = document.getElementById('cartBadge');
    const ids = Object.keys(cart);
    const count = ids.reduce((n, id) => n + cart[id], 0);

    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';

    if (!ids.length) {
        body.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-bone"></i>
                <p>${t('cart.empty')}</p>
            </div>
        `;
    } else {
        body.innerHTML = ids.map(id => {
            const p = PRODUCTS.find(x => x.id === id);
            if (!p) return '';
            const qty = cart[id];
            const name = productName(id);
            return `
                <div class="cart-item">
                    <div class="cart-item-img"><img src="${p.img}" alt="${name}"></div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${name}</div>
                        <div class="cart-item-price">$${p.price} × ${qty}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" data-act="dec" data-id="${id}" aria-label="減少">−</button>
                        <span class="qty-num">${qty}</span>
                        <button class="qty-btn" data-act="inc" data-id="${id}" aria-label="增加">＋</button>
                        <button class="cart-item-remove" data-act="rm" data-id="${id}" aria-label="移除"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `;
        }).join('');
    }

    total.textContent = '$' + calcTotal().toLocaleString();

    document.getElementById('checkoutBtn').disabled = !ids.length;
}

function bumpBadge() {
    const badge = document.getElementById('cartBadge');
    badge.classList.remove('bump');
    void badge.offsetWidth;
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 350);
}

function initCart() {
    renderShop();
    renderCart();

    const panel = document.getElementById('cartPanel');
    const overlay = document.getElementById('cartOverlay');
    const openBtn = document.getElementById('cartBtn');
    const closeBtn = document.getElementById('cartClose');

    function open() {
        panel.classList.add('active');
        overlay.classList.add('active');
        panel.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && panel.classList.contains('active')) close();
    });

    // 購物車內的 +/- / 刪除
    document.getElementById('cartBody').addEventListener('click', e => {
        const btn = e.target.closest('button[data-act]');
        if (!btn) return;
        const id = btn.dataset.id;
        const act = btn.dataset.act;
        if (act === 'inc') changeQty(id, +1);
        else if (act === 'dec') changeQty(id, -1);
        else if (act === 'rm') removeItem(id);
    });

    // 優惠碼
    const promoInput = document.getElementById('promoInput');
    const promoBtn = document.getElementById('promoBtn');
    const promoMsg = document.getElementById('promoMsg');
    promoBtn.addEventListener('click', () => {
        const v = promoInput.value.trim();
        if (v === PROMO_CODE) {
            promoApplied = true;
            promoMsg.textContent = t('cart.promoOk');
            promoMsg.style.color = 'var(--accent)';
            renderCart();
        } else {
            promoApplied = false;
            promoMsg.textContent = t('cart.promoFail');
            promoMsg.style.color = '#C44';
            renderCart();
        }
    });
    promoInput.addEventListener('input', () => {
        if (promoApplied) {
            promoApplied = false;
            promoMsg.textContent = '';
            renderCart();
        }
    });

    // 結帳
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (!Object.keys(cart).length) return;
        showToast(t('cart.checkoutMsg'), 2400);
        cart = {};
        promoApplied = false;
        promoInput.value = '';
        promoMsg.textContent = '';
        saveCart();
        renderCart();
        refreshAddButtons();
        close();
    });
}


/* -------------------- 今日小語 -------------------- */
function initDailyQuote() {
    const tw = nowTaiwan();
    // 用 yyyy-mm-dd 字串雜湊出 0~11 索引
    const key = `${tw.getFullYear()}-${tw.getMonth() + 1}-${tw.getDate()}`;
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
    const quotes = (I18N[currentLang] && I18N[currentLang].quotes) || I18N.zh.quotes;
    const idx = h % quotes.length;
    const el = document.getElementById('dailyQuote');
    if (el) el.textContent = quotes[idx];
}


/* -------------------- Toast -------------------- */
let toastTimer = null;
function showToast(msg, duration = 2000) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}


/* -------------------- 訂閱方案 -------------------- */
let currentPlan = localStorage.getItem(SUB_KEY) || 'free';

function renderPlans() {
    const grid = document.getElementById('plansGrid');
    if (!grid) return;
    grid.innerHTML = PLANS.map(p => {
        const subscribed = p.id === currentPlan;
        const features = planFeatures(p.id);
        const btnLabel = subscribed
            ? `<i class="fa-solid fa-check"></i> ${t('sub.subscribed')}`
            : (p.price === 0 ? t('sub.useFree') : t('sub.subscribe'));
        return `
        <div class="plan-card ${p.featured ? 'featured' : ''} ${subscribed ? 'subscribed' : ''}" data-id="${p.id}" data-sub-tag="${t('sub.tagSubscribed')}">
            ${p.ribbon ? `<span class="plan-ribbon">${t(p.ribbon)}</span>` : ''}
            <div class="plan-tier">${p.tier}</div>
            <h3 class="plan-name">${planName(p.id)}</h3>
            <div class="plan-price">
                <span class="num">${p.price === 0 ? t('sub.free') : '$' + p.price.toLocaleString()}</span>
                ${p.price === 0 ? '' : `<span class="unit">${t('sub.month')}</span>`}
            </div>
            <div class="plan-divider"></div>
            <ul class="plan-features">
                ${features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <button class="plan-btn" data-id="${p.id}">${btnLabel}</button>
        </div>`;
    }).join('');

    document.getElementById('currentPlanName').textContent = planName(currentPlan);

    grid.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            if (id === currentPlan) return;
            openPlanModal(id);
        });
    });
}

const modal = {
    el: null, title: null, desc: null, actions: null,
    init() {
        this.el = document.getElementById('subscribeModal');
        this.title = document.getElementById('modalTitle');
        this.desc = document.getElementById('modalDesc');
        this.actions = document.getElementById('modalActions');
        document.getElementById('modalClose').addEventListener('click', () => this.close());
        this.el.addEventListener('click', e => { if (e.target === this.el) this.close(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && this.el.classList.contains('active')) this.close(); });
    },
    open() {
        this.el.classList.add('active');
        this.el.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    },
    close() {
        this.el.classList.remove('active');
        this.el.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
};

function openPlanModal(planId) {
    const plan = PLANS.find(p => p.id === planId);
    if (!plan) return;
    modal.title.textContent = t('modal.thanks', { thanks: planThanks(plan.id) });
    modal.desc.textContent = plan.price === 0
        ? t('modal.freeLine')
        : t('modal.priceLine', { price: plan.price.toLocaleString() });
    modal.actions.innerHTML = `
        <button class="modal-btn primary" id="payBtn"><i class="fa-solid fa-credit-card"></i> ${t('modal.pay')}</button>
        <button class="modal-btn ghost" id="refuseBtn">${t('modal.refuse')}</button>
    `;
    document.getElementById('payBtn').addEventListener('click', () => onPay(plan));
    document.getElementById('refuseBtn').addEventListener('click', () => onRefuse(plan));
    modal.open();
}

function showResultModal({ title, desc, planIdToApply }) {
    modal.title.textContent = title;
    modal.desc.textContent = desc;
    modal.actions.innerHTML = `<button class="modal-btn primary" id="okBtn">${t('modal.ok')}</button>`;
    document.getElementById('okBtn').addEventListener('click', () => {
        if (planIdToApply) {
            currentPlan = planIdToApply;
            localStorage.setItem(SUB_KEY, currentPlan);
            renderPlans();
        }
        modal.close();
    });
}

function playKissOverlay() {
    return new Promise(resolve => {
        const overlay = document.getElementById('kissOverlay');
        const audio = document.getElementById('kissAudio');
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        try {
            audio.currentTime = 0;
            const p = audio.play();
            if (p && p.catch) p.catch(() => {});
        } catch (e) {}
        setTimeout(() => {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            try { audio.pause(); } catch (e) {}
            resolve();
        }, 1500);
    });
}

function onPay(plan) {
    modal.close();
    playKissOverlay().then(() => {
        showResultModal({
            title: t('modal.fakeTitle'),
            desc: t('modal.fakeDesc'),
            planIdToApply: plan.id
        });
        modal.open();
    });
}

function onRefuse(plan) {
    showResultModal({
        title: t('modal.cancelTitle'),
        desc: t('modal.cancelDesc'),
        planIdToApply: null
    });
}


/* -------------------- 啟動 -------------------- */
document.addEventListener('DOMContentLoaded', () => {
    applyI18nToDom();
    initLangSwitch();
    initCarousel();
    initTimers();
    initGallery();
    initCart();
    initDailyQuote();
    modal.init();
    renderPlans();
});
