/* eslint-disable no-unused-vars */

import { stripIndents } from 'common-tags';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  GuildMember,
  Role,
  SlashCommandBuilder,
  TextChannel,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalSubmitInteraction,
  CategoryChannel,
  ChatInputCommandInteraction,
  Colors,
  GuildEmoji,
} from 'discord.js';
// import { db } from '../../../global/utils/knex';
// import {
//   ReactionRoles,
// } from '../../../global/@types/pgdb';
import { SlashCommand } from '../../@types/commandDef';
import { embedTemplate } from '../../utils/embedTemplate';

const F = f(__filename);

export default dReactionRole;

const guildError = 'This must be performed in a guild!';
const memberError = 'This must be performed by a member of a guild!';

type RoleDef = { name: string; value: string };

const colorRoles = [
  { name: '💖 Tuplp', value: env.ROLE_RED },
  { name: '🧡 Marigold', value: env.ROLE_ORANGE },
  { name: '💛 Daffodil', value: env.ROLE_YELLOW },
  { name: '💚 Waterlily', value: env.ROLE_GREEN },
  { name: '💙 Bluebell', value: env.ROLE_BLUE },
  { name: '💜 Hyacinth', value: env.ROLE_PURPLE },
  { name: '💗 Azalea', value: env.ROLE_PINK },
  { name: '🤍 Snowdrop', value: env.ROLE_WHITE },
] as RoleDef[];

// log.debug(F, `Color roles: ${JSON.stringify(colorRoles, null, 2)}`);
// const colorNames = colorRoles.map(role => role.name);
const colorIds = colorRoles.map(role => role.value);

const premiumColorRoles = [
  { name: '💖 Ruby', value: env.ROLE_DONOR_RED },
  { name: '🧡 Sunstone', value: env.ROLE_DONOR_ORANGE },
  { name: '💛 Citrine', value: env.ROLE_DONOR_YELLOW },
  { name: '💚 Jade', value: env.ROLE_DONOR_GREEN },
  { name: '💙 Sapphire', value: env.ROLE_DONOR_BLUE },
  { name: '💜 Amethyst', value: env.ROLE_DONOR_PURPLE },
  { name: '💗 Pezzottaite', value: env.ROLE_DONOR_PINK },
  { name: '🖤 Laboradorite', value: env.ROLE_BLACK },

] as RoleDef[];

// log.debug(F, `Premium Color roles: ${JSON.stringify(premiumColorRoles, null, 2)}`);
// const premiumColorNames = premiumColorRoles.map(role => role.name);
const premiumColorIds = premiumColorRoles.map(role => role.value);

const mindsetRoles = [
  { name: 'Drunk', value: env.ROLE_DRUNK },
  { name: 'High', value: env.ROLE_HIGH },
  { name: 'Rolling', value: env.ROLE_ROLLING },
  { name: 'Tripping', value: env.ROLE_TRIPPING },
  { name: 'Dissociating', value: env.ROLE_DISSOCIATING },
  { name: 'Stimming', value: env.ROLE_STIMMING },
  { name: 'Sedated', value: env.ROLE_SEDATED },
  { name: 'Sober', value: env.ROLE_SOBER },
] as RoleDef[];

// log.debug(F, `Mindset roles: ${JSON.stringify(mindsetRoles, null, 2)}`);
// const mindsetNames = mindsetRoles.map(role => role.name);
const mindsetIds = mindsetRoles.map(role => role.value);

// const pronounRoles = [
//   { name: 'He/Him', value: env.ROLE_PRONOUN_HE },
//   { name: 'She/Her', value: env.ROLE_PRONOUN_SHE },
//   { name: 'They/Them', value: env.ROLE_PRONOUN_THEY },
//   { name: 'Any', value: env.ROLE_PRONOUN_ANY },
//   { name: 'Ask', value: env.ROLE_PRONOUN_ASK },
// ] as RoleDef[];

// log.debug(F, `Pronoun roles: ${JSON.stringify(pronounRoles, null, 2)}`);
// const pronounNames = pronounRoles.map(role => role.name);
// const pronounIds = pronounRoles.map(role => role.value);

