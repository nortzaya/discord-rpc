import { Client } from "discord.js"

const bot = new Client();

type ActivityType = 'PLAYING'
    | 'STREAMING';

bot.on("ready", function() {
    console.log(`${bot.user.username} is Login`);

    const setActivity = (status: string, type: any) => bot.user?.setActivity(status, {
        type: type,
        url: 'https://www.twitch.tv/i_zaya_i'
    });
    let statusIndex = 0;
    let typeIndex = 0;

    const setStatus = () => {
	        const status = ["В твоих словах не капли правды", "в глазах не вижу твоих чувств", "а все твердили, были правы", "все равно к тебе вернусь", "и как бы ты меня не ранил", "какой бы не оставил след", "все равно к тебе упрямо", "держу свой путь, ну что за бред", "а по щекам моим слёзы", "это твоя вина", "да на кой черт твои розы", "если не любишь меня", "Ну что опять ты начинаешь?", "Не могу понять тебя никак", "То снова ты меня бросаешь", "То снова ко мне возвращаешься", "Я ведь уступаю тебе в каждом вопросе", "Тебе не устраивает, мои нервы на износе", "Для тебя создал рай, милости просим", "А ты снова улетаешь, как всегда меня бросив", "А по щекам твоим слёзы", "Это не моя вина", "Прими эти красные розы", "Не убегай от меня", "а по щекам моим слёзы", "это твоя вина", "да на кой черт твои розы", "если не любишь меня"];
        
        const types: ActivityType[] = [
            "STREAMING",
        ];
        
        statusIndex = statusIndex == (status.length - 1) ? 0 : statusIndex + 1;
        typeIndex = typeIndex == (types.length - 1) ? 0 : typeIndex + 1;

		let start = new Date().getTime();
        setActivity(status[statusIndex], types[typeIndex]).then(function() {
			let end = new Date().getTime();
            console.log(`[${(end-start/1000)%60<<0}] ms: Статус обновлён: ${types[typeIndex]} текст ${status[statusIndex]}`)
        });
    };

    setInterval(setStatus, 3000)
})

bot.login(process.env.TOKEN)
