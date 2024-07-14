const initialTasks = [];

const additionalTasks = {
    חתונה: [
        { timeframe: 'שנה לאירוע', tasks: [{ label: 'הזמנת תקליטנים', completed: false }, { label: 'בדיקת תאורה וסאונד', completed: false }] },
        { timeframe: 'שישה חודשים לאירוע', tasks: [{ label: 'הזמנת צלם', completed: false }, { label: 'בחירת שמלת כלה', completed: false }, { label: 'הזמנת פרחים', completed: false }] },
        { timeframe: 'שלושה חודשים לאירוע', tasks: [{ label: 'הכנת רשימת מוזמנים', completed: false }, { label: 'בחירת תפריט', completed: false }, { label: 'בחירת טבעות נישואין', completed: false }, { label: 'תיאום עם רב', completed: false }] },
        { timeframe: 'חודש לאירוע', tasks: [{ label: 'שליחת הזמנות', completed: false }, { label: 'קביעת פגישות סופיות עם ספקים', completed: false }, { label: 'מדידת שמלת כלה סופית', completed: false }] },
        { timeframe: 'שבוע לאירוע', tasks: [{ label: 'בדיקת סידורי ישיבה', completed: false }, { label: 'אישור סופי עם ספקים', completed: false }, { label: 'תיאום הסעה לאורחים', completed: false }] },
        { timeframe: 'שלושה ימים לאירוע', tasks: [{ label: 'תיאום עם ספקים', completed: false }, { label: 'איסוף חליפת חתן', completed: false }] },
        { timeframe: 'יומיים לאירוע', tasks: [{ label: 'בחירת מוזיקה לחופה', completed: false }, { label: 'הכנת נאומים', completed: false }] },
        { timeframe: 'יום לאירוע', tasks: [{ label: 'איסוף שמלת כלה', completed: false }, { label: 'פגישת חזרה עם הרב', completed: false }, { label: 'אישור סופי עם כל הספקים', completed: false }] }
    ],
    חינה: [
        { timeframe: 'שלושה חודשים לאירוע', tasks: [{ label: 'הזמנת תלבושות', completed: false }, { label: 'הזמנת מאפרת', completed: false }, { label: 'בחירת אולם', completed: false }] },
        { timeframe: 'חודש לאירוע', tasks: [{ label: 'תיאום עם ספקים', completed: false }] },
        { timeframe: 'שבוע לאירוע', tasks: [{ label: 'אישור סופי עם ספקים', completed: false }, { label: 'בדיקת סידורי ישיבה', completed: false }] },
        { timeframe: 'שלושה ימים לאירוע', tasks: [{ label: 'איסוף תלבושות', completed: false }, { label: 'בחירת מוזיקה', completed: false }] },
        { timeframe: 'יום לאירוע', tasks: [{ label: 'קביעת פגישת חזרה', completed: false }] }
    ],
    ברמצווה: [
        { timeframe: 'חצי שנה לאירוע', tasks: [{ label: 'הזמנת דיג\'יי', completed: false }, { label: 'הזמנת אולם', completed: false }] },
        { timeframe: 'שלושה חודשים לאירוע', tasks: [{ label: 'הכנת דרשה', completed: false }, { label: 'הזמנת צלם', completed: false }, { label: 'בחירת תלבושת לחתן', completed: false }] },
        { timeframe: 'חודש לאירוע', tasks: [{ label: 'שליחת הזמנות', completed: false }, { label: 'אישור סופי עם ספקים', completed: false }, { label: 'תיאום הסעה לאורחים', completed: false }] },
        { timeframe: 'שבוע לאירוע', tasks: [{ label: 'תיאום אחרון עם הרב', completed: false }, { label: 'בדיקת סידורי ישיבה', completed: false }] },
        { timeframe: 'שלושה ימים לאירוע', tasks: [{ label: 'הכנת תקליטנים', completed: false }, { label: 'הכנת נאומים', completed: false }] },
        { timeframe: 'יום לאירוע', tasks: [{ label: 'איסוף בגדים', completed: false }, { label: 'פגישת חזרה עם הרב', completed: false }] }
    ],
    ברית: [
        { timeframe: 'שבוע לאירוע', tasks: [{ label: 'סגירת מוהל', completed: false }, { label: 'הזמנת אולם', completed: false }] },
        { timeframe: 'שלושה ימים לאירוע', tasks: [{ label: 'אישור סופי עם ספקים', completed: false }, { label: 'הכנת תלבושת לתינוק', completed: false }] },
        { timeframe: 'יום לאירוע', tasks: [{ label: 'אישור סופי עם המוהל', completed: false }, { label: 'בדיקת סידורי ישיבה', completed: false }, { label: 'אישור סופי עם ספקים', completed: false }] }
    ]
};

const CheckListData = ({ eventType }) => {
    let additionalTasksForEvent = [];

    if (eventType === 'חתונה') {
        additionalTasksForEvent = additionalTasks.חתונה;
    } else if (eventType === 'חינה') {
        additionalTasksForEvent = additionalTasks.חינה;
    } else if (eventType === 'בר/בת מצווה') {
        additionalTasksForEvent = additionalTasks.ברמצווה;
    } else if (eventType === 'ברית') {
        additionalTasksForEvent = additionalTasks.ברית;
    }

    return [...initialTasks, ...additionalTasksForEvent];
};

export default CheckListData;