export const dReactionRole: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('reaction_role')
    .setDescription('Create a reaction role messages')
    .addSubcommand(subcommand => subcommand
      .setName('custom')
      .setDescription('Create a custom reaction role message')
      .addRoleOption(option => option.setName('role')
        .setRequired(true)
        .setDescription('What role should be applied?'))
      .addStringOption(option => option.setName('emoji')
        .setRequired(true)
        .setDescription('What emoji should be used?'))
      .addBooleanOption(option => option.setName('intro_message')
        .setDescription('Do they need to provide an intro message?'))
      .addChannelOption(option => option.setName('intro_channel')
        .setDescription('Where should the announcement be posted?')))
    .addSubcommand(subcommand => subcommand
      .setName('template')
      .setDescription('Display a pre-defined set of reaction role messages')
      .addStringOption(option => option.setName('set')
        .setRequired(true)
        .setDescription('What set of reaction roles should be displayed?')
        .addChoices(
          { name: 'Color', value: 'color' },
          { name: 'Premium Color', value: 'premium_color' },
          { name: 'Mindset', value: 'mindset' },
          { name: 'Pronoun', value: 'pronoun' },
        ))),
  async execute(interaction) {
    startlog(F, interaction);
    if (!interaction.guild) return false;
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'template') {
      setupTemplateReactionRole(interaction);
    } else if (subcommand === 'custom') {
      setupCustomReactionRole(interaction);
    }
    return true;
  },
};

