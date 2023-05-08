const dotenv = require("dotenv");
const { Client } = require("@notionhq/client");
dotenv.config();

async function addToDatabase(notes, bank, amount, date) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = process.env.NOTION_DB_KEY;
  console.log(notes, bank, amount, date);
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Notes: {
          title: [
            {
              text: {
                content: notes,
              },
            },
          ],
        },
        Bank: {
          select: {
            name: bank,
          },
        },
        Amount: {
          number: amount,
        },
        Date: {
          date: {
            start: date,
          },
        },
      },
    });
    console.log(response);
    return "success";
  } catch (error) {
    console.error(error);
    return "failure";
  }
}

module.exports = addToDatabase;
