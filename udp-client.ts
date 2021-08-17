const transport = "udp";
const hostname = "127.0.0.1";
const remotePort = 8081;
const localPort = 8881;
const DEFAULT_BUFFER_SIZE = 32 * 1024;

const datagramConn = Deno.listenDatagram({ transport, port: localPort });
const remoteAddr : Deno.NetAddr = { transport, hostname, port: remotePort };

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const interval = 5000;

setInterval(async () => {
    const text = new Date().toLocaleString();
    console.log("local: ", text);
    await datagramConn.send(encoder.encode(text), remoteAddr);

    const datagram = await datagramConn.receive();
    console.log('remote: ', decoder.decode(datagram[0]));
}, interval);
