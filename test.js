let studentName = "";
let studentGender = "male";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let secondsElapsed = 0;

const questions = [
   
    /**
 * بنك أسئلة مادة نظم تشغيل (2) - شامل النظري والعملي
 * تم إعداد هذه الأسئلة بناءً على المحاضرات: 1، 2، 3، 4 وكمالة النظري والعملي.
 */


    // --- المحاضرة الأولى (النظام، المعالج، النواة والغلاف) ---
    {
        question: "على أي نوع من المعالجات (Processors) يعمل نظام Linux وفقاً للمحاضرة الأولى؟",
        options: ["معالجات 16 بت", "معالجات 32 بت", "معالجات 128 بت", "يعمل على كافة أنواع المعالجات"],
        answer: "معالجات 32 بت",
        explanation: "ذكرت المحاضرة الأولى بوضوح أن نظام Linux يعمل على معالجات 32 بت."
    },
    {
        question: "ما هي أقل مساحة ذاكرة (RAM) مطلوبة لتشغيل نظام Linux؟",
        options: ["8 ميغابايت", "64 ميغابايت", "256 ميغابايت", "512 ميغابايت"],
        answer: "8 ميغابايت",
        explanation: "يمكن تشغيل النظام بـ 8 ميغابايت، ولكن يفضل 256 ميغابايت من أجل الواجهات الرسومية."
    },
    {
        question: "كم تبلغ المساحة المطلوبة على القرص لتنزيل كافة تطبيقات نظام Linux؟",
        options: ["45 ميغابايت", "71 ميغابايت", "3.5 غيغابايت", "10 غيغابايت"],
        answer: "3.5 غيغابايت",
        explanation: "بدون واجهة 45MB، ومع واجهة 71MB، ولتنزيل كافة التطبيقات نحتاج 3.5GB."
    },
    {
        question: "أي مما يلي يمثل 'النواة' (Kernel) في نظام Linux؟",
        options: ["جزء مرئي للمستخدم لإدخال الأوامر", "جزء غير مرئي يشكل لب النظام ويدير الموارد", "برنامج خدمي للاتصال بالإنترنت", "مجلد خاص بحفظ ملفات المستخدم"],
        answer: "جزء غير مرئي يشكل لب النظام ويدير الموارد",
        explanation: "النواة هي لب النظام والمسؤولة عن إدارة المستخدمين، الموارد، الطابعات، والذاكرة."
    },
    {
        question: "ما هي الوظيفة الأساسية للغلاف (Shell)؟",
        options: ["إدارة الذاكرة المادية", "ترجمة وتفسير أوامر المستخدم واستدعاء إجراءات النواة", "تخزين الملفات بشكل هيكلي", "التحكم في سرعة المعالج"],
        answer: "ترجمة وتفسير أوامر المستخدم واستدعاء إجراءات النواة",
        explanation: "الغلاف برنامج خدمي يبدأ عند الدخول للنظام ويقوم بترجمة وتفسير الأوامر."
    },
    {
        question: "ما هي أنواع الاتصالات التي تشملها بنية نظام Linux الأساسية؟",
        options: ["بين الشاشات الموصولة، المستخدمين، والحواسب بمختلف أنواعها", "بين المستخدمين فقط", "بين الطابعات فقط", "الاتصال اللاسلكي فقط"],
        answer: "بين الشاشات الموصولة، المستخدمين، والحواسب بمختلف أنواعها",
        explanation: "الاتصالات جزء أساسي يشمل الشاشات والمستخدمين (على مخدمات مختلفة) والحواسب بمواقع مختلفة."
    },

    // --- المحاضرة 2+3 نظري وعملي (الدخول، المسارات، والأوامر الأساسية) ---
    {
        question: "ما هو الاسم الاصطلاحي لمشرف النظام (Super user)؟",
        options: ["admin", "root", "supervisor", "manager"],
        answer: "root",
        explanation: "المشرف المسؤول عن كافة موارد الحاسب يسمى root وإشارته هي #."
    },
    {
        question: "ما هو الحد الأدنى لطول كلمة السر لضمان الأمان؟",
        options: ["4 أحرف", "6 أحرف", "أكبر من 6 حروف", "8 أحرف"],
        answer: "أكبر من 6 حروف",
        explanation: "يجب أن يكون طول كلمة السر أكبر من 6 حروف وتحتوي حروفاً وأرقاماً."
    },
    {
        question: "أين يتم إنشاء مجلد المستخدم (Home Directory) تلقائياً؟",
        options: ["/root", "/etc", "/home", "/bin"],
        answer: "/home",
        explanation: "ينشأ مجلد المستخدم تلقائياً في المسار /home/ ويحمل اسم المستخدم."
    },
    {
        question: "ما هي إشارة النظام (Prompt) التي تظهر للمستخدم العادي؟",
        options: ["#", "$", "@", "&"],
        answer: "$",
        explanation: "تظهر $ للمستخدم العادي، بينما تظهر # للمشرف (root)."
    },
    {
        question: "أي رمز يستخدم للفصل بين المجلدات في نظام Linux؟",
        options: ["\\ (Backslash)", "/ (Slash)", ".", "-"],
        answer: "/ (Slash)",
        explanation: "تستخدم الـ / (slash) للفصل بين المجلدات، والـ / بمفردها تعني دليل الجذر."
    },
    {
        question: "ما هي بيانات الدخول الافتراضية المذكورة في المحاضرة العملي؟",
        options: ["admin / admin", "red / 123", "root / root", "user / password"],
        answer: "red / 123",
        explanation: "اسم المستخدم red وكلمة السر 123 هي البيانات الافتراضية في المحاضرة."
    },
    {
        question: "أي اختصار يستخدم للخروج من كامل النظام (Power off)؟",
        options: ["Ctrl + d", "Ctrl + Alt", "Alt + F4", "Ctrl + c"],
        answer: "Ctrl + Alt",
        explanation: "Ctrl+Alt يستخدم للخروج من النظام كاملاً واختيار Power off."
    },
    {
        question: "ما هي وظيفة الأمر 'pwd'؟",
        options: ["تغيير كلمة السر", "إظهار مسار المجلد الحالي", "إنشاء مجلد جديد", "حذف ملف"],
        answer: "إظهار مسار المجلد الحالي",
        explanation: "pwd اختصار لـ Print Working Directory."
    },
    {
        question: "ما هو الخيار المستخدم مع 'mkdir' لإنشاء المسار كاملاً (البنية الشجرية)؟",
        options: ["-r", "-p", "-a", "-v"],
        answer: "-p",
        explanation: "الخيار -p (parents) ينشئ المجلد مع كافة مجلداته الأب المفقودة."
    },

    // --- أوامر الاستعراض والمعلومات (ls, who, w) ---
    {
        question: "أي خيار مع 'who' يظهر عناوين الأعمدة؟",
        options: ["-u", "-q", "-H", "-am"],
        answer: "-H",
        explanation: "الخيار -H يظهر عناوين الأعمدة عند تنفيذ أمر who."
    },
    {
        question: "أي خيار مع 'who' يظهر عدد المستخدمين فقط باختصار؟",
        options: ["-q", "-u", "-H", "-H -u"],
        answer: "-q",
        explanation: "الخيار -q (quick) يظهر عدد المستخدمين وأسماءهم باختصار."
    },
    {
        question: "في مخرجات الأمر 'w'، ماذا يمثل العمود 'IDLE'؟",
        options: ["اسم البرنامج", "زمن توقف المستخدم عن العمل", "رقم IP المخدم", "زمن العملية الحالية"],
        answer: "زمن توقف المستخدم عن العمل",
        explanation: "IDLE هو زمن الخمول، والنقطة تعني أن المستخدم نشط حالياً."
    },
    {
        question: "ماذا يمثل العمود 'JCPU' في مخرجات الأمر 'w'؟",
        options: ["زمن العملية الحالية", "إجمالي زمن كافة العمليات على هذه الطرفية", "رقم تعريف المستخدم", "زمن الدخول للنظام"],
        answer: "إجمالي زمن كافة العمليات على هذه الطرفية",
        explanation: "JCPU هو الزمن الكلي للطرفية، بينما PCPU هو زمن العملية الحالية فقط."
    },
    {
        question: "ما الفرق بين 'whoami' و 'who am i'؟",
        options: ["لا يوجد فرق", "'who am i' تعطي تفاصيل الدخول والطرفية، بينما 'whoami' تعطي الاسم فقط", "'whoami' للمشرف فقط", "الأولى تعرض الملفات والثانية لا"],
        answer: "'who am i' تعطي تفاصيل الدخول والطرفية، بينما 'whoami' تعطي الاسم فقط",
        explanation: "الفراغ في الأمر يطلب معلومات الجلسة الكاملة."
    },
    {
        question: "أي خيار مع 'ls' يظهر الملفات المخفية؟",
        options: ["-l", "-a", "-F", "-m"],
        answer: "-a",
        explanation: "الخيار -a (all) يظهر كل الملفات بما فيها التي تبدأ بنقطة (المخفية)."
    },
    {
        question: "في 'ls -l'، ماذا يعني ظهور (d) في بداية السطر؟",
        options: ["ملف عادي", "مجلد (Directory)", "ملف مخفي", "رابط"],
        answer: "مجلد (Directory)",
        explanation: "الحرف d يشير إلى مجلد، والشرطة (-) تشير إلى ملف عادي."
    },
    {
        question: "أي خيار مع 'ls' يظهر الملفات مفصولة بفاصلة؟",
        options: ["-m", "-x", "-1", "-t"],
        answer: "-m",
        explanation: "الخيار -m يعرض المخرجات بشكل أفقي مفصولة بفاصلة."
    },
    {
        question: "أي خيار مع 'ls' يرتب الملفات حسب وقت التعديل الأحدث؟",
        options: ["-r", "-t", "-u", "-s"],
        answer: "-t",
        explanation: "الخيار -t (time) يرتب الملفات زمنياً."
    },
    {
        question: "ماذا تعني النجمة (*) بجانب اسم الملف عند استخدام 'ls -F'؟",
        options: ["مجلد", "ملف قابل للتنفيذ", "ملف مخفي", "رابط"],
        answer: "ملف قابل للتنفيذ",
        explanation: "الخيار -F يضيف رموزاً توضيحية (* للتنفيذ، / للمجلد)."
    },

    // --- الملكية والحماية (chmod, umask, chown) ---
    {
        question: "ما هي القيمة العددية لصلاحية 'القراءة' (Read)؟",
        options: ["1", "2", "4", "7"],
        answer: "4",
        explanation: "قراءة=4، كتابة=2، تنفيذ=1."
    },
    {
        question: "ماذا تعني السماحية العددية 755؟",
        options: ["كامل الصلاحيات للجميع", "كاملة للمالك، وقراءة وتنفيذ للبقية", "قراءة فقط للجميع", "كاملة للمالك والمجموعة فقط"],
        answer: "كاملة للمالك، وقراءة وتنفيذ للبقية",
        explanation: "7(4+2+1)، 5(4+1)، 5(4+1)."
    },
    {
        question: "أي رمز يمثل 'المجموعة' (Group) في الصيغة الرمزية لـ chmod؟",
        options: ["u", "g", "o", "a"],
        answer: "g",
        explanation: "u (user), g (group), o (others), a (all)."
    },
    {
        question: "أي أمر يستخدم لتغيير مالك الملف؟",
        options: ["chmod", "chown", "chgrp", "umask"],
        answer: "chown",
        explanation: "chown (Change Owner) لتغيير المالك وهو يحتاج صلاحية مشرف."
    },
    {
        question: "ما هي السماحية الأساسية للملفات والمجلدات قبل طرح umask؟",
        options: ["الملف 777 والمجلد 666", "الملف 666 والمجلد 777", "كلاهما 777", "كلاهما 666"],
        answer: "الملف 666 والمجلد 777",
        explanation: "يتم طرح umask من 666 للملف ومن 777 للمجلد."
    },
    {
        question: "ما هي قيمة umask الافتراضية للمستخدم العادي؟",
        options: ["022", "002", "000", "777"],
        answer: "002",
        explanation: "القيمة هي 022 للمشرف و 002 للمستخدم العادي."
    },
    {
        question: "إذا كانت umask هي 022، فما هي سماحية المجلد الناتج؟",
        options: ["644", "755", "777", "700"],
        answer: "755",
        explanation: "777 (أساسي) - 022 (قناع) = 755."
    },
    {
        question: "إذا كانت umask هي 022، فما هي سماحية الملف الناتج؟",
        options: ["666", "644", "755", "600"],
        answer: "644",
        explanation: "666 (أساسي) - 022 (قناع) = 644."
    },
    {
        question: "كيف يتم عرض القيمة الحالية لـ umask؟",
        options: ["show umask", "chmod -v", "كتابة umask فقط", "mask -l"],
        answer: "كتابة umask فقط",
        explanation: "كتابة الأمر umask بدون وسائط تعرض القيمة الحالية."
    },

    // --- المحاضرة 4 (توجيه الدخل والخرج، النقل، الحذف والنسخ) ---
    {
        question: "ما هو الرمز الرقمي لـ 'الخطأ القياسي' (Standard Error)؟",
        options: ["0", "1", "2", "3"],
        answer: "2",
        explanation: "دخل=0، خرج=1، خطأ=2."
    },
    {
        question: "ما الفرق بين '>' و '>>'؟",
        options: ["'>' للإضافة و '>>' للمسح", "'>' تمسح القديم أو تنشئ جديد، و '>>' تضيف للنهاية", "لا فرق بينهما", "للمجلدات فقط"],
        answer: "'>' تمسح القديم أو تنشئ جديد، و '>>' تضيف للنهاية",
        explanation: "إشارة واحدة تمحو المحتوى السابق، إشارتان تضيفان إليه."
    },
    {
        question: "أي أمر يوجه المخرج لملف ويعرضه على الشاشة في نفس الوقت؟",
        options: ["cat", "tee", "grep", "move"],
        answer: "tee",
        explanation: "tee يستخدم للتوجيه والاستعراض معاً."
    },
    {
        question: "كيف ندمج محتوى file1 و file2 في ملف جديد file3؟",
        options: ["cat file1 file2 > file3", "cp file1 file2 file3", "mv file1 file2 file3", "tee file1 file2 file3"],
        answer: "cat file1 file2 > file3",
        explanation: "cat يقوم بتسلسل الملفات و > توجهها للملف الثالث."
    },
    {
        question: "ماذا يحدث عند ضغط Ctrl + d لمرتين متتاليتين أثناء الكتابة في ملف عبر cat؟",
        options: ["يتم حفظ الملف", "يتم مسح الملف", "يتم إنهاء جلسة العمل (Shell) والخروج", "يتم دمج الملف"],
        answer: "يتم إنهاء جلسة العمل (Shell) والخروج",
        explanation: "الضغطة الأولى تنهي الإدخال، والثانية تنهي الغلاف."
    },
    {
        question: "متى يعمل 'mv' كأداة لإعادة التسمية؟",
        options: ["عند استخدام -r", "عندما يكون مسار المصدر والوجهة هو نفسه", "عندما يكون الملف محمياً", "لا يعمل كأداة تسمية"],
        answer: "عندما يكون مسار المصدر والوجهة هو نفسه",
        explanation: "إذا نقلت ملفاً لنفس المجلد باسم جديد، تعتبر إعادة تسمية."
    },
    {
        question: "ماذا يحدث إذا تم نقل ملف باستخدام 'mv' لملف آخر موجود مسبقاً؟",
        options: ["يتم الدمج", "يتم الكتابة فوق المحتوى القديم", "يفشل الأمر", "ينشأ ملف جديد"],
        answer: "يتم الكتابة فوق المحتوى القديم",
        explanation: "الأمر mv يستبدل الملف الموجود في الوجهة."
    },
    {
        question: "عند تنفيذ 'mv file1 file2 dir'، ما هي النتيجة؟",
        options: ["خطأ في الأمر", "تغيير اسم file1 إلى dir", "نقل file1 و file2 إلى المجلد dir", "حذف الملفات"],
        answer: "نقل file1 و file2 إلى المجلد dir",
        explanation: "يمكن نقل عدة ملفات إذا كان الوسيط الأخير مجلداً."
    },
    {
        question: "أي خيار مع 'rm' يحذف مجلداً غير فارغ؟",
        options: ["-f", "-i", "-r", "-v"],
        answer: "-r",
        explanation: "الخيار -r (recursive) يحذف المجلد بما فيه."
    },
    {
        question: "ماذا يحدث إذا استخدمنا 'rmdir' لحذف مجلد غير فارغ؟",
        options: ["يتم الحذف", "يعطي رسالة خطأ أو يتوقف", "ينقل الملفات لـ root", "يطلب تأكيداً"],
        answer: "يعطي رسالة خطأ أو يتوقف",
        explanation: "rmdir مخصص للمجلدات الفارغة حصراً."
    },
    {
        question: "أي خيار مع 'rm' يطلب تأكيداً قبل كل عملية حذف؟",
        options: ["-f", "-i", "-v", "-r"],
        answer: "-i",
        explanation: "-i (interactive) يطلب y/n قبل الحذف."
    },
    {
        question: "أي خيار مع 'rm' يعطي رسالة تفسيرية لما تم حذفه؟",
        options: ["-v", "-f", "-r", "-i"],
        answer: "-v",
        explanation: "-v (verbose) يشرح العملية التي تمت."
    },
    {
        question: "أي خيار مع 'cp' يستخدم لنسخ مجلد بكامل محتوياته؟",
        options: ["-f", "-R", "-a", "-i"],
        answer: "-R",
        explanation: "الخيار -R (أو -r) ضروري لنسخ المجلدات."
    },
    {
        question: "عند استخدام 'cat filename' بدون إشارات توجيه، ماذا يحدث؟",
        options: ["يتم مسح الملف", "يتم عرض محتوى الملف على الشاشة", "يتم حذف الملف", "يتم تحرير الملف"],
        answer: "يتم عرض محتوى الملف على الشاشة",
        explanation: "cat بدون توجيه يقرأ الملف ويعرضه."
    },
    {
        question: "ما هي الطريقة الآمنة للإضافة لملف سواء كان موجوداً أو لا؟",
        options: [">", "<<", ">>>", "tee"],
        answer: "<<",
        explanation: "يفضل استخدام << للأمان؛ فهي تنشئ الملف إذا لم يوجد وتضيف إليه إذا وجد دون مسح القديم."
    },
    {
        question: "ما معنى Bash في سطر الأوامر؟",
        options: ["النظام يعمل بشكل صحيح", "يوجد خطأ في التعليمة", "المستخدم مشرف", "تم حفظ الملف"],
        answer: "يوجد خطأ في التعليمة",
        explanation: "ظهور كلمة Bash متبوعة بكلمة يعني غالباً وجود خطأ في كتابة الأمر."
    }
];

console.log("تم تحميل 50 سؤالاً بنجاح تغطي كافة الملفات.");



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
    questions.forEach(q => shuffle(q.options));
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

function saveResultToGoogleSheets(userName, userScore) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwxsvB7BKEcL9ec6TH7k-wZTk1g48srAVyGposfUWuTSVwkFIZTA5GS9GmCA6xo_GBg/exec"
    
    const data = {
        name: userName,
        score: userScore
    };

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => console.log('تم حفظ النتيجة بنجاح!'))
    .catch(error => console.error('خطأ في الحفظ:', error));
}