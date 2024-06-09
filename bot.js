
const { Telegraf } = require('telegraf')
const fs = require('fs');
const bot = new Telegraf('7380362114:AAHUiXT0NDzGX6LzUj1aK8ZwdGvglzUT1Uo')
const groupId = '-1002194117637'
let isAcceptingAmount = false;

let data = {
    user: {},
    userWallet: {}
};
try {
    data = JSON.parse(fs.readFileSync('data.json'));
} catch (error) {
    data = { user: {}, userWallet: {} };
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function dataFunction(ctx) {
    let chatId = ctx.message.chat.id;
    let name = ctx.message.from.first_name;
    let chatidName = 'chat id'
    let Name = 'chat id'
    if (!data.user[name]) {
        data.user[Name] = name;
        data.user[chatidName] = chatId;
        if (!data.userWallet[chatId]) {
            data.userWallet[chatId] = {
                chatId: chatId,
                walletId: Math.floor(10000 + Math.random() * 9999999),
                balance: 0
            };
        }

        fs.writeFileSync('data.json', JSON.stringify(data));
    }
}
bot.start((ctx) => {
    chatId = ctx.message.chat.id
    let name = ctx.message.from.first_name;
    dataFunction(ctx)
    ctx.reply(`سلام میلیونر جدید ${name} 👋🏻😻 \n با چت ایدی ${ctx.message.chat.id} ❤️‍🔥😱 \n ایدی کیف پول شما: ${data.userWallet[chatId].walletId}\n منو ما رو نگا کن که بریم برا پولدار شدن 💰😎 \n - منو \n رفیق باید تو گروهمون عضو باشی که بزارم بازی کنی ❤️☺️ \n کمک خواستی خودم هستم 🫶🏻😉 \n /help `, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "بزن بریم 💸😍", url: "https://t.me/+Tkk7Z9peEKQ1YWNk", callback_data: "clickGroup" }]
            ]
        }
    });
});
// ---------- help --------------
bot.help((ctx) =>
    ctx.reply(`${ctx.message}`)
);
// ----------- menu --------------
bot.hears('منو', (ctx) =>
    ctx.reply("منو ما: ", {
        reply_markup: {
            inline_keyboard: [
                [{ text: " حساب 💳 ", callback_data: "account" }, { text: " راهنما 🛎 ", callback_data: "guide" }],
                [{ text: "💎 بازی 🕹 ", callback_data: "game" }],
                [{ text: "🔥گروه ما🔥", callback_data: "gap" }],
            ]
        }
    })
);
// ----------- command ---------------
bot.command("guide", (ctx) => {
    ctx.reply("قسمت راهنما")
});
// ----------- game -------------
bot.hears('💎 بازی 🕹', (ctx) => {
    let userWallet = data.userWallet[ctx.from.id];
    let balanceAccount = userWallet ? userWallet.balance : 0;
    ctx.reply(`موجودی حساب شما: ${balanceAccount}`)
    setTimeout(() => {
        if (balanceAccount >= 5000)
            ctx.reply('همین الان شروع کنید 👇💸😻', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "💎 بازی کردن 🕹", callback_data: 'playGame' }],
                    ]
                }
            })
        else {
            ctx.reply('حساب خود را شارژ کنید 🔋🤑', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "15/000", callback_data: "charge_15/000" }, { text: "30/000", callback_data: "charge_30/000" }, { text: "50/000", callback_data: "charge_50/000" }],
                        [{ text: "75/000", callback_data: "charge_75/000" }, { text: "100/000", callback_data: "charge_100/000" }, { text: "150/000", callback_data: "charge_150/000" }],
                        [{ text: "200/000", callback_data: "charge_200/000" }]
                    ]
                }
            });
        }
    }, 1000)
 });
