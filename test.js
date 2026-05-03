let studentName = "";
let studentGender = "male";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let secondsElapsed = 0;

const questions = [
    {
        question: "أي أمر يستخدم لإنشاء مجلد جديد؟",
        options: ["mkdir", "cd", "rm", "ls"],
        answer: "mkdir",
        explanation: "الأمر mkdir اختصار لـ Make Directory."
    },
   
    {
        question: "ما هو الحد الأدنى للذاكرة (RAM) المطلوبة لتشغيل نظام Linux مع واجهة رسومية؟",
        options: ["8 ميجابايت", "256 ميجابايت", "45 ميجابايت", "71 ميجابايت"],
        answer: "256 ميجابايت",
        explanation: "حسب المحاضرة الأولى، 8 ميجابايت للنظام فقط، و256 ميجابايت للواجهات الرسومية."
    },
    {
        question: "كم تبلغ المساحة المطلوبة على القرص الصلب لتنزيل نظام Linux مع كافة تطبيقاته؟",
        options: ["45 ميجابايت", "71 ميجابايت", "3.5 جيجابايت", "256 ميجابايت"],
        answer: "3.5 جيجابايت",
        explanation: "المحاضرة حددت 3.5 جيجابايت لتشمل كافة التطبيقات."
    },
    {
        question: "الجزء المسؤول عن إدارة الموارد مثل الأقراص والطابعات والطرفيات هو:",
        options: ["الغلاف (Shell)", "النواة (Kernel)", "نظام الملفات", "المستخدم (User)"],
        answer: "النواة (Kernel)",
        explanation: "النواة هي لب النظام والمسؤولة عن إدارة الموارد والعتاد."
    },
    {
        question: "متى ينتهي تنفيذ الغلاف (Shell) في نظام Linux؟",
        options: ["عند انتهاء تنفيذ الأمر", "عند إغلاق الحاسب فقط", "بمجرد الخروج من النظام", "بعد مرور ساعة من العمل"],
        answer: "بمجرد الخروج من النظام",
        explanation: "يبدأ التنفيذ لحظة الدخول ولا ينتهي إلا بالخروج."
    },
    {
        question: "في الأمر (w)، ماذا يمثل العمود JCPU؟",
        options: ["زمن العملية الحالية", "زمن توقف المستخدم", "الزمن المستغرق لعمليات الطرفية كاملة", "رقم IP المخدم"],
        answer: "الزمن المستغرق لعمليات الطرفية كاملة",
        explanation: "JCPU يمثل إجمالي زمن المعالجة لكافة العمليات على هذه الطرفية."
    },
    {
        question: "عند ظهور رسالة (Bash: command not found)، ماذا يعني ذلك؟",
        options: ["النظام يحتاج تحديث", "خطأ في كتابة التعليمة أو عدم وجودها", "المستخدم ليس لديه صلاحية", "الملف فارغ"],
        answer: "خطأ في كتابة التعليمة أو عدم وجودها",
        explanation: "هذا التنبيه الافتراضي للغلاف عند فشل التعرف على الأمر."
    },
    {
        question: "أي اختصار يستخدم للخروج من جلسة العمل أو إغلاق ملف مفتوح بـ cat؟",
        options: ["Ctrl + c", "Ctrl + d", "Ctrl + alt", "Esc"],
        answer: "Ctrl + d",
        explanation: "يرسل إشارة نهاية الملف ويغلق الجلسة."
    },
    {
        question: "ما هو الخيار المستخدم مع الأمر (who) لإظهار عدد المستخدمين فقط؟",
        options: ["-H", "-q", "-a", "-l"],
        answer: "-q",
        explanation: "الخيار -q (quick) يظهر أسماء المستخدمين وعددهم."
    },
    {
        question: "ماذا يظهر الأمر (ls -F) بجانب أسماء المجلدات؟",
        options: ["*", "@", "/", "-"],
        answer: "/",
        explanation: "يضع إشارة / لتمييز المجلدات و * للملفات التنفيذية."
    },
    {
        question: "في الأمر (ls -l)، ما هو الرمز الذي يظهر في بداية السطر ليدل على ملف عادي؟",
        options: ["d", "l", "-", "b"],
        answer: "-",
        explanation: "حرف d للمجلد، والإشارة (-) للملف العادي."
    },
    {
        question: "كيف يمكن إنشاء ملف نصي اسمه test وإضافة نص إليه دون مسح محتواه القديم؟",
        options: ["cat > test", "cat << test", "cat >> test", "mkdir test"],
        answer: "cat >> test",
        explanation: "إشارتي التوجيه >> تستخدم للإضافة (Append)."
    },
    {
        question: "ما هو الأمر الذي يسمح بإنشاء مجلدات متداخلة (مثل a/b/c) في آن واحد؟",
        options: ["mkdir -r", "mkdir -p", "mkdir -f", "rmdir -p"],
        answer: "mkdir -p",
        explanation: "الخيار -p (parents) ينشئ المسار كاملاً."
    },
    {
        question: "ما وظيفة الأمر (tee)؟",
        options: ["حذف الملفات", "تغيير الصلاحيات", "التوجيه للملف وللشاشة معاً", "دمج الملفات"],
        answer: "التوجيه للملف وللشاشة معاً",
        explanation: "يستخدم للاستغناء عن إشارة التوجيه والإنشاء والاستعراض معاً."
    },
    {
        question: "لحذف مجلد غير فارغ بجميع محتوياته، نستخدم:",
        options: ["rmdir", "rm -i", "rm -r", "mv -r"],
        answer: "rm -r",
        explanation: "الخيار -r (recursive) ضروري لحذف المجلدات غير الفارغة."
    },
    {
        question: "إذا كان umask المشرف هو 022، فما هي الصلاحية الافتراضية للمجلد الجديد؟",
        options: ["644", "755", "777", "666"],
        answer: "755",
        explanation: "777 (أساسي) - 022 (قناع) = 755."
    },
    {
        question: "نظام الملفات في Linux يتبع بنية تنظيمية تدعى:",
        options: ["البنية الدائرية", "البنية الشجرية", "البنية العشوائية", "البنية الخطية"],
        answer: "البنية الشجرية",
        explanation: "المعلومات تخزن بشكل هيكلي شجري."
    },
    {
        question: "أي أمر يستخدم لمعرفة مسار المجلد الحالي الذي تقف عليه؟",
        options: ["cd", "pwd", "ls", "where"],
        answer: "pwd",
        explanation: "Print Working Directory."
    },
    {
        question: "ماذا تعني إشارة (#) في موجه الأوامر؟",
        options: ["مستخدم عادي", "مشرف (Root)", "ملف نصي", "تعليق"],
        answer: "مشرف (Root)",
        explanation: "الهاش للمشرف والدولار ($) للمستخدم العادي."
    },
    {
        question: "ما هو الخيار الذي يعطي رسالة تأكيد (y/n) قبل الحذف في أمر rm؟",
        options: ["-f", "-i", "-v", "-r"],
        answer: "-i",
        explanation: "الخيار -i يعني Interactive (تفاعلي)."
    },
    {
        question: "عند استخدام الأمر (mv arg1 arg2) حيث كلاهما مجلدات، ما هي النتيجة؟",
        options: ["نقل محتوى الأول للثاني", "إعادة تسمية المجلد", "حذف المجلد الأول", "نسخ المجلد"],
        answer: "إعادة تسمية المجلد",
        explanation: "حسب المحاضرة، إذا كان المسار نفسه والنوع مجلد، فهي إعادة تسمية."
    },
    {
        question: "ما هي الصلاحية الأساسية للملفات العادية قبل طرح القناع (umask)؟",
        options: ["777", "666", "755", "644"],
        answer: "666",
        explanation: "الملفات تبدأ بـ 666 والمجلدات بـ 777."
    },
    {
        question: "لتغيير umask المستخدم العادي ليصبح ناتج صلاحية الملف 640، نضبط القناع على:",
        options: ["022", "002", "026", "027"],
        answer: "026",
        explanation: "666 - 640 = 026."
    },
    {
        question: "ما هو الأمر المستخدم لعرض محتويات ملف نصي على الشاشة؟",
        options: ["ls", "cat", "mkdir", "cp"],
        answer: "cat",
        explanation: "يستخدم لإنشاء واستعراض الملفات النصية."
    },
    {
        question: "لنسخ مجلد بكامل محتوياته إلى مكان آخر، نستخدم:",
        options: ["cp", "cp -R", "cp -f", "mv"],
        answer: "cp -R",
        explanation: "الخيار -R ضروري للنسخ العودي للمجلدات."
    },
    {
        question: "ما معنى عمود IDLE في مخرجات الأمر (w)؟",
        options: ["اسم البرنامج", "زمن توقف المستخدم عن العمل", "رقم الطرفية", "زمن المعالجة"],
        answer: "زمن توقف المستخدم عن العمل",
        explanation: "يقاس بالثواني أو الدقائق ويدل على خمول المستخدم."
    },
    {
        question: "أين ينشأ مجلد المستخدم تلقائياً عند إضافة حساب جديد؟",
        options: ["/root/", "/bin/", "/home/", "/etc/"],
        answer: "/home/",
        explanation: "يتم إنشاء مجلد باسم المستخدم تحت المسار /home/."
    },
    {
        question: "ما هي الطريقة الصحيحة لدمج ملفين (file1, file2) في ملف ثالث جديد؟",
        options: ["cat file1 file2 > file3", "cp file1 file2 file3", "mv file1 file2 file3", "cat file3 < file1 file2"],
        answer: "cat file1 file2 > file3",
        explanation: "يتم سرد الملفات المصدرية ثم توجيه الخارج للملف الهدف."
    },
    {
        question: "ما هو الخيار في (ls) الذي يظهر المعلومات الموسعة (الصلاحيات، الحجم، التاريخ)؟",
        options: ["-a", "-F", "-l", "-R"],
        answer: "-l",
        explanation: "الخيار -l (long) يعطي تفاصيل كاملة."
    },
    {
        question: "الأمر (rmdir -p a/b) يقوم بـ:",
        options: ["حذف المجلد a فقط", "حذف المجلد b والمسار الأبوي a إذا أصبح فارغاً", "حذف كل الملفات في b", "إنشاء مسار جديد"],
        answer: "حذف المجلد b والمسار الأبوي a إذا أصبح فارغاً",
        explanation: "الخيار -p في الحذف يتبع المسار للأعلى."
    },
    {
        question: "ما هو الاختصار المستخدم للخروج من كامل النظام (Power off)؟",
        options: ["Ctrl + d", "Ctrl + alt", "Esc", "Alt + F4"],
        answer: "Ctrl + alt",
        explanation: "حسب ملاحظات العملي، يستخدم مع خيار Power off للخروج الكامل."
    }
];


