const transport = "udp";
const hostname = "127.0.0.1";
const port = 8081;
const datagramConn = Deno.listenDatagram({ transport, hostname, port });
const decoder = new TextDecoder();
console.log(`Listening UDP on ${hostname}:${port}`);

for await (const conn of datagramConn) {
    (async () => {
        console.log(decoder.decode(conn[0]));
        await datagramConn.send(conn[0], conn[1]);
    })();
}