bot.action('game', (ctx) => {
    let userWallet = data.userWallet[ctx.from.id];
    let balanceAccount = userWallet ? userWallet.balance : 0;
    ctx.reply(`موجودی حساب شما: ${balanceAccount}`)
    if (balanceAccount >= 5000)
        ctx.reply('همین الان شروع کنید 👇💸😻', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💎 بازی کردن 🕹", callback_data: 'playGame' }],
                ]
            }
        })
    else {
        ctx.reply('حساب خود را شارژ کنید 🔋🤑', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "15/000", callback_data: "charge_15/000" }, { text: "30/000", callback_data: "charge_30/000" }, { text: "50/000", callback_data: "charge_50/000" }],
                    [{ text: "75/000", callback_data: "charge_75/000" }, { text: "100/000", callback_data: "charge_100/000" }, { text: "150/000", callback_data: "charge_150/000" }],
                    [{ text: "200/000", callback_data: "charge_200/000" }]
                ]
            }
        })
    }
});
bot.action("playGame", (ctx) => {
    ctx.reply("منطق بازی")
});
// ------- deposet and withdraw : wallet account --------
bot.hears('حساب 💳', (ctx) => {
    let userWallet = data.userWallet[ctx.from.id];
    let balanceAccount = userWallet ? userWallet.balance : 0;
    ctx.reply(`موجودی حساب شما: ${balanceAccount} \n `)
    ctx.reply(' یکی از گزینه های زیر را انتخاب کنید: ', {
        reply_markup: {
            inline_keyboard: [
                // [{ text: "موجودی حساب 💰", callback_data: 'balanceBTN' }],
                [{ text: " شارژ 🔋🤩 ", callback_data: "charge" }, { text: " برداشت 🪫😱 ", callback_data: "harvest" }]
            ]
        }
    })
});
bot.action('account', (ctx) => {
    let userWallet = data.userWallet[ctx.from.id];
    let balanceAccount = userWallet ? userWallet.balance : 0;
    ctx.reply(`موجودی حساب شما: ${balanceAccount}`)
    ctx.reply(' یکی از گزینه های زیر را انتخاب کنید: ', {
        reply_markup: {
            inline_keyboard: [
                // [{ text: "موجودی حساب 💰", callback_data: 'balanceBTN' }],
                [{ text: " شارژ 🔋🤩 ", callback_data: "charge" }, { text: " برداشت 🪫😱 ", callback_data: "harvest" }]
            ]
        }
    })
});
bot.action("charge", (ctx) => {
    ctx.reply(" مبلغ مورد نظرتو وارد کنین: 🔋🤑", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "15/000", callback_data: "charge_15/000" }, { text: "30/000", callback_data: "charge_30/000" }, { text: "50/000", callback_data: "charge_50/000" }],
                [{ text: "75/000", callback_data: "charge_75/000" }, { text: "100/000", callback_data: "charge_100/000" }, { text: "150/000", callback_data: "charge_150/000" }],
                [{ text: "200/000", callback_data: "charge_200/000" }]
            ]
        }
    });
});
bot.action(/charge_.*/, (ctx) => {
    let selectedAmount = ctx.match[0].split("_")[1]; // get the callback data
    ctx.reply(`مبلغ انتخابی شما : ${selectedAmount} \n لطفا تایید کنید. 😱💋`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "تایید میکنم 🤟🏾😎", callback_data: "acceptAmount" }, { text: "اصلاحش میکنم❤️😇", callback_data: "correct" }]
            ]
        }
    });
});
bot.action('harvest', (ctx) => {
    ctx.reply(" مبلغ مورد نظرتو وارد کنین: 🪫😱", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "50/000", callback_data: "harvest_50/000" }, { text: "100/000", callback_data: "harvest_100/000" }],
                [{ text: "200/000", callback_data: "harvest_200/000" }]
            ]
        }
    });
});
bot.action(/harvest_.*/, (ctx) => {
    let selectedAmount = ctx.match[0].split("_")[1]; // get the callback data
    ctx.reply(`مبلغ انتخابی شما : ${selectedAmount} \n لطفا تایید کنید. 😱💋`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "تایید میکنم 🤟🏾😎", callback_data: "AcceptAmountHarvest" }, { text: "اصلاحش میکنم❤️😇", callback_data: "correctHarvest" }]
            ]
        }
    });
});
bot.action("acceptAmount", (ctx) => {
    isAcceptingAmount = true;
    ctx.reply(`لطفا متن رسید را برای ما ارسال کنید \n متن پیام باید به این صورت باشد. \n مبلغ واریز : \n کد رهگیری: \n ساعت و تاریخ دقیق ارسال: \n چت ایدی خود: \n ⚠️ لطفا توجه داشته باشید که اگه غیر از این چیزی دیگری ارسال شود و یا عکس ارسال کنید یا فایل ما هیچ مسیولتی جهت بازگشت وجه شما نخواهیم داشت.`, {
        reply_markup: {
            force_reply: true
        }
    })
});
bot.action("AcceptAmountHarvest", (ctx) => {
    isAcceptingAmount = true;
    ctx.reply(`لطفا متن رسید را برای ما ارسال کنید \n متن پیام باید به این صورت باشد. \nمبلغ برداشت: \n مقدار موجودی فعلی \n چت ایدی خود: \n ⚠️ لطفا توجه داشته باشید که اگه غیر از این چیزی دیگری ارسال شود و یا عکس ارسال کنید یا فایل ما هیچ مسیولتی جهت بازگشت وجه شما نخواهیم داشت.`, {
        reply_markup: {
            force_reply: true
        }
    });
});
bot.on('text', async (ctx) => {
    if (isAcceptingAmount) {
        let messageText = ctx.message.text;
        let userWallet = data.userWallet[ctx.from.id];
        if (ctx.message.text.includes("مبلغ برداشت")) {
            ctx.reply("پیام شما دریافت شد، لطفا منتظر بمانید. \n صورت حساب شما بعد از تایید به حسابتان واریز خواهد شد.");
            await bot.telegram.sendMessage(groupId, `درخواست واریز وجه ${userWallet.walletId}`);
            await delay(2000);
            await bot.telegram.sendMessage(groupId, messageText);
            await delay(2000);
            await bot.telegram.sendMessage(groupId, "---------------------");
            isAcceptingAmount = false;
        } else if (ctx.message.text.includes("مبلغ واریز")) {
            ctx.reply("پیام شما دریافت شد، لطفا منتظر بمانید. \n صورت حساب شما بعد از تایید به حسابتان واریز خواهد شد.");
            await bot.telegram.sendMessage(groupId, `درخواست برداشت وجه ${userWallet.walletId}`);
            await delay(2000);
            await bot.telegram.sendMessage(groupId, messageText);
            await delay(2000);
            await bot.telegram.sendMessage(groupId, "---------------------");
            isAcceptingAmount = false;
        } else {
            ctx.reply(" اشتباه وارد کردی گل ")
        }
    }
});
bot.action("correct", (ctx) => {
    ctx.reply(" مبلغ مورد نظرتو وارد کنین: 🔋🤑", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "15/000", callback_data: "charge_15/000" }, { text: "30/000", callback_data: "charge_30/000" }, { text: "50/000", callback_data: "charge_50/000" }],
                [{ text: "75/000", callback_data: "charge_75/000" }, { text: "100/000", callback_data: "charge_100/000" }, { text: "150/000", callback_data: "charge_150/000" }],
                [{ text: "200/000", callback_data: "charge_200/000" }]
            ]
        }
    });
});
bot.action("correctHarvest", (ctx) => {
    ctx.reply(" مبلغ مورد نظرتو وارد کنین: 🪫😱", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "50/000", callback_data: "harvest_50/000" }, { text: "100/000", callback_data: "harvest_100/000" }],
                [{ text: "200/000", callback_data: "harvest_200/000" }]
            ]
        }
    });
});
// ---------------- receipt group--------------------
bot.hears("واریز کن", ctx => {
    ctx.reply("برای واریز بنویس \n مثال: \n 1000 واریز 4781660");
    bot.on("message", (ctx) => {
        let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        const parts = ctx.message.text.split(' ');
        console.log(parts)
        if (parts.length !== 3) {
            ctx.reply("اسگل داری اشتباه وارد میکنی 🫡💔 ");
            return;
        }
        const walletId = parseInt(parts[2].trim());
        const state = parts[1].trim();
        const amount = parseInt(parts[0].trim());
        if (isNaN(amount) || (amount <= 15 && amount >= 200000)) {
            ctx.reply("اسگل درست بفرست مبلغشو میخوای منو بر شکست کنی؟؟؟ 😐💔 \n مبلغشو انگلیسی بنویس");
            return;
        }
        let userId;
        for (let id in data.userWallet) {
            if (data.userWallet[id].walletId === walletId) {
                userId = id;
                break;
            }
        }
        if (!userId) {
            ctx.reply("کیف پول مورد نظر یافت نشد.");
            return;
        }
        if (state === "واریز") {
            data.userWallet[userId].balance += amount;
            ctx.reply(`واریز ${amount} به کیف پول ${data.userWallet[userId].walletId} با موفقیت انجام شد.`)
        }
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    })
});
bot.hears("برداشت از کیف پول", ctx => {
    ctx.reply("برای برداشت بنویس \n مثال: \n 1000 برداشت 4781660");
    bot.on("message", (ctx) => {
        let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        const parts = ctx.message.text.split(' ');
        console.log(parts)
        if (parts.length !== 3) {
            ctx.reply("اسگل داری اشتباه وارد میکنی 🫡💔 ");
            return;
        }
        const walletId = parseInt(parts[2].trim());
        const state = parts[1].trim();
        const amount = parseInt(parts[0].trim());
        if (isNaN(amount) || (amount <= 15 && amount >= 200000)) {
            ctx.reply("اسگل درست بفرست مبلغشو میخوای منو بر شکست کنی؟؟؟ 😐💔 \n مبلغشو انگلیسی بنویس");
            return;
        }

        let userId;
        for (let id in data.userWallet) {
            if (data.userWallet[id].walletId === walletId) {
                userId = id;
                break;
            }
        }
        if (!userId) {
            ctx.reply("کیف پول مورد نظر یافت نشد.");
            return;
        }
        if (state === "برداشت") {
            if (data.userWallet[userId].balance >= amount) {
                data.userWallet[userId].balance -= amount;
                ctx.reply(`برداشت ${amount} از کیف پول ${data.userWallet[userId].walletId} با موفقیت انجام شد.`);
            } else {
                ctx.reply("اسگل پول نداره اونقدر 😎🤣");
                return;
            }
        }
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    })
});




// ---------------- گروه ما --------------------------
bot.hears('🔥گروه ما🔥', (ctx) => {
    ctx.reply("  برای عضویت در گروه ما روی دکمه زیر کلیک کنید: 👇😻 ", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "بزن بریم 💸😍", url: "https://t.me/+Tkk7Z9peEKQ1YWNk" }]
            ]
        }
    })
});
bot.action("gap", (ctx) => {
    ctx.reply("  برای عضویت در گروه ما روی دکمه زیر کلیک کنید: 👇😻 ", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "بزن بریم 💸😍", url: "https://t.me/+Tkk7Z9peEKQ1YWNk" }]
            ]
        }
    })
});

bot.launch();


