import app from "./app";
import { PORT } from './v1/util/secrets';
const port = PORT || 8080;


app.listen(port, function () {
    global.log('Express server listening on port ' + port);
});