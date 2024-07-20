const initialTasks = [];

const additionalTasks = {
    חתונה: [
        {
            timeframe: 'שנה לאירוע',
            tasks: [
                { label: 'הגדרת המטרות והקונספט', completed: false },
                { label: 'קביעת התאריך והשעה', completed: false },
                { label: 'רשימת המוזמנים הראשונית', completed: false },
                { label: 'בחירת המקום', completed: false },
                { label: 'בחירת תאריך יעד להזמנות', completed: false }
            ]
        },
        {
            timeframe: 'שישה חודשים לאירוע',
            tasks: [
                { label: 'בחירת ספקים עיקריים (קייטרינג, צלם, DJ וכו)', completed: false },
                { label: 'קבלת הצעות מחיר והשוואה', completed: false },
                { label: 'עיצוב האירוע (נושא, צבעים)', completed: false },
                { label: 'עיצוב והדפסת ההזמנות', completed: false },
                { label: 'שכירת מנהל אירועים (אם רלוונטי)', completed: false }
            ]
        },
        {
            timeframe: 'שלושה חודשים לאירוע',
            tasks: [
                { label: 'הכנת רשימת מוזמנים סופית', completed: false },
                { label: 'בחירת תפריט סופי עם הקייטרינג', completed: false },
                { label: 'בחירת טבעות נישואין', completed: false },
                { label: 'תיאום עם רב/רשמת הנישואין', completed: false },
                { label: 'אישור סופי עם הספקים', completed: false },
                { label: 'בחירת עיצוב ההזמנות', completed: false }
            ]
        },
        {
            timeframe: 'חודש לאירוע',
            tasks: [
                { label: 'שליחת ההזמנות הסופיות', completed: false },
                { label: 'קביעת פגישות סופיות עם כל הספקים', completed: false },
                { label: 'מדידת שמלת כלה סופית', completed: false },
                { label: 'הכנת תוכנית ישיבה', completed: false }
            ]
        },
        {
            timeframe: 'שבוע לאירוע',
            tasks: [
                { label: 'בדיקת סידורי ישיבה סופיים', completed: false },
                { label: 'אישור סופי עם כל הספקים', completed: false },
                { label: 'תיאום הסעה לאורחים (אם רלוונטי)', completed: false },
                { label: 'הכנת חבילות הצלה', completed: false }
            ]
        },
        {
            timeframe: 'שלושה ימים לאירוע',
            tasks: [
                { label: 'פגישה אחרונה עם מנהל האירועים (אם יש)', completed: false },
                { label: 'איסוף חליפת חתן', completed: false },
                { label: 'איסוף כל החומרים והקישוטים', completed: false }
            ]
        },
        {
            timeframe: 'יומיים לאירוע',
            tasks: [
                { label: 'בחירת מוזיקה לחופה', completed: false },
                { label: 'הכנת נאומים', completed: false },
                { label: 'סידור השולחנות והקישוטים', completed: false }
            ]
        },
        {
            timeframe: 'יום לאירוע',
            tasks: [
                { label: 'איסוף שמלת כלה', completed: false },
                { label: 'פגישת חזרה עם הרב/רשמת הנישואין', completed: false },
                { label: 'אישור סופי עם כל הספקים', completed: false },
                { label: 'הירגעות והנאה מהיום המיוחד!' , completed: false }
            ]
        }
    ],
    חינה: [{timeframe: 'שנה לאירוע', tasks: [{ label: 'קביעת תאריך החינה', completed: false },{ label: 'קביעת תקציב', completed: false },{ label: 'רשימה ראשונית של מוזמנים', completed: false },{ label: 'בחירת נושא כללי לחינה', completed: false }]},
            {timeframe: 'שלושה חודשים לאירוע',tasks: [
                { label: 'בחירת נושא וצבעים לחינה', completed: false },
                { label: 'הזמנת תלבושות לחינה (כלה, חתן, אורחים)', completed: false },
                { label: 'הזמנת מאפרת ו/או מעצבת שיער', completed: false },
                { label: 'בחירת אולם או גן אירועים', completed: false },
                { label: 'הזמנת קייטרינג המתמחה במאכלים מזרחיים', completed: false }
            ]
        },
        {
            timeframe: 'חודש לאירוע',
            tasks: [
                { label: 'תיאום סופי עם כל הספקים', completed: false },
                { label: "בחירת מוזיקה לחינה (די.ג'יי או להקה)", completed: false },
                { label: 'הכנת רשימת השירים המועדפים', completed: false }
            ]
        },
        {
            timeframe: 'שבוע לאירוע',
            tasks: [
                { label: 'אישור סופי עם כל הספקים', completed: false },
                { label: 'בדיקת סידורי ישיבה', completed: false },
                { label: 'הכנת העיצובים לחינה', completed: false }
            ]
        },
        {
            timeframe: 'שלושה ימים לאירוע',
            tasks: [
                { label: 'איסוף התלבושות', completed: false },
                { label: 'בחירת מוזיקה סופית', completed: false },
                { label: 'הכנת קישוטים לחינה', completed: false }
            ]
        },
        {
            timeframe: 'יום לאירוע',
            tasks: [
                { label: 'קביעת פגישת חזרה עם המאפרת/מעצבת שיער', completed: false },
            ]
        }
    ],
    ברמצווה: [
        {
            timeframe: 'שנה לאירוע',
            tasks: [
                { label: 'קביעת תאריך הבר מצווה ובית הכנסת', completed: false },
                { label: 'קביעת תקציב', completed: false }
            ]
        },
        {
            timeframe: 'חצי שנה לאירוע',
            tasks: [
                { label: 'בחירת אולם או גן אירועים', completed: false },
                { label: "הזמנת די.ג'יי או להקה", completed: false }
            ]
        },
        {
            timeframe: 'שלושה חודשים לאירוע',
            tasks: [
                { label: 'הכנת דרשה או נאום', completed: false },
                { label: 'הזמנת צלם וצלם וידאו', completed: false },
                { label: 'בחירת תלבושת לחתן בר מצווה', completed: false },
                { label: 'בחירת תפריט לאירוע', completed: false }
            ]
        },
        {
            timeframe: 'חודש לאירוע',
            tasks: [
                { label: 'שליחת ההזמנות', completed: false },
                { label: 'אישור סופי עם כל הספקים', completed: false },
                { label: 'תיאום הסעה לאורחים (אם רלוונטי)', completed: false },
                { label: 'הכנת תוכנית הישיבה', completed: false }
            ]
        },
        {
            timeframe: 'שבוע לאירוע',
            tasks: [
                { label: 'תיאום אחרון עם הרב', completed: false },
                { label: 'בדיקת סידורי ישיבה', completed: false },
                { label: 'הכנת תוכנית האירוע', completed: false },
            ]
        },
        {
            timeframe: 'שלושה ימים לאירוע',
            tasks: [
                { label: "הכנת רשימת השירים לדי.ג'יי", completed: false },
                { label: 'הכנת נאומים נוספים (אם יש)', completed: false }
            ]
        },
        {
            timeframe: 'יום לאירוע',
            tasks: [
                { label: 'איסוף הבגדים', completed: false },
                { label: 'בדיקה סופית של האולם והקישוטים', completed: false }
            ]
        }
    ],
    
    ברית: [
        {
            timeframe: 'שבוע לאירוע',
            tasks: [
                { label: 'סגירת מוהל', completed: false },
                { label: 'הזמנת אולם או בית כנסת', completed: false },
                { label: 'הזמנת קייטרינג', completed: false }
            ]
        },
        {
            timeframe: 'שבוע לאירוע',
            tasks: [
                { label: 'אישור סופי עם כל הספקים', completed: false },
                { label: 'הכנת תלבושת לתינוק', completed: false },
            ]
        },
        {
            timeframe: 'יום לאירוע',
            tasks: [
                { label: 'אישור סופי עם המוהל', completed: false },
                { label: 'בדיקת סידורי ישיבה', completed: false },
                { label: 'אישור סופי עם כל הספקים', completed: false }
            ]
        }
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
