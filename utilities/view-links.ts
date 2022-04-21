// node "./utilities/view-links.js" "$(npm root -g)"

// Could be a useful start to visualizing npm-links

import { Stats, promises as fs } from "fs";
import path from 'path';

async function* findAllSimlinks(root : string) : AsyncGenerator<{ linkPath : string, realPath: string }, void, undefined> {
    const paths = await fs.readdir(root);
    const lstats = (await Promise.all(paths
        .map(p => path.join(root, p))
        .map(path => fs.lstat(path)
        .then(async lstat => {
            const isSymbolicLink = lstat.isSymbolicLink();
            const isDirectory = lstat.isDirectory();
            return { path, isSymbolicLink, isDirectory, realPath: isSymbolicLink ? await fs.realpath(path) : path };
        }))));
    const symlinks : { linkPath : string, realPath: string }[] = [];
    const directories : string[] = [];

    for (const { path, isSymbolicLink, isDirectory, realPath } of lstats) {
        if (isSymbolicLink) {
            symlinks.push({ linkPath: path, realPath });
        } else if (isDirectory) {
            directories.push(path);
        }
    }

    yield* symlinks;

    for (const sub of directories) {
        yield* findAllSimlinks(sub);
    }
};

(async () => {
    const root = process.argv[2];
    console.log(`Scanning ${root}...`);

    for await (const { linkPath, realPath } of findAllSimlinks(process.argv[2])) {
        console.log(`${path.relative(root, linkPath)} -> ${realPath}`);
    }
})();
