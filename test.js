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
        explanation: "الأمر mkdir هو اختصار لـ Make Directory."
    },
    {
        question: "ما هو الحد الأدنى للذاكرة (RAM) المطلوبة لتشغيل نظام Linux مع واجهة رسومية؟",
        options: ["8 ميجابايت", "256 ميجابايت", "45 ميجابايت", "71 ميجابايت"],
        answer: "256 ميجابايت",
        explanation: "يحتاج النظام 8 ميجابايت كحد أدنى للنظام فقط، و256 ميجابايت لتشغيل الواجهات الرسومية."
    },
    {
        question: "كم تبلغ المساحة المطلوبة على القرص الصلب لتنزيل نظام Linux مع كافة تطبيقاته؟",
        options: ["45 ميجابايت", "71 ميجابايت", "3.5 جيجابايت", "256 ميجابايت"],
        answer: "3.5 جيجابايت",
        explanation: "المساحة المقدرة لتنزيل النظام شاملاً كافة التطبيقات البرمجية هي 3.5 جيجابايت."
    },
    {
        question: "الجزء المسؤول عن إدارة الموارد مثل الأقراص والطابعات والطرفيات هو:",
        options: ["الغلاف (Shell)", "النواة (Kernel)", "نظام الملفات", "المستخدم (User)"],
        answer: "النواة (Kernel)",
        explanation: "النواة هي قلب النظام والمسؤولة مباشرة عن إدارة العتاد والموارد."
    },
    {
        question: "نظام الملفات في Linux يتبع بنية تنظيمية تدعى:",
        options: ["البنية الدائرية", "البنية الشجرية", "البنية العشوائية", "البنية الخطية"],
        answer: "البنية الشجرية",
        explanation: "تُنظم الملفات والمجلدات في لينكس بشكل هرمي يشبه الشجرة تبدأ من الجذر (/)."
    },
    {
        question: "متى ينتهي تنفيذ الغلاف (Shell) في نظام Linux؟",
        options: ["عند انتهاء تنفيذ الأمر", "عند إغلاق الحاسب فقط", "بمجرد الخروج من النظام", "بعد مرور ساعة من العمل"],
        answer: "بمجرد الخروج من النظام",
        explanation: "يبدأ الغلاف بالعمل فور تسجيل الدخول وينتهي بمجرد تسجيل الخروج."
    },
    {
        question: "في الأمر (w)، ماذا يمثل العمود JCPU؟",
        options: ["زمن العملية الحالية", "زمن توقف المستخدم", "الزمن المستغرق لعمليات الطرفية كاملة", "رقم IP المخدم"],
        answer: "الزمن المستغرق لعمليات الطرفية كاملة",
        explanation: "يمثل JCPU إجمالي زمن المعالجة المستهلك من قبل كافة العمليات المرتبطة بهذه الطرفية."
    },
    {
        question: "في الأمر (w)، ماذا يمثل عمود IDLE؟",
        options: ["اسم البرنامج", "زمن توقف المستخدم عن العمل", "رقم الطرفية", "زمن المعالجة"],
        answer: "زمن توقف المستخدم عن العمل",
        explanation: "يدل عمود IDLE على مدة خمول المستخدم أو عدم إدخاله لأوامر."
    },
    {
        question: "ما هو الخيار المستخدم مع الأمر (who) لإظهار عدد المستخدمين فقط؟",
        options: ["-H", "-q", "-a", "-l"],
        answer: "-q",
        explanation: "الخيار -q (Quick) يعرض أسماء المستخدمين وإجمالي عددهم."
    },
    {
        question: "ماذا تعني إشارة (#) في موجه الأوامر؟",
        options: ["مستخدم عادي", "مشرف (Root)", "ملف نصي", "تعليق"],
        answer: "مشرف (Root)",
        explanation: "تظهر إشارة # للمستخدم الجذر (المشرف)، بينما تظهر $ للمستخدم العادي."
    },
    {
        question: "ما هو الرمز الذي يمثل المجلد الرئيسي (Home Directory) للمستخدم الحالي؟",
        options: ["/", ".", "~", ".."],
        answer: "~",
        explanation: "رمز التيلدا (~) يمثل اختصاراً لمسار مجلد المنزل الخاص بالمستخدم."
    },
    {
        question: "أين ينشأ مجلد المستخدم تلقائياً عند إضافة حساب جديد؟",
        options: ["/root/", "/bin/", "/home/", "/etc/"],
        answer: "/home/",
        explanation: "جميع مجلدات المستخدمين الشخصية تقع تحت المجلد الأساسي /home/."
    },
    {
        question: "ما هو المسار المطلق (Absolute Path) للمجلد الرئيسي لمستخدم اسمه hamza؟",
        options: ["/bin", "/home/hamza", "/etc", "/root"],
        answer: "/home/hamza",
        explanation: "المسار المطلق يبدأ من الجذر (/) وصولاً إلى مجلد المستخدم."
    },
    {
        question: "ماذا يظهر الأمر (ls -F) بجانب أسماء المجلدات؟",
        options: ["*", "@", "/", "-"],
        answer: "/",
        explanation: "يستخدم الخيار -F رموزاً لتمييز الأنواع، حيث يضع / للمجلدات و * للملفات التنفيذية."
    },
    {
        question: "أي خيار في (ls) يظهر المعلومات الموسعة (الصلاحيات، الحجم، التاريخ)؟",
        options: ["-a", "-F", "-l", "-R"],
        answer: "-l",
        explanation: "الخيار -l (Long) يعرض تفاصيل الملفات بشكل موسع."
    },
    {
        question: "أي خيار يستخدم مع الأمر (ls) لعرض الملفات المخفية؟",
        options: ["-l", "-a", "-h", "-R"],
        answer: "-a",
        explanation: "الخيار -a (All) يظهر كافة الملفات بما فيها التي تبدأ بنقطة."
    },
    {
        question: "في (ls -l)، ما هو الرمز الذي يظهر في بداية السطر ليدل على ملف عادي؟",
        options: ["d", "l", "-", "b"],
        answer: "-",
        explanation: "يرمز الحرف d للمجلد، بينما ترمز الشرطة (-) للملف العادي."
    },
    {
        question: "ماذا يمثل الرمز (l) في بداية سطر تفاصيل الملف عند تنفيذ ls -l؟",
        options: ["ملف عادي", "مجلد", "رابط رمزي (Symbolic Link)", "ملف نصي"],
        answer: "رابط رمزي (Symbolic Link)",
        explanation: "الحرف l يشير إلى أن الملف عبارة عن رابط (Link) لملف آخر."
    },
    {
        question: "أي أمر يستخدم لمعرفة مسار المجلد الحالي الذي تقف عليه؟",
        options: ["cd", "pwd", "ls", "where"],
        answer: "pwd",
        explanation: "pwd اختصار لـ Print Working Directory."
    },
    {
        question: "كيف يمكن إنشاء ملف نصي اسمه test وإضافة نص إليه دون مسح محتواه القديم؟",
        options: ["cat > test", "cat << test", "cat >> test", "mkdir test"],
        answer: "cat >> test",
        explanation: "الرمز >> يستخدم لإضافة المخرجات إلى نهاية الملف (Append) دون مسحه."
    },
    {
        question: "ما هي الطريقة الصحيحة لدمج ملفين (file1, file2) في ملف ثالث جديد؟",
        options: ["cat file1 file2 > file3", "cp file1 file2 file3", "mv file1 file2 file3", "cat file3 < file1 file2"],
        answer: "cat file1 file2 > file3",
        explanation: "يقوم cat بسرد الملفين ثم يتم توجيه المخرجات للملف الثالث باستخدام >."
    },
    {
        question: "ما هو الأمر الذي يسمح بإنشاء مجلدات متداخلة (مثل a/b/c) في آن واحد؟",
        options: ["mkdir -r", "mkdir -p", "mkdir -f", "rmdir -p"],
        answer: "mkdir -p",
        explanation: "الخيار -p (Parents) ينشئ كافة المجلدات في المسار إذا لم تكن موجودة."
    },
    {
        question: "لحذف مجلد غير فارغ بجميع محتوياته، نستخدم:",
        options: ["rmdir", "rm -i", "rm -r", "mv -r"],
        answer: "rm -r",
        explanation: "الخيار -r (Recursive) ضروري لحذف المجلدات التي تحتوي على ملفات."
    },
    {
        question: "الأمر (rmdir -p a/b) يقوم بـ:",
        options: ["حذف المجلد a فقط", "حذف المجلد b والمسار الأبوي a إذا أصبح فارغاً", "حذف كل الملفات في b", "إنشاء مسار جديد"],
        answer: "حذف المجلد b والمسار الأبوي a إذا أصبح فارغاً",
        explanation: "الخيار -p مع rmdir يقوم بحذف المجلد المحدد ثم يحذف الأب إذا فرغ."
    },
    {
        question: "ما هو الخيار الذي يعطي رسالة تأكيد (y/n) قبل الحذف في أمر rm؟",
        options: ["-f", "-i", "-v", "-r"],
        answer: "-i",
        explanation: "الخيار -i اختصار لـ Interactive (تفاعلي)."
    },
    {
        question: "عند استخدام الأمر (mv arg1 arg2) حيث كلاهما مجلدات، ما هي النتيجة؟",
        options: ["نقل محتوى الأول للثاني", "إعادة تسمية المجلد", "حذف المجلد الأول", "نسخ المجلد"],
        answer: "إعادة تسمية المجلد",
        explanation: "إذا كان arg2 غير موجود كمسار مختلف، فإن mv تقوم بإعادة تسمية المجلد."
    },
    {
        question: "لنسخ مجلد بكامل محتوياته إلى مكان آخر، نستخدم:",
        options: ["cp", "cp -R", "cp -f", "mv"],
        answer: "cp -R",
        explanation: "الخيار -R أو -r (Recursive) يستخدم لنسخ المجلدات ومحتوياتها."
    },
    {
        question: "إذا كان umask المشرف هو 022، فما هي الصلاحية الافتراضية للمجلد الجديد؟",
        options: ["644", "755", "777", "666"],
        answer: "755",
        explanation: "القاعدة: 777 (للمجلدات) مطروحاً منه القناع 022 يساوي 755."
    },
    {
        question: "ما هي الصلاحية الأساسية للملفات العادية قبل طرح القناع (umask)؟",
        options: ["777", "666", "755", "644"],
        answer: "666",
        explanation: "تبدأ جميع الملفات العادية بصلاحية 666 افتراضياً قبل تطبيق القناع."
    },
    {
        question: "لتغيير umask المستخدم العادي ليصبح ناتج صلاحية الملف 640، نضبط القناع على:",
        options: ["022", "002", "026", "027"],
        answer: "026",
        explanation: "الحساب: 666 (الأساسي) - 640 (المطلوب) = 026."
    },
    {
        question: "في نظام التصاريح، ماذا يمثل الرقم (7) عند استخدامه مع الأمر chmod؟",
        options: ["قراءة فقط", "قراءة وكتابة", "قراءة وكتابة وتنفيذ", "تنفيذ فقط"],
        answer: "قراءة وكتابة وتنفيذ",
        explanation: "الرقم 7 هو حاصل جمع 4 (قراءة) + 2 (كتابة) + 1 (تنفيذ)."
    },
    {
        question: "ما هو الغرض من الأمر (chown)؟",
        options: ["تغيير تصاريح الملف", "تغيير مالك الملف أو المجموعة", "تغيير اسم الملف", "تشفير الملف"],
        answer: "تغيير مالك الملف أو المجموعة",
        explanation: "chown اختصار لـ Change Owner."
    },
    {
        question: "ما وظيفة الأمر (tee)؟",
        options: ["حذف الملفات", "تغيير الصلاحيات", "التوجيه للملف وللشاشة معاً", "دمج الملفات"],
        answer: "التوجيه للملف وللشاشة معاً",
        explanation: "يسمح tee بقراءة البيانات من المدخلات القياسية وكتابتها في المخرجات القياسية والملفات معاً."
    },
    {
        question: "أي أمر يستخدم لعرض محتويات ملف نصي صفحة بصفحة مع إمكانية الرجوع للخلف؟",
        options: ["cat", "more", "less", "head"],
        answer: "less",
        explanation: "less أكثر تطوراً من more حيث يسمح بالتنقل العكسي داخل الملف."
    },
    {
        question: "أي أمر يستخدم لعرض أول 10 أسطر من ملف نصي؟",
        options: ["tail", "top", "head", "first"],
        answer: "head",
        explanation: "الأمر head يعرض بداية الملف، والافتراضي هو أول عشرة أسطر."
    },
    {
        question: "ما هي الوظيفة الأساسية للأمر (grep) في نظام لينكس؟",
        options: ["نسخ الملفات", "البحث عن نمط نصي داخل الملفات", "تغيير ملكية الملف", "حذف المجلدات الفارغة"],
        answer: "البحث عن نمط نصي داخل الملفات",
        explanation: "يستخدم grep للبحث عن نصوص محددة مطابقة لنمط معين."
    },
    {
        question: "ما هي وظيفة الرمز (|) Pipe في لينكس؟",
        options: ["تنفيذ أمرين في نفس الوقت", "استخدام مخرجات أمر كمدخلات لأمر آخر", "حفظ المخرجات في ملف", "إيقاف تنفيذ الأمر"],
        answer: "استخدام مخرجات أمر كمدخلات لأمر آخر",
        explanation: "يقوم الـ Pipe بربط مخرج الأمر الأول ليكون مدخلاً للأمر الذي يليه."
    },
    {
        question: "أي أداة تستخدم لتحرير النصوص من خلال واجهة السطر البرمجي (Terminal)؟",
        options: ["Gedit", "Vim", "LibreOffice", "Chrome"],
        answer: "Vim",
        explanation: "Vim هو محرر نصوص قوي يعمل مباشرة داخل الطرفية."
    },
    {
        question: "ما هي وظيفة الأمر (ps)؟",
        options: ["عرض حالة الذاكرة", "عرض العمليات الحالية (Processes)", "تغيير كلمة المرور", "جدولة المهام"],
        answer: "عرض العمليات الحالية (Processes)",
        explanation: "يعرض ps قائمة بالعمليات النشطة حالياً التي يشغلها المستخدم أو النظام."
    },
    {
        question: "ما هو الأمر المستخدم لإنهاء عملية (Process) معينة باستخدام رقمها (PID)؟",
        options: ["stop", "exit", "kill", "terminate"],
        answer: "kill",
        explanation: "يرسل الأمر kill إشارة لإنهاء العملية المرتبطة برقم الـ PID المحدد."
    },
    {
        question: "ماذا تعني حالة الخروج (Exit Status) بقيمة (0)؟",
        options: ["فشل تنفيذ الأمر", "الأمر قيد التنفيذ", "نجاح تنفيذ الأمر بدون أخطاء", "الأمر غير موجود"],
        answer: "نجاح تنفيذ الأمر بدون أخطاء",
        explanation: "القيمة 0 تعني النجاح، بينما أي قيمة أخرى (1-255) تعني وجود خطأ."},
    {
        question: "أي أمر يعيد معلومات عن نوع الملف (هل هو نصي، مضغوط، تنفيذي...)؟",
        options: ["whatis", "type", "file", "info"],
        answer: "file",
        explanation: "الأمر file يحلل محتوى الملف لتحديد نوعه الفعلي."
    },
    {
        question: "ماذا يفعل الأمر (df -h)؟",
        options: ["عرض استهلاك الذاكرة العشوائية", "عرض المساحة الحرة في الأقراص بتنسيق مفهوم", "عرض سرعة الاتصال بالشبكة", "البحث عن ملفات مكررة"],
        answer: "عرض المساحة الحرة في الأقراص بتنسيق مفهوم",
        explanation: "df (Disk Free) والخيار -h يعرض المساحة بجيجابايت وميجابايت بدلاً من البايت."
    },
    {
        question: "لتغيير كلمة مرور المستخدم الحالي، نستخدم الأمر:",
        options: ["userpass", "chpass", "passwd", "setpassword"],
        answer: "passwd",
        explanation: "passwd هو الأمر المخصص لتغيير كلمات مرور الحسابات."
    },
    {
        question: "ما هو الملف الذي يحتوي على معلومات المستخدمين وكلمات مرورهم المشفرة؟",
        options: ["/etc/passwd", "/etc/shadow", "/bin/users", "/home/secure"],
        answer: "/etc/shadow",
        explanation: "يخزن ملف /etc/shadow كلمات المرور بتشفير عالٍ لزيادة الأمان."
    },
    {
        question: "أي أمر يستخدم لعرض تاريخ ووقت النظام؟",
        options: ["time", "cal", "date", "now"],
        answer: "date",
        explanation: "date يعرض الوقت والتاريخ الحاليين للنظام."
    },
    {
        question: "الأمر (man) يستخدم لـ:",
        options: ["إدارة المستخدمين", "عرض دليل المساعدة للأوامر", "ترتيب الملفات", "قياس سرعة المعالج"],
        answer: "عرض دليل المساعدة للأوامر",
        explanation: "man (Manual) يوفر صفحات المساعدة والتوثيق لكل أمر في لينكس."
    },
    {
        question: "عند ظهور رسالة (Bash: command not found)، ماذا يعني ذلك؟",
        options: ["النظام يحتاج تحديث", "خطأ في كتابة التعليمة أو عدم وجودها", "المستخدم ليس لديه صلاحية", "الملف فارغ"],
        answer: "خطأ في كتابة التعليمة أو عدم وجودها",
        explanation: "هذا هو التنبيه الافتراضي عندما يفشل الغلاف في العثور على البرنامج المطلوب."
    },
    {
        question: "في لغة البرمجة Bash، كيف يتم تعريف متغير بشكل صحيح؟",
        options: ["var x = 10", "x := 10", "x=10", "set x 10"],
        answer: "x=10",
        explanation: "في Bash، يجب عدم وضع مسافات قبل أو بعد علامة اليساوي عند التعيين."
    },
    {
        question: "في Bash Script، ما هو الرمز المستخدم للإشارة إلى جميع الوسائط الممررة للسكربت؟",
        options: ["$0", "$#", "$@", "$?"],
        answer: "$@",
        explanation: "$@ تمثل مصفوفة بكافة الوسائط (Arguments) المرسلة للسكربت."
    },
    {
        question: "ما هو السطر الأول (Shebang) الذي يجب أن يبدأ به أي Bash Script؟",
        options: ["#!/bin/bash", "#bash", "/bin/sh", "run bash"],
        answer: "#!/bin/bash",
        explanation: "يخبر الـ Shebang النظام بالبرنامج الذي يجب استخدامه لتفسير هذا الملف."
    },
    {
        question: "كيف نكتب تعليقاً (Comment) داخل Bash Script؟",
        options: ["//", "/* */", "#", "--"],
        answer: "#",
        explanation: "يستخدم رمز الهاش # لكتابة الملاحظات والتعليقات التي يتجاهلها المترجم."
    },
    {
        question: "أي اختصار يستخدم لإرسال إشارة نهاية الملف (EOF) أو إغلاق جلسة العمل؟",
        options: ["Ctrl + c", "Ctrl + d", "Ctrl + alt", "Esc"],
        answer: "Ctrl + d",
        explanation: "Ctrl + d يرسل إشارة EOF ويؤدي لإغلاق الجلسة أو الملف المفتوح بـ cat."
    },
    {
        question: "أي اختصار يستخدم لإيقاف عملية تعمل حالياً (Interrupt)؟",
        options: ["Ctrl + c", "Ctrl + d", "Ctrl + z", "Esc"],
        answer: "Ctrl + c",
        explanation: "Ctrl + c يرسل إشارة SIGINT لإيقاف تنفيذ الأمر الجاري فوراً."
    },
    {
        question: "ما هو الاختصار المستخدم للخروج من كامل النظام (Power off) حسب ملاحظات العملي؟",
        options: ["Ctrl + d", "Ctrl + alt", "Esc", "Alt + F4"],
        answer: "Ctrl + alt",
        explanation: "حسب السياق العملي المذكور، يستخدم هذا المزيج مع خيارات الطاقة."
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