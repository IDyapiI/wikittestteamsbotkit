const { BotkitConversation } = require('botkit');

const DIALOG_ID = 'DIALOG_ID';
const DIALOG_ID2 = 'DIALOG_ID2'

module.exports = (controller) => {
    const convo = new BotkitConversation(DIALOG_ID, controller);
    convo.addQuestion(
        {
            text: 'Here is yout Hero Card ',
            attachments: [
                {
                    "contentType": "application/vnd.microsoft.card.hero",
                    "content": {
                        "title": "Hero Card",
                        "subtitle": "Subtitle",
                        "text": "Text",
                        "images": [
                            {
                                "url": "https://statics.teams.cdn.office.net/evergreen-assets/apps/teams_dev_app_largeimage.png"
                            }
                        ],
                        "buttons": [
                            {
                                "type": "messageBack",
                                "title": "Button 1",
                                "displayText":"toto",
                                "value": "value"
                            },
                            {
                                "type": "messageBack",
                                "title": "Button 2",
                                "value": "value 2"
                            }
                        ]
                    }
                }

            ]
        },
        async (response, convo, bot, message) => {
           console.log('1');
             await bot.beginDialog(DIALOG_ID2);
        },
       ''
    );

    const convo2 = new BotkitConversation(DIALOG_ID2, controller);

    convo2.addMessage('second conversation start here','default')

    controller.addDialog(convo);
    controller.addDialog(convo2);

    process.on('unhandledRejection', error => {
        console.log(error);
    });

    controller.hears('hero', 'message', async (bot, message) => {
        await bot.beginDialog(DIALOG_ID);
    });
};
