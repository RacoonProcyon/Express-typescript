import * as fs  from 'fs';
import * as fileType from 'file-type';

export const fileFilter = async  (path) => {
    const buffer = fs.readFileSync(path);
    const type = fileType(buffer);
    const timestamp = Date.now().toString();
    const fileName = `${timestamp}-lg`;
    let fileData = {
        type,
        buffer,
        fileName
    }
    return fileData;
}