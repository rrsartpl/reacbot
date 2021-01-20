const dialogflow = require('dialogflow');
const config = require('../config/keys');

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({ 'hello': 'rafa' })
    });

    app.post('/api/df_text_query', async(req, res) => {

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.text,
                    languageCode: config.dialogflowSessionLanguageCode
                },
            },
        };

        let responses = await sessionClient
            .detectIntent(request)
        res.send(responses[0].queryResult)
    });

    app.post('/api/df_event_query', (req, res) => {
        res.send({ 'do': 'event query' })
    });

}