// تتبع العيون
// --- منطق تتبع العيون المطور ---
document.addEventListener("mousemove", (e) => {
    const pupils = document.querySelectorAll(".pupil");
    
    pupils.forEach(pupil => {
        const eye = pupil.parentElement;
        const rect = eye.getBoundingClientRect();
        
        // مركز العين
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        
        // حساب الزاوية بين الماوس ومركز العين
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        
        // تحديد مسافة تحرك البؤبؤ (عشان ما يطلع برا بياض العين)
        const distance = 15; // يمكنك زيادة أو إنقاص هذا الرقم حسب حجم العين
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // تطبيق الحركة باستخدام transform لضمان أداء عالي وسلاسة
        pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
});

// اختيار الجنس والثيم
document.querySelectorAll(".gender-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".gender-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        studentGender = btn.dataset.gender;
        document.body.className =` ${studentGender}-theme`;
    });
});

// بدء الاختبار
document.getElementById("start-btn").addEventListener("click", () => {
    studentName = document.getElementById("student-name").value.trim();
    if (!studentName) return alert("يرجى إدخال الاسم");
    switchSection("landing-page", "quiz-page");
    startTimer();
    showQuestion();
});

function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = q.question;
    document.getElementById("question-number").innerText =` السؤال ${currentQuestionIndex + 1}/${questions.length}`;
    const container = document.getElementById("options-container");
    container.innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("explanation-container").style.display = "none";

    q.options.forEach(opt => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerText = opt;
        div.onclick = () => {
            if (opt === q.answer) { div.classList.add("correct"); score++; }
            else div.classList.add("wrong");
            document.querySelectorAll(".option").forEach(o => o.style.pointerEvents = "none");
            document.getElementById("explanation-text").innerText = q.explanation;
            document.getElementById("explanation-container").style.display = "block";
            document.getElementById("next-btn").style.display = "block";
        };
        container.appendChild(div);
    });
}