export async function setupTemplateReactionRole(
  interaction:ChatInputCommandInteraction,
) {
  const set = interaction.options.getString('set', true);
  if (!interaction.guild) return;
  const { guild } = interaction;

  if (set === 'color') {
    const roleRed = await guild.roles.fetch(env.ROLE_RED) as Role;
    const roleOrange = await guild.roles.fetch(env.ROLE_ORANGE) as Role;
    const roleYellow = await guild.roles.fetch(env.ROLE_YELLOW) as Role;
    const roleGreen = await guild.roles.fetch(env.ROLE_GREEN) as Role;
    const roleBlue = await guild.roles.fetch(env.ROLE_BLUE) as Role;
    const rolePurple = await guild.roles.fetch(env.ROLE_PURPLE) as Role;
    const rolePink = await guild.roles.fetch(env.ROLE_PINK) as Role;
    const roleWhite = await guild.roles.fetch(env.ROLE_WHITE) as Role;

    const redEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colortulip') as GuildEmoji;
    const orangeEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colormarigold') as GuildEmoji;
    const yellowEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colordaffodil') as GuildEmoji;
    const greenEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorwaterlily') as GuildEmoji;
    const blueEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorbluebell') as GuildEmoji;
    const purpleEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorhyacinth') as GuildEmoji;
    const pinkEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorazalea') as GuildEmoji;
    const whiteEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorsnowdrop') as GuildEmoji;

    const embed = embedTemplate()
      .setDescription('React to this message to set the color of your nickname!')
      .setFooter({ text: 'You can only pick one color at a time!' })
      .setColor(Colors.Red);

    const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(`${roleRed.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleRed.id}"`)
        .setEmoji(redEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleOrange.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleOrange.id}"`)
        .setEmoji(orangeEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleYellow.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleYellow.id}"`)
        .setEmoji(yellowEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleGreen.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleGreen.id}"`)
        .setEmoji(greenEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
    );

    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(`${roleBlue.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleBlue.id}"`)
        .setEmoji(blueEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(rolePurple.name)
        .setCustomId(`"ID":"RR","RID":"${rolePurple.id}"`)
        .setEmoji(purpleEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(rolePink.name)
        .setCustomId(`"ID":"RR","RID":"${rolePink.id}"`)
        .setEmoji(pinkEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(roleWhite.name)
        .setCustomId(`"ID":"RR","RID":"${roleWhite.id}"`)
        .setEmoji(whiteEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
    );

    await (interaction.channel as TextChannel).send({ embeds: [embed], components: [row1, row2] });
  } else if (set === 'premium_color') {
    const embed = embedTemplate()
      .setDescription(stripIndents`Boosters and Patrons can access new colors!
    React to this message to set the color of your nickname!`)
      .setFooter({ text: 'You can only pick one color at a time, choose wisely!' })
      .setColor(Colors.Purple);

    const roleDonorRed = await guild.roles.fetch(env.ROLE_DONOR_RED) as Role;
    const roleDonorOrange = await guild.roles.fetch(env.ROLE_DONOR_ORANGE) as Role;
    const roleDonorYellow = await guild.roles.fetch(env.ROLE_DONOR_YELLOW) as Role;
    const roleDonorGreen = await guild.roles.fetch(env.ROLE_DONOR_GREEN) as Role;
    const roleDonorBlue = await guild.roles.fetch(env.ROLE_DONOR_BLUE) as Role;
    const roleDonorPurple = await guild.roles.fetch(env.ROLE_DONOR_PURPLE) as Role;
    const roleDonorPink = await guild.roles.fetch(env.ROLE_DONOR_PINK) as Role;
    const roleDonorBlack = await guild.roles.fetch(env.ROLE_BLACK) as Role;

    const redEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorruby') as GuildEmoji;
    const orangeEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorsunstone') as GuildEmoji;
    const yellowEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorcitrine') as GuildEmoji;
    const greenEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorjade') as GuildEmoji;
    const blueEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorsapphire') as GuildEmoji;
    const purpleEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'coloramethyst') as GuildEmoji;
    const pinkEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorpezzottaite') as GuildEmoji;
    const blackEmoji = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'colorlabradorite') as GuildEmoji;

    const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(`${roleDonorRed.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleDonorRed.id}"`)
        .setEmoji(redEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleDonorOrange.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleDonorOrange.id}"`)
        .setEmoji(orangeEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleDonorYellow.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleDonorYellow.id}"`)
        .setEmoji(yellowEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleDonorGreen.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleDonorGreen.id}"`)
        .setEmoji(greenEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
    );

    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(`${roleDonorBlue.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleDonorBlue.id}"`)
        .setEmoji(blueEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleDonorPurple.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleDonorPurple.id}"`)
        .setEmoji(purpleEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleDonorPink.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleDonorPink.id}"`)
        .setEmoji(pinkEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleDonorBlack.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleDonorBlack.id}"`)
        .setEmoji(blackEmoji.identifier)
        .setStyle(ButtonStyle.Primary),
    );
    await (interaction.channel as TextChannel).send({ embeds: [embed], components: [row1, row2] });
  } else if (set === 'mindset') {
    const roleDrunk = await guild.roles.fetch(env.ROLE_DRUNK) as Role;
    const roleHigh = await guild.roles.fetch(env.ROLE_HIGH) as Role;
    const roleRolling = await guild.roles.fetch(env.ROLE_ROLLING) as Role;
    const roleTripping = await guild.roles.fetch(env.ROLE_TRIPPING) as Role;
    const roleDissociating = await guild.roles.fetch(env.ROLE_DISSOCIATING) as Role;
    const roleStimming = await guild.roles.fetch(env.ROLE_STIMMING) as Role;
    const roleSedated = await guild.roles.fetch(env.ROLE_SEDATED) as Role;
    const roleTalkative = await guild.roles.fetch(env.ROLE_TALKATIVE) as Role;
    const roleWorking = await guild.roles.fetch(env.ROLE_WORKING) as Role;

    const embed = embedTemplate()
      .setDescription(stripIndents`
        **React to this message to show your mindset!**
      `)
      // .setFooter({ text: 'These roles reset after 8 hours to (somewhat) accurately show your mindset!' })
      .setFooter({ text: 'You can only pick one mindset at a time!' })
      .setColor(Colors.Green);

    const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(`${roleDrunk.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleDrunk.id}"`)
        .setEmoji(env.EMOJI_DRUNK)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleHigh.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleHigh.id}"`)
        .setEmoji(env.EMOJI_HIGH)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleRolling.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleRolling.id}"`)
        .setEmoji(env.EMOJI_ROLLING)
        .setStyle(ButtonStyle.Primary),
    );

    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(`${roleTripping.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleTripping.id}"`)
        .setEmoji(env.EMOJI_TRIPPING)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleDissociating.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleDissociating.id}"`)
        .setEmoji(env.EMOJI_DISSOCIATING)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleStimming.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleStimming.id}"`)
        .setEmoji(env.EMOJI_STIMMING)
        .setStyle(ButtonStyle.Primary),
    );

    const row3 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(`${roleSedated.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleSedated.id}"`)
        .setEmoji(env.EMOJI_SEDATED)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleTalkative.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleTalkative.id}"`)
        .setEmoji(env.EMOJI_TALKATIVE)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${roleWorking.name}`)
        .setCustomId(`"ID":"RR","RID":"${roleWorking.id}"`)
        .setEmoji(env.EMOJI_WORKING)
        .setStyle(ButtonStyle.Primary),
    );

    await (interaction.channel as TextChannel).send({ embeds: [embed], components: [row1, row2, row3] });
  } else if (set === 'pronoun') {
    const embed = embedTemplate()
      .setDescription(stripIndents`Click the button(s) below to pick your pronoun(s)!`)
      // .setFooter({ text: 'You can only pick one pronoun at a time, choose wisely!' })
      .setColor(Colors.Blue);

    const pronounHe = await guild.roles.fetch(env.ROLE_PRONOUN_HE) as Role;
    const pronounShe = await guild.roles.fetch(env.ROLE_PRONOUN_SHE) as Role;
    const pronounThey = await guild.roles.fetch(env.ROLE_PRONOUN_THEY) as Role;
    const pronounAny = await guild.roles.fetch(env.ROLE_PRONOUN_ANY) as Role;
    const pronounAsk = await guild.roles.fetch(env.ROLE_PRONOUN_ASK) as Role;

    const emojiHe = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'pronounhehim') as GuildEmoji;
    const emojiShe = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'pronounsheher') as GuildEmoji;
    const emojiThey = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'pronountheythem') as GuildEmoji;
    const emojiAny = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'pronounanypronouns') as GuildEmoji;
    const emojiAsk = guild.emojis.cache.find(e => e.name?.toLowerCase() === 'pronounaskme') as GuildEmoji;

    const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(`${pronounHe.name}`)
        .setCustomId(`"ID":"RR","RID":"${pronounHe.id}"`)
        .setEmoji(emojiHe.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${pronounShe.name}`)
        .setCustomId(`"ID":"RR","RID":"${pronounShe.id}"`)
        .setEmoji(emojiShe.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${pronounThey.name}`)
        .setCustomId(`"ID":"RR","RID":"${pronounThey.id}"`)
        .setEmoji(emojiThey.identifier)
        .setStyle(ButtonStyle.Primary),
    );

    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(`${pronounAny.name}`)
        .setCustomId(`"ID":"RR","RID":"${pronounAny.id}"`)
        .setEmoji(emojiAny.identifier)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel(`${pronounAsk.name}`)
        .setCustomId(`"ID":"RR","RID":"${pronounAsk.id}"`)
        .setEmoji(emojiAsk.identifier)
        .setStyle(ButtonStyle.Primary),
    );

    await (interaction.channel as TextChannel).send({ embeds: [embed], components: [row1, row2] });
  }

  interaction.reply({ content: 'Reaction roles have been set up!', ephemeral: true });
}

export async function setupCustomReactionRole(
  interaction:ChatInputCommandInteraction,
) {
  const emoji = interaction.options.getString('emoji', true);
  const role = interaction.options.getRole('role', true) as Role;
  const introMessage = interaction.options.getBoolean('intro_message')
    ? `"${interaction.options.getBoolean('intro_message')}"`
    : null;
  const introChannel = interaction.options.getChannel('intro_channel')
    ? `"${interaction.options.getChannel('intro_channel', true).id}"`
    : null;

  if (!(interaction.member as GuildMember).roles.cache.has(env.ROLE_DEVELOPER)) {
    await interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
    return false;
  }

  // Display modal to get intro message from the user
  const modal = new ModalBuilder()
    .setCustomId(`"ID":"RR","II":"${interaction.id}"`)
    .setTitle(`${role.name} Description`);
  modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder()
    .setCustomId('description')
    .setRequired(true)
    .setLabel('Describe this role!')
      .setPlaceholder(`This will go into the embed to let people know what they're clicking on!`) // eslint-disable-line
    .setMaxLength(2000)
    .setStyle(TextInputStyle.Paragraph)));
  await interaction.showModal(modal);

  // Collect a modal submit interaction
  const filter = (i:ModalSubmitInteraction) => i.customId.startsWith('"ID":"RR"');
  interaction.awaitModalSubmit({ filter, time: 0 })
    .then(async i => {
      const {
        II,
      } = JSON.parse(`{${i.customId}}`);

      if (II !== interaction.id) return;
      if (!i.guild) {
        // log.debug(F, `no guild!`);
        i.reply(guildError);
        return;
      }
      if (!i.member) {
        // log.debug(F, `no member!`);
        i.reply(memberError);
      }

      const description = i.fields.getTextInputValue('description');

      const embed = embedTemplate()
        .setFooter(null)
        .setDescription(description);

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId(`"ID":"RR","RID":"${role.id}","IM":${introMessage},"IC":${introChannel}`) // eslint-disable-line
          .setEmoji(emoji)
          .setStyle(ButtonStyle.Primary),
      );
      await (interaction.channel as TextChannel).send({ embeds: [embed], components: [row] });

      const channelBotlog = await i.guild.channels.fetch(env.CHANNEL_BOTLOG) as TextChannel;
      await channelBotlog.send(
        `${(interaction.member as GuildMember).displayName} created a new reaction role message`,
      );
      i.reply({ content: 'Reaction role message created!', ephemeral: true });
    });
  return true;
}

