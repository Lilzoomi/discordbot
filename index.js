const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '..';

const token = 'NzI3OTc3OTU0NTQxMzA1OTI4.XvzsTQ.XVkk1hzi7DxRf6f5QJE6J7I3Nq4'

const activities_list = [
    "The bot was created by 𝙯𝙤𝙢𝙗𝙞𝙚 𝙗𝙤𝙮#0014",
    "לא לשכוח לשתף את הבוט",
    "prefix: .."
]; // creates an arraylist containing phrases you want your bot to switch through.

bot.on('ready', () => {
    console.log('just a normal bot עכשיו מוכן')

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list.
        bot.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

bot.on('guildMemberAdd', member => {
    const welcomembed = new Discord.MessageEmbed()
    .addField('ברוך הבא לשרת', member);

    // Send the message to a designated channel on a server: 
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(welcomembed);
  });

bot.on('message', async message => {

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();





    if (!message.guild) return;

    if (command === 'play') {
        // Only try to join the sender's voice channel if they are in one themselves

        const connection = await message.member.voice.channel.join();

        const dispatcher = connection.play('/home/discord/audio.mp3', {
            volume: 0.5,
        });


        //if (message.member.voice.channel) {
        //const connection = await message.member.voice.channel.join();
        //} else {
        //  message.reply('You need to join a voice channel first!');
        //}

        dispatcher.pause();
        dispatcher.resume();

        dispatcher.setVolume(0.5); // half the volume

        const ytdl = require('ytdl-core');

        //connection.play('audio/audio.mp3');
        //message.channel.send('תשמע את ZOMBIEBOY מלכנו צורח')

        
        connection.play(ytdl(`${args}`, { filter: 'audioonly' }));
        message.channel.send(`עכשיו מנגן ${args}`)
        


        // Files on the internet
        //connection.play('http://www.sample-videos.com/audio/mp3/wave.mp3');

        // Local files

        dispatcher.destroy(); // end the stream
    }

    else if (command === 'rip') {
        // Create the attachment using MessageAttachment
        message.channel.send('https://i.imgur.com/w3duR07.png')
    }

    else if (command === 'rn') {
        const m = await message.channel.send("LOADING.");
        m.edit("LOADING..");
        m.edit("LOADING...");
        m.edit("LOADING...");
        m.edit(Math.random());
      }

    else if (command === 'say') {
        if (!args.length) {
            return message.channel.send(`שישים ותשע, ${message.author}!`);
        }

        message.delete()

        message.channel.send('**עדכון חדש**:');

        const sayembed = new Discord.MessageEmbed()
            .addField('עדכון חדש', args)

        message.channel.send(sayembed);
        message.channel.send('@everyone')
    }

    else if (message.content.includes('changeNick')) {
        message.channel.send('OOOOOOOO')
        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('I don\'t have permission to change your nickname!');
        message.member.setNickname(message.content.replace('changeNick ', ''));
    }

    else if (command === 'ban') {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .ban({
                        reason: `המשתמש הזה קיבל באן מהשרת ${user.tag}!`,
                    })
                    .then(() => {
                        message.reply(`קיבל באן ${user.tag}`);
                    })
                    .catch(err => {
                        message.reply('לא הצלחתי להביא באן למשתמש הזה');
                        console.error(err);
                    });
            } else {
                message.reply("המשתמש הזה לא נמצא בשרת!");
            }
        } else {
            message.reply("לא תייגת מישהו לתת לו באן!");
        }
    }


    if (command == 'kick') {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .kick(`${user.tag}`)
                    .then(() => {
                        message.reply(`המשתמש הוקק מהשרת ${user.tag}`);
                    })
                    .catch(err => {
                        message.reply('לא הצלחתי לתת קיק לבן אדם הזה');
                        console.error(err);
                    });
            } else {
                message.reply("המשתמש הזה לא נמצא בשרת");
            }
        } else {
            message.reply("לא תייגת מישהו לתת לו קיק!");
        }
    }

    else if (command === 'namesay') {

        const namesayembed = new Discord.MessageEmbed()
            .addField(':**עדכון חדש**', args)
            .addField('העדכון הובא לכם על ידי', message.author.username);

        message.channel.send(namesayembed);
        message.channel.send('@everyone')
        message.delete()
    }

    else if (command === 'help') {

        const helpembed = new Discord.MessageEmbed()
            .setTitle('עזרה לבוט: just a normal bot')
            .setColor('#a83232')
            .setAuthor('תלחצו עלי כדי להזמין אותי לשרת שלכם!', 'https://cdn.discordapp.com/app-icons/727977954541305928/09e60e61999f057a2dd36dc32b0b93ae.png?size=256', 'https://discord.com/oauth2/authorize?client_id=727977954541305928&permissions=8&scope=bot')
            .setDescription('בוט זה נוצר על ידי 𝙯𝙤𝙢𝙗𝙞𝙚 𝙗𝙤𝙮#0014\n כל שאלה שיש לכם אתם מוזמנים לפנות אליו')
            .setThumbnail('https://cdn.discordapp.com/app-icons/727977954541305928/09e60e61999f057a2dd36dc32b0b93ae.png?size=256')
            .addField('..help', 'מראה את ההודעה הזאת')
            .addField('..ping', 'לקרוא למישהו(כדי שזה יעבוד צריך לעשות את הפקודה הזאת ואז לתייג מישהו) יכול לשמש גם בשביל לקרוא לרולים, למשל צוות')

        message.channel.send(helpembed);
        message.reply('קח עזרה')

    }

    else if (command === 'ping') {
        message.channel.send(`${args} ${message.author.username} מחפש אותך`)
        message.delete()
    }

    else if (command === 'clear') {
        if (!args) message.channel.bulkDelete(1)
        message.delete()
        message.channel.bulkDelete(args[1])
    }

    else if (command === 'hi') {
        message.channel.send('LOLOLOLOL', { tts: true });
    }

    else if (command === 'addrole') {
        let role = message.guild.roles.find(r => r.name === "RoleName");

        // Let's pretend you mentioned the user you want to add a role to (!addrole @user RoleName):
        let member = message.mentions.members.first();

        // or the person who made started the command: let member = message.member;

        //adds the role
        member.roles.add(role)
    }
})

bot.login(token);