const transport = "tcp";
const hostname = "127.0.0.1";
const remotePort = 8080;
const localPort = 8880;
const DEFAULT_BUFFER_SIZE = 32 * 1024;

const listener = Deno.listen({ hostname, port: localPort });
const remoteConn = await Deno.connect({ transport, hostname, port: remotePort });

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const interval = 5000;

setInterval(async () => {   
    const text = new Date().toLocaleString();
    console.log("local: ", text);
    await remoteConn.write(encoder.encode(text));

    let buf = new Uint8Array(DEFAULT_BUFFER_SIZE);
    const n = await remoteConn.read(buf) || 0;
    buf = buf.slice(0, n);
    console.log('remote: ', decoder.decode(buf));
}, interval);