document.getElementById("next-btn").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) showQuestion();
    else showFinalResult();
});

// رفع الصورة للذكاء الاصطناعي
document.getElementById("ai-upload").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    studentName = document.getElementById("student-name").value.trim();
    if (!studentName) return alert("أدخل اسمك أولاً");

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', studentName);

    document.getElementById("landing-page").innerHTML = "<h2>جاري التصحيح بواسطة الذكاء الاصطناعي...</h2>";
    try {
        const res = await fetch('http://127.0.0.1:5000/grade', { method: 'POST', body: formData });
        const data = await res.json();
        showFinalResult(data.score, data.feedback);
    } catch {
        alert("تأكد من تشغيل سيرفر Flask");
        location.reload();
    }
});

function showFinalResult(aiScore = null, aiFeedback = null) {
    clearInterval(timer);
    switchSection("quiz-page", "result-page");
    switchSection("landing-page", "result-page");
    document.getElementById("display-name").innerText = studentName;
    const finalScore = aiScore || Math.round((score / questions.length) * 100) + "%";
    document.getElementById("final-score").innerText = finalScore;
    if (aiFeedback) document.getElementById("result-message").innerText = aiFeedback;
}

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

document.getElementById("result-message").innerText = msg;

    function sendDataToSheet(name, score, gender, time) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwxsvB7BKEcL9ec6TH7k-wZTk1g48srAVyGposfUWuTSVwkFIZTA5GS9GmCA6xo_GBg/exec"
    
    const data = {
        name: name,
        score: score + "%",
        gender: gender,
        time: time,
    };

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // لضمان الإرسال السريع دون مشاكل التوافق
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => console.log("Data sent successfully!"))
    .catch(error => console.error('Error!', error.message));
}

// استدعِ الدالة داخل showResults
sendDataToSheet(studentName, percentage, studentGender, document.getElementById("timer").innerText);


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}