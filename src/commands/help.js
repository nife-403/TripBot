const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton } = require('discord.js');
const paginationEmbed = require('discordjs-button-pagination');
const logger = require('../utils/logger.js');
const PREFIX = require('path').parse(__filename).name;
if (process.env.NODE_ENV !== 'production') {require('dotenv').config();}
const ts_icon_url = process.env.ts_icon_url;
const ts_flame_url = process.env.ts_flame_url;

const button1 = new MessageButton()
    .setCustomId('previousbtn')
    .setLabel('Previous')
    .setStyle('DANGER');

const button2 = new MessageButton()
    .setCustomId('nextbtn')
    .setLabel('Next')
    .setStyle('SUCCESS');
const buttonList = [
    button1,
    button2,
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Information bout TripBot Commands'),
    async execute(interaction) {

        const hr_embed = new MessageEmbed()
            .setAuthor({ name: 'TripSit.Me ', url: 'http://www.tripsit.me', iconURL: ts_icon_url })
            .setColor('RANDOM')
            .setTitle('Harm Reduction Modules')
            .addFields(
                { name: 'Info', value: 'This command looks up drug information!', inline: true },
                { name: 'Combo', value: 'Checks the interactions between two drugs.', inline: true },
                { name: 'iDose', value: 'Remind yourself when you last dosed.', inline: true },

                { name: 'Calc DXM', value: 'Use this to calculate dxm dosages', inline: true },
                { name: 'Calc Benzos', value: 'Calculate dosages between benzos', inline: true },
                { name: 'Calc Ketamine', value: 'Calculate ketamine dosages', inline: true },

                { name: 'Calc Psychedelics', value: 'Calculate psychedelic dosages', inline: true },
                { name: 'Pill ID', value: 'Search pill information', inline: true },
                { name: '\u200b', value: '\u200b', inline: true },
            )
            .setFooter({ text: 'Dose responsibly!', iconURL: ts_flame_url });

        const tripsitting_embed = new MessageEmbed()
            .setAuthor({ name: 'TripSit.Me ', url: 'http://www.tripsit.me', iconURL: ts_icon_url })
            .setColor('RANDOM')
            .setTitle('Tripsitting Modules')
            .addFields(
                { name: 'Recovery', value: 'Image: Recovery position.', inline: true },
                { name: 'Breathe', value: 'Gif: Breathing exercises.', inline: true },
                { name: 'Reagents', value: 'Image: Reagent reactions.', inline: true },

                { name: 'KIPP', value: 'Keep It Positive Please!', inline: true },
                { name: 'Hydrate', value: 'Reminder to drink water.', inline: true },
                { name: 'EMS', value: 'Emergency medical info.', inline: true },

                { name: 'Topic', value: 'Displays a random topic.', inline: true },
                { name: 'Joke', value: 'Displays a random joke.', inline: true },
                { name: 'Motivate', value: 'Displays a random quote.', inline: true },

                { name: 'Triptoys', value: 'Cool toys to play with!', inline: true },
                { name: 'Urban Define', value: 'Defines a word.', inline: true },
                { name: 'Remindme', value: 'Sends a reminder in PM.', inline: true },
            )
            .setFooter({ text: 'Dose responsibly!', iconURL: ts_flame_url });

        const utility_embed = new MessageEmbed()
            .setAuthor({ name: 'TripSit.Me ', url: 'http://www.tripsit.me', iconURL: ts_icon_url })
            .setColor('RANDOM')
            .setTitle('Utility Modules')
            .addFields(
                { name: 'About', value: 'Information on Team TripSit and who built this bot.', inline: true },
                { name: 'Contact', value: 'How to contact Team TripSit and the bot builder.', inline: true },
                { name: 'Help', value: 'Information on all commands, you\'re here now!', inline: true },

                { name: 'Bug', value: 'Sends a message to dev.\nAll feedback welcome!', inline: true },
                { name: 'Ping', value: 'Lets you know the bot is alive and working =)', inline: true },
                { name: '\u200b', value: '\u200b', inline: true },
            )
            .setFooter({ text: 'Dose responsibly!', iconURL: ts_flame_url });


        const tripsit_embed = new MessageEmbed()
            .setAuthor({ name: 'TripSit.Me ', url: 'http://www.tripsit.me', iconURL: ts_icon_url })
            .setColor('RANDOM')
            .setTitle('TripSit Specific Modules')
            .addFields(
                { name: 'Karma', value: 'Displays karma (reactions) given and received.', inline: true },
                { name: 'Chitrgupta', value: 'Keeps track of karma (reactions) given and received.', inline: true },
                { name: 'TripSit', value: 'Applies the "NeedsHelp" role on a user, removes all other roles.', inline: true },

                { name: 'TripSitMe', value: 'The #tripsit button: will create a new thread and alert people.', inline: true },
                { name: 'Report', value: 'Allows users to report someone to the TripSit Team.', inline: true },
                { name: 'Mod', value: 'Applies mod actions on a user (timeout, kick, ban).', inline: true },

                { name: 'Invite', value: 'Create an invite to the server for a specific room.', inline: true },
                { name: 'Botmod', value: 'Admin Only - Bans users/guilds from the bot after abuse.', inline: true },
                { name: '\u200b', value: '\u200b', inline: true },
            )
            .setFooter({ text: 'Dose responsibly!', iconURL: ts_flame_url });
        const book = [
            hr_embed,
            tripsitting_embed,
            utility_embed,
            tripsit_embed,
        ];
        paginationEmbed(interaction, book, buttonList);
        // interaction.reply({ embeds: [embed], ephemeral: false });
        logger.debug(`[${PREFIX}] finished!`);
        return;
    },
};
