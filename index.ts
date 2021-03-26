import { Client } from "discord.js"

const bot = new Client();

type ActivityType = 'PLAYING'
    | 'STREAMING';

bot.on("ready", function() {
    console.log(`${bot.user.username} is Login`);

    const setActivity = (status: string, type: any) => bot.user?.setActivity(status, {
        type: type,
        url: 'https://www.youtube.com/channel/UCi4wbRX2jyWazO9XG6UZuKg'
    });
    let statusIndex = 0;
    let typeIndex = 0;

    const setStatus = () => {
	        const status = ["youtube"];
        
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
