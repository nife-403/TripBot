import {
  SlashCommandBuilder, StringMappedInteractionTypes,
} from 'discord.js';
import { stripIndents } from 'common-tags';
import { SlashCommand } from '../../@types/commandDef';
import { embedTemplate } from '../../utils/embedTemplate';
import { crisis } from '../../../global/commands/g.crisis';
//import fs from "fs";
//var countriesdb = JSON.parse(fs.readFileSync("./../../../../assets/data/countries.json", "utf-8"))
import countriesdb from "../../../../assets/data/countries.json";
import commandContext from '../../utils/context';
// import log from '../../../global/utils/log';
const F = f(__filename);
interface countriesdb {
  [key: number]: number,
  name: string,
  code: string
}

export const dCrisis: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('crisis')
    .setDescription('Information that may be helpful in a serious situation.')
    .addBooleanOption(option => option.setName('ephemeral')
      .setDescription('Set to "True" to show the response only to you'))
    .addStringOption(option => option.setName("country")
      .setDescription("Where are you from?")
      .setRequired(false)),
  
  async execute(interaction) {
    log.info(F, await commandContext(interaction));
    const emsInfo = await crisis(interaction.options.getString('country'));
    await interaction.deferReply({ ephemeral: (interaction.options.getBoolean('ephemeral') === true) });
    const embed = embedTemplate();

    embed.setTitle('Crisis Information');
    // for (const entry of emsInfo) {
    const userloc = interaction.options.getString('country')
    for (let x = 0; x < countriesdb.length; x++) { //testing
      if (interaction.options.getString('country')?.toLowerCase() == countriesdb[x].name.toLowerCase()) {
        log.debug("[d.crisis.ts] [region name-to-code]", countriesdb[x].code)
      } else if (interaction.options.getString('country')?.toLowerCase() == countriesdb[x].code.toLowerCase()) {
        log.debug("[d.crisis.ts] [region code-to-name]", countriesdb[x].name)
      }
    }
    emsInfo.forEach(entry => {
      const country = `(${entry.country})`;
      const website = `\n[Website](${entry.website})`;
      const webchat = `\n[Webchat](${entry.webchat})`;
      const phone = `\nCall: ${entry.phone}`;
      const text = `\nText: ${entry.text}`;
      embed.addFields(
        {
          name: `${entry.name} ${entry.country ? country : ''}`,
          value: stripIndents`${entry.website ? website : ''}\
            ${entry.webchat ? webchat : ''}\
            ${entry.phone ? phone : ''}\
            ${entry.text ? text : ''}`,
          inline: true,
        },
      );
    });
    await interaction.editReply({ embeds: [embed] });
    return true;
  },
};

export default dCrisis;
