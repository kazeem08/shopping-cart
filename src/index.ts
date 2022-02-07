/* eslint-disable @typescript-eslint/restrict-template-expressions */
import logger from 'jet-logger';
import server from './server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(`${process.env.MONGO_URI}`);
// Constants
const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 3000);

// Start server
server.listen(port, () => {
    logger.info(serverStartMsg + port);
});
