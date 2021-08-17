const hostname = "127.0.0.1";
const port = 8080;
const listener = Deno.listen({ hostname, port });
const DEFAULT_BUFFER_SIZE = 32 * 1024;
const decoder = new TextDecoder();

console.log(`Listening TCP on ${hostname}:${port}`);

for await (const conn of listener) {
    (async () => {
        await copy(conn, conn);
    })();
}

async function copy(
    src: Deno.Reader,
    dst: Deno.Writer,
): Promise<number> {
    const buf = new Uint8Array(DEFAULT_BUFFER_SIZE);
    let n = 0;
    let gotEOF = false;
    while (gotEOF === false) {
        let result = null;
        try {
            result = await src.read(buf);
            
        } catch(e) {
            console.error(e);
        }
        if (result === null) {
            gotEOF = true;
        } else {
            let nwritten = 0;
            while (nwritten < result) {
                nwritten += await dst.write(buf.subarray(nwritten, result));
            }
            n += nwritten;
        }
        console.log(decoder.decode(buf.slice(0, n)));
    }
    
    return n;
}
