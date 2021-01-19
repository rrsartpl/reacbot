const dialogflow = require('dialogflow');
const config = require('../config/keys');

const sessionClient = new dialogflow.SessionsClient();

const sesssionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({ 'hello': 'rafa' })
    });

    app.post('/api/df_text_query', (req, res) => {

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.text,
                    languageCode: config.dialogflowSessionLanguageCode,
                },
            },
        };

        sessionClient
            .detectIntent(request)
            .then(responses => {
                console.log('Detected intent');
                const result = responses[0].queryResult;
                console.log(`  Query: ${result.queryText}`);
                console.log(`  Response: ${result.fulfillmentText}`);
                if (result.intent) {
                    console.log(`  Intent: ${result.intent.displayName}`);
                } else {
                    console.log(`  No intent matched.`);
                }
            })
            .catch(err => {
                console.error('ERROR:', err);
            });


        res.send({ 'do': 'text query' })
    });

    app.post('/api/df_event_query', (req, res) => {
        res.send({ 'do': 'event query' })
    });

}