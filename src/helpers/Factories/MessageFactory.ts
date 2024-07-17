import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import { GetBaseEmbed } from "../../lib/BaseEmbed";

export async function CreateRoundMessage(
  buffers: Buffer[],
  roundNumber: number
) {
  const myAttachments = CreateMessageAttachments(
    buffers,
    `Round ${roundNumber}`
  );

  //Create the Result Object.
  const result = {
    content: "",
    embeds: myAttachments[0],
    files: myAttachments[1],
  };

  return result;
}

export function CreateDieMessage(buffers: Buffer[], roundNumber: number) {
  const myAttachments = CreateMessageAttachments(
    buffers,
    `Death of Round ${roundNumber}`,
    0xff0000
  );

  //Create the Result Object.
  const result = {
    content: "",
    embeds: myAttachments[0],
    files: myAttachments[1],
  };

  return result;
}

export function CreateEndMessage(buffer: Buffer, userId: string) {
  const buffers: Buffer[] = [];
  buffers.push(buffer);

  const myAttachments = CreateMessageAttachments(
    buffers,
    "The Winner",
    0x1abc9c
  );

  //Create the Result Object.
  const result = {
    content: `The Winner is ${userId}, congratulations.`,
    embeds: myAttachments[0],
    files: myAttachments[1],
  };
  return result;
}

function CreateMessageAttachments(
  buffers: Buffer[],
  title: string,
  embedColor = 0x0099ff
): [EmbedBuilder[], AttachmentBuilder[]] {
  //
  const exampleEmbeds: EmbedBuilder[] = new Array<EmbedBuilder>(buffers.length);
  const myAttachments: AttachmentBuilder[] = new Array<AttachmentBuilder>(
    buffers.length
  );

  //Creates Attachment Objects for each buffer and saves them in the Arrays.
  for (let i = 0; i < buffers.length; i++) {
    const exampleEmbed = GetBaseEmbed().setTitle(title).setColor(embedColor);

    const myAttachment = new AttachmentBuilder(buffers[i], {
      name: `${title.replace(/\s/g, "")}_${i}.png`,
    });
    exampleEmbed.setImage(`attachment://${myAttachment.name}`);

    //push to the array examplesEmbeds
    exampleEmbeds[i] = exampleEmbed;
    //push to the array myAttachments
    myAttachments[i] = myAttachment;
  }

  return [exampleEmbeds, myAttachments];
}

export async function CreateTestMessage(buffers: Buffer) {
  const myAttachments = CreateMessageAttachments([buffers], `Round test`);

  //Create the Result Object.
  const result = {
    content: "",
    embeds: myAttachments[0],
    files: myAttachments[1],
  };

  return result;
}

