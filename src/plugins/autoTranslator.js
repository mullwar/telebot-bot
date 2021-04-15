const t = require("translatte");

const TRANSLATE_TO = "en";
const TRANSLATE_ICONS = {
    "ca": "🇪🇸",
    "ar": "🇾🇪",
    "ps": "🇦🇫",
    "uz": "🇺🇿",
    "tk": "🇹🇲",
    "en": "🇿🇼",
    "sq": "🇽🇰",
    "hy": "🇨🇾",
    "ru": "🇷🇺",
    "pt": "🇹🇱",
    "es": "🇻🇪",
    "gn": "🇵🇾",
    "sm": "🇼🇸",
    "de": "🇱🇺",
    "nl": "🇸🇽",
    "pa": "🇨🇼",
    "sv": "🇸🇪",
    "az": "🇦🇿",
    "bs": "🇲🇪",
    "hr": "🇲🇪",
    "sr": "🇽🇰",
    "bn": "🇧🇩",
    "fr": "🇾🇹",
    "ff": "🇬🇳",
    "bg": "🇧🇬",
    "rn": "🇧🇮",
    "ms": "🇸🇬",
    "ay": "🇧🇴",
    "qu": "🇧🇴",
    "dz": "🇧🇹",
    "no": "🇸🇯",
    "nb": "🇳🇴",
    "nn": "🇳🇴",
    "tn": "🇿🇦",
    "be": "🇧🇾",
    "ln": "🇨🇬",
    "kg": "🇨🇩",
    "sw": "🇺🇬",
    "lu": "🇨🇩",
    "sg": "🇨🇫",
    "it": "🇻🇦",
    "zh": "🇹🇼",
    "el": "🇬🇷",
    "tr": "🇹🇷",
    "cs": "🇨🇿",
    "sk": "🇸🇰",
    "da": "🇩🇰",
    "et": "🇪🇪",
    "ti": "🇪🇷",
    "eu": "🇪🇸",
    "gl": "🇪🇸",
    "oc": "🇪🇸",
    "am": "🇪🇹",
    "fi": "🇫🇮",
    "fj": "🇫🇯",
    "hi": "🇮🇳",
    "ur": "🇵🇰",
    "fo": "🇫🇴",
    "ka": "🇬🇪",
    "kl": "🇬🇱",
    "ch": "🇲🇵",
    "ht": "🇭🇹",
    "hu": "🇭🇺",
    "id": "🇮🇩",
    "ga": "🇮🇪",
    "he": "🇮🇱",
    "gv": "🇮🇲",
    "ku": "🇮🇶",
    "fa": "🇮🇷",
    "is": "🇮🇸",
    "ja": "🇯🇵",
    "ky": "🇰🇬",
    "km": "🇰🇭",
    "ko": "🇰🇷",
    "kk": "🇰🇿",
    "lo": "🇱🇦",
    "si": "🇱🇰",
    "ta": "🇸🇬",
    "st": "🇿🇦",
    "lt": "🇱🇹",
    "lb": "🇱🇺",
    "lv": "🇱🇻",
    "ro": "🇷🇴",
    "mg": "🇲🇬",
    "mh": "🇲🇭",
    "mk": "🇲🇰",
    "my": "🇲🇲",
    "mn": "🇲🇳",
    "mt": "🇲🇹",
    "dv": "🇲🇻",
    "ny": "🇲🇼",
    "af": "🇿🇦",
    "ne": "🇳🇵",
    "na": "🇳🇷",
    "mi": "🇳🇿",
    "pl": "🇵🇱",
    "rw": "🇷🇼",
    "sl": "🇸🇮",
    "so": "🇸🇴",
    "ss": "🇿🇦",
    "th": "🇹🇭",
    "tg": "🇹🇯",
    "to": "🇹🇴",
    "uk": "🇺🇦",
    "la": "🇻🇦",
    "vi": "🇻🇳",
    "bi": "🇻🇺",
    "nr": "🇿🇦",
    "ts": "🇿🇦",
    "ve": "🇿🇦",
    "xh": "🇿🇦",
    "zu": "🇿🇦",
    "sn": "🇿🇼",
    "nd": "🇿🇼"
};

module.exports = {
    id: "telebot-auto-translator",
    name: "Auto Translator Plugin",
    version: "1.0.0",

    plugin(bot, config = {}) {
        const {translateTo} = config;

        function translate(value, translateTo = TRANSLATE_TO) {
            return t(value, {to: translateTo}).then(({text, from}) => {
                const iso = from.language.iso.toLowerCase();
                if (iso !== translateTo) {
                    const icon = TRANSLATE_ICONS[iso];
                    return [icon, text].filter(Boolean).join(" ");
                }
                return null;
            })
        }

        bot.on("text", (msg) => {
            const {
                message_id,
                text,
                chat: {
                    id: chat_id,
                    type
                }
            } = msg;

            if (!(["group", "supergroup"].includes(type))) return;

            return translate(text, translateTo).then((value) => {
                if (value) {
                    return bot.sendMessage(chat_id, value, {
                        reply_to_message_id: message_id,
                        disable_notification: true,
                        disable_web_page_preview: true
                    });
                }
            });
        });

    }
};