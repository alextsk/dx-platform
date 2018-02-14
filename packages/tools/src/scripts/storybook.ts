import * as path from 'path';
import {choosePort} from 'react-dev-utils/WebpackDevServerUtils';
import { getProgramForScript } from '../utils/program';
import { Scripts } from './constants';

const program = getProgramForScript(Scripts.STORYBOOK);

console.log('starting...');

async function prepare() {
    program
        .option('-p --port [portnumber]', 'storybook port', (value) => parseInt(value, 10),9001)
        .option('-h --host [hostname]', 'storybook host', 'localhost')
        .parse(process.argv);

    const defaultConfigPath = path.resolve(__dirname, '../config/storybook');

    const port = await choosePort(program.host, program.port);

    if (!port) {
        throw new Error(`Port ${program.port} already in use`);
    }
    process.argv.push('-c', defaultConfigPath);
    process.argv.push('--port', port.toString());
}

prepare().then(() => {
    require('@storybook/react/dist/server');
}).catch(err => console.log('errr', err));

