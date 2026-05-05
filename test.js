/* C# Mastery System - Final Version
   Engineered by: Hamza Omar (H & Gh Systems)
*/

// --- 1. المتغيرات الأساسية ---
let studentName = "";
let studentGender = "male";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let secondsElapsed = 0;

// --- 2. مصفوفة الأسئلة (الهجينة) ---
const questions = [
    {
        type: "mcq",
        question: "أي من الكلمات التالية تستخدم لتعريف كلاس لا يمكن الوراثة منه في C#؟",
        options: ["abstract", "sealed", "static", "virtual"],
        answer: "sealed",
        explanation: "الكلمة sealed تمنع أي كلاس آخر من الوراثة منها (Sealed Classes)."
    },
    {
        type: "coding",
        question: "أنشئ Interface باسم ILogger يحتوي على ميثود Log تأخذ باراميتر من نوع string، ثم أنشئ كلاس ConsoleLogger يقوم بتنفيذ (Implement) هذه الواجهة.",
        explanation: "يجب التأكد من استخدام الكلمة interface وتنفيذها باستخدام النقطتين (:) وكتابة الميثود بـ public."
    },
    // يمكنك إضافة المزيد من الأسئلة هنا بنفس التنسيق
];

// --- 3. منطق تتبع العيون الفخم ---
document.addEventListener("mousemove", (e) => {
    const pupils = document.querySelectorAll(".pupil");
    pupils.forEach(pupil => {
        const eye = pupil.parentElement;
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = 15; 
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
});

// --- 4. اختيار الجنس وتغيير الثيم ---
document.querySelectorAll(".gender-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".gender-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        studentGender = btn.dataset.gender;
        document.body.className = `${studentGender}-theme`;
    });
});

// --- 5. بدء الاختبار ---
document.getElementById("start-btn").addEventListener("click", () => {
    studentName = document.getElementById("student-name").value.trim();
    if (!studentName) return alert("يرجى إدخال اسمك أولاً يا بطل");
    
    switchSection("landing-page", "quiz-page");
    // خلط الخيارات لأسئلة الـ MCQ فقط
    questions.forEach(q => { if(q.type === "mcq") shuffle(q.options); });
    
    startTimer();
    loadQuestion();
});

// --- 6. تحميل وإدارة الأسئلة ---
function loadQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById("question-number").innerText =` السؤال ${currentQuestionIndex + 1}/${questions.length}`;
    document.getElementById("question-text").innerText = q.question;
    
    // إعادة ضبط العناصر
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "block";
    document.getElementById("explanation-container").style.display = "none";
    
    if (q.type === "mcq") {
        document.getElementById("options-container").style.display = "grid";
        document.getElementById("coding-container").style.display = "none";
        displayOptions(q);
    } else {
        document.getElementById("options-container").style.display = "none";
        document.getElementById("coding-container").style.display = "block";
        document.getElementById("code-input").value = ""; 
        document.getElementById("ai-status").innerText = "";
    }
}

function displayOptions(q) {
    const container = document.getElementById("options-container");
    container.innerHTML = "";
    q.options.forEach(opt => {
        const btn = document.createElement("div");
        btn.className = "option";
        btn.innerText = opt;
        btn.onclick = () => checkMCQ(opt, q.answer, btn);
        container.appendChild(btn);
    });
}

function checkMCQ(selected, correct, btn) {
    if (selected === correct) {
        score++;
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
    }
    // تعطيل الضغط على باقي الخيارات
    document.querySelectorAll(".option").forEach(o => o.style.pointerEvents = "none");
    showExplanation(questions[currentQuestionIndex].explanation);
}

// زر التأكيد (للأسئلة البرمجية)
document.getElementById("submit-btn").onclick = async () => {
    const q = questions[currentQuestionIndex];
    if (q.type === "coding") {
        await submitAI();
    } else {
        // في حال كان MCQ ولم يضغط المستخدم على خيار (اختياري)
        nextQuestion();
    }
};

// --- 7. التصحيح بواسطة Gemini AI عبر Flask ---
async function submitAI() {
    const code = document.getElementById("code-input").value.trim();
    if(!code) return alert("أدخل الكود البرمجي أولاً");

    const status = document.getElementById("ai-status");
    status.innerText = "جاري الفحص بواسطة Gemini AI... 🚀";
    
    try {
        const response = await fetch('http://127.0.0.1:5000/grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: code,
                question: questions[currentQuestionIndex].question
            })
        });
        const data = await response.json();
        
        // موازنة العلامة: إذا كانت من 100 نحولها لتناسب وزن السؤال
        const weightedScore = data.score ; 
        score += weightedScore;

        showExplanation(data.feedback);
    } catch (e) {
        alert("تأكد من تشغيل سيرفر البايثون وتفعيل الـ VPN");
        status.innerText = "خطأ في الاتصال بالسيرفر";
    }
}

function showExplanation(text) {
    document.getElementById("explanation-container").style.display = "block";
    document.getElementById("explanation-text").innerText = text;
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("next-btn").style.display = "block";
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}

// --- 8. النتائج النهائية وحفظ البيانات ---
function showFinalResult(aiScore = null, aiFeedback = null) {
    clearInterval(timer);
    switchSection("quiz-page", "result-page");
    
    document.getElementById("display-name").innerText = studentName;
    
    // حساب النسبة المئوية
    const totalScore = questions.length * 100;
    const percentage = Math.min(100, Math.round((score / questions.length) * 100));
    document.getElementById("final-score").innerText = percentage + "%";
    
    let msg = percentage >= 50 ? "أداء هندسي متميز! استمر" : "تحتاج لتركيز أكبر في مفاهيم الـ OOP";
    if(aiFeedback) msg = aiFeedback;
    document.getElementById("result-message").innerText = msg;

    // إرسال البيانات لجوجل شيت (للتوثيق والمراقبة)
    sendDataToSheet(studentName, percentage, studentGender, document.getElementById("timer").innerText);
}

// --- 9. الدوال المساعدة (Helper Functions) ---

function startTimer() {
    timer = setInterval(() => {
        secondsElapsed++;
        const m = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
        const s = String(secondsElapsed % 60).padStart(2, '0');
        document.getElementById("timer").innerText =` الوقت: ${m}:${s}`;
    }, 1000);
}

function switchSection(oldId, newId) {
    document.getElementById(oldId).classList.remove("active");
    document.getElementById(newId).classList.add("active");
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// وظيفة الربط مع Google Sheets
function sendDataToSheet(name, score, gender, time) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwxsvB7BKEcL9ec6TH7k-wZTk1g48srAVyGposfUWuTSVwkFIZTA5GS9GmCA6xo_GBg/exec";
    
    const data = {
        name: name,
        score: score + "%",
        gender: gender,
        time: time,
    };

    // نستخدم fetch لإرسال البيانات
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => console.log("Data synced with H & Gh Cloud successfully!"))
    .catch(error => console.error('Sheet Sync Error:', error.message));
}