export async function processReactionRole(
  interaction:ButtonInteraction,
) {
  // log.debug(F, `Processing reaction role click Options: ${JSON.stringify(interaction.customId, null, 2)}`);
  const {
    RID,
    IM,
    IC,
  } = JSON.parse(`{${interaction.customId}}`) as {
    RID:string,
    IM?:boolean,
    IC?:string,
  };

  // log.debug(F, `RID: ${RID}, IM: ${IM}, IC: ${IC}`);

  const target = interaction.member as GuildMember;

  if (!interaction.guild) return;
  const { guild } = interaction;

  const role = await guild.roles.fetch(RID);

  if (!role) {
    log.error(F, `Role ${RID} not found`);
    return;
  }

  // If the user already has the role
  if (target.roles.cache.has(role.id)) {
    if (IM !== undefined) {
      // Display modal to get intro message from the user
      const modal = new ModalBuilder()
        .setCustomId(`"ID":"RR","II":"${interaction.id}"`)
        .setTitle(`Are you sure you want to remove ${role.name}?`);
      modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder()
        .setCustomId('reason')
        .setLabel('You can optionally tell us why!')
        .setPlaceholder(`We'll use this to try and improve our process!`) // eslint-disable-line
        .setValue('I just dont want to anymore')
        .setMaxLength(2000)
        .setStyle(TextInputStyle.Paragraph)));
      await interaction.showModal(modal);

      // Collect a modal submit interaction
      const filter = (i:ModalSubmitInteraction) => i.customId.startsWith('"ID":"RR"');
      interaction.awaitModalSubmit({ filter, time: 0 })
        .then(async i => {
          // log.debug(F, `${JSON.stringify(i.customId)}`);
          const {
            II,
          } = JSON.parse(`{${i.customId}}`);

          if (II !== interaction.id) return;
          if (!i.guild) {
            // log.debug(F, `no guild!`);
            i.reply(guildError);
            return;
          }
          if (!i.member) {
            // log.debug(F, `no member!`);
            i.reply(memberError);
          }

          await target.roles.remove(role);
          await i.reply({ content: `Removed role ${role.name}`, ephemeral: true });

          const channelAudit = await i.guild.channels.fetch(env.CHANNEL_AUDITLOG) as TextChannel;
          const reason = i.fields.getTextInputValue('reason');
          await channelAudit.send(
            `${(i.member as GuildMember).displayName} removed role ${role.name} because: ${reason}`,
          );
        });
    } else {
      await target.roles.remove(role);
      await interaction.reply({ content: `Removed role ${role.name}`, ephemeral: true });
    }
    return;
  }

  // const channelTripsitmeta = await guild.channels.fetch(env.CHANNEL_TRIPSITMETA) as TextChannel;
  const channelTripsit = await guild.channels.fetch(env.CHANNEL_TRIPSIT) as TextChannel;
  const hrCategory = await guild.channels.fetch(env.CATEGROY_HARMREDUCTIONCENTRE) as CategoryChannel;
  const devCategory = await guild.channels.fetch(env.CATEGORY_DEVELOPMENT) as CategoryChannel;
  const channelTripcord = await guild.channels.fetch(env.CHANNEL_DISCORD) as TextChannel;
  const channelTripbot = await guild.channels.fetch(env.CHANNEL_TRIPBOT) as TextChannel;
  // const channelTripmobile = await guild.channels.fetch(env.CHANNEL_TRIPMOBILE) as TextChannel;
  // const channelContent = await guild.channels.fetch(env.CHANNEL_WIKICONTENT) as TextChannel;
  // const channelDevelopment = await guild.channels.fetch(env.CHANNEL_DEVELOPMENT) as TextChannel;

  let introMessage = '' as string;
  if (IM) {
    if (!IC) {
      log.error(F, 'Intro message is true but intro channel is not set');
      interaction.reply({
        content: 'If the user must supply an intro message, you must supply what channel that message is sent!',
        ephemeral: true,
      });
      return;
    }
    // Display modal to get intro message from the user
    const modal = new ModalBuilder()
      .setCustomId(`"ID":"RR","II":"${interaction.id}"`)
      .setTitle(`${role.name} Introduction`);
    modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder()
      .setCustomId('introduction')
      .setRequired(true)
      .setLabel('Tell us a bit about yourself!')
      .setPlaceholder(`Why do you want to be a ${role.name}?  This will be sent to the channel!`) // eslint-disable-line
      .setMaxLength(2000)
      .setStyle(TextInputStyle.Paragraph)));
    await interaction.showModal(modal);

    // Collect a modal submit interaction
    const filter = (i:ModalSubmitInteraction) => i.customId.startsWith('"ID":"RR"');
    interaction.awaitModalSubmit({ filter, time: 0 })
      .then(async i => {
        // log.debug(F, `${JSON.stringify(i.customId)}`);
        const {
          II,
        } = JSON.parse(`{${i.customId}}`);

        // log.debug(F, `II: ${II}`);

        if (II !== interaction.id) return;
        if (!i.guild) {
          // log.debug(F, `no guild!`);
          i.reply(guildError);
          return;
        }
        if (!i.member) {
        // log.debug(F, `no member!`);
          i.reply(memberError);
        }

        introMessage = i.fields.getTextInputValue('introduction');
        // log.debug(F, `introMessage: ${introMessage}`);

        await target.roles.add(role);
        await i.reply({ content: `Added role ${role.name}`, ephemeral: true });

        const channel = await i.guild?.channels.fetch(IC) as TextChannel;

        if (channel.id === env.CHANNEL_TRIPSITMETA) {
          const intro = stripIndents`
          ${target} has joined as a ${role.name}, please welcome them!
          
          A little about them:
          > ${introMessage}

          Some info for you ${target}; as a ${role.name}, some things have changed:
    
          1) You now have access this this channel, which is used to coordinate with others!
    
          - Please use this room to ask for help if you're overwhelmed, and feel free to make a thread if it gets busy!
    
          2) You are able to receive and respond to help requests in the ${hrCategory}!
    
          - As people need help, a thread will be created in ${channelTripsit}.
          - We use a thread in ${channelTripsit} to help the person in need, and talk here to coordinate with the team.
          -- ${channelTripsit} threads are archived after 24 hours, and deleted after 7 days.
        
          For a refresher on tripsitting please see the following resources:
          - <https://docs.google.com/document/d/1vE3jl9imdT3o62nNGn19k5HZVOkECF3jhjra8GkgvwE>
          - <https://wiki.tripsit.me/wiki/How_To_Tripsit_Online>
    
          **If you have any questions, please reach out to a moderator or the team lead!**`;
          channel.send(intro);
        } else if (channel.id === env.CHANNEL_DEVELOPMENT) {
          const intro = stripIndents`
          ${target} has joined as a ${role.name}, please welcome them!
          
          A little about them:
          > ${introMessage}

          Some info for you ${target}: 
      
          Our ${devCategory} category holds the projects we're working on.
    
          > **We encourage you to make a new thread whenever possible!**
          > This allows us to organize our efforts and not lose track of our thoughts!
    
          TripSit is run by volunteers, so things may be a bit slower than your day job.
          Almost all the code is open source and can be found on our GitHub: <http://github.com/tripsit>
          Discussion of changes happens mostly in the public channels in this category.
          If you have an idea or feedback, make a new thread: we're happy to hear all sorts of input and ideas!
    
          ${channelTripcord}
          > While this discord has existed for years, TS has only begun to focus on it relatively recently.
          > It is still an ongoing WIP, and this channel is where we coordinate changes to the discord server!
          > Ideas and suggestions are always welcome, and we're always looking to improve the experience!
          > No coding experience is necessary to help make the discord an awesome place to be =)
    
          ${channelTripbot}
          > Our ombi-bot Tripbot has made it's way into the discord server!
          > This is a somewhat complex bot that is continually growing to meet the needs of TripSit.
          > It also can be added to other servers to provide a subset of harm reduction features to the public

          We have a ton of other channels, take your time to explore the threads!

          If you have any questions, please reach out to a moderator or the lead dev!`;
          channel.send(intro);
        } else {
          channel.send(stripIndents`
          ${target} has joined as a ${role.name}, please welcome them!
          
          A little about them:
          > ${introMessage}`); // eslint-disable-line
        }
      });
  } else if (IC) {
    const channel = await guild.channels.fetch(IC) as TextChannel;
    await target.roles.add(role);
    await interaction.reply({ content: `Added role ${role.name}`, ephemeral: true });
    // Post intro message to the channel
    channel.send(`${target} has joined as a ${role.name}, please welcome them!`);
  } else {
    const isMod = (interaction.member as GuildMember).roles.cache.has(env.ROLE_MODERATOR);
    const isTs = (interaction.member as GuildMember).roles.cache.has(env.ROLE_TRIPSITTER);
    const isBooster = (interaction.member as GuildMember).roles.cache.has(env.ROLE_BOOSTER);
    const isPatron = (interaction.member as GuildMember).roles.cache.has(env.ROLE_PATRON);

    // You cant add a premium color if you're not a team member or a donor
    if (premiumColorIds.includes(role.id) && !isMod && !isTs && !isBooster && !isPatron) {
      // log.debug(F, `role.id is ${role.id} is a premium role and the user is not premium
      //       (isMod: ${isMod}, isTs: ${isTs} isBooster: ${isBooster}, isPatron: ${isPatron})`);
      interaction.reply({ content: 'You do not have permission to use that role!', ephemeral: true });
      return;
    }

    await target.roles.add(role);
    await interaction.reply({ content: `Added role ${role.name}`, ephemeral: true });

    // Remove the other color roles if you're adding a color role
    if (colorIds.includes(role.id)) {
      // log.debug(F, 'Removing other color roles');
      const otherColorRoles = colorIds.filter(r => r !== role.id);
      await target.roles.remove([...otherColorRoles, ...premiumColorIds]);
    }

    // Remove the other premium mindset roles if you're adding a mindset role
    if (premiumColorIds.includes(role.id)) {
      // log.debug(F, 'Removing other premium color roles');
      const otherPremiumColorRoles = premiumColorIds.filter(r => r !== role.id);
      await target.roles.remove([...otherPremiumColorRoles, ...colorIds]);
    }

    // Remove the other mindset roles if you're adding a mindset role
    if (mindsetIds.includes(role.id)) {
      // log.debug(F, 'Removing other mindset roles');
      const otherMindsetRoles = mindsetIds.filter(r => r !== role.id);
      await target.roles.remove([...otherMindsetRoles]);
    }

    // // Remove the other pronoun roles if you're adding a pronoun role
    // if (pronounIds.includes(role.id)) {
    // log.debug(F, 'Removing other pronoun roles');
    //   const otherPronounRoles = pronounIds.filter(r => r !== role.id);
    //   await target.roles.remove([...otherPronounRoles]);
    // }
  }
}